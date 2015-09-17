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
            navRegion: '#nav-region'
        });

        // page title time config
        var $title = $('#page-title'),
            titleContent = 'Eorzea Timers';

        App.masterClock = new App.Entities.Clock();
        App.collections = {
            botany: new App.Entities.BotanyNodes(),
            mining: new App.Entities.MiningNodes()
        };

        App.masterClock.on('change', function() {
            $title.text(this.get('time') + ' ' + titleContent);
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
                        callback(err, coll);
                    }
                })
            }
        });

        async.parallel(tasks, function(err, results) {
            if(err) {
                return console.error('Something blew up.', err);
            }
            
            Backbone.history.start();
        });
    });

    return App;

})(Backbone, Marionette);