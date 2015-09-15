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
        this.radio = Backbone.Wreqr.radio.channel('app');

        Backbone.history.start();

        App.addRegions({
            mainRegion: '#main-region',
            navRegion: '#nav-region'
        });

        // page title time config
        var $title = $('#page-title'),
            clock = new App.Entities.Clock(),
            titleContent = 'Eorzea Timers';

        clock.on('change', function() {
            $title.text(clock.get('time') + ' ' + titleContent);
        });
    });

    return App;

})(Backbone, Marionette);
