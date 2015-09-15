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