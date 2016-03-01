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

        App.helpers = {
            getIconByType: function(type) {
                switch(type) {
                    case 'botany':
                        return '/img/btn_icon_lg.png';
                    case 'mining':
                        return '/img/min_icon_lg.png';
                    case 'fishing':
                        return ''; //'/img/fish_icon_lg.png'
                    default:
                        return '';
                }
            }
        }

        // page title time config
        var $title = $('#page-title'),
            titleContent = 'Eorzea Timers';

        App.masterClock = new App.Entities.Clock();
        App.collections = {
            botany: new App.Entities.BotanyNodes(),
            mining: new App.Entities.MiningNodes(),
            fishing: new App.Entities.FishingNodes(),
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

        App.vent.on('node:deselect:all', function() {
            var watchedColl = App.collections.watched.toJSON();

            // cannot search and destroy in same loop.
            _.each(_.clone(App.collections.watched.models), function(model) {
                model.destroy();
            });
            
            _.each(watchedColl, function(data) {
                var type = data.type,
                    listModel = App.collections[type].get(data.id);

                if(listModel) {
                    listModel.set({ selected: false });
                }
            });
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

        // MODALS
        App.vent.on('modal:open', function(options) {
            var modal = new App.Views.Modal(options);

            App.vent.trigger('modal:close');
            App.modalRegion.show(modal);
            modal.$el.modal();
            modal.on('hidden.bs.modal', _.bind(App.modalRegion.reset, this));
        });

        App.vent.on('modal:close', function() {
            if(App.modalRegion.hasView()) {
                App.modalRegion.currentView.$el.modal('hide');
            }
        });

        App.vent.on('customTimer:create', function() {
            App.vent.trigger('modal:open', {
                childView: App.Views.CustomTimer,
                title: 'New Custom Timer'
            });
        });

        App.vent.on('customTimer:edit', function(model) {
            App.vent.trigger('modal:open', {
                childView: App.Views.CustomTimer,
                title: 'New Custom Timer',
                model: model
            });
        });

        App.vent.on('alarm:popup', function(entities) {
            var collection, model;

            if(_.isArray(entities)) {
                collection = new Backbone.Collection(entities);
            } else {
                model = entities;
            }

            App.vent.trigger('modal:open', {
                childView: App.Views.Popup,
                model: model,
                collection: collection
            });
        });

        App.vent.on('alarm:desktop', function(model) {
            var notifier = new Notification(model.get('name'), {
                    renotify: true,
                    vibrate: 200,
                    icon: App.helpers.getIconByType(model.get('type')),
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