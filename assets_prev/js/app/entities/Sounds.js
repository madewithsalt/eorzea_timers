App.module("Entities", function(Entities, App, Backbone, Marionette, $, _) {
    var sounds = [
            {
                name: 'Chime',
                id: 'chime'
            },{
                name: 'Big Ben',
                id: 'chime_big_ben',
                nTo: 400
            },{
                name: 'Chime Up',
                id: 'chime_up'
            },{
                name: 'Cuckoo Clock',
                id: 'cuckoo'
            },{
                name: 'Doorbell',
                id: 'doorbell'
            },{
                name: 'Floop',
                id: 'floop'
            },{
                name: 'Gong',
                id: 'gong'
            }
        ];


    Entities.Sound = Backbone.Model.extend({
        initialize: function() { 
            this.createSound();      
        },

        createSound: function(callback) {
            var id = this.get('id'),
                url = this.url();

            if(!id && !url) { return; }

            soundManager.createSound({
                id: id,
                url: url + '.wav',
                autoLoad: true,
                nTo: this.get('nTo') || null,
                autoPlay: false,
                onload: function(success) {
                    if(_.isFunction(callback)) {
                        callback(success);
                    }
                },
                volume: 50
            });
        },

        play: function(callback) {
            soundManager.play(this.get('id'), {
                onfinish: function() {
                    if(_.isFunction(callback)) {
                        callback();
                    }
                }
            });
        },

        stop: function() {
            soundManager.stop(this.get('id'));
        }
    });

    Entities.Sounds = Backbone.Collection.extend({
        url: '/sound/',
        model: Entities.Sound,
        initialize: function() {
            this.add(sounds);
        }
    });

});