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
App.module("Views", function(Views, App, Backbone, Marionette, $, _){

    Views.Clock = Marionette.ItemView.extend({
        template: 'clock',
        className: 'clock',
        timeout: null,

        data: {},

        serializeData: function() {
            return this.data;
        },

        getEorzeaTime: function() {
            var eorzeaMultipler = (3600 / 175) * 1000;

            var universalTime = moment().unix(),
                eorzeaTime = universalTime * eorzeaMultipler;

            return eorzeaTime;
        },

        onShow: function() {
            var self = this;

            this.timeout = window.setInterval(function() {
                var eorzeaTime = self.getEorzeaTime();
                var result = moment.utc(eorzeaTime).format('h:mm A');

                self.data.time = result;
                self.render();
            }, 1000);
        },

        onBeforeDestroy: function() {
            window.clearInterval(this.timeout);
            this.timeout = null;
        }
    });


});
App.module("MainNav", function(Nav, App, Backbone, Marionette, $, _){

	Nav.BaseView = Marionette.LayoutView.extend({
		template: 'main-nav',
		className: 'navbar navbar-default',

		regions: {
			clock: '.clock-region',
			menu: '.menu-region'
		},

		onBeforeShow: function() {
			this.clock.show(new App.Views.Clock());
		}
	});


    App.on('start', function() {
        App.navRegion.show(new Nav.BaseView());
    });


});
$(function() {

    App.start();

});