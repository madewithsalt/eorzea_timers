(function(App, Marionette, Backbone) {
    App.Router = Marionette.AppRouter.extend({
        routes: {
            '': 'index',
            'index': 'index',
            'watch-list': 'watchList'
        },

        index: function() {
            App.commands.execute('show:home');
            App.vent.trigger('nav:update', 'index');
        },

        watchList: function() {
            App.commands.execute('show:watchList');
            App.vent.trigger('nav:update', 'watch-list');
        }

    });


})(App, Marionette, Backbone);