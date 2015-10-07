App.module("MainNav", function(Nav, App, Backbone, Marionette, $, _){

	Nav.BaseView = Marionette.LayoutView.extend({
		template: 'main-nav/main-nav',
		className: 'navbar navbar-default navbar-fixed-top',

		regions: {
			clock: '.clock-region',
			menu: '.menu-region'
		},

        events: {
            'click .css-toggle': 'toggleStyle'
        },

        serializeData: function() {
            return {
                version: App.version,
                colorScheme: App.userSettings.get('colorScheme') || 'light'
            };
        },

		onBeforeShow: function() {
			this.clock.show(new App.Views.Clock({
				model: this.model
			}));

            this.menu.show(new Nav.Menu());
            this.toggleStyle();
		},

        toggleStyle: function(evt) {
            var target;

            if(evt) {
                target = $(evt.currentTarget).data('target');
                $('.css-toggle').removeClass('active');
    
            } else {
                target = App.userSettings.get('colorScheme') || 'light';
            }

            if(target === 'dark') {
                $('head').append('<link id="dark" rel="stylesheet" type="text/css" href="css/dark.css" >');
                $('.css-toggle.light').addClass('active');
            } else {
                $('head').find('#dark').remove();
                $('.css-toggle.dark').addClass('active');
            }

            App.userSettings.save('colorScheme', target);
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