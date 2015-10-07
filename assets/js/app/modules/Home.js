App.module("Home", function(Home, App, Backbone, Marionette, $, _) {

    Home.JumboTronView = Marionette.LayoutView.extend({
        template: 'home/jumbotron',
        className: function() {
            var classes = [
                'jumbotron'
            ];

            if (App.userSettings.get('homeClockCollapsed')) {
                classes.push('closed');
            }

            return classes.join(' ');
        },

        regions: {
            'clock': '.clock-region'
        },

        events: {
            'click .toggle-link': 'triggerToggle'
        },

        initialize: function() {
            this.collapsed = App.userSettings.get('homeClockCollapsed') || false;
        },

        serializeData: function() {
            return {
                collapsed: this.collapsed
            };
        },

        onBeforeShow: function() {
            this.clock.show(new App.Views.Clock({
                tagName: 'h1',
                model: App.masterClock
            }));
        },

        triggerToggle: function() {
            var collapsed = this.collapsed;

            if (collapsed) {
                this.$el.removeClass('closed');
            } else {
                this.$el.addClass('closed');
            }

            this.collapsed = !collapsed;
            App.userSettings.save('homeClockCollapsed', !collapsed);
        }
    });


    Home.NodeView = App.Views.NodeView.extend({
        className: function() {
            return 'node-slim ' + App.Views.NodeView.prototype.className.apply(this, arguments);
        }
        
    });

    Home.NodeList = Marionette.CollectionView.extend({
        childView: Home.NodeView
    });

    Home.BaseView = Marionette.LayoutView.extend({
        template: 'home/home',
        className: 'home',

        events: {
            'keyup .node-search-input': 'triggerSearch',
            'click .filter-menu .btn': 'triggerFilter',
            'click .attr-menu .btn': 'triggerAttrFilter',
            'click .new-timer-btn': 'triggerNewTimer'
        },

        ui: {
            search: '.node-search-input',
            filterItem: '.filter-menu .btn',
            attrItem: '.attr-menu .btn'
        },

        regions: {
            'jumbotron': '.jumbotron-region',
            'activeNodes': '.active-nodes-region',
            'nextHourNodes': '.next-hour-nodes-region',
            'twoHourNodes': '.two-hour-nodes-region',
            'otherNodes': '.other-nodes-region',
            'newTimerModal': '.new-timer-modal-region'
        },

        initialize: function() {
            var self = this;

            this._currentHour = App.masterClock.get('hour');

            this.configureSearchList();
            this.sortCollections();

            this.listenTo(App.collections.custom, 'add remove', function() {
                self.configureSearchList();
                self.sortAndShowLists();
            });

            // only update lists every hour for performance
            // let individual views (when active) handle countdowns.
            this.listenTo(App.masterClock, 'change', function() {
                // be sure to check for race-conditioned nodes that missed the last hour rollover
                if (self._currentHour !== App.masterClock.get('hour') || self.collections.active.where({
                    active: false
                }).length) {
                    self._currentHour = App.masterClock.get('hour');
                    self.sortAndShowLists();
                }
            });

            this.fuse = new Fuse(this.searchCollections, {
                keys: ['name', 'location'],
                threshold: 0.3,
                id: 'id'
            });

            this.filteringBy = 'all';

            this.listenTo(App.vent, 'node:create', function() {
                self.sortAndShowLists();
            });
        },

        sortAndShowLists: function() {
            this.sortCollections();
            this.showLists();
        },

        configureSearchList: function() {
            var collections = [
                    App.collections.botany,
                    App.collections.mining,
                    App.collections.custom
                ],
                // create a flattened json list of all nodes for search purposes.
                searchCollections = _.map(App.collections, function(coll) {
                    return coll.toJSON();
                });

            this.searchCollections = _.flatten(searchCollections);

        },

        triggerSearch: function() {
            var val = this.ui.search.val(),
                result;

            if(val.length <= 3) {
                this.searchList = [];
                this.clearSearch();
                return;
            }

            result = this.fuse.search(val);

            this.searchList = result;
            this.hideExcludedSearch();
        },

        clearSearch: function() {
            this.$('.node').show();
        },

        hideExcludedSearch: function() {
            var self = this,
                results = this.searchList;

            this.$('.node').hide();
            _.each(results, function(id) {
                var target = '.node[data-id="' + id + '"]';
                
                if(self.filteringBy !== 'all') {
                    self.$(target).filter('[data-type="' + self.filteringBy + '"]').show();
                
                } else {
                    self.$(target).show();
                }
            });
        },

        triggerFilter: function(evt) {
            var $el = $(evt.currentTarget),
                target = $el.data('target');

            this.ui.filterItem.removeClass('active');
            $el.addClass('active');
            
            this.filteringBy = target;
            
            this.showFilteredNodes();
        },

        triggerAttrFilter: function(evt) {
            var self = this,
                $el = $(evt.currentTarget),
                target = $el.data('target');

            this.attrFilters = [];
            $el.toggleClass('active');

            this.ui.attrItem.each(function() {
                if($(this).hasClass('active')) {
                    self.attrFilters.push($(this).data('target'));
                }
            });

            this.showFilteredNodes();
        }, 

        showFilteredNodes: function() {
            var self = this;

            this.$('.node').show();

            if(this.filteringBy !== 'all') {
                this.$('.node').not('[data-type="' + this.filteringBy + '"]').hide();
            }

            _.each(this.attrFilters, function(filter) {
                self.$('.node').not('[' + filter + ']').hide();
            });
        },

        triggerNewTimer: function() {
            var modal = new App.Views.Modal({
                    childView: App.Views.CustomTimer,
                    title: 'New Custom Timer'
                });

            this.newTimerModal.show(modal);
            modal.$el.modal();
            modal.on('hidden.bs.modal', _.bind(this.newTimerModal.reset, this));
        },

        sortCollections: function() {
            var self = this,
                data = [],
                active = [],
                oneHour = [],
                twoHour = [],
                theRest = [],
                searchList = this.searchList || [],
                filteringBy = this.filteringBy,
                watchedNodes = App.collections.watched,
                collections = [
                    App.collections.botany,
                    App.collections.mining,
                    App.collections.custom
                ];

            this.collections = {
                active: new Backbone.Collection(),
                one_hour: new Backbone.Collection(),
                two_hour: new Backbone.Collection(),
                the_rest: new Backbone.Collection()
            };

            _.each(collections, function(coll) {
                coll.each(function(model) {
                    var item = model.toJSON(),
                        isWatched = watchedNodes.get(item.id);

                    if (isWatched) {
                        model.set('selected', true);
                    }

                    if(item.type === filteringBy || filteringBy === 'all' || !filteringBy) {
                        model.set('hidden', false); 
                    } else {
                        model.set('hidden', true);
                    }

                    if(searchList.length) {
                        var excluded = _.indexOf(searchList, item.id) === -1;

                        if(excluded) { 
                            model.set('hidden', true); 
                        } else if(item.type === filteringBy || filteringBy === 'all' ) {
                            model.set('hidden', false);
                        }
                    }

                    if (item.active) {
                        return active.push(model);
                    }

                    var timeUntil = item.time_until,
                        hours = timeUntil.hours,
                        minutes = timeUntil.minutes;

                    if (hours === 0 && minutes > 0 || hours === 1) {
                        return oneHour.push(model);
                    }

                    if (hours === 1 && minutes > 0 || hours === 2) {
                        return twoHour.push(model);
                    }

                    return theRest.push(model);

                });

            });

            self.collections.active.add(active);
            self.collections.one_hour.add(oneHour);
            self.collections.two_hour.add(twoHour);
            self.collections.the_rest.add(theRest);
        },

        onBeforeShow: function() {
            var self = this;

            // jumbotron master clock
            this.jumbotron.show(new Home.JumboTronView());
            this.showLists();
        },

        showLists: function() {
            this.activeNodes.show(new Home.NodeList({
                collection: this.collections.active
            }));

            this.nextHourNodes.show(new Home.NodeList({
                collection: this.collections.one_hour
            }));

            this.twoHourNodes.show(new Home.NodeList({
                collection: this.collections.two_hour
            }));

            this.otherNodes.show(new Home.NodeList({
                collection: this.collections.the_rest
            }));
        }
    });

    App.on('before:start', function() {
        App.commands.setHandler('show:home', function() {
            App.mainRegion.show(new Home.BaseView());
        });
    });

});