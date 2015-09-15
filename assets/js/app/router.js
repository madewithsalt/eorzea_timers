(function(App, Marionette, Backbone) {
	App.Router = Marionette.AppRouter.extend({
		routes: {
			'': 'index',
			'big-clock': 'showBigClock'
		},

		index: function() {
			console.log('go to index');
		},

		showBigClock: function() {
			console.log('Big clock please!');
		}


	});


})(App, Marionette, Backbone);