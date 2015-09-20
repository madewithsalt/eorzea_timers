App.module("About", function(About, App, Backbone, Marionette, $, _) {


    About.BaseView = Marionette.ItemView.extend({
        template: 'about'
    });

    App.on('before:start', function() {
        App.commands.setHandler('show:about', function() {
            App.mainRegion.show(new About.BaseView());
        });
    });
});