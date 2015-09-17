App.module("Home", function(Home, App, Backbone, Marionette, $, _){

    Home.JumboTronView = Marionette.LayoutView.extend({
        template: 'home/jumbotron',
        className: 'jumbotron',

        regions: {
            'clock': '.clock-region'
        },

        events: {
            'click .toggle-link': 'triggerToggle' 
        },

        serializeData: function() {
            return {
                collapsed: this.collapsed || false 
            };
        },

        onBeforeShow: function() {
            this.clock.show(new App.Views.Clock({
                tagName: 'h1',
                model: App.masterClock
            }));
        },

        triggerToggle: function() {
            this.$el.toggleClass('closed');
        }
    });


    Home.NodeView = Marionette.ItemView.extend({
        template: 'home/node',
        className: 'node node-slim'
    });

    Home.NodeList = Marionette.CollectionView.extend({
        childView: Home.NodeView
    });

	Home.BaseView = Marionette.LayoutView.extend({
		template: 'home/home',
		className: 'home',

        regions: {
            'jumbotron': '.jumbotron-region',
            'activeNodes': '.active-nodes-region',
            'nextHourNodes': '.next-hour-nodes-region',
            'twoHourNodes': '.two-hour-nodes-region'
        },

        initialize: function() {
            this.collections = {
                botany: new App.Entities.BotanyNodes(),
                mining: new App.Entities.MiningNodes()
            };
        },

        onBeforeShow: function() {
            var self = this,
                tasks = _.map(this.collections, function(coll, name) {
                    return function(callback) {
                        coll.fetch({
                            success: function() {
                                callback(null, coll);
                            },
                            error: function(xhr, status, err) {
                                callback(err, coll);
                            }
                        })
                    }
                });

            // jumbotron master clock
            this.jumbotron.show(new Home.JumboTronView());

            // kick off by syncing all the available lists
            async.parallel(tasks, function(err, results) {
                if(err) {
                    return console.error('Something blew up: ', err);
                }

                self.showLists();
            });
        },

        showLists: function() {
            var active, next, twoHour,
                testList = new Home.NodeList({
                    collection: this.collections.mining
                });

            this.activeNodes.show(testList);
        }
	});




	App.on('before:start', function() {
		App.commands.setHandler('show:home', function() {
			App.mainRegion.show(new Home.BaseView());
		});
	});

});