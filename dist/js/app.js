window.App = (function(Backbone, Marionette) {

    moment().utc();

    var Router,
        App = new Marionette.Application();

    // basic config for the renderer, 
    // which uses Handlebars precompiled templates.
    _.extend(Marionette.Renderer, {
        path: 'templates/',
        render: function(template, data) {
            var path = this.getTemplate(template);

            if (!path) {
                $.error('Template ' + template + ' not found!');
                return;
            }

            return path(data);
        },

        getTemplate: function(template) {
            return Handlebars.templates[template + '.hbs'];
        }
    });

    App.on('before:start', function() {
        this.router = new App.Router();

        App.addRegions({
            mainRegion: '#main-region',
            navRegion: '#nav-region',
            errorsRegion: '#error-region'
        });

        // page title time config
        var $title = $('#page-title'),
            titleContent = 'Eorzea Timers';

        App.masterClock = new App.Entities.Clock();
        App.collections = {
            botany: new App.Entities.BotanyNodes(),
            mining: new App.Entities.MiningNodes(),
            custom: new App.Entities.CustomNodes(),
            watched: new App.Entities.WatchedNodes()
        };

        App.userSettings = new App.Entities.Settings({ id: 'appUserSettings' });

        App.masterClock.on('change', function() {
            $title.text(this.get('time') + ' ' + titleContent);
        });

        App.vent.on('node:selected', function(model) {
            var data = model.toJSON();
            App.collections.watched.add(data);
            App.collections.watched.get(data.id).save();
        });

        App.vent.on('node:deselected', function(model) {
            var data = model.toJSON();
            App.collections.watched.get(data.id).destroy();
        });

    });

    App.on('start', function() {
        var tasks = _.map(this.collections, function(coll, name) {
            return function(callback) {
                coll.fetch({
                    success: function() {
                        callback(null, coll);
                    },
                    error: function(xhr, status, err) {
                        callback(coll.type + ' ' + err, coll);
                        return console.error('Something blew up.', arguments);
                    }
                })
            }
        });

        tasks.push(function(callback) {
            App.userSettings.fetch({
                success: function(model) {
                    callback(null, model);
                },
                error: function(xhr, status, err) {
                    // do not act on an error for settings, as once created it will work fine.
                    callback(null, App.userSettings);
                    return console.error('Settings: ', arguments);
                }
            })
        });

        async.parallel(tasks, function(err, results) {
            if (err) {
                App.errorsRegion.show(new App.Views.Error({
                    message: err
                }));
            }

            App.errorsRegion.reset();

            Backbone.history.start();
        });
    });

    return App;

})(Backbone, Marionette);
(function(App, Marionette, Backbone) {
    App.Router = Marionette.AppRouter.extend({
        routes: {
            '': 'index',
            'index': 'index',
            'watch-list': 'watchList'
        },

        index: function() {
            App.commands.execute('show:home');
            App.vent.trigger('nav:update', 'index');
        },

        watchList: function() {
            App.commands.execute('show:watchList');
            App.vent.trigger('nav:update', 'watch-list');
        }

    });


})(App, Marionette, Backbone);
App.module("Views", function(Views, App, Backbone, Marionette, $, _){

    Views.Clock = Marionette.ItemView.extend({
        template: 'clock',
        className: function() {
            var classes = [
                'clock'
            ];

            if(this.model.get('meridiem')) {
                classes.push(this.model.get('meridiem').toLowerCase());
            }

            return classes.join(' ');
        },

        modelEvents: {
            'change': 'render'
        }
    });


});
App.module("Views", function(Views, App, Backbone, Marionette, $, _){

    Views.Error = Marionette.ItemView.extend({
        template: 'error',
        className: 'alert alert-danger',
        serializeData: function() {
            return {
                message: this.options.message
            }
        }
    });

});
App.module("Home", function(Home, App, Backbone, Marionette, $, _){

    Home.JumboTronView = Marionette.LayoutView.extend({
        template: 'home/jumbotron',
        className: function() {
            var classes = [
                'jumbotron'
            ];

            if(App.userSettings.get('homeClockCollapsed')) {
                classes.push('closed');
            }

            return classes.join(' ');
        },

        regions: {
            'clock': '.clock-region'
        },

        events: {
            'click .toggle-link': 'triggerToggle' 
        },

        initialize: function() {
            this.collapsed = App.userSettings.get('homeClockCollapsed') || false;
        },

        serializeData: function() {
            return {
                collapsed: this.collapsed
            };
        },

        onBeforeShow: function() {
            this.clock.show(new App.Views.Clock({
                tagName: 'h1',
                model: App.masterClock
            }));
        },

        triggerToggle: function() {
            var collapsed = this.collapsed;

            if(collapsed) {
                this.$el.removeClass('closed');
            } else {
                this.$el.addClass('closed');
            }

            this.collapsed = !collapsed;
            App.userSettings.save('homeClockCollapsed', !collapsed);
        }
    });


    Home.NodeView = Marionette.ItemView.extend({
        template: 'home/node',

        attributes: function() {
            return {
                'data-id': this.model.get('id')
            }
        },

        className: function() {
            var classes = [
                'node', 'node-slim'
            ];

            if(this.model.get('active')) {
                var earthRem = this.model.get('earth_time_remaining');
                
                if(earthRem.minutes <= 1) {
                    classes.push('urgent');
                } else if(earthRem.minutes <= 6) {
                    classes.push('warning');
                }
            }

            if(this.model.get('selected')) {
                classes.push('selected');
            }

            return classes.join(' ');
        },

        initialize: function() {
            var self = this;

            this.listenTo(this.model, 'change', function() {
                if(this.model.get('active')) {
                    this.render();
                }
            });

            this.$el.on('click', _.bind(this.toggleSelect, this));
        },

        toggleSelect: function() {
            var selected = this.model.get('selected') || false;

            this.model.set('selected', !selected);
            this.$el.toggleClass('selected');
            if(!selected) {
                App.vent.trigger('node:selected', this.model);
            } else {
                App.vent.trigger('node:deselected', this.model);
            }
        },

        onBeforeDestroy: function() {
            this.$el.off();
        }
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
            'twoHourNodes': '.two-hour-nodes-region',
            'otherNodes': '.other-nodes-region'
        },

        initialize: function() {
            var self = this;

            this._currentHour = App.masterClock.get('hour');

            this.sortCollections();

            // only update lists every hour for performance
            // let individual views (when active) handle countdowns.
            this.listenTo(App.masterClock, 'change', function() {
                // be sure to check for race-conditioned nodes that missed the last hour rollover
                if(self._currentHour !== App.masterClock.get('hour') || self.collections.active.where({ active: false }).length ) {
                    self._currentHour = App.masterClock.get('hour');
                    self.sortCollections();
                    self.showLists();
                }
            });

        },

        sortCollections: function() {
            var self = this,
                data = [],
                active = [], oneHour = [], twoHour = [], theRest = [],
                watchedNodes = App.collections.watched,
                collections = [
                    App.collections.botany,
                    App.collections.mining,
                    App.collections.custom
                ];

            this.collections = {
                active: new Backbone.Collection(),
                one_hour: new Backbone.Collection(),
                two_hour: new Backbone.Collection(),
                the_rest: new Backbone.Collection()
            };
            
            _.each(collections, function(coll) {
                coll.each(function(model) {
                    var item = model.toJSON(),
                        isWatched = watchedNodes.get(item.id);

                    if(isWatched) {
                        model.set('selected', true);
                    }

                    if(item.active) {
                        return active.push(model);
                    }

                    var timeUntil = item.time_until,
                        hours = timeUntil.hours,
                        minutes = timeUntil.minutes;

                    if(hours === 0 && minutes > 0 || hours === 1) {
                        return oneHour.push(model);
                    }

                    if(hours === 1 && minutes > 0 || hours === 2) {
                        return twoHour.push(model);
                    }

                    return theRest.push(model);

                });

            });

            self.collections.active.add(active);
            self.collections.one_hour.add(oneHour);
            self.collections.two_hour.add(twoHour);
            self.collections.the_rest.add(theRest);
        },

        onBeforeShow: function() {
            var self = this;                

            // jumbotron master clock
            this.jumbotron.show(new Home.JumboTronView());
            this.showLists();
        },

        showLists: function() {
            this.activeNodes.show(new Home.NodeList({
                collection: this.collections.active
            }));

            this.nextHourNodes.show(new Home.NodeList({
                collection: this.collections.one_hour
            }));

            this.twoHourNodes.show(new Home.NodeList({
                collection: this.collections.two_hour
            }));

            this.otherNodes.show(new Home.NodeList({
                collection: this.collections.the_rest
            }));
        }
    });

    App.on('before:start', function() {
        App.commands.setHandler('show:home', function() {
            App.mainRegion.show(new Home.BaseView());
        });
    });

});
App.module("MainNav", function(Nav, App, Backbone, Marionette, $, _){

	Nav.BaseView = Marionette.LayoutView.extend({
		template: 'main-nav/main-nav',
		className: 'navbar navbar-default navbar-fixed-top',

		regions: {
			clock: '.clock-region',
			menu: '.menu-region'
		},
		onBeforeShow: function() {
			this.clock.show(new App.Views.Clock({
				model: this.model
			}));

            this.menu.show(new Nav.Menu());
		}
	});

    Nav.Menu = Marionette.ItemView.extend({
        template: 'main-nav/menu',

        menuItems: [
            {
                name: 'index',
                title: 'Home'
            },
            {
                name: 'watch-list',
                title: 'Watch List'
            },
            {
                name: 'about',
                title: 'About'
            }
        ],

        initialize: function() {
            var self = this;

            this.listenTo(App.collections.watched, 'add remove', this.render);

            this.listenTo(App.vent, 'nav:update', function(activeItem) {
                self.active = activeItem;
                self.render();
            });
        },

        serializeData: function() {
            var self = this,
                menu = _.map(this.menuItems, function(item) {
                if(item.name === 'watch-list') {
                    item.watchCount = App.collections.watched.length
                }

                if(self.active === item.name || item.name === 'index' && !self.active) {
                    item.isActive = true;
                } else {
                    item.isActive = false;
                }

                return item;
            });

            return {
                menuItems: menu
            }
        }
    })


    App.on('start', function() {
        App.navRegion.show(new Nav.BaseView({
        	model: new App.Entities.Clock()
        }));
    });


});
App.module("WatchList", function(WatchList, App, Backbone, Marionette, $, _){

    WatchList.BaseView = Marionette.LayoutView.extend({
        template: 'watch-list/base',
        className: 'watch-list'
    });

    App.on('before:start', function() {
        App.commands.setHandler('show:watchList', function() {
            App.mainRegion.show(new WatchList.BaseView());
        });
    });

});


App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){

	Entities.Clock = Backbone.Model.extend({

        initialize: function() {
            var self = this;

            this.timeout = window.setInterval(function() {
            	self.setTime();
            }, 1000);

            this.setTime();

            this.on('destroy', this.onDestroy);

        },

        setTime: function() {
	        var eorzeaTime = this.getEorzeaTime();
	        var result = moment.utc(eorzeaTime);

            this.set({ 
                'time': result.format('h:mm A'),
                'meridiem': result.format('A'),
                'hour': parseFloat(result.format('H')),
                'minute': parseFloat(result.format('m'))
            }, { trigger: true });
        },

        getEorzeaTime: function() {
            var eorzeaMultipler = (3600 / 175) * 1000;

            var universalTime = moment().unix(),
                eorzeaTime = universalTime * eorzeaMultipler;

            return eorzeaTime;
        },

        onDestroy: function() {
	        window.clearInterval(this.timeout);
            this.timeout = null;
        }


	});


});
App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){

	var NavItem = Backbone.Model.extend({

	});

	Entities.Nav = Backbone.Collection.extend({
		model: NavItem
	});


});
App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {

    var Node = Backbone.Model.extend({
            initialize: function() {
                this.getTimeDiff();

                var id = _.map([this.get('name'), this.get('time'), this.get('location')], function(item) {
                            return item.split(' ').join('-').toLowerCase();
                        }).join('-');

                this.set('id', id);

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

    Entities.CustomNodes = Backbone.Collection.extend({
        model: Node,
        type: 'custom',
        localStorage: new Backbone.LocalStorage('CustomNodes')
    });

    Entities.WatchedNodes = Backbone.Collection.extend({
        model: Node,
        type: 'watched',
        localStorage: new Backbone.LocalStorage('WatchedNodes')
    });

});
App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){

    Entities.Settings = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('UserSettings'),
        
        defaults: {
            homeClockCollapsed: false
        }
    });

});