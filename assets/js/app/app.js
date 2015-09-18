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