App.module("Widget", function(Widget, App, Backbone, Marionette, $, _) {

    Widget.NodeView = Marionette.ItemView.extend({
        template: 'widget-nodelist',
        serializeData: function() {
            return {
                active: {
                    botany: App.collections.botany.where({ active: true }).length,
                    mining: App.collections.mining.where({ active: true }).length,
                    fishing: App.collections.fishing.where({ active: true }).length,
                }
            };
        }
    });


    Widget.BaseView = Marionette.LayoutView.extend({
        template: 'widget',

        regions: {
            'clock': '.clock-region',
            'activeNodes': '.nodes-region'
        },

        serializeData: function() {
            return {
                version: App.version
            };
        },

        onBeforeShow: function() {
            this.clock.show(new App.Views.Clock({
                model: this.model
            }));

            this.activeNodes.show(new Widget.NodeView());

            // this.listenTo(App.masterClock, 'change', function() {
            //     this.activeNodes.render();
            // });

        }
    });

    App.on('before:start', function() {
        App.commands.setHandler('show:widget', function() {
            App.widgetRegion.show(new Widget.BaseView({
                model: new App.Entities.Clock()
            }));
        });
    });
});