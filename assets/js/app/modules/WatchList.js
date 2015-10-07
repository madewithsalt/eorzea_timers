App.module("WatchList", function(WatchList, App, Backbone, Marionette, $, _){

    WatchList.BaseView = Marionette.LayoutView.extend({
        template: 'watch-list/base',
        className: 'watch-list',

        regions: {
            list: '.watched-nodes-region',
            modal: '.modal-region'
        },

        events: {
            'click .watch-settings-link': 'showSettings'
        },

        initialize: function() {
            this.collection = App.collections.watched;
        },

        onBeforeShow: function() {
            this.showList();
        },

        showList: function() {
            this.list.show(new WatchList.NodeList({
                collection: this.collection
            }));
        },

        showSettings: function() {
            var modal = new App.Views.Modal({
                    childView: WatchList.Preferences,
                    title: 'Watch List Preferences',
                    model: App.userSettings
                });

            this.modal.show(modal);
            modal.$el.modal();
            modal.on('hidden.bs.modal', _.bind(this.modal.reset, this));            
        }
    });

    WatchList.NodeView = App.Views.NodeView.extend({
        template: 'watch-list/node',

        className: function() {
            return 'node-block col-md-3 col-sm-6 col-xs-12 ' + App.Views.NodeView.prototype.className.apply(this, arguments);
        },

        modelEvents: {
            'change': 'render'
        },

        serializeData: function() {
            return _.extend({
                isCustom: this.model.get('type') === 'custom',
                isActive: this.model.get('active'),
                untilHours: this.model.get('earth_time_until').hours > 0,
                classes: this.getContentClasses()
            }, this.model.toJSON());
        }
    });

    WatchList.NodeList = Marionette.CollectionView.extend({
        className: 'watched-node-list',
        childView: WatchList.NodeView,

        initialize: function() {
            var self = this;

            this.collection.sort();
            this.listenTo(App.masterClock, 'change', function() {
                self.collection.sort();
            });
        }
    });

    WatchList.Preferences = Marionette.LayoutView.extend({
        template: 'watch-list/preferences',
        className: 'preferences-form',
        
        serializeData: function() {
            var data = this.model.toJSON();


            return _.extend({
                soundList: [
                    {
                        name: 'none',
                        value: 'none'
                    },
                    {
                        
                    }
                ]
            }, data);
        }
    });

    App.on('before:start', function() {
        App.commands.setHandler('show:watchList', function() {
            App.mainRegion.show(new WatchList.BaseView());
        });
    });

});

