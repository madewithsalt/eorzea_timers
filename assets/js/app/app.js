window.App = (function(Backbone, Marionette) {

    var App;
	
	moment().utc();

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

    App = new Marionette.Application();

    App.on('before:start', function() {
        App.addRegions({
            mainRegion: '#main-region',
            navRegion: '#nav-region'
        });
    });

    return App;

})(Backbone, Marionette);