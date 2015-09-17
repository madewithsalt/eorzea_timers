App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {

    var Node = Backbone.Model.extend({
            initialize: function() {
                this.set('id', _.uniqueId('node-'));

                this.getTimeDiff();
                this.listenTo(App.masterClock, 'change', _.bind(this.getTimeDiff, this));
            },

            getDurationInfo: function() {
                if(!this.get('duration')) { return; }
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
                    earthTimeRemaining,
                    isActive = false;


                // crazy booleans!
                //current hour is greater than the active hour and less than or equal to end time hour
                var withinStartTime = currentTimeObj.hour > activeTimeObj.hour || 
                        currentTimeObj.hour === activeTimeObj.hour && currentTimeObj.minute >= activeTimeObj.minute,
                    withinEndTime = currentTimeObj.hour < durationInfo.end_time_obj.hour || 
                        currentTimeObj.hour === durationInfo.end_time_obj.hour && currentTimeObj.minute <= durationInfo.end_time_obj.minute;

                if (withinStartTime && withinEndTime) {
                    isActive = true;
                    var timeRemaining = TIME_HELPERS.getTimeDifference(currentTime, durationInfo.end_time);
                    earthTimeRemaining = TIME_HELPERS.getEarthDurationfromEorzean(TIME_HELPERS.getDurationStringFromObject(timeRemaining));
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

    Entities.BotanyNodes = NodeColl.extend({
        type: 'botany',
        url: '/data/botany.json'
    });

    Entities.MiningNodes = NodeColl.extend({
        type: 'mining',
        url: '/data/mining.json'
    });


});