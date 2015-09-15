App.module("Views", function(Views, App, Backbone, Marionette, $, _){

    Views.Clock = Marionette.ItemView.extend({
        template: 'clock',
        className: 'clock',

        modelEvents: {
            'change': 'render'
        }
    });


});