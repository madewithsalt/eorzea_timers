App.module("Views", function(Views, App, Backbone, Marionette, $, _) {

    Views.Preferences = Marionette.LayoutView.extend({
        template: 'watch-list/preferences',
        className: 'preferences-form',

        events: {
            'change .sound-option-list': 'selectSound',
            'click .sound-preview': 'toggleSound',
            'click .btn-save': 'triggerSave'
        },

        ui: {
            soundSelect: '.sound-option-list',
            soundPreview: '.sound-preview',
            form: 'form'
        },

        serializeData: function() {
            var data = this.model.toJSON();

            return _.extend({
                desktop: Modernizr.notification,
                soundList: App.sounds.toJSON()
            }, data);
        },

        selectSound: function(evt) {
            var val = this.ui.soundSelect.val();

            if(val !== 'none') {
                this.ui.soundPreview.show().removeClass('hidden');
            } else {
                this.ui.soundPreview.hide();
            }
        },

        toggleSound: function() {
            var val = this.ui.soundSelect.val(),
                sound = App.sounds.get(val);

            if(!sound) { return; }

            if(!this.playing) {
                sound.play(_.bind(this.toggleSound, this));
                this.playing = true;
                this.ui.soundPreview.addClass('playing');
            } else {
                sound.stop();
                this.playing = false;
                this.ui.soundPreview.removeClass('playing');
            }
        },

        triggerSave: function() {
            var isValid = this.ui.form.parsley().validate(),
                data = this.processFormData();

            if(isValid) {
                this.model.save(data);
                this.trigger('modal:close');
            }
        },

        processFormData: function() {
            var values = this.ui.form.serializeArray(),
                data = {},
                output = {};

            _.each(values, function(item) {
                data[item.name] = item.value;
            });

            if(!_.isEmpty(data['alarm-time'])) {
                output.time = data['alarm-time'];
            }

            output.sound = data['alarm-sound'] !== 'none' ? data['alarm-sound'] : false;
            output.type = data['alarm-style'];

            if(output.type === 'desktop' && Modernizr.notification && Notification.permission !== 'granted') {
                Notification.requestPermission();
            }

            return {
                alarm: output
            };
        }

    });


});