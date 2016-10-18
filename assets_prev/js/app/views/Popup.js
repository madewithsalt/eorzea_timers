App.module("Views", function(Views, App, Backbone, Marionette, $, _) {

    Views.Popup = Marionette.ItemView.extend({
        template: 'node-popup',
        className: function() {
            return 'node-block node-popup';
        },
        
        initialize: function() {
            this.timeout = window.setTimeout(_.bind(this.closePopup, this), 5000);
        },

        serializeData: function() {
            return {
                time: this.collection ? this.collection.first().get('time') : this.model.get('time'),
                nodeList: this.collection ? this.collection.toJSON() : null,
                node: this.model ? this.model.toJSON() : null
            }
        },

        onBeforeDestroy: function() {
            window.clearTimeout(this.timeout);
            this.timeout = null;
        },

        closePopup: function() {
            this.trigger('modal:close');
        }
    });

});