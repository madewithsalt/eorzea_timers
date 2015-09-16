App.module("Views", function(Views, App, Backbone, Marionette, $, _){

    Views.Clock = Marionette.ItemView.extend({
        template: 'clock',
        className: function() {
            var classes = [
                'clock'
            ];

            if(this.model.get('meridiem')) {
                classes.push(this.model.get('meridiem').toLowerCase());
            }

            return classes.join(' ');
        },

        modelEvents: {
            'change': 'render'
        }
    });


});