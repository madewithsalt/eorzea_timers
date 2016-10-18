App.module("Views", function(Views, App, Backbone, Marionette, $, _) {


    Views.NodeView = Marionette.ItemView.extend({
        template: 'node',

        events: {
            'click .btn-delete': 'deleteNode',
            'click .btn-edit': 'editNode'
        },

        attributes: function() {
            var data = this.model.toJSON();

            return {
                'data-id': data.id,
                'data-type': data.type,
                'is_collectable': data.is_collectable || null,
                'is_ephemeral': data.is_ephemeral,
                'is_legendary': data.is_legendary,
                'red_scrip': !_.isUndefined(data.red_scrip) ? true : null,
                'blue_scrip': !_.isUndefined(data.blue_scrip) ? true : null
            }
        },

        serializeData: function() {
            var scrip;

            if(this.model.get('red_scrip')) {
                scrip = {
                    icon: 'red_scrip',
                    rating: this.model.get('red_scrip')
                };
            } else if(this.model.get('blue_scrip')) {
                scrip = {
                    icon: 'blue_scrip',
                    rating: this.model.get('blue_scrip')
                };
            }

            return _.extend({
                isCustom: this.model.get('type') === 'custom',
                isActive: this.model.get('active'),
                classes: this.getContentClasses(),
                scrip: scrip
            }, this.model.toJSON());
        },

        getContentClasses: function() {
            var classes = [
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

            if (this.model.get('selected')) {
                classes.push('selected');
            }

            if(this.model.get('triggeredAlarm')) {
                classes.push('alerted');
            }

            return classes.join(' ');
        },

        className: function() {
            var classes = [
                'node'
            ];

            // set by search criteria.
            if (this.model.get('hidden')) {
                classes.push('hidden');
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
            if (!selected) {
                App.vent.trigger('node:selected', this.model);
                this.$('.node-content').addClass('selected');
            } else {
                App.vent.trigger('node:deselected', this.model);
                this.$('.node-content').removeClass('selected');
            }
        },

        onBeforeDestroy: function() {
            this.$el.off();
        },

        deleteNode: function(evt) {
            evt.stopPropagation();
            App.vent.trigger('node:custom:delete', this.model);
        },

        editNode: function(evt) {
            evt.stopPropagation();
            App.vent.trigger('customTimer:edit', this.model);
        }
    });

});