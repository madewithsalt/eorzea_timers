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