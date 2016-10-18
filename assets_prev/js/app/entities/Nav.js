App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){

	var NavItem = Backbone.Model.extend({

	});

	Entities.Nav = Backbone.Collection.extend({
		model: NavItem
	});


});