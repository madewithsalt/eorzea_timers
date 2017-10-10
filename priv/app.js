(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("js/App.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _Notifications = require('./modules/Notifications');

var _Notifications2 = _interopRequireDefault(_Notifications);

var _nodeListActions = require('./actions/nodeListActions');

var _clockActions = require('./actions/clockActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          recieveNodeList = _props.recieveNodeList,
          requestNodeList = _props.requestNodeList,
          changeTime = _props.changeTime;


      requestNodeList();

      fetch('/data/nodes.json').then(function (response) {
        return response.json();
      }).then(function (json) {
        recieveNodeList(json);
      }).catch(function (ex) {
        console.log('parsing failed', ex);
      });

      var interval = setInterval(function () {
        return changeTime();
      }, 3000);
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var _ref = nextProps || this.props,
          clock = _ref.clock;

      document.title = clock.time + ' - Eorzea Timers';
    }
  }, {
    key: 'render',
    value: function render() {
      var store = this.props.store;


      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_routes2.default, null),
          _react2.default.createElement(_Notifications2.default, null)
        )
      );
    }
  }]);

  return App;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    clock: state.clock,
    nodelist: state.nodelist
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    recieveNodeList: function recieveNodeList(json) {
      return dispatch((0, _nodeListActions.recieveNodeList)(json));
    },
    requestNodeList: function requestNodeList(e) {
      return dispatch((0, _nodeListActions.requestNodeList)());
    },
    changeTime: function changeTime(e) {
      return dispatch((0, _clockActions.changeTime)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

});

require.register("js/actions/clockActions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_LAST_ALARM = exports.CLOSE_NOTIFICATION = exports.DISPATCH_NOTIFICATION = exports.INCREMENT_CLOCK = undefined;
exports.updateClock = updateClock;
exports.dispatchNotification = dispatchNotification;
exports.closeNotification = closeNotification;
exports.updateLastAlarm = updateLastAlarm;
exports.changeTime = changeTime;

var _lodash = require('lodash');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var INCREMENT_CLOCK = exports.INCREMENT_CLOCK = 'INCREMENT_CLOCK';
var DISPATCH_NOTIFICATION = exports.DISPATCH_NOTIFICATION = 'DISPATCH_NOTIFICATION';
var CLOSE_NOTIFICATION = exports.CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
var UPDATE_LAST_ALARM = exports.UPDATE_LAST_ALARM = 'UPDATE_LAST_ALARM';

function updateClock() {
  return {
    type: INCREMENT_CLOCK
  };
}

function dispatchNotification(list) {
  return {
    type: DISPATCH_NOTIFICATION,
    list: list
  };
}

function closeNotification() {
  return {
    type: CLOSE_NOTIFICATION
  };
}

function updateLastAlarm(hour) {
  return {
    type: UPDATE_LAST_ALARM,
    hour: hour
  };
}

function changeTime() {
  return function (dispatch, getState) {
    var _getState = getState(),
        watchlist = _getState.watchlist,
        nodelist = _getState.nodelist,
        customlist = _getState.customlist,
        settings = _getState.settings,
        clock = _getState.clock;

    var lastAlarm = clock.lastAlarm,
        advanceHourNotice = settings.alarm_hour || 0;

    if (watchlist.times.length) {
      var nodes = watchlist.nodes.map(function (id) {
        return (0, _lodash.find)([].concat(_toConsumableArray(nodelist.nodes), _toConsumableArray(customlist)), { id: id });
      });

      (0, _lodash.each)(watchlist.times, function (time) {
        var alertTime = time.hour - advanceHourNotice;

        if (clock.hour === alertTime && clock.lastAlarm !== clock.hour) {
          var activeNodes = (0, _lodash.filter)(nodes, { time: time.time });

          dispatch(dispatchNotification(activeNodes));
          dispatch(updateLastAlarm(clock.hour));
        }
      });
    }

    dispatch(updateClock());
  };
}

});

;require.register("js/actions/customListActions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCustomNode = addCustomNode;
exports.editCustomNode = editCustomNode;
exports.removeCustomNode = removeCustomNode;
var ADD_CUSTOM_NODE = exports.ADD_CUSTOM_NODE = 'ADD_CUSTOM_NODE';
var EDIT_CUSTOM_NODE = exports.EDIT_CUSTOM_NODE = 'EDIT_CUSTOM_NODE';
var REMOVE_CUSTOM_NODE = exports.REMOVE_CUSTOM_NODE = 'REMOVE_CUSTOM_NODE';

function addCustomNode(node) {
  return {
    type: ADD_CUSTOM_NODE,
    node: node
  };
}

function editCustomNode(node) {
  return {
    type: EDIT_CUSTOM_NODE,
    node: node
  };
}

function removeCustomNode(id) {
  return {
    type: REMOVE_CUSTOM_NODE,
    id: id
  };
}

});

;require.register("js/actions/nodeActions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleSelect = toggleSelect;
var TOGGLE_SELECT = exports.TOGGLE_SELECT = 'TOGGLE_SELECT';

function toggleSelect(id) {
  return {
    type: TOGGLE_SELECT,
    id: id
  };
}

});

;require.register("js/actions/nodeListActions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestNodeList = requestNodeList;
exports.recieveNodeList = recieveNodeList;
exports.filterTypeNodeList = filterTypeNodeList;
exports.filterLevelNodeList = filterLevelNodeList;
exports.toggleFeatureFilter = toggleFeatureFilter;
var REQUEST_NODELIST = exports.REQUEST_NODELIST = 'REQUEST_NODELIST';
var RECEIVE_NODELIST = exports.RECEIVE_NODELIST = 'RECEIVE_NODELIST';
var FILTER_TYPE_NODELIST = exports.FILTER_TYPE_NODELIST = 'FILTER_TYPE_NODELIST';
var FILTER_LEVEL_NODELIST = exports.FILTER_LEVEL_NODELIST = 'FILTER_LEVEL_NODELIST';
var FILTER_FEATURE_TOGGLE_NODELIST = exports.FILTER_FEATURE_TOGGLE_NODELIST = 'FILTER_FEATURE_TOGGLE_NODELIST';

function requestNodeList(nodes) {
  return {
    type: REQUEST_NODELIST,
    nodes: nodes
  };
}

function recieveNodeList(nodes) {
  return {
    type: RECEIVE_NODELIST,
    nodes: nodes,
    recievedAt: Date.now()
  };
}

function filterTypeNodeList(filterByType) {
  return {
    type: FILTER_TYPE_NODELIST,
    filterByType: filterByType
  };
}

function filterLevelNodeList(filterByLevel) {
  return {
    type: FILTER_LEVEL_NODELIST,
    filterByLevel: filterByLevel
  };
}

function toggleFeatureFilter(feature) {
  return {
    type: FILTER_FEATURE_TOGGLE_NODELIST,
    feature: feature
  };
}

});

;require.register("js/actions/pageActions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleModal = toggleModal;
var TOGGLE_MODAL = exports.TOGGLE_MODAL = 'TOGGLE_MODAL';

function toggleModal() {
  return {
    type: TOGGLE_MODAL
  };
}

});

;require.register("js/actions/searchActions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = search;
var SEARCH_QUERY = exports.SEARCH_QUERY = 'SEARCH_QUERY';

function search(query) {
  return {
    type: SEARCH_QUERY,
    query: query
  };
}

});

;require.register("js/actions/settingsActions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSetting = updateSetting;
var UPDATE_SETTING = exports.UPDATE_SETTING = 'UPDATE_SETTING';

function updateSetting(setting) {
  return {
    type: UPDATE_SETTING,
    setting: setting
  };
}

});

;require.register("js/actions/watchGroupsActions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addItem = addItem;
exports.removeItem = removeItem;
exports.createGroup = createGroup;
exports.updateGroup = updateGroup;
exports.removeGroup = removeGroup;
var WATCHGROUP_ADD_ITEM = exports.WATCHGROUP_ADD_ITEM = 'WATCHGROUP_ADD_ITEM';
var WATCHGROUP_REMOVE_ITEM = exports.WATCHGROUP_REMOVE_ITEM = 'WATCHGROUP_REMOVE_ITEM';
var CREATE_WATCHGROUP = exports.CREATE_WATCHGROUP = 'CREATE_WATCHGROUP';
var REMOVE_WATCHGROUP = exports.REMOVE_WATCHGROUP = 'REMOVE_WATCHGROUP';
var UPDATE_WATCHGROUP = exports.UPDATE_WATCHGROUP = 'UPDATE_WATCHGROUP';

function addItem(groupId, nodeId) {
  return {
    type: WATCHGROUP_ADD_ITEM,
    groupId: groupId,
    nodeId: nodeId
  };
}

function removeItem(groupId, nodeId) {
  return {
    type: WATCHGROUP_REMOVE_ITEM,
    groupId: groupId,
    nodeId: nodeId
  };
}

function createGroup(group) {
  return {
    type: CREATE_WATCHGROUP,
    group: group
  };
}

function updateGroup(group) {
  return {
    type: UPDATE_WATCHGROUP,
    group: group
  };
}

function removeGroup(id) {
  return {
    type: REMOVE_WATCHGROUP,
    id: id
  };
}

});

;require.register("js/actions/watchListActions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CLEAR_ALL = exports.UPDATE_TIMES = exports.REMOVE_WATCHLIST = exports.ADD_WATCHLIST = undefined;
exports.toggleSelect = toggleSelect;
exports.clearAll = clearAll;
exports.replaceList = replaceList;

var _lodash = require('lodash');

var _timeUtils = require('../utils/timeUtils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var ADD_WATCHLIST = exports.ADD_WATCHLIST = 'ADD_WATCHLIST';
var REMOVE_WATCHLIST = exports.REMOVE_WATCHLIST = 'REMOVE_WATCHLIST';
var UPDATE_TIMES = exports.UPDATE_TIMES = 'UPDATE_TIMES';
var CLEAR_ALL = exports.CLEAR_ALL = 'CLEAR_ALL';

function addToList(id) {
  return {
    type: ADD_WATCHLIST,
    id: id
  };
}

function removeFromList(id) {
  return {
    type: REMOVE_WATCHLIST,
    id: id
  };
}

function updateNotifications() {

  return function (dispatch, getState) {
    var _getState = getState(),
        watchlist = _getState.watchlist,
        nodelist = _getState.nodelist,
        customlist = _getState.customlist;

    var times = watchlist.nodes.map(function (id) {
      var node = (0, _lodash.find)([].concat(_toConsumableArray(nodelist.nodes), _toConsumableArray(customlist)), { id: id });
      var timeObj = (0, _timeUtils.getTimeObjFromString)(node.time);

      return Object.assign({}, timeObj, { time: node.time });
    });

    dispatch({
      type: UPDATE_TIMES,
      times: times
    });
  };
}

function toggleSelect(id) {

  return function (dispatch, getState) {
    var _getState2 = getState(),
        watchlist = _getState2.watchlist,
        existsAt = (0, _lodash.indexOf)(watchlist.nodes, id);

    if (existsAt >= 0) {
      dispatch(removeFromList(id));
    } else {
      dispatch(addToList(id));
    }

    dispatch(updateNotifications());
  };
}

function clearAll() {
  return {
    type: CLEAR_ALL
  };
}

function replaceList(list) {
  return function (dispatch) {
    dispatch(clearAll());

    (0, _lodash.each)(list, function (id) {
      dispatch(toggleSelect(id));
    });
  };
}

});

;require.register("js/components/Clock.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Clock = function Clock(props) {
  return _react2.default.createElement(
    'span',
    { className: props.className },
    props.clock.time
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return { clock: state.clock };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Clock);

});

require.register("js/components/FilterMenu.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterMenu = function (_Component) {
  _inherits(FilterMenu, _Component);

  function FilterMenu(props) {
    _classCallCheck(this, FilterMenu);

    var _this = _possibleConstructorReturn(this, (FilterMenu.__proto__ || Object.getPrototypeOf(FilterMenu)).call(this, props));

    _this.renderMenuItem = _this.renderMenuItem.bind(_this);
    return _this;
  }

  _createClass(FilterMenu, [{
    key: 'renderMenuItem',
    value: function renderMenuItem(name, value) {
      var isActive = false;
      var object = (0, _lodash.isObject)(value);
      var values = this.props.values;

      // if a filter is selected ...

      if (values[name]) {
        if ((0, _lodash.isArray)(values[name])) {
          if (object) {
            if ((0, _lodash.isArray)(value.value)) {
              isActive = values[name] === value.value;
            } else {
              isActive = values[name].indexOf(value.value) >= 0;
            }
          } else {
            isActive = values[name].indexOf(value) >= 0;
          }
        } else {
          isActive = values[name] && values[name] === value;
        }
      }

      return _react2.default.createElement(
        'li',
        { className: 'filter-menu-item', key: 'filter-' + name + '-' + (object ? value.value : value) },
        _react2.default.createElement(
          'a',
          { onClick: this.handleFilterChange.bind(this, name, object ? value.value : value),
            className: 'menu-item ' + (isActive ? 'active' : '') },
          _react2.default.createElement('span', { className: 'icon icon-' + (object ? value.value : value) }),
          _react2.default.createElement(
            'span',
            { className: 'name' },
            object ? value.name : value
          )
        )
      );
    }
  }, {
    key: 'handleFilterChange',
    value: function handleFilterChange(name, value) {
      this.props.onChange(name, value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          filters = _props.filters,
          className = _props.className;
      var renderMenuItem = this.renderMenuItem;

      var keys = Object.keys(filters);

      return _react2.default.createElement(
        'div',
        { className: 'filter-menu ' + className },
        keys.map(function (key) {
          return _react2.default.createElement(
            'div',
            { className: 'filter-menu-group group-' + key, key: key },
            _react2.default.createElement(
              'span',
              { className: 'menu-label' },
              filters[key].name,
              ':'
            ),
            _react2.default.createElement(
              'ul',
              { className: 'filter-menu-list' },
              filters[key].values.map(function (item) {
                return renderMenuItem(key, item);
              })
            )
          );
        })
      );
    }
  }]);

  return FilterMenu;
}(_react.Component);

FilterMenu.defaultProps = {
  onChange: function onChange() {}
};

exports.default = FilterMenu;

});

require.register("js/components/MainNav.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactRedux = require('react-redux');

var _Clock = require('./Clock');

var _Clock2 = _interopRequireDefault(_Clock);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainNav = function (_Component) {
  _inherits(MainNav, _Component);

  function MainNav() {
    _classCallCheck(this, MainNav);

    return _possibleConstructorReturn(this, (MainNav.__proto__ || Object.getPrototypeOf(MainNav)).apply(this, arguments));
  }

  _createClass(MainNav, [{
    key: 'componentDidMount',
    value: function componentDidMount(nextProps, nextState) {
      var _this2 = this;

      $(this.menuToggle).sideNav({
        edge: 'right'
      });

      $('#sidebar a').on('click', function () {
        $(_this2.menuToggle).sideNav('hide');
      });
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu(className, id) {
      var _props = this.props,
          watchCount = _props.watchCount,
          customCount = _props.customCount,
          clock = _props.clock;


      var navItems = [{ url: '/watch', name: 'Watch List', count: watchCount }, {
        url: '/custom',
        name: 'My Timers',
        count: customCount
      }, {
        url: '/about',
        name: 'About'
      }];

      return _react2.default.createElement(
        'ul',
        { className: className || '', id: id || null },
        _react2.default.createElement(
          'li',
          { className: 'nav-item' },
          _react2.default.createElement(
            _reactRouterDom.NavLink,
            { exact: true, to: '/', activeClassName: 'active' },
            'Home'
          )
        ),
        navItems.map(function (item) {
          return _react2.default.createElement(
            'li',
            { key: item.name.toLowerCase(), className: 'nav-item' },
            _react2.default.createElement(
              _reactRouterDom.NavLink,
              { to: item.url, activeClassName: 'active' },
              _react2.default.createElement(
                'span',
                null,
                item.name
              ),
              item.count ? _react2.default.createElement(
                'span',
                { className: 'label' },
                item.count
              ) : null
            )
          );
        }),
        id ? _react2.default.createElement(
          'li',
          { className: 'nav-clock nav-item ' + clock.meridiem.toLowerCase() },
          _react2.default.createElement(_Clock2.default, { className: 'inline-block' })
        ) : null
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var toggleSidebar = this.toggleSidebar,
          clock = this.props.clock;


      return _react2.default.createElement(
        'nav',
        { className: 'primary-nav' },
        _react2.default.createElement(
          'div',
          { className: 'nav-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'brand-logo website-title' },
            _react2.default.createElement(
              'span',
              null,
              'Eorzea Timers'
            ),
            '\xA0',
            _react2.default.createElement(
              'span',
              { className: 'version' },
              this.props.version.toString()
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'right nav-clock ' + clock.meridiem.toLowerCase() },
            _react2.default.createElement(_Clock2.default, { className: 'inline-block' })
          ),
          _react2.default.createElement(
            'a',
            { href: '#', ref: function ref(button) {
                _this3.menuToggle = button;
              },
              'data-activates': 'sidebar',
              className: 'button-collapse right' },
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'menu'
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            this.renderMenu("nav navbar-nav right hide-on-med-and-down")
          ),
          _react2.default.createElement(
            'div',
            { ref: function ref(sidebar) {
                _this3.sidebarNav = sidebar;
              } },
            this.renderMenu("side-nav", "sidebar")
          )
        )
      );
    }
  }]);

  return MainNav;
}(_react.Component);

;

var mapStateToProps = function mapStateToProps(state) {
  return {
    clock: state.clock,
    watchCount: state.watchlist.nodes.length,
    customCount: state.customlist.length,
    version: state.version
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MainNav);

});

require.register("js/components/Modal.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    _classCallCheck(this, Modal);

    return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).apply(this, arguments));
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(this.modal).modal({
        dismissable: true,
        complete: this.props.onClose
      });

      this.onModalOpen(this.props);
    }
  }, {
    key: 'onModalOpen',
    value: function onModalOpen(nextProps) {
      var _this2 = this;

      if (nextProps.open === true) {
        $(this.modal).modal('open');
        Materialize.updateTextFields();
      }

      if (nextProps.timeout) {
        setTimeout(function () {
          $(_this2.modal).modal('close');
          nextProps.timeout.callback();
        }, nextProps.timeout.time || 5000);
      }
    }
  }, {
    key: 'onModalClose',
    value: function onModalClose() {
      var isValid = this.props.onBeforeClose();
      if (isValid) {
        this.handleModalClose();
      }
    }
  }, {
    key: 'handleModalClose',
    value: function handleModalClose() {
      $(this.modal).modal('close');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          className = _props.className,
          buttonName = _props.buttonName,
          cancelButton = _props.cancelButton;


      return _react2.default.createElement(
        'div',
        { className: 'modal ' + (className || ''), ref: function ref(m) {
            _this3.modal = m;
          } },
        this.props.children,
        _react2.default.createElement(
          'div',
          { className: 'modal-footer right-align' },
          _react2.default.createElement(
            'a',
            { onClick: this.onModalClose.bind(this), className: 'btn btn-primary' },
            buttonName || Close
          ),
          cancelButton ? _react2.default.createElement(
            'a',
            { onClick: this.handleModalClose.bind(this), className: 'btn btn-flat' },
            'Cancel'
          ) : null
        )
      );
    }
  }]);

  return Modal;
}(_react.Component);

Modal.defaultProps = {
  onClose: function onClose() {},
  onBeforeClose: function onBeforeClose() {
    return true;
  }
};

exports.default = Modal;

});

require.register("js/components/NodeStars.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Stars = function Stars(props) {
  var stars = props.stars;


  if (!stars || _lodash2.default.isEmpty(stars) || _lodash2.default.isNaN(stars)) {
    return _react2.default.createElement('span', null);
  }

  var starNodes = _lodash2.default.times(stars, function (i) {
    return _react2.default.createElement(
      'i',
      { className: 'material-icons', key: i },
      'star'
    );
  });

  return _react2.default.createElement(
    'span',
    { className: 'stars' },
    starNodes
  );
};

exports.default = Stars;

});

require.register("js/components/SearchBar.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchBar = function (_Component) {
  _inherits(SearchBar, _Component);

  function SearchBar() {
    _classCallCheck(this, SearchBar);

    return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
  }

  _createClass(SearchBar, [{
    key: 'onChangeEvent',
    value: function onChangeEvent(onChange, evt) {
      onChange(evt, evt.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onChange = _props.onChange,
          defaultValue = _props.defaultValue,
          helpText = _props.helpText;


      return _react2.default.createElement(
        'div',
        { className: 'search-bar' },
        _react2.default.createElement(
          'div',
          { className: 'input-field' },
          _react2.default.createElement('input', { type: 'text', id: 'search', defaultValue: defaultValue,
            onChange: this.onChangeEvent.bind(this, onChange) }),
          _react2.default.createElement(
            'label',
            { htmlFor: 'search' },
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'search'
            ),
            'Search'
          )
        ),
        helpText ? _react2.default.createElement(
          'p',
          { className: 'help-text' },
          helpText
        ) : null
      );
    }
  }]);

  return SearchBar;
}(_react.Component);

exports.default = SearchBar;

});

require.register("js/components/SettingsModal.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAudioPlayer = require('react-audio-player');

var _reactAudioPlayer2 = _interopRequireDefault(_reactAudioPlayer);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _pageActions = require('../actions/pageActions');

var _settingsActions = require('../actions/settingsActions');

var _sounds = require('../static/sounds');

var _sounds2 = _interopRequireDefault(_sounds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SettingsModal = function (_Component) {
  _inherits(SettingsModal, _Component);

  function SettingsModal(props) {
    _classCallCheck(this, SettingsModal);

    var _this = _possibleConstructorReturn(this, (SettingsModal.__proto__ || Object.getPrototypeOf(SettingsModal)).call(this, props));

    _this.onUpdateSetting = _this.onUpdateSetting.bind(_this);
    return _this;
  }

  _createClass(SettingsModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      $(this.modal).modal({
        dismissable: true,
        complete: this.onModalClose.bind(this)
      });

      $(this.select).on('change', function (evt) {
        _this2.onUpdateSetting('alarm_sound', evt);
      }).material_select();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.modal === true) {
        $(this.modal).modal('open');
      }
    }
  }, {
    key: 'handleToggleModal',
    value: function handleToggleModal() {
      $(this.modal).modal('close');
    }
  }, {
    key: 'onModalClose',
    value: function onModalClose() {
      this.props.toggleModal();
    }
  }, {
    key: 'onUpdateSetting',
    value: function onUpdateSetting(name, evt) {
      var setting = {};
      var val = evt.target.value;

      switch (name) {
        case 'alarm_hour':
        case 'alarm_style':
        case 'alarm_sound':
          setting[name] = val;
          break;
        case 'no_alarm':
          setting[name] = evt.target.checked;
          break;
        default:
      }

      if (name === 'alarm_style' && val === 'desktop' && Notification && Notification.permission !== 'granted') {
        Notification.requestPermission();
      }

      this.props.updateSetting(setting);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          modal = _props.modal,
          toggleModal = _props.toggleModal,
          className = _props.className,
          settings = _props.settings;
      var onUpdateSetting = this.onUpdateSetting;


      var alarmSound = void 0;
      if (settings.alarm_sound && settings.alarm_sound !== 'none') {
        alarmSound = (0, _lodash.find)(_sounds2.default, { name: settings.alarm_sound });
      }

      return _react2.default.createElement(
        'div',
        { className: 'settings-modal-container ' + className },
        _react2.default.createElement(
          'a',
          { onClick: toggleModal, className: 'toggle-btn btn btn-small btn-secondary' },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'settings'
          ),
          'settings'
        ),
        _react2.default.createElement(
          'div',
          { className: 'modal modal-fixed-footer settings-modal', ref: function ref(modal) {
              _this3.modal = modal;
            } },
          _react2.default.createElement(
            'div',
            { className: 'modal-content' },
            _react2.default.createElement(
              'h3',
              null,
              'Watch Settings'
            ),
            _react2.default.createElement(
              'div',
              { className: 'row settings-group' },
              _react2.default.createElement(
                'div',
                { className: 'col s12' },
                _react2.default.createElement(
                  'h4',
                  null,
                  'Notification Time'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col s8' },
                _react2.default.createElement(
                  'span',
                  null,
                  'Eorzean Hours Notice: '
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field inline' },
                  _react2.default.createElement('input', { type: 'number', id: 'alarm_hour',
                    disabled: settings.no_alarm ? true : false,
                    defaultValue: settings.alarm_hour || 0,
                    onChange: function onChange(evt) {
                      onUpdateSetting('alarm_hour', evt);
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'alarm_hour' },
                    'Hours Notice'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'input-field col s3' },
                _react2.default.createElement('input', { id: 'no_alarm', type: 'checkbox', value: 'no_alarm',
                  defaultChecked: settings.no_alarm || false,
                  onChange: function onChange(evt) {
                    onUpdateSetting('no_alarm', evt);
                  } }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'no_alarm' },
                  'None (disable)'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row settings-group' },
              _react2.default.createElement(
                'div',
                { className: 'col s12' },
                _react2.default.createElement(
                  'h4',
                  null,
                  'Notice Style'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'input-radio-group clearfix' },
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s4' },
                  _react2.default.createElement('input', { type: 'radio', name: 'alarm_style', id: 'alarm_style_1', value: 'none',
                    defaultChecked: settings.alarm_style === 'none',
                    onChange: function onChange(evt) {
                      onUpdateSetting('alarm_style', evt);
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'alarm_style_1' },
                    'None'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s4' },
                  _react2.default.createElement('input', { type: 'radio', name: 'alarm_style', id: 'alarm_style_2', value: 'popup',
                    defaultChecked: settings.alarm_style === 'popup',
                    onChange: function onChange(evt) {
                      onUpdateSetting('alarm_style', evt);
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'alarm_style_2' },
                    'In-Window Pop Up'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s4' },
                  _react2.default.createElement('input', { type: 'radio', name: 'alarm_style', id: 'alarm_style_3', value: 'desktop',
                    defaultChecked: settings.alarm_style === 'desktop',
                    onChange: function onChange(evt) {
                      onUpdateSetting('alarm_style', evt);
                    } }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'alarm_style_3' },
                    'Desktop Notification ',
                    _react2.default.createElement('br', null),
                    '(needs permission)'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row settings-group' },
              _react2.default.createElement(
                'div',
                { className: 'col s12' },
                _react2.default.createElement(
                  'h4',
                  null,
                  'Alert Sound'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'input-field col s4' },
                _react2.default.createElement(
                  'select',
                  { name: 'alarm_sound', id: 'alarm_sound', ref: function ref(sel) {
                      _this3.select = sel;
                    },
                    defaultValue: settings.alarm_sound || 'none' },
                  _react2.default.createElement(
                    'option',
                    { value: 'none', disabled: true },
                    'No Sound'
                  ),
                  _sounds2.default.map(function (sound) {
                    return _react2.default.createElement(
                      'option',
                      { value: sound.name, key: sound.name },
                      sound.name
                    );
                  })
                ),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'alarm_sound' },
                  'Sound Effect'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col s4' },
                _react2.default.createElement(
                  'div',
                  { className: 'sound-preview' },
                  alarmSound ? _react2.default.createElement(_reactAudioPlayer2.default, { src: '/sound/' + alarmSound.filename, controls: true }) : null
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-footer' },
            _react2.default.createElement(
              'div',
              { className: 'right-align' },
              _react2.default.createElement(
                'a',
                { onClick: this.handleToggleModal.bind(this), className: 'btn btn-default' },
                'Done'
              )
            )
          )
        )
      );
    }
  }]);

  return SettingsModal;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    modal: state.page.modal,
    settings: state.settings
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleModal: function toggleModal() {
      return dispatch((0, _pageActions.toggleModal)());
    },
    updateSetting: function updateSetting(setting) {
      return dispatch((0, _settingsActions.updateSetting)(setting));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SettingsModal);

});

require.register("js/components/TimerModal.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _pageActions = require('../actions/pageActions');

var _customListActions = require('../actions/customListActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewTimerModal = function (_Component) {
  _inherits(NewTimerModal, _Component);

  function NewTimerModal(props) {
    _classCallCheck(this, NewTimerModal);

    var _this = _possibleConstructorReturn(this, (NewTimerModal.__proto__ || Object.getPrototypeOf(NewTimerModal)).call(this, props));

    _this.state = Object.assign({}, {
      isNew: props.timer ? false : true,
      name: 'My Custom Timer',
      time_hour: '12',
      time_minute: '00',
      meridien: 'AM',
      dur_hours: '0',
      dur_minutes: '55'
    }, props.timer || {});

    _this.handleOpenModal = _this.handleOpenModal.bind(_this);
    _this.handleCloseModal = _this.handleCloseModal.bind(_this);
    _this.handleTimerSave = _this.handleTimerSave.bind(_this);
    return _this;
  }

  _createClass(NewTimerModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(this.modal).modal({
        dismissable: false
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.open === true) {
        $(this.modal).modal('open');
      }
    }
  }, {
    key: 'handleOpenModal',
    value: function handleOpenModal() {
      $(this.modal).modal('open');
    }
  }, {
    key: 'handleCloseModal',
    value: function handleCloseModal() {
      $(this.modal).modal('close');
    }
  }, {
    key: 'handleChange',
    value: function handleChange(name, evt) {
      var setting = {};
      var val = evt.target.value;

      setting[name] = val;

      this.setState(setting);
    }
  }, {
    key: 'handleTimerSave',
    value: function handleTimerSave(evt) {
      var _state = this.state,
          isNew = _state.isNew,
          name = _state.name,
          location = _state.location,
          slot = _state.slot,
          level = _state.level,
          x = _state.x,
          y = _state.y,
          time_hour = _state.time_hour,
          time_minute = _state.time_minute,
          meridien = _state.meridien,
          dur_hours = _state.dur_hours,
          dur_minutes = _state.dur_minutes,
          notes = _state.notes;


      var result = Object.assign({}, {
        name: name,
        location: location,
        slot: slot,
        x: x, y: y,
        time_hour: time_hour,
        time_minute: time_minute,
        meridien: meridien,
        dur_hours: dur_hours,
        dur_minutes: dur_minutes,
        notes: notes
      }, {
        type: 'custom',
        level: level || 70,
        pos: x && y ? 'x' + x + ' y' + y : null,
        time: (time_hour || 12) + ':' + (time_minute || '00') + ' ' + (meridien || 'AM'),
        duration: (dur_hours || 0) + ':' + (dur_minutes || 55)
      });

      if (isNew) {
        this.props.addCustomNode(result);
      } else {
        this.props.editCustomNode(result);
      }
      this.handleCloseModal();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var className = this.props.className;
      var handleChange = this.handleChange,
          handleTimerSave = this.handleTimerSave,
          handleOpenModal = this.handleOpenModal,
          handleCloseModal = this.handleCloseModal;
      var isNew = this.state.isNew;


      return _react2.default.createElement(
        'div',
        { className: 'timer-edit-container ' + (className || 'right-align') },
        !isNew ? _react2.default.createElement(
          'a',
          { className: 'edit-btn', onClick: handleOpenModal },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'edit'
          )
        ) : _react2.default.createElement(
          'a',
          { className: 'btn btn-default add-timer-btn', onClick: handleOpenModal },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'add'
          ),
          !isNew ? 'Edit' : 'New',
          ' Timer'
        ),
        _react2.default.createElement(
          'div',
          { className: 'modal modal-fixed-footer new-timer-modal left-align', ref: function ref(modal) {
              _this2.modal = modal;
            } },
          _react2.default.createElement(
            'div',
            { className: 'modal-content' },
            _react2.default.createElement(
              'form',
              { ref: function ref(form) {
                  _this2.form = form;
                } },
              _react2.default.createElement(
                'h3',
                null,
                'New Timer'
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s12' },
                  _react2.default.createElement('input', { type: 'text', name: 'name', defaultValue: this.state.name,
                    onChange: handleChange.bind(this, 'name') }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'name' },
                    'Name'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s12' },
                  _react2.default.createElement('input', { type: 'text', name: 'location', onChange: handleChange.bind(this, 'location'),
                    defaultValue: this.state.location }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'location' },
                    'Location'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col s12' },
                  _react2.default.createElement(
                    'h5',
                    null,
                    'Level, Slot, Position'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s2' },
                  _react2.default.createElement('input', { type: 'number', name: 'level',
                    defaultValue: this.state.level,
                    onChange: handleChange.bind(this, 'level') }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'level' },
                    'Level'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s2' },
                  _react2.default.createElement('input', { type: 'text', name: 'slot', defaultValue: this.state.slot,
                    onChange: handleChange.bind(this, 'slot') }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'slot' },
                    'Slot'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col s6 position-fields' },
                  _react2.default.createElement(
                    'span',
                    { className: '' },
                    'Position: '
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'input-field inline' },
                    _react2.default.createElement('input', { type: 'number', name: 'x',
                      defaultValue: this.state.x,
                      onChange: handleChange.bind(this, 'x') }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'x' },
                      'x'
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'input-field inline' },
                    _react2.default.createElement('input', { type: 'number', name: 'y',
                      defaultValue: this.state.y,
                      onChange: handleChange.bind(this, 'y') }),
                    _react2.default.createElement(
                      'label',
                      { htmlFor: 'y' },
                      'y'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col s12' },
                  _react2.default.createElement(
                    'h5',
                    null,
                    'Time'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s3' },
                  _react2.default.createElement('input', { type: 'number', name: 'time_hour', defaultValue: this.state.time_hour,
                    onChange: handleChange.bind(this, 'time_hour') }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'time_hour' },
                    'hour'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s3' },
                  _react2.default.createElement('input', { type: 'number', name: 'time_minute', defaultValue: this.state.time_minute,
                    onChange: handleChange.bind(this, 'time_minute') }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'time_minute' },
                    'minute'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s3' },
                  _react2.default.createElement(
                    'select',
                    { name: 'meridien', id: '', className: 'browser-default',
                      defaultValue: this.state.meridien,
                      onChange: handleChange.bind(this, 'meridien') },
                    _react2.default.createElement(
                      'option',
                      { value: 'am' },
                      'AM'
                    ),
                    _react2.default.createElement(
                      'option',
                      { value: 'pm' },
                      'PM'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col s12' },
                  _react2.default.createElement(
                    'h5',
                    null,
                    'Duration'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s3' },
                  _react2.default.createElement('input', { type: 'number', name: 'dur_hours', defaultValue: this.state.dur_hours,
                    onChange: handleChange.bind(this, 'dur_hours') }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'dur_hours' },
                    'Hours'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'input-field col s3' },
                  _react2.default.createElement('input', { type: 'number', name: 'dur_minutes', defaultValue: this.state.dur_minutes,
                    onChange: handleChange.bind(this, 'dur_minutes') }),
                  _react2.default.createElement(
                    'label',
                    { htmlFor: 'dur_minutes' },
                    'Minutes'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'div',
                  { className: 'col s12 input-field' },
                  _react2.default.createElement(
                    'h5',
                    null,
                    'Notes'
                  ),
                  _react2.default.createElement('textarea', { className: 'materialize-textarea', name: 'notes', defaultValue: this.state.notes,
                    id: '', cols: '30', rows: '10', onChange: handleChange.bind(this, 'notes') })
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-footer' },
            _react2.default.createElement(
              'div',
              { className: 'right-align' },
              _react2.default.createElement(
                'a',
                { onClick: handleTimerSave, className: 'btn btn-default' },
                'Save'
              ),
              _react2.default.createElement(
                'a',
                { onClick: handleCloseModal, className: 'btn btn-flat' },
                'Cancel'
              )
            )
          )
        )
      );
    }
  }]);

  return NewTimerModal;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addCustomNode: function addCustomNode(node) {
      return dispatch((0, _customListActions.addCustomNode)(node));
    },
    editCustomNode: function editCustomNode(node) {
      return dispatch((0, _customListActions.editCustomNode)(node));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NewTimerModal);

});

require.register("js/components/WatchGroupModal.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _watchGroupsActions = require('../actions/watchGroupsActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WatchGroupModal = function (_Component) {
  _inherits(WatchGroupModal, _Component);

  function WatchGroupModal(props) {
    _classCallCheck(this, WatchGroupModal);

    var _this = _possibleConstructorReturn(this, (WatchGroupModal.__proto__ || Object.getPrototypeOf(WatchGroupModal)).call(this, props));

    _this.state = {
      open: false,
      isNew: props.group ? false : true,
      nodes: props.group ? [].concat(_toConsumableArray(props.group.nodes)) : [].concat(_toConsumableArray(props.watchlist)),
      name: props.group ? props.group.name : null,
      id: props.group ? props.group.id : null
    };
    return _this;
  }

  _createClass(WatchGroupModal, [{
    key: 'handleOpenModal',
    value: function handleOpenModal() {
      this.setState({ open: true });
    }
  }, {
    key: 'handleCloseModal',
    value: function handleCloseModal() {
      this.setState({ open: false });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(name, evt) {
      var setting = {};
      var val = evt.target.value;

      setting[name] = val;

      this.setState(setting);
    }
  }, {
    key: 'handleRemoveNode',
    value: function handleRemoveNode(id) {
      var list = [].concat(_toConsumableArray(this.state.nodes));
      var existsAt = (0, _lodash.indexOf)(list, id);

      list.splice(existsAt, 1);

      this.setState({ nodes: list });
    }
  }, {
    key: 'handleOnSave',
    value: function handleOnSave() {
      var _state = this.state,
          name = _state.name,
          nodes = _state.nodes,
          id = _state.id,
          isNew = _state.isNew;


      if (!nodes.length || (0, _lodash.isEmpty)(name)) {
        return this.setState({ error: 'You must have at least 1 node, and a name to save.' });
      }

      if (isNew) {
        this.props.createGroup({ name: name, nodes: nodes });
      } else {
        this.props.updateGroup({ name: name, nodes: nodes, id: id });
      }
      this.setState({ error: false, open: false });

      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          nodelist = _props.nodelist,
          customlist = _props.customlist,
          watchlist = _props.watchlist;
      var _state2 = this.state,
          open = _state2.open,
          nodes = _state2.nodes,
          isNew = _state2.isNew,
          error = _state2.error;


      var fullList = (0, _lodash.union)(nodelist, customlist);

      return _react2.default.createElement(
        'div',
        { className: '' + (className || '') },
        !isNew ? _react2.default.createElement(
          'a',
          { className: 'edit-btn', onClick: this.handleOpenModal.bind(this) },
          _react2.default.createElement(
            'i',
            { className: 'material-icons' },
            'edit'
          )
        ) : _react2.default.createElement(
          'a',
          { onClick: this.handleOpenModal.bind(this), className: 'btn btn-flat' },
          'Save List As ...'
        ),
        open ? _react2.default.createElement(
          _Modal2.default,
          { open: open, buttonName: 'Save', className: 'modal-fixed-footer',
            onClose: this.handleCloseModal.bind(this),
            onBeforeClose: this.handleOnSave.bind(this), cancelButton: true },
          _react2.default.createElement(
            'div',
            { className: 'watch-group-create-container modal-content' },
            error ? _react2.default.createElement(
              'p',
              { className: 'error-message' },
              error
            ) : null,
            _react2.default.createElement(
              'div',
              { className: 'input-field' },
              _react2.default.createElement('input', { type: 'text', name: 'name', defaultValue: this.state.name,
                onChange: this.handleChange.bind(this, 'name') }),
              _react2.default.createElement(
                'label',
                { htmlFor: 'name' },
                'List Group Name:'
              )
            ),
            _react2.default.createElement(
              'h4',
              null,
              'Timers:'
            ),
            _react2.default.createElement(
              'div',
              { className: 'watch-items' },
              nodes.map(function (id) {
                var node = (0, _lodash.find)(fullList, { id: id });
                return node ? _react2.default.createElement(
                  'div',
                  { className: 'node-item clearfix', key: node.id },
                  _react2.default.createElement(
                    'div',
                    { className: 'left' },
                    node.name,
                    ' ',
                    node.time
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'right' },
                    _react2.default.createElement(
                      'a',
                      { className: 'delete-btn', onClick: _this2.handleRemoveNode.bind(_this2, node.id) },
                      _react2.default.createElement(
                        'i',
                        { className: 'material-icons' },
                        'close'
                      )
                    )
                  )
                ) : null;
              })
            )
          )
        ) : null
      );
    }
  }]);

  return WatchGroupModal;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    watchlist: state.watchlist.nodes,
    customlist: state.customlist,
    nodelist: state.nodelist.nodes
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    createGroup: function createGroup(group) {
      return dispatch((0, _watchGroupsActions.createGroup)(group));
    },
    updateGroup: function updateGroup(group) {
      return dispatch((0, _watchGroupsActions.updateGroup)(group));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WatchGroupModal);

});

require.register("js/components/WatchGroupSelect.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _watchListActions = require('../actions/watchListActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WatchGroupSelect = function (_Component) {
  _inherits(WatchGroupSelect, _Component);

  function WatchGroupSelect() {
    _classCallCheck(this, WatchGroupSelect);

    return _possibleConstructorReturn(this, (WatchGroupSelect.__proto__ || Object.getPrototypeOf(WatchGroupSelect)).apply(this, arguments));
  }

  _createClass(WatchGroupSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(this.dropdown).dropdown({
        constrainWidth: false,
        belowOrigin: true
      });
    }
  }, {
    key: 'handleDropdown',
    value: function handleDropdown() {
      $(this.dropdown).dropdown('open');
    }
  }, {
    key: 'handleGroupSelect',
    value: function handleGroupSelect(list) {
      this.props.replaceList(list);

      $(this.dropdown).dropdown('close');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          watchgroups = _props.watchgroups,
          className = _props.className;


      return _react2.default.createElement(
        'div',
        { className: (className || '') + ' watchgroup-select-container' },
        _react2.default.createElement(
          'a',
          { className: 'btn btn-flat', ref: function ref(a) {
              _this2.dropdown = a;
            },
            onClick: this.handleDropdown.bind(this),
            'data-activates': 'load-list' },
          'Load List'
        ),
        _react2.default.createElement(
          'ul',
          { name: 'load-list', id: 'load-list', className: 'dropdown-content' },
          watchgroups.map(function (group) {
            return _react2.default.createElement(
              'li',
              { key: group.id },
              _react2.default.createElement(
                'a',
                { onClick: _this2.handleGroupSelect.bind(_this2, group.nodes) },
                group.name
              )
            );
          })
        )
      );
    }
  }]);

  return WatchGroupSelect;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    watchgroups: state.watchgroups
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    replaceList: function replaceList(list) {
      return dispatch((0, _watchListActions.replaceList)(list));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WatchGroupSelect);

});

require.register("js/containers/About.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var googleSheetsLink = "https://docs.google.com/spreadsheets/d/1pqaKo0TM2rJghWWXqOQIqCueJvFV2dPuZUQnNrsRmt8/edit?usp=sharing";

var About = function About(props) {
  return _react2.default.createElement(
    'div',
    { className: 'about-page' },
    _react2.default.createElement(
      'div',
      { className: 'col-md-12' },
      _react2.default.createElement(
        'h2',
        null,
        'Eorzea Timers - An Open Source Project.'
      ),
      _react2.default.createElement(
        'h3',
        { className: 'bordered-header' },
        'Version: ',
        props.version,
        _react2.default.createElement(
          'span',
          { className: 'small' },
          '(',
          _react2.default.createElement(
            'a',
            { target: '_blank', href: 'https://github.com/tnbKristi/eorzea_timers/releases' },
            'release notes'
          ),
          ')'
        )
      ),
      _react2.default.createElement(
        'p',
        null,
        'Please report bugs and data errors at the Github repository',
        _react2.default.createElement(
          'a',
          { target: '_blank', href: 'https://github.com/tnbKristi/eorzea_timers' },
          ' here'
        ),
        ', or contribute to the code via pull request.',
        _react2.default.createElement('br', null),
        'Keep in mind I am a real human with a job, and disrespectful comments & angry demands will be ignored.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Thanks for your kind support and appreciation for this project.'
      ),
      _react2.default.createElement(
        'h2',
        null,
        'Contribution and Corrections of Data'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Data used in this app is now managed via a public Google Spreadsheet.'
      ),
      _react2.default.createElement(
        'p',
        null,
        _react2.default.createElement(
          'a',
          { href: googleSheetsLink, target: '_blank' },
          'You can view and request additons and corrections here'
        )
      ),
      _react2.default.createElement(
        'h3',
        { className: 'bordered-header' },
        'App Features'
      ),
      _react2.default.createElement(
        'ul',
        { className: 'browser-default' },
        _react2.default.createElement(
          'li',
          null,
          'Uses LocalStorage to save your preferences and watch lists.'
        ),
        _react2.default.createElement(
          'li',
          null,
          'Add your own custom timers! Saved via LocalStorage until you remove them.'
        ),
        _react2.default.createElement(
          'li',
          null,
          'Slots, and x/y coordinates included with all known unspoiled node locations.'
        ),
        _react2.default.createElement(
          'li',
          null,
          'Incredibly easy to update and contribute!',
          _react2.default.createElement(
            'a',
            { target: '_blank', href: 'https://github.com/tnbKristi/eorzea_timers' },
            ' Learn more here.'
          )
        )
      ),
      _react2.default.createElement(
        'h3',
        { className: 'bordered-header' },
        'New for 2.0+!'
      ),
      _react2.default.createElement(
        'ul',
        { className: 'browser-default' },
        _react2.default.createElement(
          'li',
          null,
          'Completely re-written for speed and stability.'
        ),
        _react2.default.createElement(
          'li',
          null,
          'Create and Manage ',
          _react2.default.createElement(
            'b',
            null,
            'Watch Lists'
          ),
          ' - collections of your most commonly watched sets of nodes.'
        ),
        _react2.default.createElement(
          'li',
          null,
          'More data provided for each node.'
        ),
        _react2.default.createElement(
          'li',
          null,
          'Ready to update for 4.0\'s level 70 nodes!'
        )
      ),
      _react2.default.createElement(
        'h3',
        { className: 'bordered-header' },
        'F.A.Q'
      ),
      _react2.default.createElement(
        'h4',
        null,
        'The time seems off by ~3 Eorzean minutes. What\'s up with that?'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Eorzean time is calculated from Epoch time -- one hour is 2 minutes, 55 seconds Earth time. Because of this, sometimes the math that rounds the time up or down can be off by about 30 seconds.'
      ),
      _react2.default.createElement(
        'p',
        null,
        'If your time is off by much more than 3 minutes, your computer/phone\'s time may be off. Check out ',
        _react2.default.createElement(
          'a',
          { href: 'http://time.is/', target: '_blank' },
          ' http://time.is/ '
        ),
        'to see if it\'s a time sync issue.'
      ),
      _react2.default.createElement(
        'h4',
        null,
        'There\'s a bunch of other timers out there. Why make another one?'
      ),
      _react2.default.createElement(
        'p',
        null,
        'A few reasons, actually!'
      ),
      _react2.default.createElement(
        'ul',
        { className: 'browser-default' },
        _react2.default.createElement(
          'li',
          null,
          'I\'m a web developer + huge gathering crazie. I wanted to build something that was exactly what I wanted as I spend a LOT of time gathering and staring at this timer screen. :)'
        ),
        _react2.default.createElement(
          'li',
          null,
          'There isn\'t an open-source project for timers. I\'d rather share my work and hope others help make it better.'
        ),
        _react2.default.createElement(
          'li',
          null,
          'I frankly didn\'t like the look/feel or features of what exists currently!'
        )
      ),
      _react2.default.createElement(
        'p',
        null,
        'I think it\'s great that there are lots of options, and I encourage you to',
        _react2.default.createElement(
          'i',
          null,
          'not'
        ),
        ' use mine if it doesn\'t work for you. :)'
      ),
      _react2.default.createElement(
        'h4',
        null,
        'Can you add [insert feature here]?'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Probably! Please make an suggestion as an issue on the github repo',
        _react2.default.createElement(
          'a',
          { target: '_blank', href: 'https://github.com/tnbKristi/eorzea_timers' },
          ' here'
        ),
        '!'
      )
    )
  );
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    version: state.version
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(About);

});

require.register("js/containers/CustomContent.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _TimerModal = require('../components/TimerModal');

var _TimerModal2 = _interopRequireDefault(_TimerModal);

var _WatchGroupModal = require('../components/WatchGroupModal');

var _WatchGroupModal2 = _interopRequireDefault(_WatchGroupModal);

var _customListActions = require('../actions/customListActions');

var _watchGroupsActions = require('../actions/watchGroupsActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomContent = function (_Component) {
  _inherits(CustomContent, _Component);

  function CustomContent() {
    _classCallCheck(this, CustomContent);

    return _possibleConstructorReturn(this, (CustomContent.__proto__ || Object.getPrototypeOf(CustomContent)).apply(this, arguments));
  }

  _createClass(CustomContent, [{
    key: 'handleRemoveNode',
    value: function handleRemoveNode(id) {
      this.props.removeCustomNode(id);
    }
  }, {
    key: 'handleRemoveGroup',
    value: function handleRemoveGroup(id) {
      this.props.removeGroup(id);
    }
  }, {
    key: 'renderCustomNode',
    value: function renderCustomNode(node) {
      return _react2.default.createElement(
        'div',
        { className: 'custom-node-item clearfix', key: node.id },
        _react2.default.createElement(
          'div',
          { className: 'left' },
          _react2.default.createElement(
            'div',
            { className: 'name' },
            node.name + ' [' + node.level + ']'
          ),
          _react2.default.createElement(
            'div',
            { className: 'meta' },
            node.time + ' ' + (node.location ? ' • ' + node.location : ''),
            node.slot ? _react2.default.createElement(
              'span',
              { className: 'slot' },
              ' \u2022 slot ' + node.slot
            ) : null,
            node.pos ? _react2.default.createElement(
              'span',
              { className: 'pos' },
              ' \u2022 ' + node.pos
            ) : null
          ),
          node.notes ? _react2.default.createElement(
            'div',
            { className: 'notes' },
            _react2.default.createElement(
              'i',
              null,
              'notes: '
            ),
            _react2.default.createElement('br', null),
            node.notes
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: 'right node-actions' },
          _react2.default.createElement(_TimerModal2.default, { timer: node, className: 'inline-block' }),
          _react2.default.createElement(
            'a',
            { className: 'delete-btn', onClick: this.handleRemoveNode.bind(this, node.id) },
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'close'
            )
          )
        )
      );
    }
  }, {
    key: 'renderWatchGroup',
    value: function renderWatchGroup(group) {
      return _react2.default.createElement(
        'div',
        { className: 'watch-group-item clearfix', key: group.id },
        _react2.default.createElement(
          'div',
          { className: 'left' },
          _react2.default.createElement(
            'h4',
            null,
            group.name,
            ' \u2022 ',
            _react2.default.createElement(
              'small',
              null,
              group.nodes.length,
              ' timers'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'right actions' },
          _react2.default.createElement(
            'div',
            { className: 'right node-actions' },
            _react2.default.createElement(_WatchGroupModal2.default, { group: group, className: 'inline-block' }),
            _react2.default.createElement(
              'a',
              { className: 'delete-btn', onClick: this.handleRemoveGroup.bind(this, group.id) },
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'close'
              )
            )
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          customlist = _props.customlist,
          watchgroups = _props.watchgroups;


      return _react2.default.createElement(
        'div',
        { className: 'custom-content-container' },
        _react2.default.createElement(
          'div',
          { className: 'header' },
          _react2.default.createElement(_TimerModal2.default, null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'custom-node-list' },
          _react2.default.createElement(
            'h3',
            null,
            'Custom Timers'
          ),
          customlist.length ? _react2.default.createElement(
            'div',
            null,
            customlist.map(function (item) {
              return _this2.renderCustomNode(item);
            })
          ) : _react2.default.createElement(
            'div',
            { className: 'empty-list' },
            _react2.default.createElement(
              'p',
              null,
              'No Custom Timers Yet.'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'watchgroup-list' },
          _react2.default.createElement(
            'h3',
            null,
            'Watch Groups'
          ),
          watchgroups.length ? _react2.default.createElement(
            'div',
            null,
            watchgroups.map(function (group) {
              return _this2.renderWatchGroup(group);
            })
          ) : _react2.default.createElement(
            'div',
            { className: 'empty-list' },
            _react2.default.createElement(
              'p',
              null,
              'No Watch Groups Created Yet.'
            )
          )
        )
      );
    }
  }]);

  return CustomContent;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    customlist: state.customlist,
    watchgroups: state.watchgroups
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    removeCustomNode: function removeCustomNode(id) {
      return dispatch((0, _customListActions.removeCustomNode)(id));
    },
    removeGroup: function removeGroup(id) {
      return dispatch((0, _watchGroupsActions.removeGroup)(id));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CustomContent);

});

require.register("js/containers/DevTools.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxDevtools = require('redux-devtools');

var _reduxDevtoolsLogMonitor = require('redux-devtools-log-monitor');

var _reduxDevtoolsLogMonitor2 = _interopRequireDefault(_reduxDevtoolsLogMonitor);

var _reduxDevtoolsDockMonitor = require('redux-devtools-dock-monitor');

var _reduxDevtoolsDockMonitor2 = _interopRequireDefault(_reduxDevtoolsDockMonitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// createDevTools takes a monitor and produces a DevTools component


// Monitors are separate packages, and you can make a custom one
var DevTools = (0, _reduxDevtools.createDevTools)(
// Monitors are individually adjustable with props.
// Consult their repositories to learn about those props.
// Here, we put LogMonitor inside a DockMonitor.
// Note: DockMonitor is visible by default.
_react2.default.createElement(
  _reduxDevtoolsDockMonitor2.default,
  { toggleVisibilityKey: 'ctrl-h',
    changePositionKey: 'ctrl-q',
    defaultIsVisible: true },
  _react2.default.createElement(_reduxDevtoolsLogMonitor2.default, { theme: 'tomorrow' })
));

// Exported from redux-devtools
exports.default = DevTools;
s;

});

require.register("js/containers/Home.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _NodeList = require('../modules/NodeList');

var _NodeList2 = _interopRequireDefault(_NodeList);

var _searchActions = require('../actions/searchActions');

var _SearchBar = require('../components/SearchBar');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _FilterMenu = require('../components/FilterMenu');

var _FilterMenu2 = _interopRequireDefault(_FilterMenu);

var _TimerModal = require('../components/TimerModal');

var _TimerModal2 = _interopRequireDefault(_TimerModal);

var _nodeListActions = require('../actions/nodeListActions');

var _pageActions = require('../actions/pageActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(this.tabMenu).tabs();

      try {
        Materialize.updateTextFields();
      } catch (e) {}
    }
  }, {
    key: 'itemIcon',
    value: function itemIcon(item) {
      return _react2.default.createElement('i', { className: 'icon icon-' + item + ' icon-xs' });
    }
  }, {
    key: 'featureIcon',
    value: function featureIcon(item) {
      var icon = void 0;
      var content = void 0;
      switch (item) {
        case 'is_collectable':
          icon = 'icon-collectable';
          break;
        case 'is_ephemeral':
          icon = 'material-icons';
          content = 'book';
          break;
        case 'red_scrip':
          icon = 'icon-red-scrip';
          break;
        case 'blue_scrip':
          icon = 'icon-blue-scrip';
          break;
        default:
          break;
      }

      return _react2.default.createElement(
        'i',
        { className: 'icon ' + icon + ' icon-sm' },
        content
      );
    }
  }, {
    key: 'handleFilterChange',
    value: function handleFilterChange(name, value) {
      var _props = this.props,
          typeFilter = _props.typeFilter,
          levelFilter = _props.levelFilter,
          featureFilter = _props.featureFilter;


      switch (name) {
        case 'type':
          typeFilter(value);
          break;

        case 'level':
          levelFilter(value);
          break;
        case 'feature':
          featureFilter(value);
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          search = _props2.search,
          availableFilters = _props2.availableFilters,
          filterByType = _props2.filterByType,
          filterByLevel = _props2.filterByLevel,
          featureFilters = _props2.featureFilters,
          searchValue = _props2.searchValue;


      var filterValues = {
        type: filterByType,
        level: filterByLevel,
        feature: featureFilters
      };

      var itemIcon = this.itemIcon,
          featureIcon = this.featureIcon,
          onSearchChange = this.onSearchChange,
          handleFilterChange = this.handleFilterChange,
          handleAddTimer = this.handleAddTimer;


      return _react2.default.createElement(
        'div',
        { className: 'home-container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col m8' },
            _react2.default.createElement(_SearchBar2.default, { onChange: search, defaultValue: searchValue,
              helpText: "Search by Name or Location" })
          ),
          _react2.default.createElement(
            'div',
            { className: 'col m4' },
            _react2.default.createElement(_TimerModal2.default, null)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(_FilterMenu2.default, { className: 'node-list-filters', values: filterValues,
            onChange: handleFilterChange.bind(this), filters: availableFilters })
        ),
        _react2.default.createElement(_NodeList2.default, null)
      );
    }
  }]);

  return Home;
}(_react.Component);

;

var mapStateToProps = function mapStateToProps(state) {
  return {
    filterByType: state.nodelist.filterByType,
    filterByLevel: state.nodelist.filterByLevel,
    featureFilters: state.nodelist.featureFilters,
    availableFilters: state.nodelist.filters,
    searchValue: state.search
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    search: function search(e, value) {
      return dispatch((0, _searchActions.search)(value));
    },
    typeFilter: function typeFilter(value) {
      return dispatch((0, _nodeListActions.filterTypeNodeList)(value));
    },
    levelFilter: function levelFilter(value) {
      return dispatch((0, _nodeListActions.filterLevelNodeList)(value));
    },
    featureFilter: function featureFilter(value) {
      return dispatch((0, _nodeListActions.toggleFeatureFilter)(value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Home);

});

require.register("js/containers/WatchList.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _reactRouterDom = require('react-router-dom');

var _SettingsModal = require('../components/SettingsModal');

var _SettingsModal2 = _interopRequireDefault(_SettingsModal);

var _WatchGroupSelect = require('../components/WatchGroupSelect');

var _WatchGroupSelect2 = _interopRequireDefault(_WatchGroupSelect);

var _WatchGroupModal = require('../components/WatchGroupModal');

var _WatchGroupModal2 = _interopRequireDefault(_WatchGroupModal);

var _watchListActions = require('../actions/watchListActions');

var _timeUtils = require('../utils/timeUtils');

var _WatchListItem = require('../modules/WatchListItem');

var _WatchListItem2 = _interopRequireDefault(_WatchListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WatchList = function (_Component) {
  _inherits(WatchList, _Component);

  function WatchList(props) {
    _classCallCheck(this, WatchList);

    var _this = _possibleConstructorReturn(this, (WatchList.__proto__ || Object.getPrototypeOf(WatchList)).call(this, props));

    _this.sortNodes = _this.sortNodes.bind(_this);
    return _this;
  }

  _createClass(WatchList, [{
    key: 'sortNodes',
    value: function sortNodes() {
      var _props = this.props,
          watchlist = _props.watchlist,
          customlist = _props.customlist,
          nodelist = _props.nodelist,
          clock = _props.clock;


      var fullList = (0, _lodash.union)(nodelist.nodes || [], customlist);
      if (!fullList.length) {
        return [];
      }

      var list = (0, _lodash.filter)(fullList, function (node) {
        return (0, _lodash.indexOf)(watchlist, node.id) >= 0 ? true : false;
      });

      return (0, _lodash.sortBy)(list, function (node) {
        var active = (0, _timeUtils.isActive)(clock.time, node.time, node.duration),
            timeUntil = (0, _timeUtils.getEarthTimeUntil)(node.time, clock.time),
            timeRemaining = (0, _timeUtils.getEarthTimeRemaining)(node.time, node.duration, clock.time);

        if (active) {
          return timeRemaining.hours * 60 + timeRemaining.minutes - 1000;
        } else {
          return timeUntil.hours * 60 + timeUntil.minutes;
        }
      });
    }
  }, {
    key: 'handleCreateWatchgroup',
    value: function handleCreateWatchgroup() {
      var group = {
        name: '',
        nodes: [].concat(_toConsumableArray(this.props.watchlist))
      };

      this.props.createGroup(group);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          watchlist = _props2.watchlist,
          watchgroups = _props2.watchgroups,
          modal = _props2.modal;


      var flex = watchlist.length >= 2;

      return _react2.default.createElement(
        'div',
        { className: 'watchlist-container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col s9' },
            _react2.default.createElement(_SettingsModal2.default, { className: 'left' }),
            watchlist.length ? _react2.default.createElement(_WatchGroupModal2.default, { className: 'left' }) : null,
            watchgroups.length ? _react2.default.createElement(_WatchGroupSelect2.default, { className: 'left' }) : null
          ),
          _react2.default.createElement(
            'div',
            { className: 'col s3 right-align' },
            _react2.default.createElement(
              'a',
              { onClick: this.props.clearAll, className: 'btn btn-small btn-default' },
              'clear all'
            )
          )
        ),
        watchlist.length ? _react2.default.createElement(
          'div',
          { className: 'row watchlist-list flex' },
          this.sortNodes().map(function (node, i) {
            return _react2.default.createElement(_WatchListItem2.default, { key: node.id, className: 'col', node: node });
          })
        ) : _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col s12' },
            _react2.default.createElement(
              'h3',
              null,
              'Your watch list is empty!'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Add items from a saved group, or a search on the ',
              _react2.default.createElement(
                _reactRouterDom.NavLink,
                { to: '/' },
                'homepage'
              ),
              '.'
            )
          )
        )
      );
    }
  }]);

  return WatchList;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    nodelist: state.nodelist,
    customlist: state.customlist,
    watchlist: state.watchlist.nodes,
    watchgroups: state.watchgroups,
    clock: state.clock
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    clearAll: function clearAll() {
      return dispatch((0, _watchListActions.clearAll)());
    },
    toggleModal: function (_toggleModal) {
      function toggleModal() {
        return _toggleModal.apply(this, arguments);
      }

      toggleModal.toString = function () {
        return _toggleModal.toString();
      };

      return toggleModal;
    }(function () {
      return dispatch(toggleModal());
    }),
    createGroup: function (_createGroup) {
      function createGroup(_x) {
        return _createGroup.apply(this, arguments);
      }

      createGroup.toString = function () {
        return _createGroup.toString();
      };

      return createGroup;
    }(function (group) {
      return dispatch(createGroup());
    })
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WatchList);

});

require.register("js/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _lodash = require('lodash');

var _isdev = require('isdev');

var _isdev2 = _interopRequireDefault(_isdev);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _storageUtils = require('./utils/storageUtils');

var _timeUtils = require('./utils/timeUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var persistedState = (0, _storageUtils.loadState)() || {};

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;
var enhancer = composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default));

var store = (0, _redux.createStore)(_reducers2.default, (0, _lodash.assign)({}, persistedState, {
  clock: (0, _timeUtils.setTime)()
}), enhancer);

store.subscribe((0, _lodash.throttle)(function () {
  (0, _storageUtils.saveState)({
    version: store.getState().version,
    watchgroups: store.getState().watchgroups,
    settings: store.getState().settings,
    watchlist: store.getState().watchlist,
    customlist: store.getState().customlist
  });
}, 1000));

var Root = function Root(props) {
  return _react2.default.createElement(_App2.default, { store: store });
};

exports.default = Root;

});

require.register("js/modules/Node.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _timeUtils = require('../utils/timeUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = function (_Component) {
  _inherits(Node, _Component);

  function Node(props) {
    _classCallCheck(this, Node);

    return _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this, props));
  }

  _createClass(Node, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: '' + this.props.className },
        this.props.children
      );
    }
  }]);

  return Node;
}(_react.Component);

exports.default = Node;

});

require.register("js/modules/NodeList.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _NodeListItem = require('./NodeListItem');

var _NodeListItem2 = _interopRequireDefault(_NodeListItem);

var _timeUtils = require('../utils/timeUtils');

var _searchUtils = require('../utils/searchUtils');

var _searchUtils2 = _interopRequireDefault(_searchUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeList = function (_Component) {
  _inherits(NodeList, _Component);

  function NodeList(props) {
    _classCallCheck(this, NodeList);

    var _this = _possibleConstructorReturn(this, (NodeList.__proto__ || Object.getPrototypeOf(NodeList)).call(this, props));

    _this.state = {
      activePanels: ['active'],
      list: [],
      sortedGroups: {},
      groups: {
        'search': 'Search Results',
        'active': 'Active Nodes',
        'one_hour': 'In One Hour',
        'two_hour': 'In Two Hours',
        'the_rest': 'After That'
      }
    };

    _this.renderListGroup = _this.renderListGroup.bind(_this);
    return _this;
  }

  _createClass(NodeList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.sortAndFilterNodes();
      $(this.collapseList).collapsible();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.collapseReset();
    }
  }, {
    key: 'collapseReset',
    value: function collapseReset() {
      if (!this.state.collapsed) {
        $(this.collapseList).collapsible('open', 0);

        this.setState({ collapsed: true });
      }
    }
  }, {
    key: 'groupListByTime',
    value: function groupListByTime() {
      var _this2 = this;

      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var time = this.props.clock.time,
          active = [],
          one_hour = [],
          two_hour = [],
          the_rest = [];

      _lodash2.default.each(list, function (node) {
        if ((0, _timeUtils.isActive)(time, node.time, node.duration)) {
          return active.push(node);
        }

        var timeUntil = (0, _timeUtils.getTimeDifference)(time, node.time),
            hours = timeUntil.hours,
            minutes = timeUntil.minutes;

        if (hours === 0 && minutes > 0) {
          return one_hour.push(node);
        }

        if (hours === 1 && minutes > 0) {
          return two_hour.push(node);
        }

        return the_rest.push(node);
      });

      return {
        active: active.sort(function (a, b) {
          var aDur = (0, _timeUtils.getEarthTimeRemaining)(a.time, a.duration, _this2.props.clock.time),
              bDur = (0, _timeUtils.getEarthTimeRemaining)(b.time, b.duration, _this2.props.clock.time);

          var aTime = aDur.hours * 60 + aDur.minutes * 60 + aDur.seconds,
              bTime = bDur.hours * 60 + bDur.minutes * 60 + bDur.seconds;

          if (aTime < bTime) {
            return -1;
          }

          if (aTime > bTime) {
            return 1;
          }

          // a must be equal to b
          return 0;
        }),
        one_hour: one_hour,
        two_hour: two_hour,
        the_rest: the_rest
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.sortAndFilterNodes(nextProps);

      var currSearch = _lodash2.default.isEmpty(this.props.search);
      var nextSearch = _lodash2.default.isEmpty(nextProps.search);

      if (currSearch !== nextSearch) {
        this.setState({ collapsed: false }, this.collapseReset);
      }
    }
  }, {
    key: 'sortAndFilterNodes',
    value: function sortAndFilterNodes(props) {
      var _ref = props || this.props,
          nodelist = _ref.nodelist,
          customlist = _ref.customlist,
          search = _ref.search;

      var list = _lodash2.default.union(nodelist.nodes || [], customlist);

      if (list.length && !_lodash2.default.isEmpty(search)) {
        list = (0, _searchUtils2.default)(nodelist.nodes, search);
      }

      if (!_lodash2.default.isEmpty(nodelist.filterByType) && nodelist.filterByType !== 'all') {
        list = _lodash2.default.filter(list, { type: nodelist.filterByType });
      }

      if (nodelist.filterByLevel) {
        if (_lodash2.default.isArray(nodelist.filterByLevel)) {
          var levelRange = nodelist.filterByLevel;
          list = _lodash2.default.filter(list, function (item) {
            return item.level >= levelRange[0] && item.level <= levelRange[1];
          });
        } else {
          list = _lodash2.default.filter(list, { level: nodelist.filterByLevel });
        }
      }

      if (!_lodash2.default.isEmpty(nodelist.featureFilters)) {
        list = _lodash2.default.filter(list, function (item) {
          var keep = false;

          _lodash2.default.each(nodelist.featureFilters, function (filter) {
            var value = item[filter];

            // there are a number of values that can be
            // stored in filterFeature keys.
            // we want to show the node if the filter key
            // is non-empty or an explicit boolean of true.
            if (!_lodash2.default.isUndefined(value)) {

              // scrip keys can be an empty string or a min value
              if (_lodash2.default.isString(value) && !_lodash2.default.isEmpty(value) || _lodash2.default.isNumber(value)) {
                keep = true;
              }
              // only explicitly pass true if the filter is true.
              // this way if another filter is true we don't accidently
              // set it to false incorrectly.
              if (_lodash2.default.isBoolean(value) && value === true) {
                keep = true;
                // or fall back to a nonempty value as true
              } else if (!_lodash2.default.isEmpty(value)) {
                keep = true;
              }
            }
          });

          // if the key is undefined, we will default to false (don't show)
          return keep;
        });
      }

      var sortedGroups = void 0;
      if (_lodash2.default.isEmpty(search)) {
        sortedGroups = this.groupListByTime(list);
      } else {
        sortedGroups = {
          'search': list
        };
      }

      this.setState({ 'list': list, sortedGroups: sortedGroups });
    }
  }, {
    key: 'shouldExpand',
    value: function shouldExpand(activePanels, groupName) {
      return activePanels.indexOf(groupName) >= 0 ? 'active' : '';
    }
  }, {
    key: 'renderListGroup',
    value: function renderListGroup(groupName, index) {
      var _state = this.state,
          sortedGroups = _state.sortedGroups,
          groups = _state.groups,
          activePanels = _state.activePanels;

      var count = sortedGroups[groupName].length;

      var isOpen = groupName === 'search';

      return _react2.default.createElement(
        'li',
        { className: groupName + '-list', key: groupName },
        _react2.default.createElement(
          'div',
          { id: groupName, className: 'collapsible-header' },
          groups[groupName],
          _react2.default.createElement(
            'span',
            { className: 'badge list-item-count ' + (count > 0 ? 'active' : '') },
            sortedGroups[groupName].length
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'collapsible-body' },
          _react2.default.createElement(
            'div',
            { className: 'node-list-group row' },
            sortedGroups[groupName].map(function (node) {
              return _react2.default.createElement(_NodeListItem2.default, { node: node, key: node.id, className: 'col s12' });
            })
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          nodelist = _props.nodelist,
          search = _props.search;
      var _state2 = this.state,
          sortedGroups = _state2.sortedGroups,
          groups = _state2.groups,
          activePanels = _state2.activePanels,
          list = _state2.list;
      var shouldExpand = this.shouldExpand,
          renderListGroup = this.renderListGroup;


      var groupKeys = Object.keys(sortedGroups);

      return _react2.default.createElement(
        'div',
        { className: 'node-list' },
        _react2.default.createElement(
          'h4',
          { className: 'list-header' },
          _react2.default.createElement(
            'span',
            { className: 'total' },
            list.length,
            ' items'
          )
        ),
        _react2.default.createElement(
          'h6',
          { className: 'list-subheader' },
          groupKeys.length > 1 ? groupKeys.map(function (group) {
            return _react2.default.createElement(
              'span',
              { className: 'group-total', key: group },
              groups[group] + ': ',
              '' + sortedGroups[group].length
            );
          }) : null
        ),
        _react2.default.createElement(
          'ul',
          { className: 'collapsible popout', ref: function ref(list) {
              _this3.collapseList = list;
            } },
          groupKeys.map(function (group, i) {
            return renderListGroup(group, i);
          })
        )
      );
    }
  }]);

  return NodeList;
}(_react.Component);

;

var mapStateToProps = function mapStateToProps(state) {
  return {
    nodelist: state.nodelist,
    customlist: state.customlist,
    search: state.search,
    clock: state.clock
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(NodeList);

});

require.register("js/modules/NodeListItem.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

var _timeUtils = require('../utils/timeUtils');

var _watchListActions = require('../actions/watchListActions');

var _NodeStars = require('../components/NodeStars');

var _NodeStars2 = _interopRequireDefault(_NodeStars);

var _parseUtils = require('../utils/parseUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeListItem = function (_Component) {
  _inherits(NodeListItem, _Component);

  function NodeListItem() {
    _classCallCheck(this, NodeListItem);

    return _possibleConstructorReturn(this, (NodeListItem.__proto__ || Object.getPrototypeOf(NodeListItem)).apply(this, arguments));
  }

  _createClass(NodeListItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          node = _props.node,
          clock = _props.clock,
          watchlist = _props.watchlist,
          toggleSelect = _props.toggleSelect,
          className = _props.className;

      var active = (0, _timeUtils.isActive)(clock.time, node.time, node.duration);

      var slot = node.slot || '?',
          earthTimeRemaining,
          status = '',
          selected = _lodash2.default.indexOf(watchlist, node.id) !== -1;

      if (active) {
        earthTimeRemaining = (0, _timeUtils.getEarthTimeRemaining)(node.time, node.duration, this.props.clock.time);

        var mins = earthTimeRemaining.minutes;

        switch (true) {
          case mins <= 2 && mins > 1:
            status = 'warning';
            break;
          case mins <= 1:
            status = 'danger';
            break;
          default:
            status = 'active';
        }
      }

      return _react2.default.createElement(
        _Node2.default,
        { className: className },
        _react2.default.createElement(
          'div',
          { className: 'node node-list-item clearfix ' + (selected ? 'selected' : '') + ' ' + status, onClick: toggleSelect.bind(this, node.id) },
          _react2.default.createElement(
            'div',
            { className: 'left node-list-title' },
            _react2.default.createElement('span', { className: 'icon icon-' + node.type + ' icon-sm' }),
            _react2.default.createElement(
              'span',
              null,
              node.time + ' [' + node.level + '] ' + node.name,
              _react2.default.createElement(_NodeStars2.default, { stars: node.stars }),
              '[ slot ' + slot + ' ]'
            ),
            _react2.default.createElement(
              'span',
              { className: 'diff' },
              active ? earthTimeRemaining.minutes + 'm ' + earthTimeRemaining.seconds + 's' : ''
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'right right-align node-list-details' },
            _react2.default.createElement(
              'span',
              { className: 'small location' },
              node.location
            ),
            _react2.default.createElement(
              'span',
              { className: 'small coords' },
              node.pos
            )
          )
        )
      );
    }
  }]);

  return NodeListItem;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    clock: state.clock,
    watchlist: state.watchlist.nodes
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleSelect: function toggleSelect(id) {
      return dispatch((0, _watchListActions.toggleSelect)(id));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NodeListItem);

});

require.register("js/modules/Notifications.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _reactAudioPlayer = require('react-audio-player');

var _reactAudioPlayer2 = _interopRequireDefault(_reactAudioPlayer);

var _Modal = require('../components/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _sounds = require('../static/sounds');

var _sounds2 = _interopRequireDefault(_sounds);

var _clockActions = require('../actions/clockActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notifications = function (_Component) {
  _inherits(Notifications, _Component);

  function Notifications(props) {
    _classCallCheck(this, Notifications);

    var _this = _possibleConstructorReturn(this, (Notifications.__proto__ || Object.getPrototypeOf(Notifications)).call(this, props));

    _this.state = {
      active: false
    };
    return _this;
  }

  _createClass(Notifications, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var alarmList = this.props.alarmList;


      if (!(0, _lodash.isEqual)(alarmList, nextProps.alarmList) && nextProps.alarmList.length) {
        this.handleNotifications(nextProps);
      }
    }
  }, {
    key: 'handleNotifications',
    value: function handleNotifications(props) {
      var _this2 = this;

      if (this.state.active) {
        return;
      }

      var list = props.alarmList,
          style = props.alarmStyle;

      if (style === 'popup') {
        this.setState({ active: true });
      } else if (style === 'desktop') {

        var single = list.length === 1,
            firstNode = list[0],
            title = single ? firstNode.name : firstNode.name + ' & ' + (list.length - 1) + ' Others';

        var options = {};
        if (firstNode.type === 'botany') {
          options.icon = '/img/btn_icon_lg.png';
        } else {
          options.icon = '/img/min_icon_lg.png';
        }

        this.setState({ active: true });
        var notification = new Notification(title, options);

        return setTimeout(function () {
          _this2.setState({ active: false });
          props.closeNotification();
        }, 5000);
      }
    }
  }, {
    key: 'renderPopupContent',
    value: function renderPopupContent() {
      var alarmList = this.props.alarmList;


      return _react2.default.createElement(
        'div',
        { className: 'popup-content-container modal-content' },
        _react2.default.createElement(
          'h3',
          null,
          'Node Alert'
        ),
        alarmList.map(function (node) {
          return _react2.default.createElement(
            'div',
            { key: 'popup-' + node.id },
            _react2.default.createElement(
              'h5',
              null,
              node.name,
              ': ',
              node.time
            ),
            _react2.default.createElement(
              'p',
              null,
              node.location
            )
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var active = this.state.active;
      var _props = this.props,
          alarmSound = _props.alarmSound,
          alarmStyle = _props.alarmStyle,
          closeNotification = _props.closeNotification;


      var hasSound = alarmSound && alarmSound !== 'none';
      var soundFile = void 0;

      if (hasSound) {
        soundFile = (0, _lodash.find)(_sounds2.default, { name: alarmSound });
      }

      return _react2.default.createElement(
        'div',
        { className: 'notification-container' },
        active ? _react2.default.createElement(
          'div',
          null,
          soundFile ? _react2.default.createElement(_reactAudioPlayer2.default, { src: '/sound/' + soundFile.filename, autoPlay: true, className: '' }) : null,
          '}',
          alarmStyle === 'popup' ? _react2.default.createElement(
            _Modal2.default,
            { open: active, timeout: { time: 5000, callback: closeNotification } },
            this.renderPopupContent()
          ) : null
        ) : null
      );
    }
  }]);

  return Notifications;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    alarmList: state.clock.alarm,
    alarmStyle: state.settings.alarm_style,
    alarmSound: state.settings.alarm_sound
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    closeNotification: function closeNotification() {
      return dispatch((0, _clockActions.closeNotification)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Notifications);

});

require.register("js/modules/WatchListItem.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _lodash = require('lodash');

var _timeUtils = require('../utils/timeUtils');

var _watchListActions = require('../actions/watchListActions');

var _NodeStars = require('../components/NodeStars');

var _NodeStars2 = _interopRequireDefault(_NodeStars);

var _parseUtils = require('../utils/parseUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WatchListItem = function (_Component) {
  _inherits(WatchListItem, _Component);

  function WatchListItem() {
    _classCallCheck(this, WatchListItem);

    return _possibleConstructorReturn(this, (WatchListItem.__proto__ || Object.getPrototypeOf(WatchListItem)).apply(this, arguments));
  }

  _createClass(WatchListItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          node = _props.node,
          clock = _props.clock,
          watchlist = _props.watchlist,
          toggleSelect = _props.toggleSelect,
          className = _props.className;
      var stars = this.stars;

      var active = (0, _timeUtils.isActive)(clock.time, node.time, node.duration);

      var slot = node.slot || '?',
          timeRemaining,
          time,
          status = '',
          selected = (0, _lodash.indexOf)(watchlist, node.id) !== -1;

      if (active) {
        time = (0, _timeUtils.getEarthTimeRemaining)(node.time, node.duration, clock.time);

        var mins = time.minutes;

        switch (true) {
          case mins <= 2 && mins > 1:
            status = 'warning';
            break;
          case mins <= 1:
            status = 'danger';
            break;
          default:
            status = 'active';
        }
      } else {
        time = (0, _timeUtils.getEarthTimeUntil)(node.time, clock.time);
      }

      return _react2.default.createElement(
        'div',
        { className: '' + className },
        _react2.default.createElement(
          'div',
          { className: 'node watchlist-item clearfix ' + (active ? 'active' : '') + ' ' + status },
          _react2.default.createElement(
            'div',
            { className: 'node-content' },
            _react2.default.createElement(
              'div',
              { className: 'node-list-title' },
              _react2.default.createElement('span', { className: 'icon icon-' + node.type + ' icon-sm' }),
              _react2.default.createElement(
                'span',
                null,
                node.time
              ),
              _react2.default.createElement(
                'div',
                { className: 'close', onClick: toggleSelect.bind(this, node.id) },
                _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'close'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'node-list-name' },
              _react2.default.createElement(
                'div',
                { className: 'name' },
                node.name + ' [' + node.level + ']'
              ),
              _react2.default.createElement(
                'div',
                { className: 'meta' },
                _react2.default.createElement(_NodeStars2.default, { stars: node.stars })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'time-remaining' },
              _react2.default.createElement(
                'div',
                { className: 'small' },
                active ? 'time remaining' : 'time until',
                ':'
              ),
              _react2.default.createElement(
                'div',
                { className: 'diff' },
                '' + (time.hours > 0 ? time.hours + 'h ' : '') + time.minutes + 'm ' + time.seconds + 's'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'slot' },
              '[ slot ' + slot + ' ]'
            ),
            node.type === 'fishing' && node.bait ? _react2.default.createElement(
              'div',
              { className: 'bait' },
              node.bait.join(', ')
            ) : null
          ),
          _react2.default.createElement(
            'div',
            { className: 'node-list-footer' },
            _react2.default.createElement(
              'div',
              { className: 'small location' },
              node.location
            ),
            _react2.default.createElement(
              'div',
              { className: 'small coords' },
              node.pos
            )
          )
        )
      );
    }
  }]);

  return WatchListItem;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    clock: state.clock
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleSelect: function toggleSelect(id) {
      return dispatch((0, _watchListActions.toggleSelect)(id));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(WatchListItem);

});

require.register("js/reducers/clockReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timeUtils = require('../utils/timeUtils');

var _clockActions = require('../actions/clockActions');

var clock = function clock() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _clockActions.INCREMENT_CLOCK:
      return Object.assign({}, state, (0, _timeUtils.setTime)());

    case _clockActions.UPDATE_LAST_ALARM:
      return Object.assign({}, state, { lastAlarm: action.hour });

    case _clockActions.DISPATCH_NOTIFICATION:
      return Object.assign({}, state, { alarm: action.list });

    case _clockActions.CLOSE_NOTIFICATION:
      return Object.assign({}, state, { alarm: [] });

    default:
      return state;
  }
};

exports.default = clock;

});

require.register("js/reducers/customListReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _customListActions = require('../actions/customListActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var customlist = function customlist() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  var list = _lodash2.default.clone(state),
      node = void 0,
      existsAt = void 0;

  switch (action.type) {
    case _customListActions.ADD_CUSTOM_NODE:
      node = Object.assign({}, action.node, {
        id: (0, _v2.default)()
      });

      return [].concat(_toConsumableArray(state), [node]);

    case _customListActions.EDIT_CUSTOM_NODE:
      existsAt = _lodash2.default.indexOf(state, action.node.id);
      node = _lodash2.default.find(list, { id: action.node.id });

      var newNode = void 0;
      if (node) {
        list.splice(existsAt, 1);
        newNode = Object.assign({}, node, action.node);
        list.push(newNode);
      }

      return list;

    case _customListActions.REMOVE_CUSTOM_NODE:
      existsAt = _lodash2.default.findIndex(list, { id: action.id });

      // if exists, remove from list
      if (existsAt !== -1) {
        list.splice(existsAt, 1);
      }

      return list;

    default:
      return state;
  }
};

exports.default = customlist;

});

require.register("js/reducers/index.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRouterRedux = require('react-router-redux');

var _redux = require('redux');

var _clockReducer = require('./clockReducer');

var _clockReducer2 = _interopRequireDefault(_clockReducer);

var _nodeListReducer = require('./nodeListReducer');

var _nodeListReducer2 = _interopRequireDefault(_nodeListReducer);

var _searchReducer = require('./searchReducer');

var _searchReducer2 = _interopRequireDefault(_searchReducer);

var _watchListReducer = require('./watchListReducer');

var _watchListReducer2 = _interopRequireDefault(_watchListReducer);

var _settingsReducer = require('./settingsReducer');

var _settingsReducer2 = _interopRequireDefault(_settingsReducer);

var _pageReducer = require('./pageReducer');

var _pageReducer2 = _interopRequireDefault(_pageReducer);

var _watchGroupsReducer = require('./watchGroupsReducer');

var _watchGroupsReducer2 = _interopRequireDefault(_watchGroupsReducer);

var _customListReducer = require('./customListReducer');

var _customListReducer2 = _interopRequireDefault(_customListReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = function version(state) {
  return "2.1.9";
};

var rootReducer = (0, _redux.combineReducers)({
  clock: _clockReducer2.default,
  routing: _reactRouterRedux.routerReducer,
  nodelist: _nodeListReducer2.default,
  search: _searchReducer2.default,
  watchlist: _watchListReducer2.default,
  settings: _settingsReducer2.default,
  page: _pageReducer2.default,
  watchgroups: _watchGroupsReducer2.default,
  customlist: _customListReducer2.default,
  version: version
});

exports.default = rootReducer;

});

require.register("js/reducers/nodeListReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultState = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _parseUtils = require('../utils/parseUtils');

var utils = _interopRequireWildcard(_parseUtils);

var _nodeListActions = require('../actions/nodeListActions');

var _filters = require('../static/filters');

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = exports.defaultState = {
  isFetching: false,
  nodes: [],
  filterByType: 'all',
  filterByLevel: null,
  featureFilters: [],
  filters: _filters2.default
};

function nodes() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  var booleanValues = ['is_collectable', 'is_legendary', 'is_ephemeral', 'red_scrip', 'blue_scrip', 'yellow_scrip'];

  switch (action.type) {
    case _nodeListActions.REQUEST_NODELIST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case _nodeListActions.RECEIVE_NODELIST:
      var nodes = [];

      // merge the lists of nodes to a single array,
      // and create a unique entry for each time per node.
      _lodash2.default.each(action.nodes, function (list, key) {

        _lodash2.default.each(list, function (node) {
          var result = {},
              times = utils.parseTimes(node.times),
              pos = utils.parsePosition(node.pos),
              level = utils.parseLevel(node.level || 50);

          if (node.bait) {
            result.bait = utils.parseAttrs(node.bait);
          }

          _lodash2.default.each(booleanValues, function (key) {
            result[key] = utils.parseBooleans(node[key]);
          });

          _lodash2.default.each(times, function (time, i) {
            nodes.push(Object.assign({}, node, {
              time: time,
              type: key,
              id: node.id + '-' + i,
              level: level,
              pos: pos
            }, result));
          });
        });
      });

      return Object.assign({}, state, {
        isFetching: false,
        nodes: nodes,
        lastUpdated: action.recievedAt
      });

    case _nodeListActions.FILTER_TYPE_NODELIST:
      return Object.assign({}, state, {
        filterByType: action.filterByType
      });

    case _nodeListActions.FILTER_LEVEL_NODELIST:
      var filter = action.filterByLevel;
      var newFilter = filter;

      if (newFilter === state.filterByLevel) {
        newFilter = null;
      }

      return Object.assign({}, state, {
        filterByLevel: newFilter
      });

    case _nodeListActions.FILTER_FEATURE_TOGGLE_NODELIST:
      var featureFilters = state.featureFilters,
          existsAt = _lodash2.default.indexOf(featureFilters, action.feature);

      if (existsAt !== -1) {
        featureFilters.splice(existsAt, 1);
      } else {
        featureFilters.push(action.feature);
      }

      return Object.assign({}, state, {
        featureFilters: featureFilters
      });

    default:
      return state;
  }
}

exports.default = nodes;

});

require.register("js/reducers/nodeReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeActions = require('../actions/nodeActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function node() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _nodeActions.TOGGLE_SELECT:
      return Object.assign({}, state, {
        selected: !action.selected
      });

    default:
      return state;
  }
}

exports.default = node;

});

require.register("js/reducers/pageReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pageActions = require('../actions/pageActions');

var page = function page() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    modal: false
  };
  var action = arguments[1];


  switch (action.type) {
    case _pageActions.TOGGLE_MODAL:
      return Object.assign({}, state, {
        modal: !state.modal
      });

    default:
      return state;
  }
};

exports.default = page;

});

require.register("js/reducers/searchReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments[1];

  switch (action.type) {
    case _searchActions.SEARCH_QUERY:
      return action.query;
    default:
      return state;
  }
};

var _searchUtils = require('../utils/searchUtils');

var _searchUtils2 = _interopRequireDefault(_searchUtils);

var _searchActions = require('../actions/searchActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

});

;require.register("js/reducers/settingsReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _settingsActions = require('../actions/settingsActions');

var settings = function settings() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];


  switch (action.type) {
    case _settingsActions.UPDATE_SETTING:
      return Object.assign({}, state, action.setting);

    default:
      return state;
  }
};

exports.default = settings;

});

require.register("js/reducers/watchGroupsReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _lodash = require('lodash');

var _watchGroupsActions = require('../actions/watchGroupsActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var watchgroups = function watchgroups() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  var list = [].concat(_toConsumableArray(state));
  var targetGroup = void 0,
      existsAt = void 0,
      group = void 0;

  switch (action.type) {
    case _watchGroupsActions.CREATE_WATCHGROUP:
      if (!action.group) {
        return state;
      }

      group = Object.assign({}, action.group, {
        id: (0, _v2.default)()
      });

      return [].concat(_toConsumableArray(state), [group]);

    case _watchGroupsActions.UPDATE_WATCHGROUP:
      if (!action.group) {
        return state;
      }
      group = (0, _lodash.find)(list, { id: action.group.id });

      (0, _lodash.extend)(group, action.group);

      return list;
    case _watchGroupsActions.REMOVE_WATCHGROUP:
      existsAt = (0, _lodash.findIndex)(list, { id: action.id });

      if (existsAt !== -1) {
        list.splice(existsAt, 1);
      }

      return list;

    case _watchGroupsActions.WATCHGROUP_ADD_ITEM:
      targetGroup = (0, _lodash.find)(list, { id: action.groupId });

      if ((0, _lodash.indexOf)(targetGroup.nodes, action.nodeId) !== -1) {
        targetGroup.nodes.push(action.nodeId);
      }

      return list;

    case _watchGroupsActions.WATCHGROUP_REMOVE_ITEM:
      targetGroup = (0, _lodash.find)(list, { id: action.groupId });
      existsAt = (0, _lodash.indexOf)(targetGroup.nodes, action.nodeId);

      if (existsAt !== -1) {
        targetGroup.nodes.splice(existsAt, 1);
      }

      return list;

    default:
      return state;
  }
};

exports.default = watchgroups;

});

require.register("js/reducers/watchListReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = watchlist;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _watchListActions = require('../actions/watchListActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function watchlist() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { nodes: [], times: [] };
  var action = arguments[1];

  var list = _lodash2.default.clone(state.nodes),
      id = action.id,
      existsAt = _lodash2.default.indexOf(list, id);

  switch (action.type) {
    case _watchListActions.ADD_WATCHLIST:
      if (existsAt === -1) {
        list.push(id);
      }
      return Object.assign({}, state, { nodes: list });

    case _watchListActions.REMOVE_WATCHLIST:
      if (existsAt !== -1) {
        list.splice(existsAt, 1);
      }
      return Object.assign({}, state, { nodes: list });

    case _watchListActions.UPDATE_TIMES:
      return Object.assign({}, state, { times: action.times });

    case _watchListActions.CLEAR_ALL:
      return Object.assign({}, state, { nodes: [] });

    default:
      return state;
  }
}

});

;require.register("js/routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _Home = require('./containers/Home');

var _Home2 = _interopRequireDefault(_Home);

var _About = require('./containers/About');

var _About2 = _interopRequireDefault(_About);

var _WatchList = require('./containers/WatchList');

var _WatchList2 = _interopRequireDefault(_WatchList);

var _CustomContent = require('./containers/CustomContent');

var _CustomContent2 = _interopRequireDefault(_CustomContent);

var _MainNav = require('./components/MainNav');

var _MainNav2 = _interopRequireDefault(_MainNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    _reactRouterDom.HashRouter,
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_MainNav2.default, null),
      _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Home2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/watch', component: _WatchList2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/custom', component: _CustomContent2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/about', component: _About2.default })
      )
    )
  );
};

});

require.register("js/static/filters.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  type: {
    name: 'By Class',
    values: ['all', 'botany', 'mining', 'fishing', 'custom']
  },
  level: {
    name: 'By Level',
    values: [{ value: 50, name: '50' }, { value: [51, 59], name: '51-59' }, { value: 60, name: '60' }, { value: [61, 69], name: '61-69' }, { value: 70, name: '70' }]
  },
  feature: {
    name: 'By Type',
    values: [{ value: 'is_collectable', name: 'Collectable' }, { value: 'is_ephemeral', name: 'Ephemeral' }, { value: 'red_scrip', name: 'Red Scrip' },
    // {value: 'blue_scrip', name: 'Blue Scrip'},
    { value: 'yellow_scrip', name: 'Yellow Scrip' }]
  }
};

});

require.register("js/static/sounds.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [{
  name: 'chime',
  filename: 'chime.wav'
}, {
  name: 'big ben',
  filename: 'chime_big_ben.wav'
}, {
  name: 'chime up',
  filename: 'chime_up.wav'
}, {
  name: 'cuckoo',
  filename: 'cuckoo.wav'
}, {
  name: 'doorbell',
  filename: 'doorbell.wav'
}, {
  name: 'floop',
  filename: 'floop.wav'
}, {
  name: 'gong',
  filename: 'gong.wav'
}];

});

require.register("js/utils/parseUtils.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parsePosition = parsePosition;
exports.parseAttrs = parseAttrs;
exports.parseTimes = parseTimes;
exports.parseLevel = parseLevel;
exports.parseBooleans = parseBooleans;

var _lodash = require('lodash');

function parsePosition(pos) {
  if ((0, _lodash.isArray)(pos)) {
    return pos.join(', ').replace(/\:/g, ' ');
  } else if (pos) {
    return pos.replace(/\:/g, ' ');
  }
}

function parseAttrs(attr) {
  if ((0, _lodash.isString)(attr)) {
    return (0, _lodash.filter)(attr.split(','), function (a) {
      return a.length > 0;
    });
  }
}

function parseTimes(times) {
  if ((0, _lodash.isArray)(times)) {
    return times;
  } else {
    var list = times.split(',').map(function (time) {
      return (0, _lodash.trim)(time);
    });

    return (0, _lodash.filter)(list, function (time) {
      return time.length > 0;
    });
  }
}

function parseLevel(value) {
  return parseFloat(value);
}

function parseBooleans(value) {
  if (!value || value.length === 0 || value.toLowerCase() === 'false') {
    return false;
  } else if (value.toLowerCase() === 'true') {
    return true;
  } else {
    return value;
  }
}

});

;require.register("js/utils/searchUtils.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = search;

var _fuse = require('fuse.js');

var _fuse2 = _interopRequireDefault(_fuse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function search(list) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var fuse = new _fuse2.default(list, Object.assign({
    keys: ['name', 'location'],
    threshold: 0.3
  }, opts));

  return fuse.search(query);
}

});

;require.register("js/utils/storageUtils.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var loadState = exports.loadState = function loadState() {
  var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2.0;

  try {
    var serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    var state = JSON.parse(serializedState);

    // if(!state || !state.version || state.version < version) {
    //   clearState();
    //   return saveState({ version });
    // }

    return state;
  } catch (err) {
    return undefined;
  }
};

var saveState = exports.saveState = function saveState(state) {
  try {
    var serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);

    return state;
  } catch (err) {
    // Ignore write errors.
  }
};

var clearState = exports.clearState = function clearState(state) {
  try {
    localStorage.setItem('state', {});
  } catch (err) {}
};

});

require.register("js/utils/timeUtils.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isActive = exports.getEndTimeFromDuration = exports.getDurationStringFromObject = exports.getDurationObjFromString = exports.getTimeStringFromDuration = exports.getTimeStringFromObject = exports.getTimeObjFromString = exports.getEarthTimeUntil = exports.getTimeUntil = exports.getEarthTimeRemaining = exports.getTimeRemaining = exports.getTimeDifference = exports.getEarthDurationfromEorzean = exports.setTime = exports.getEorzeaTime = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getEorzeaTime = exports.getEorzeaTime = function getEorzeaTime() {
    var eorzeaMultipler = 3600 / 175 * 1000;
    var universalTime = (0, _moment2.default)().unix();

    return universalTime * eorzeaMultipler;
};

var setTime = exports.setTime = function setTime() {
    var eorzeaTime = getEorzeaTime(),
        result = _moment2.default.utc(eorzeaTime);

    return {
        'time': result.format('h:mm A'),
        'meridiem': result.format('A'),
        'hour': parseFloat(result.format('H')),
        'minute': parseFloat(result.format('m'))
    };
};

var getEarthDurationfromEorzean = exports.getEarthDurationfromEorzean = function getEarthDurationfromEorzean(stringDuration) {
    // 175 earth seconds = 3600 eorzean seconds (1 hour)
    var time = {
        hours: parseFloat(stringDuration.split(':')[0]),
        minutes: parseFloat(stringDuration.split(':')[1])
    },
        totalMins = time.hours * 60 + time.minutes,
        totalSeconds = totalMins * 60;

    // how many multiples of 175 (eorz hours) we have.
    var earthUnits = totalSeconds / 3600;

    var totalEarthSeconds = earthUnits * 175,
        minutes = Math.floor(totalEarthSeconds / 60),
        hours = Math.floor(minutes / 60),
        seconds = Math.ceil((totalEarthSeconds / 60 - minutes) * 60);

    if (minutes > 60) {
        var diff = Math.floor(minutes / 60);
        minutes = minutes - diff * 60;
    }

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
};

/**
 *   Expects two string times with meridien,
 *   IE: 8:00 AM, 7:00 PM
 *   B will be compared against A, like in subtraction.
 *   ex1: A: 12:00 AM B: 11:00 PM = 23 hour difference.
 *   ex2: A: 11:00 PM B: 12:00 AM = 1 hour difference.
 */
var getTimeDifference = exports.getTimeDifference = function getTimeDifference(a, b) {
    var hours = 0,
        minutes = 0,
        times = {};

    _lodash2.default.each([a, b], function (time, idx) {
        times[idx] = getTimeObjFromString(time);
    });

    var timeA = void 0,
        timeB = void 0,
        diff = void 0;

    timeA = times[0].hour * 60 + times[0].minute;
    timeB = times[1].hour * 60 + times[1].minute;

    diff = timeB - timeA;

    hours = Math.floor(diff / 60);
    minutes = diff - hours * 60;

    if (hours < 0) {
        hours = hours + 24;
    }

    return {
        hours: hours,
        minutes: minutes
    };
};

// Expects a string format: 12:00 AM
var getTimeRemaining = exports.getTimeRemaining = function getTimeRemaining(nodeTime, duration, currTime) {
    var endTime = getEndTimeFromDuration(nodeTime, duration);

    return getTimeDifference(currTime, endTime);
};

// Expects a string format: 12:00 AM
// Best used for active nodes.
var getEarthTimeRemaining = exports.getEarthTimeRemaining = function getEarthTimeRemaining(nodeTime, duration, currTime) {
    var endTime = getEndTimeFromDuration(nodeTime, duration),
        diff = getTimeDifference(currTime, endTime),
        durStr = getDurationStringFromObject(diff);

    return getEarthDurationfromEorzean(durStr);
};

var getTimeUntil = exports.getTimeUntil = function getTimeUntil(nodeTime, currTime) {
    return getTimeDifference(currTime, nodeTime);
};

// Expects string formats: 12:00 AM
// Best used for inactive (upcoming) nodes
var getEarthTimeUntil = exports.getEarthTimeUntil = function getEarthTimeUntil(nodeTime, currTime) {
    if (!nodeTime || !currTime || !_lodash2.default.isString(nodeTime) || !_lodash2.default.isString(currTime)) {
        return console.error('getEarthTimeUntil expects 2 arguments <string:time>; ie "12:00 AM", "2:00 PM"');
    }

    var startUntil = getTimeDifference(currTime, nodeTime);
    var durStr = getDurationStringFromObject(startUntil);

    return getEarthDurationfromEorzean(durStr);
};

// Expects format: 12:00 AM
var getTimeObjFromString = exports.getTimeObjFromString = function getTimeObjFromString(stringTime) {
    if (!stringTime || !_lodash2.default.isString(stringTime)) {
        return console.error('getTimeObjFromString expects 1 arguments <string:time>; ie "12:00 AM"');
    }

    var time = stringTime,
        isAM = time.indexOf('AM') > -1,
        hour = parseFloat(time.split(' ')[0].split(':')[0]);

    if (isAM && hour === 12) {
        hour = 0;
    } else if (!isAM && hour !== 12) {
        hour += 12;
    }

    return {
        hour: hour,
        minute: parseFloat(time.split(' ')[0].split(':')[1])
    };
};

// Expect object formatted from getTimeObjFromString
var getTimeStringFromObject = exports.getTimeStringFromObject = function getTimeStringFromObject(timeObj) {
    var hour = timeObj.hour,
        minute = timeObj.minute,
        meridien = 'AM';

    if (hour > 12) {
        meridien = 'PM';
        hour = hour - 12;
    } else if (hour === 12) {
        meridien = 'PM';
    }

    minute = minute < 10 ? '0' + minute : minute;

    return hour + ':' + minute + ' ' + meridien;
};

var getTimeStringFromDuration = exports.getTimeStringFromDuration = function getTimeStringFromDuration(stringStartTime, stringDuration) {
    if (!stringStartTime || !stringDuration || !_lodash2.default.isString(stringDuration) || !_lodash2.default.isString(stringStartTime)) {
        return console.error('getTimeStringFromDuration expects 2 arguments <string:time>; ie "12:00 AM"');
    }

    var startTime = getTimeObjFromString(stringStartTime),
        duration = {
        hour: parseFloat(stringDuration.split(':')[0]),
        minute: parseFloat(stringDuration.split(':')[1])
    },
        end = {};

    var hour = startTime.hour + duration.hour,
        minute = startTime.minute + duration.minute;

    if (minute > 60) {
        hour++;
        minute -= 60;
    }

    if (hour > 24) {
        hour -= 24;
    }

    if (hour > 12) {
        hour -= 12;
        end.meridien = 'PM';
    } else {
        end.meridien = 'AM';
    }

    end.hour = hour;
    end.minute = minute < 10 ? '0' + minute : minute;

    return end.hour + ':' + end.minute + ' ' + end.meridien;
};

var getDurationObjFromString = exports.getDurationObjFromString = function getDurationObjFromString(duration) {
    var hours = parseFloat(duration.split(':')[0]),
        mins = parseFloat(duration.split(':')[1]);

    return {
        hours: hours,
        minutes: mins
    };
};

var getDurationStringFromObject = exports.getDurationStringFromObject = function getDurationStringFromObject(durationObj) {
    var hours = durationObj.hours,
        mins = durationObj.minutes;

    if (mins < 10) {
        mins = '0' + mins.toString();
    }

    return hours + ':' + mins;
};

var getEndTimeFromDuration = exports.getEndTimeFromDuration = function getEndTimeFromDuration(startTime, duration) {
    var startObj = getTimeObjFromString(startTime),
        durationObj = getDurationObjFromString(duration),
        endObj = {
        hour: startObj.hour + durationObj.hours,
        minute: startObj.minute + durationObj.minutes
    };

    if (endObj.minute >= 60) {
        endObj.hour += 1;
        endObj.minute -= 60;
    }

    if (endObj.hour >= 24) {
        endObj.hour -= 24;
    }

    return getTimeStringFromObject(endObj);
};

var isActive = exports.isActive = function isActive(currentTime, startTime, duration) {
    var endTime = getEndTimeFromDuration(startTime, duration),
        startTimeDiff = getTimeDifference(currentTime, startTime),
        endTimeDiff = getTimeDifference(currentTime, endTime),
        durationObj = getDurationObjFromString(duration),
        result = false;

    var startTimeDiffMins = startTimeDiff.hours * 60 + startTimeDiff.minutes,
        endTimeDiffMins = endTimeDiff.hours * 60 + endTimeDiff.minutes,
        durationMins = durationObj.hours * 60 + durationObj.minutes;

    if (endTimeDiffMins < durationMins) {
        result = true;
    }

    return result;
};

});

require.alias("buffer/index.js", "buffer");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map