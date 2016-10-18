App.module("Views", function(Views, App, Backbone, Marionette, $, _){

    Views.EmbedCode = Marionette.ItemView.extend({
        template: 'embedcode',

        serializeData: function() {
        }
    });

});