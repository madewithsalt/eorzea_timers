App.module("Views", function(Views, App, Backbone, Marionette, $, _) {

    Views.Popup = App.Views.NodeView.extend({
        template: 'node-popup',
        className: function() {
            return 'node-block node-popup' + App.Views.NodeView.prototype.className.apply(this, arguments);
        },
        
        initialize: function() {
            this.timeout = window.setTimeout(_.bind(this.closePopup, this), 5000);
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