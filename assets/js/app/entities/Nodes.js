App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {

    var Node = Backbone.Model.extend({
            initialize: function() {
                this.set('id', _.uniqueId('node-'));

                App.masterClock.on('change', _.bind(this.getTimeDiff, this));
            },

            getTimeDiff: function() {
                var currentTime = App.masterClock.get('time');

                debugger;
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