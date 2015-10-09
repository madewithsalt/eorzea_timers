App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {

    var Node = Backbone.Model.extend({
            initialize: function() {
                if (!this.get('name') || !this.get('times')) {
                    return console.error('Cannot instantiate Nodes without initial data due to setup requirements.');
                }

                this.setupData();
            },

            setupData: function() {
                this.getTimeDiff();

                var id;
                if(this.get('type') !== 'custom') {
                    id = _.map([this.get('name'), this.get('time'), this.get('location')], function(item) {
                        return item.split(' ').join('-').toLowerCase();
                    }).join('-');
                } else if(!this.get('id')) {
                    id = _.uniqueId('custom-');
                }

                if(id) {
                    this.set('id', id);
                }

                this.set('time_obj', TIME_HELPERS.getTimeObjFromString(this.get('time')));

                this.listenTo(App.masterClock, 'change', _.bind(this.getTimeDiff, this));
            },

            getTimeDiff: function() {
                var currentTime = App.masterClock.get('time'),
                    activeTime = this.get('time'),
                    duration = this.get('duration'),
                    endTime = TIME_HELPERS.getEndTimeFromDuration(activeTime, duration),
                    currentTimeObj = TIME_HELPERS.getTimeObjFromString(currentTime),
                    activeTimeObj = TIME_HELPERS.getTimeObjFromString(activeTime),
                    timeStartUntil = TIME_HELPERS.getTimeDifference(currentTime, activeTime),
                    earthTimeUntil = TIME_HELPERS.getEarthDurationfromEorzean(TIME_HELPERS.getDurationStringFromObject(timeStartUntil)),
                    timeRemaining = TIME_HELPERS.getTimeDifference(currentTime, endTime),
                    earthTimeRemaining = TIME_HELPERS.getEarthDurationfromEorzean(TIME_HELPERS.getDurationStringFromObject(timeRemaining)),
                    isActive = TIME_HELPERS.isActive(currentTime, activeTime, duration);

                if (isActive) {
                    this.set({ 'triggeredAlarm': false }, { silent: true });
                }

                this.set({
                    'active': isActive,
                    'time_until': timeStartUntil,
                    'time_remaining': timeRemaining,
                    'earth_time_until': earthTimeUntil,
                    'earth_time_remaining': earthTimeRemaining
                });
            }
        }),

        NodeColl = Backbone.Collection.extend({
            model: Node,
            parse: function(resp) {
                var self = this,
                    results = [],
                    list = _.map(resp, function(item) {
                        return _.extend(item, {
                            type: self.type
                        });
                    });

                _.each(list, function(item) {
                    if (item.time && _.isString(item.time)) {
                        return;
                    }

                    if (_.isArray(item.times) && item.times.length > 1) {
                        _.each(item.times, function(time) {
                            results.push(_.extend({
                                time: time
                            }, item));
                        });
                    } else {
                        results.push(_.extend({
                            time: item.times[0]
                        }, item));
                    }
                });

                return results;
            }
        });

    Entities.NodeList = Backbone.Collection.extend({
        comparator: function(model) {
            var active = model.get('active'),
                timeUntil = model.get('earth_time_until'),
                timeRemaining = model.get('earth_time_remaining');

            if(active) {
                return (timeRemaining.hours * 60) + timeRemaining.minutes;
            } else {
                return (timeUntil.hours * 60) + timeUntil.minutes;
            }

        }
    });

    Entities.Node = Node;

    Entities.BotanyNodes = NodeColl.extend({
        type: 'botany',
        url: '/data/botany.json'
    });

    Entities.MiningNodes = NodeColl.extend({
        type: 'mining',
        url: '/data/mining.json'
    });

    Entities.CustomNodes = Backbone.Collection.extend({
        model: Node,
        type: 'custom',
        localStorage: new Backbone.LocalStorage('CustomNodes')
    });

    Entities.WatchedNodes = Entities.NodeList.extend({
        model: Node,
        type: 'watched',
        localStorage: new Backbone.LocalStorage('WatchedNodes'),

        initialize: function() {
            this.on('change', this.checkAlarm);
        },

        checkAlarm: function(model) {
            var alarm = App.userSettings.get('alarm');

            if(!alarm || !model.get('selected') || model.get('active')) { return; }

            var time = parseFloat(alarm.time || 0),
                timeUntil = model.get('time_until');
            
            if(!model.get('triggeredAlarm')) {
                // its a bit too messy to try and set 0 time alerts to when it actually goes active, so instead
                // we trigger in under 2 eorzean minutes, which is really, really close (and in the 3m window of "error")
                if((timeUntil.hours < time && time !== 0) || (time === 0 && timeUntil.hours === 0 && timeUntil.minutes <= 2)) {
                    return this.triggerAlarm(model);
                }
            }
        },

        triggerAlarm: function(model) {
            var alarm = App.userSettings.get('alarm');

            if(alarm.sound) {
                var sound = App.sounds.get(alarm.sound);
                sound.play();
            }

            if(alarm.type === 'desktop') {
                App.vent.trigger('alarm:desktop', model);
            } else if(alarm.type === 'popup') {
                App.vent.trigger('alarm:popup', model);
            } else if(alarm.type === 'alert') {
                App.vent.trigger('alarm:alert', model);
            }

            model.set({ 'triggeredAlarm': true });
        }

    });

});