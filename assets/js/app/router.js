(function(App, Marionette, Backbone) {
    App.Router = Marionette.AppRouter.extend({
        routes: {
            '': 'index'
        },

        index: function() {
            App.commands.execute('show:home');
        }
    });


})(App, Marionette, Backbone);