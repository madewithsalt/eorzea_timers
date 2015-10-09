window.App = (function(Backbone, Marionette) {

    moment().utc();
    Swag.registerHelpers(window.Handlebars);


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
            errorsRegion: '#error-region',
            modalRegion: '#modal-region'
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

        soundManager.setup({
            url: '/swf/',
            onready: function() {
                App.sounds = new App.Entities.Sounds();
            }
        });

        App.userSettings = new App.Entities.Settings({ id: 'appUserSettings' });

        App.masterClock.on('change', function() {
            $title.text(this.get('time') + ' ' + titleContent);
        });

        App.vent.on('node:selected', function(model) {
            var data = model.toJSON(),
                watchedModel = App.collections.watched.add(data);

            watchedModel.save();
        });

        App.vent.on('node:deselected', function(model) {
            var data = model.toJSON(),
                type = data.type;

            App.collections[type].get(data.id).set({ selected: false });
            App.collections.watched.get(data.id).destroy();
        });

        App.vent.on('node:custom:delete', function(model) {
            var data = model.toJSON(),
                type = data.type,
                watched = App.collections.watched.get(data.id);

            if(watched) {
                watched.destroy();
            }

            App.collections.custom.get(data.id).destroy();
        });

        App.vent.on('node:custom:save', function(model) {
            var data = model.toJSON(),
                type = data.type,
                watched = App.collections.watched.get(data.id),
                custom = App.collections.custom.get(data.id);

            if(watched) {
                watched.save(data);
            }

            if(custom) {
                custom.save(data);
            } else {
                var customModel = App.collections.custom.add(model);
                customModel.save();
            }

            App.vent.trigger('node:custom:update');
        });

        App.vent.on('customTimer:create', function() {
            var modal = new App.Views.Modal({
                    childView: App.Views.CustomTimer,
                    title: 'New Custom Timer'
                });

            App.modalRegion.show(modal);
            modal.$el.modal();
            modal.on('hidden.bs.modal', _.bind(App.modalRegion.reset, this));
        });


        App.vent.on('customTimer:edit', function(model) {
            var modal = new App.Views.Modal({
                    childView: App.Views.CustomTimer,
                    title: 'New Custom Timer',
                    model: model
                });

            App.modalRegion.show(modal);
            modal.$el.modal();
            modal.on('hidden.bs.modal', _.bind(App.modalRegion.reset, App));
        });


        App.vent.on('alarm:popup', function(model) {
            var modal = new App.Views.Modal({
                    childView: App.Views.Popup,
                    model: model
                });

            App.modalRegion.show(modal);
            modal.$el.modal();
            modal.on('hidden.bs.modal', _.bind(App.modalRegion.reset, this));
        });

        App.vent.on('alarm:desktop', function(model) {
            var notifier = new Notification(model.get('name'), {
                    renotify: true,
                    vibrate: 200,
                    icon: model.get('type') === 'botany' ? '/img/btn_icon_lg.png' : '/img/min_icon_lg.png',
                    body: model.get('time')
                }),
                timeout = window.setTimeout(function() {
                    notifier.close();
                }, 5000);

                notifier.onclose = function() {
                    window.clearTimeout(timeout);
                    timeout = null;
                };

        });

        App.vent.on('alarm:alert', function(model) {
            var name = model.get('name'),
                time = model.get('time');

            window.alert(name + ' at ' + time);
        });

    });

    App.on('start', function(options) {
        App.version = options.version;

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
            'watch-list': 'watchList',
            'about': 'about'
        },

        index: function() {
            App.commands.execute('show:home');
            App.vent.trigger('nav:update', 'index');
        },

        watchList: function() {
            App.commands.execute('show:watchList');
            App.vent.trigger('nav:update', 'watch-list');
        },

        about: function() {
            App.commands.execute('show:about');
            App.vent.trigger('nav:update', 'about');
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
App.module("Views", function(Views, App, Backbone, Marionette, $, _) {

    var TimeSlot = Marionette.ItemView.extend({
        template: 'custom-timer/time-slot'
    });

    Views.CustomTimer = Marionette.ItemView.extend({
        template: 'custom-timer',
        className: 'custom-timer',

        ui: {
            form: 'form'
        },

        events: {
            'click .btn-save': 'triggerSave'
        },

        serializeData: function() {
            var data = this.model ? this.model.toJSON() : { times: [ '12:00 AM' ] },
                times = _.map(data.times, function(time, idx) {
                    var hour = time.split(' ')[0].split(':')[0],
                        min = time.split(' ')[0].split(':')[1],
                        meridien = time.split(' ')[1];


                    return {
                            idx: idx,
                            hour: hour,
                            min: min,
                            meridien: meridien
                        }
                });


            var duration = {};

            if(data.duration) {
                duration = {
                    hours: data.duration.split(' ')[0].split(':')[0],
                    minutes: data.duration.split(' ')[0].split(':')[1]
                };
            }
            
            return _.extend({}, data, {
                times: times,
                duration_obj: duration
            });
        },

        triggerSave: function(evt) {
            var isValid = this.ui.form.parsley().validate();

            if(isValid) {
                this.saveNode();
            }
        },

        processFormData: function() {
            var values = this.ui.form.serializeArray(),
                ignore = ['hour', 'min', 'mer', 'xpos', 'ypos', 'duration-hours', 'duration-min'],
                output = {
                    type: 'custom',
                    times: []
                };

            _.each(values, function(item) {
                if(_.indexOf(ignore, item.name) > -1) {
                    return;
                }

                output[item.name] = item.value;
            });

            var $times = this.$('.form-time');

            $times.each(function() {
                var $el = $(this),
                    hr = $el.find('input[name="hour"]').val(),
                    min = $el.find('input[name="min"]').val(),
                    mer = $el.find('select').val();

                output.times.push(hr + ':' + min + ' ' + mer);
            });

            // only supporting one time for now.
            output.time = output.times[0];

            var xPos = _.find(values, { name: 'xpos' }),
                yPos = _.find(values, { name: 'ypos' });

            if(xPos && yPos) {
                output.pos = 'x' + xPos.value + ',' + 'y' + yPos.value;
            }

            var durMin = _.find(values, { name: 'duration-min' }).value,
                durHour = _.find(values, { name: 'duration-hours' }).value;

            output.duration = durHour + ':' + durMin;

            return output;
        },

        saveNode: function() {
            var data = this.processFormData(),
                model = this.model ? this.model : new App.Entities.Node(data);

            model.set(data);
            App.vent.trigger('node:custom:save', model);            
            this.trigger('modal:close');
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
App.module("Views", function(Views, App, Backbone, Marionette, $, _) {

    Views.Modal = Marionette.LayoutView.extend({
        template: 'modal',
        className: 'modal fade',
        regions: {
            body: '.modal-body'
        },

        serializeData: function() {
            return {
                title: this.options.title,
                footerButtons: this.options.footerButtons
            }
        },

        onBeforeShow: function() {
            var self = this;

            if(this.options.childView) {
                var child = new this.options.childView({
                    model: this.model
                });

                this.body.show(child);

                this.listenTo(child, 'modal:close', function() {
                    self.$el.modal('hide');
                });
            }
        }
    });
});
App.module("Views", function(Views, App, Backbone, Marionette, $, _) {


    Views.NodeView = Marionette.ItemView.extend({
        template: 'node',

        events: {
            'click .btn-delete': 'deleteNode',
            'click .btn-edit': 'editNode'
        },

        attributes: function() {
            var data = this.model.toJSON();

            return {
                'data-id': data.id,
                'data-type': data.type,
                'is_collectable': data.is_collectable || null,
                'is_ephemeral': data.is_ephemeral
            }
        },

        serializeData: function() {
            return _.extend({
                isCustom: this.model.get('type') === 'custom',
                isActive: this.model.get('active'),
                classes: this.getContentClasses()
            }, this.model.toJSON());
        },

        getContentClasses: function() {
            var classes = [
                this.model.get('type')
            ];

            if (this.model.get('active')) {
                var earthRem = this.model.get('earth_time_remaining');

                classes.push('active');

                if (earthRem.minutes <= 1) {
                    classes.push('urgent');
                } else if (earthRem.minutes <= 6) {
                    classes.push('warning');
                }
            }

            if (this.model.get('selected')) {
                classes.push('selected');
            }

            if(this.model.get('triggeredAlarm')) {
                classes.push('alerted');
            }

            return classes.join(' ');
        },

        className: function() {
            var classes = [
                'node'
            ];

            // set by search criteria.
            if (this.model.get('hidden')) {
                classes.push('hidden');
            }

            return classes.join(' ');
        },

        initialize: function() {
            var self = this;

            this.listenTo(this.model, 'change', function() {
                if (this.model.get('active')) {
                    this.render();
                    this.trigger('change');
                }
            });

            this.$el.on('click', _.bind(this.toggleSelect, this));
        },

        toggleSelect: function() {
            var selected = this.model.get('selected') || false;

            this.model.set('selected', !selected);
            if (!selected) {
                App.vent.trigger('node:selected', this.model);
                this.$('.node-content').addClass('selected');
            } else {
                App.vent.trigger('node:deselected', this.model);
                this.$('.node-content').removeClass('selected');
            }
        },

        onBeforeDestroy: function() {
            this.$el.off();
        },

        deleteNode: function(evt) {
            evt.stopPropagation();
            App.vent.trigger('node:custom:delete', this.model);
        },

        editNode: function(evt) {
            evt.stopPropagation();
            App.vent.trigger('customTimer:edit', this.model);
        }
    });

});
App.module("Views", function(Views, App, Backbone, Marionette, $, _) {

    Views.Popup = App.Views.NodeView.extend({
        template: 'node-popup',
        className: function() {
            return 'node-block node-popup' + App.Views.NodeView.prototype.className.apply(this, arguments);
        },
        
        initialize: function() {
            this.timeout = window.setTimeout(_.bind(this.closePopup, this), 5000);
        },

        onBeforeDestroy: function() {
            window.clearTimeout(this.timeout);
            this.timeout = null;
        },

        closePopup: function() {
            this.trigger('modal:close');
        }
    });

});
App.module("Views", function(Views, App, Backbone, Marionette, $, _) {

    Views.Preferences = Marionette.LayoutView.extend({
        template: 'watch-list/preferences',
        className: 'preferences-form',

        events: {
            'change .sound-option-list': 'selectSound',
            'click .sound-preview': 'toggleSound',
            'click .btn-save': 'triggerSave'
        },

        ui: {
            soundSelect: '.sound-option-list',
            soundPreview: '.sound-preview',
            form: 'form'
        },

        serializeData: function() {
            var data = this.model.toJSON();

            return _.extend({
                desktop: Modernizr.notification,
                soundList: App.sounds.toJSON()
            }, data);
        },

        selectSound: function(evt) {
            var val = this.ui.soundSelect.val();

            if(val !== 'none') {
                this.ui.soundPreview.show().removeClass('hidden');
            } else {
                this.ui.soundPreview.hide();
            }
        },

        toggleSound: function() {
            var val = this.ui.soundSelect.val(),
                sound = App.sounds.get(val);

            if(!sound) { return; }

            if(!this.playing) {
                sound.play(_.bind(this.toggleSound, this));
                this.playing = true;
                this.ui.soundPreview.addClass('playing');
            } else {
                sound.stop();
                this.playing = false;
                this.ui.soundPreview.removeClass('playing');
            }
        },

        triggerSave: function() {
            var isValid = this.ui.form.parsley().validate(),
                data = this.processFormData();

            if(isValid) {
                this.model.save(data);
                this.trigger('modal:close');
            }
        },

        processFormData: function() {
            var values = this.ui.form.serializeArray(),
                data = {},
                output = {};

            _.each(values, function(item) {
                data[item.name] = item.value;
            });

            if(!_.isEmpty(data['alarm-time'])) {
                output.time = data['alarm-time'];
            }

            output.sound = data['alarm-sound'] !== 'none' ? data['alarm-sound'] : false;
            output.type = data['alarm-style'];

            if(output.type === 'desktop' && Modernizr.notification && Notification.permission !== 'granted') {
                Notification.requestPermission();
            }

            return {
                alarm: output
            };
        }

    });


});
App.module("About", function(About, App, Backbone, Marionette, $, _) {


    About.BaseView = Marionette.ItemView.extend({
        template: 'about',

        serializeData: function() {
            return {
                version: App.version
            };
        }
    });

    App.on('before:start', function() {
        App.commands.setHandler('show:about', function() {
            App.mainRegion.show(new About.BaseView());
        });
    });
});
App.module("Home", function(Home, App, Backbone, Marionette, $, _) {

    Home.JumboTronView = Marionette.LayoutView.extend({
        template: 'home/jumbotron',
        className: function() {
            var classes = [
                'jumbotron'
            ];

            if (App.userSettings.get('homeClockCollapsed')) {
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

            if (collapsed) {
                this.$el.removeClass('closed');
            } else {
                this.$el.addClass('closed');
            }

            this.collapsed = !collapsed;
            App.userSettings.save('homeClockCollapsed', !collapsed);
        }
    });


    Home.NodeView = App.Views.NodeView.extend({
        className: function() {
            return 'node-slim ' + App.Views.NodeView.prototype.className.apply(this, arguments);
        }
        
    });

    Home.NodeList = Marionette.CollectionView.extend({
        childView: Home.NodeView
    });

    Home.BaseView = Marionette.LayoutView.extend({
        template: 'home/home',
        className: 'home',

        events: {
            'keyup .node-search-input': 'triggerSearch',
            'click .filter-menu .btn': 'triggerFilter',
            'click .attr-menu .btn': 'triggerAttrFilter',
            'click .new-timer-btn': 'triggerNewTimer'
        },

        ui: {
            search: '.node-search-input',
            filterItem: '.filter-menu .btn',
            attrItem: '.attr-menu .btn'
        },

        regions: {
            'jumbotron': '.jumbotron-region',
            'activeNodes': '.active-nodes-region',
            'nextHourNodes': '.next-hour-nodes-region',
            'twoHourNodes': '.two-hour-nodes-region',
            'otherNodes': '.other-nodes-region',
            'newTimerModal': '.new-timer-modal-region'
        },

        serializeData: function() {
            var settings = App.userSettings.toJSON();
            
            return {
                filteringBy: settings.filteringBy || 'all',
                attrFilters: settings.attrFilters || []
            };
        },

        initialize: function() {
            var self = this;

            this._currentHour = App.masterClock.get('hour');

            this.configureSearchList();
            this.sortCollections();

            this.listenTo(App.collections.custom, 'add remove', function() {
                self.configureSearchList();
                self.sortAndShowLists();
            });

            this.listenTo(App.vent, 'node:custom:update', function() {
                self.configureSearchList();
                self.sortAndShowLists();
            });

            // only update lists every hour for performance
            // let individual views (when active) handle countdowns.
            this.listenTo(App.masterClock, 'change', function() {
                // be sure to check for race-conditioned nodes that missed the last hour rollover
                if (self._currentHour !== App.masterClock.get('hour') || self.collections.active.where({
                    active: false
                }).length) {
                    self._currentHour = App.masterClock.get('hour');
                    self.sortAndShowLists();
                }
            });

            this.fuse = new Fuse(this.searchCollections, {
                keys: ['name', 'location'],
                threshold: 0.3,
                id: 'id'
            });

            this.filteringBy = App.userSettings.get('filteringBy') || 'all';
            this.attrFilters = App.userSettings.get('attrFilters') || [];

            this.listenTo(App.vent, 'node:create', function() {
                self.sortAndShowLists();
            });
        },

        sortAndShowLists: function() {
            this.sortCollections();
            this.showLists();
        },

        configureSearchList: function() {
            var collections = [
                    App.collections.botany,
                    App.collections.mining,
                    App.collections.custom
                ],
                // create a flattened json list of all nodes for search purposes.
                searchCollections = _.map(App.collections, function(coll) {
                    return coll.toJSON();
                });

            this.searchCollections = _.flatten(searchCollections);

        },

        triggerSearch: function() {
            var val = this.ui.search.val(),
                result;

            if(val.length <= 2) {
                this.clearSearch();
                return;
            }

            result = this.fuse.search(val);

            this.searchList = result;

            this.hideExcludedSearch();
        },

        clearSearch: function() {
            this.searchList = [];
            this.showFilteredNodes();
        },

        hideExcludedSearch: function() {
            var self = this,
                results = this.searchList;

            if(!results || !results.length) { return; }

            this.$('.node').hide();

            _.each(results, function(id) {
                var target = '.node[data-id="' + id + '"]',
                    filter = '[data-type="' + self.filteringBy + '"]',
                    $el;

                if(self.attrFilters.length) {
                    _.each(self.attrFilters, function(attr) {
                        $el = self.$(target).filter('[' + attr + ']');
                    });
                }

                if(self.filteringBy !== 'all') {
                    if($el) {
                        $el = $el.filter(filter);
                    } else {
                        $el = self.$(target).filter(filter)
                    }
                } else if(!$el || $el.length) {
                    $el = self.$(target);
                }

                $el.show();

            });
        },

        triggerFilter: function(evt) {
            var $el = $(evt.currentTarget),
                target = $el.data('target');

            this.ui.filterItem.removeClass('active');
            $el.addClass('active');
            
            this.filteringBy = target;
            App.userSettings.save('filteringBy', target);
            
            this.showFilteredNodes();
        },

        triggerAttrFilter: function(evt) {
            var self = this,
                $el = $(evt.currentTarget),
                target = $el.data('target');

            this.attrFilters = [];
            $el.toggleClass('active');

            this.ui.attrItem.each(function() {
                if($(this).hasClass('active')) {
                    self.attrFilters.push($(this).data('target'));
                }
            });

            App.userSettings.save('attrFilters', this.attrFilters);

            this.showFilteredNodes();
        }, 

        showFilteredNodes: function() {
            var self = this;

            this.$('.node').show();

            if(this.filteringBy !== 'all') {
                this.$('.node').not('[data-type="' + this.filteringBy + '"]').hide();
            }

            _.each(this.attrFilters, function(filter) {
                self.$('.node').not('[' + filter + ']').hide();
            });


            this.hideExcludedSearch();
        },

        triggerNewTimer: function() {
            App.vent.trigger('customTimer:create');
        },

        sortCollections: function() {
            var self = this,
                data = [],
                active = [],
                oneHour = [],
                twoHour = [],
                theRest = [],
                searchList = this.searchList || [],
                filteringBy = this.filteringBy,
                watchedNodes = App.collections.watched,
                collections = [
                    App.collections.botany,
                    App.collections.mining,
                    App.collections.custom
                ];

            this.collections = {
                active: new App.Entities.NodeList(),
                one_hour: new App.Entities.NodeList(),
                two_hour: new App.Entities.NodeList(),
                the_rest: new App.Entities.NodeList()
            };

            _.each(collections, function(coll) {
                coll.each(function(model) {
                    var item = model.toJSON(),
                        isWatched = watchedNodes.get(item.id);

                    if(isWatched) {
                        model.set('selected', true);
                    }

                    if(searchList.length) {
                        var excluded = _.indexOf(searchList, item.id) === -1;

                        if(excluded) { 
                            model.set('hidden', true); 
                        } else if(item.type === filteringBy || filteringBy === 'all' ) {
                            model.set('hidden', false);
                        }
                    }

                    if (item.active) {
                        return active.push(model);
                    }

                    var timeUntil = item.time_until,
                        hours = timeUntil.hours,
                        minutes = timeUntil.minutes;

                    if (hours === 0 && minutes > 0) {
                        return oneHour.push(model);
                    }

                    if (hours === 1 && minutes > 0) {
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

            // trigger filtering settings
            this.showFilteredNodes();
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

        events: {
            'click .css-toggle': 'toggleStyle'
        },

        serializeData: function() {
            return {
                version: App.version,
                colorScheme: App.userSettings.get('colorScheme') || 'light'
            };
        },

		onBeforeShow: function() {
			this.clock.show(new App.Views.Clock({
				model: this.model
			}));

            this.menu.show(new Nav.Menu());
            this.toggleStyle();
		},

        toggleStyle: function(evt) {
            var target;

            if(evt) {
                target = $(evt.currentTarget).data('target');
                $('.css-toggle').removeClass('active');
    
            } else {
                target = App.userSettings.get('colorScheme') || 'light';
            }

            if(target === 'dark') {
                $('head').append('<link id="dark" rel="stylesheet" type="text/css" href="css/dark.css" >');
                $('head').find('#light').remove();
                $('.css-toggle.light').addClass('active');
            } else {
                $('head').append('<link id="light" rel="stylesheet" type="text/css" href="css/main.css" >');
                $('head').find('#dark').remove();
                $('.css-toggle.dark').addClass('active');
            }

            App.userSettings.save('colorScheme', target);
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
        className: 'watch-list',

        regions: {
            list: '.watched-nodes-region',
            modal: '.modal-region'
        },

        events: {
            'click .watch-settings-link': 'showSettings',
            'click .clear-list': 'clearList'
        },

        initialize: function() {
            var self = this;

            this.collection = App.collections.watched;

            this._currentHour = App.masterClock.get('hour');

            // only update lists every hour for performance
            // let individual views (when active) handle countdowns.
            this.listenTo(App.masterClock, 'change', function() {
                // be sure to check for race-conditioned nodes that missed the last hour rollover
                if (self._currentHour !== App.masterClock.get('hour')) {
                    self._currentHour = App.masterClock.get('hour');
                    self.collection.sort();
                }
            });
        },

        onBeforeShow: function() {
            this.showList();
        },

        showList: function() {
            this.list.show(new WatchList.NodeList({
                collection: this.collection
            }));
        },

        showSettings: function() {
            var modal = new App.Views.Modal({
                    childView: App.Views.Preferences,
                    title: 'Watch List Preferences',
                    model: App.userSettings
                });

            this.modal.show(modal);
            modal.$el.modal();
            modal.on('hidden.bs.modal', _.bind(this.modal.reset, this));            
        },

        clearList: function() {
            this.collection.reset();
        }
    });

    WatchList.NodeView = App.Views.NodeView.extend({
        template: 'watch-list/node',

        className: function() {
            return 'node-block col-md-3 col-sm-6 col-xs-12 ' + App.Views.NodeView.prototype.className.apply(this, arguments);
        },

        modelEvents: {
            'change': 'render'
        },

        serializeData: function() {
            return _.extend({
                isCustom: this.model.get('type') === 'custom',
                isActive: this.model.get('active'),
                untilHours: this.model.get('earth_time_until').hours > 0,
                classes: this.getContentClasses()
            }, this.model.toJSON());
        }
    });

    WatchList.NodeList = Marionette.CollectionView.extend({
        className: 'watched-node-list',
        childView: WatchList.NodeView,

        initialize: function() {
            var self = this;

            this.collection.sort();
            this.listenTo(App.masterClock, 'change', function() {
                self.collection.sort();
            });
        }
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

            if(!alarm || model.get('active') || !model.get('selected')) { return; }

            var time = parseFloat(alarm.time || 0);

            if(model.get('time_until').hours < time && !model.get('triggeredAlarm')) {
                this.triggerAlarm(model);
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
App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){

    Entities.Settings = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('UserSettings'),
        
        defaults: {
            homeClockCollapsed: false
        }
    });

});
App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
    var sounds = [
            {
                name: 'Chime',
                id: 'chime'
            },{
                name: 'Big Ben',
                id: 'chime_big_ben',
                nTo: 400
            },{
                name: 'Chime Up',
                id: 'chime_up'
            },{
                name: 'Cuckoo Clock',
                id: 'cuckoo'
            },{
                name: 'Doorbell',
                id: 'doorbell'
            },{
                name: 'Floop',
                id: 'floop'
            },{
                name: 'Gong',
                id: 'gong'
            }
        ];


    Entities.Sound = Backbone.Model.extend({
        initialize: function() { 
            this.createSound();      
        },

        createSound: function(callback) {
            var id = this.get('id'),
                url = this.url();

            if(!id && !url) { return; }

            soundManager.createSound({
                id: id,
                url: url + '.wav',
                autoLoad: true,
                nTo: this.get('nTo') || null,
                autoPlay: false,
                onload: function(success) {
                    if(_.isFunction(callback)) {
                        callback(success);
                    }
                },
                volume: 50
            });
        },

        play: function(callback) {
            soundManager.play(this.get('id'), {
                onfinish: function() {
                    if(_.isFunction(callback)) {
                        callback();
                    }
                }
            });
        },

        stop: function() {
            soundManager.stop(this.get('id'));
        }
    });

    Entities.Sounds = Backbone.Collection.extend({
        url: '/sound/',
        model: Entities.Sound,
        initialize: function() {
            this.add(sounds);
        }
    });

});