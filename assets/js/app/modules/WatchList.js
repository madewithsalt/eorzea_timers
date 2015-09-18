App.module("WatchList", function(WatchList, App, Backbone, Marionette, $, _){

    WatchList.BaseView = Marionette.LayoutView.extend({
        template: 'watch-list/base',
        className: 'watch-list'
    });

    App.on('before:start', function() {
        App.commands.setHandler('show:watchList', function() {
            App.mainRegion.show(new WatchList.BaseView());
        });
    });

});

