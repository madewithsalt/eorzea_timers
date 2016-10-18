App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){

    Entities.Settings = Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage('UserSettings'),
        
        defaults: {
            homeClockCollapsed: false
        }
    });

});