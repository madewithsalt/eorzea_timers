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

                var id = _.map([this.get('name'), this.get('time'), this.get('location')], function(item) {
                    return item.split(' ').join('-').toLowerCase();
                }).join('-');

                this.set('id', id);
                this.set('time_obj', TIME_HELPERS.getTimeObjFromString(this.get('time')));

                this.listenTo(App.masterClock, 'change', _.bind(this.getTimeDiff, this));
            },

            getDurationInfo: function() {
                if (!this.get('duration')) {
                    return;
                }
                var duration = this.get('duration'),
                    dur = TIME_HELPERS.getDurationObjectFromString(duration),
                    str = TIME_HELPERS.getTimeStringFromDuration(this.get('time'), this.get('duration'));

                return {
                    duration: dur,
                    end_time: str,
                    end_time_obj: TIME_HELPERS.getTimeObjFromString(str)
                }
            },

            getTimeDiff: function() {
                var currentTime = App.masterClock.get('time'),
                    activeTime = this.get('time'),
                    durationInfo = this.getDurationInfo(),
                    currentTimeObj = TIME_HELPERS.getTimeObjFromString(currentTime),
                    activeTimeObj = TIME_HELPERS.getTimeObjFromString(activeTime),
                    timeStartUntil = TIME_HELPERS.getTimeDifference(currentTime, activeTime),
                    earthTimeUntil = TIME_HELPERS.getEarthDurationfromEorzean(TIME_HELPERS.getDurationStringFromObject(timeStartUntil)),
                    timeRemaining = TIME_HELPERS.getTimeDifference(currentTime, durationInfo.end_time),
                    earthTimeRemaining = TIME_HELPERS.getEarthDurationfromEorzean(TIME_HELPERS.getDurationStringFromObject(timeRemaining)),
                    isActive = false;

                // crazy booleans!
                //current hour is greater than the active hour and less than or equal to end time hour
                var withinStartTime = currentTimeObj.hour > activeTimeObj.hour ||
                    currentTimeObj.hour === activeTimeObj.hour && currentTimeObj.minute >= activeTimeObj.minute,
                    withinEndTime = currentTimeObj.hour < durationInfo.end_time_obj.hour ||
                    currentTimeObj.hour === durationInfo.end_time_obj.hour && currentTimeObj.minute <= durationInfo.end_time_obj.minute;

                if (withinStartTime && withinEndTime) {
                    isActive = true;
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

    Entities.WatchedNodes = Backbone.Collection.extend({
        model: Node,
        type: 'watched',
        localStorage: new Backbone.LocalStorage('WatchedNodes'),
        comparator: function(model) {
            var weight = 100;

            if(model.get('active')) {
                weight -= 30;
            }

            if(model.get('earth_time_until').minutes < 5 && model.get('earth_time_until').hours === 0) {
                weight -= 20
            } else if (model.get('earth_time_until').minutes < 10 && model.get('earth_time_until').hours === 0) {
                weight -= 10;
            }

            return weight;
        }
    });


    Entities.NodeList = Backbone.Collection.extend({
        comparator: function(model) {
            var time = model.get('time_until');

            return (time.hours * 60) + time.minutes;
        }
    });

});