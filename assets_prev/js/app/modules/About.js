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