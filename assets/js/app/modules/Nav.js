App.module("MainNav", function(Nav, App, Backbone, Marionette, $, _){

	Nav.BaseView = Marionette.LayoutView.extend({
		template: 'main-nav/main-nav',
		className: 'navbar navbar-default navbar-fixed-top',

		regions: {
			clock: '.clock-region',
			menu: '.menu-region'
		},
		onBeforeShow: function() {
			this.clock.show(new App.Views.Clock({
				model: this.model
			}));

            this.menu.show(new Nav.Menu());
		}
	});

    Nav.Menu = Marionette.ItemView.extend({
        template: 'main-nav/menu',

        menuItems: [
            {
                name: 'index',
                title: 'Home'
            },
            {
                name: 'watch-list',
                title: 'Watch List'
            },
            {
                name: 'about',
                title: 'About'
            }
        ],

        initialize: function() {
            var self = this;

            this.listenTo(App.collections.watched, 'add remove', this.render);

            this.listenTo(App.vent, 'nav:update', function(activeItem) {
                self.active = activeItem;
                self.render();
            });
        },

        serializeData: function() {
            var self = this,
                menu = _.map(this.menuItems, function(item) {
                if(item.name === 'watch-list') {
                    item.watchCount = App.collections.watched.length
                }

                if(self.active === item.name || item.name === 'index' && !self.active) {
                    item.isActive = true;
                } else {
                    item.isActive = false;
                }

                return item;
            });

            return {
                menuItems: menu
            }
        }
    })


    App.on('start', function() {
        App.navRegion.show(new Nav.BaseView({
        	model: new App.Entities.Clock()
        }));
    });


});