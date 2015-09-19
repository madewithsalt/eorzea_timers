App.module("Views", function(Views, App, Backbone, Marionette, $, _) {


    Views.NodeView = Marionette.ItemView.extend({
        template: 'node',

        events: {
            'click .btn-delete': 'deleteNode'
        },

        attributes: function() {
            return {
                'data-id': this.model.get('id'),
                'data-type': this.model.get('type')
            }
        },

        serializeData: function() {
            return _.extend({
                isCustom: this.model.get('type') === 'custom',
                isActive: this.model.get('active')
            }, this.model.toJSON());
        },

        className: function() {
            var classes = [
                'node',
                this.model.get('type')
            ];

            if (this.model.get('active')) {
                var earthRem = this.model.get('earth_time_remaining');

                classes.push('active');

                if (earthRem.minutes <= 1) {
                    classes.push('urgent');
                } else if (earthRem.minutes <= 6) {
                    classes.push('warning');
                }
            }

            // set by search criteria.
            if (this.model.get('hidden')) {
                classes.push('hidden');
            }

            if (this.model.get('selected')) {
                classes.push('selected');
            }

            return classes.join(' ');
        },

        initialize: function() {
            var self = this;

            this.listenTo(this.model, 'change', function() {
                if (this.model.get('active')) {
                    this.render();
                    this.trigger('change');
                }
            });

            this.$el.on('click', _.bind(this.toggleSelect, this));
        },

        toggleSelect: function() {
            var selected = this.model.get('selected') || false;

            this.model.set('selected', !selected);
            this.$el.toggleClass('selected');
            if (!selected) {
                App.vent.trigger('node:selected', this.model);
            } else {
                App.vent.trigger('node:deselected', this.model);
            }
        },

        onBeforeDestroy: function() {
            this.$el.off();
        },

        deleteNode: function(evt) {
            evt.stopPropagation();
            this.model.destroy();
        }
    });

});