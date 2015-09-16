App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){

	Entities.Clock = Backbone.Model.extend({

        initialize: function() {
            var self = this;

            this.timeout = window.setInterval(function() {
            	self.setTime();
            }, 1000);

            this.setTime();

            this.on('destroy', this.onDestroy);

        },

        setTime: function() {
	        var eorzeaTime = this.getEorzeaTime();
	        var result = moment.utc(eorzeaTime);

            this.set({ 
                'time': result.format('h:mm A'),
                'meridiem': result.format('A'),
                'hour': parseFloat(result.format('H')),
                'minute': parseFloat(result.format('m'))
            }, { trigger: true });
        },

        getEorzeaTime: function() {
            var eorzeaMultipler = (3600 / 175) * 1000;

            var universalTime = moment().unix(),
                eorzeaTime = universalTime * eorzeaMultipler;

            return eorzeaTime;
        },

        onDestroy: function() {
	        window.clearInterval(this.timeout);
            this.timeout = null;
        }


	});


});