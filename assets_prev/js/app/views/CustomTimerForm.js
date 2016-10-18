App.module("Views", function(Views, App, Backbone, Marionette, $, _) {

    var TimeSlot = Marionette.ItemView.extend({
        template: 'custom-timer/time-slot'
    });

    Views.CustomTimer = Marionette.ItemView.extend({
        template: 'custom-timer',
        className: 'custom-timer',

        ui: {
            form: 'form'
        },

        events: {
            'click .btn-save': 'triggerSave'
        },

        serializeData: function() {
            var data = this.model ? this.model.toJSON() : { times: [ '12:00 AM' ] },
                times = _.map(data.times, function(time, idx) {
                    var hour = time.split(' ')[0].split(':')[0],
                        min = time.split(' ')[0].split(':')[1],
                        meridien = time.split(' ')[1];


                    return {
                            idx: idx,
                            hour: hour,
                            min: min,
                            meridien: meridien
                        }
                });


            var duration = {};

            if(data.duration) {
                duration = {
                    hours: data.duration.split(' ')[0].split(':')[0],
                    minutes: data.duration.split(' ')[0].split(':')[1]
                };
            }
            
            return _.extend({}, data, {
                times: times,
                duration_obj: duration
            });
        },

        triggerSave: function(evt) {
            var isValid = this.ui.form.parsley().validate();

            if(isValid) {
                this.saveNode();
            }
        },

        processFormData: function() {
            var values = this.ui.form.serializeArray(),
                ignore = ['hour', 'min', 'mer', 'xpos', 'ypos', 'duration-hours', 'duration-min'],
                output = {
                    type: 'custom',
                    times: []
                };

            _.each(values, function(item) {
                if(_.indexOf(ignore, item.name) > -1) {
                    return;
                }

                output[item.name] = item.value;
            });

            var $times = this.$('.form-time');

            $times.each(function() {
                var $el = $(this),
                    hr = $el.find('input[name="hour"]').val(),
                    min = $el.find('input[name="min"]').val(),
                    mer = $el.find('select').val();

                output.times.push(hr + ':' + min + ' ' + mer);
            });

            // only supporting one time for now.
            output.time = output.times[0];

            var xPos = _.find(values, { name: 'xpos' }),
                yPos = _.find(values, { name: 'ypos' });

            if(xPos && yPos) {
                output.pos = 'x' + xPos.value + ',' + 'y' + yPos.value;
            }

            var durMin = _.find(values, { name: 'duration-min' }).value,
                durHour = _.find(values, { name: 'duration-hours' }).value;

            output.duration = durHour + ':' + durMin;

            return output;
        },

        saveNode: function() {
            var data = this.processFormData(),
                model = this.model ? this.model : new App.Entities.Node(data);

            model.set(data);
            App.vent.trigger('node:custom:save', model);            
            this.trigger('modal:close');
        }
    });

});