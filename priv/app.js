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
        _react2.default.createElement(_routes2.default, null)
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
exports.changeTime = changeTime;
var INCREMENT_CLOCK = exports.INCREMENT_CLOCK = 'INCREMENT_CLOCK';

function changeTime() {
  return { type: INCREMENT_CLOCK };
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

;require.register("js/actions/watchListActions.js", function(exports, require, module) {
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

var version = '2.0.0';

var Menu = function Menu(props) {
  var navItems = [{ url: '/watch', name: 'Watch List' }, {
    url: '/about',
    name: 'About'
  }];
  return _react2.default.createElement(
    'ul',
    (0, _lodash.omit)(props, 'clock'),
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
          item.name
        )
      );
    }),
    props.clock ? _react2.default.createElement(
      'li',
      { className: 'nav-clock nav-item ' + props.clock.meridiem.toLowerCase() },
      _react2.default.createElement(_Clock2.default, { className: 'inline-block' })
    ) : null
  );
};

var MainNav = function (_Component) {
  _inherits(MainNav, _Component);

  function MainNav() {
    _classCallCheck(this, MainNav);

    return _possibleConstructorReturn(this, (MainNav.__proto__ || Object.getPrototypeOf(MainNav)).apply(this, arguments));
  }

  _createClass(MainNav, [{
    key: 'componentDidMount',
    value: function componentDidMount(nextProps, nextState) {
      $(this.menuToggle).sideNav({
        edge: 'right'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

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
              version
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
                _this2.menuToggle = button;
              },
              'data-activates': 'sidebar',
              className: 'button-collapse right' },
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'menu'
            )
          ),
          _react2.default.createElement(Menu, { className: 'nav navbar-nav right hide-on-med-and-down' }),
          _react2.default.createElement(Menu, { ref: function ref(sidebar) {
              _this2.sidebarNav = sidebar;
            },
            id: 'sidebar', className: 'side-nav', clock: clock })
        )
      );
    }
  }]);

  return MainNav;
}(_react.Component);

;

var mapStateToProps = function mapStateToProps(state) {
  return { clock: state.clock };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MainNav);

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
    return _react2.default.createElement('i', { className: 'fa fa-star', key: i });
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
          helpText = _props.helpText;


      return _react2.default.createElement(
        'div',
        { className: 'search-bar' },
        _react2.default.createElement(
          'div',
          { className: 'input-field' },
          _react2.default.createElement('input', { type: 'text', id: 'search', onChange: this.onChangeEvent.bind(this, onChange) }),
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

require.register("js/containers/About.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var About = function About() {
  var googleSheetsLink = "https://docs.google.com/spreadsheets/d/1pqaKo0TM2rJghWWXqOQIqCueJvFV2dPuZUQnNrsRmt8/edit?usp=sharing";

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
        VERSION,
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
          'here'
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
            'Learn more here.'
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
          'More fine-grained control over notifications, down to the node level.'
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
          'http://time.is/'
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
          'here'
        ),
        '!'
      )
    )
  );
};

exports.default = About;

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

var _NodeList = require('../modules/NodeList');

var _NodeList2 = _interopRequireDefault(_NodeList);

var _searchActions = require('../actions/searchActions');

var _SearchBar = require('../components/SearchBar');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeListActions = require('../actions/nodeListActions');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
  _inherits(Home, _Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.state = {
      filters: {
        type: ['all', 'botany', 'mining', 'fishing'],
        level: [50, 60, 70],
        feature: ['is_collectable', 'is_ephemeral', 'red_scrip', 'blue_scrip']
      }
    };
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(this.tabMenu).tabs();
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
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          search = _props.search,
          filterByType = _props.filterByType,
          filterByLevel = _props.filterByLevel,
          featureFilters = _props.featureFilters,
          filter = _props.filter,
          levelFilter = _props.levelFilter,
          filterFeature = _props.filterFeature;
      var filters = this.state.filters;
      var itemIcon = this.itemIcon,
          featureIcon = this.featureIcon,
          onSearchChange = this.onSearchChange;


      return _react2.default.createElement(
        'div',
        { className: '' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col m12' },
            _react2.default.createElement(_SearchBar2.default, { onChange: search, helpText: "Search by Name or Location" })
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col m5' },
              _react2.default.createElement(
                'div',
                { className: 'filter-menu' },
                _react2.default.createElement(
                  'span',
                  { className: 'menu-label small' },
                  'Filter by:'
                ),
                _react2.default.createElement(
                  'div',
                  { className: '', ref: function ref(filters) {
                      _this2.filterMenuType = filters;
                    } },
                  filters.type.map(function (item) {
                    return _react2.default.createElement(
                      'a',
                      { key: item, className: 'chip menu-item ' + (item === filterByType ? 'active' : ''),
                        onClick: _lodash2.default.bind(filter, _this2, item) },
                      item !== 'all' ? itemIcon(item) : '',
                      _lodash2.default.capitalize(item)
                    );
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col m3' },
              _react2.default.createElement(
                'div',
                { className: 'filter-menu' },
                _react2.default.createElement(
                  'span',
                  { className: 'menu-label small' },
                  'Level Range:'
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  filters.level.map(function (level) {
                    var isActive = filterByLevel && level === filterByLevel;
                    return _react2.default.createElement(
                      'a',
                      { key: level, className: 'chip menu-item ' + (isActive ? 'active' : ''),
                        onClick: _lodash2.default.bind(levelFilter, _this2, level) },
                      level
                    );
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col m4' },
              _react2.default.createElement(
                'div',
                { className: 'filter-menu right-align' },
                _react2.default.createElement(
                  'span',
                  { className: 'menu-label small' },
                  'Node Types:'
                ),
                _react2.default.createElement(
                  'div',
                  { className: '', ref: function ref(filters) {
                      _this2.filterMenuFeature = filters;
                    } },
                  filters.feature.map(function (item) {
                    return _react2.default.createElement(
                      'a',
                      { key: item, className: 'chip menu-item ' + (_lodash2.default.indexOf(featureFilters, item) >= 0 ? 'active' : ''),
                        onClick: _lodash2.default.bind(filterFeature, this, item) },
                      featureIcon(item)
                    );
                  })
                )
              )
            )
          )
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
    featureFilters: state.nodelist.featureFilters
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    search: function search(e, value) {
      return dispatch((0, _searchActions.search)(value));
    },
    filter: function filter(value) {
      return dispatch((0, _nodeListActions.filterTypeNodeList)(value));
    },
    levelFilter: function levelFilter(value) {
      return dispatch((0, _nodeListActions.filterLevelNodeList)(value));
    },
    filterFeature: function filterFeature(value) {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WatchList = function (_Component) {
  _inherits(WatchList, _Component);

  function WatchList() {
    _classCallCheck(this, WatchList);

    return _possibleConstructorReturn(this, (WatchList.__proto__ || Object.getPrototypeOf(WatchList)).apply(this, arguments));
  }

  _createClass(WatchList, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'Hey Im a Watch List!'
      );
    }
  }]);

  return WatchList;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    nodelist: state.nodelist,
    watchlist: state.watchlist
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
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

var _reactRouterRedux = require('react-router-redux');

var _redux = require('redux');

var _throttle = require('lodash/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var store = (0, _redux.createStore)(_reducers2.default, (0, _assign2.default)({}, persistedState, {
  clock: (0, _timeUtils.setTime)()
}), _isdev2.default ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : {});

store.subscribe((0, _throttle2.default)(function () {
  (0, _storageUtils.saveState)({
    lists: store.getState().lists,
    settings: store.getState().settings,
    watchlist: store.getState().watchlist
  });
}, 1000));

var Root = function Root(props) {
  return _react2.default.createElement(_App2.default, { store: store });
};

exports.default = Root;

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
    }
  }, {
    key: 'sortAndFilterNodes',
    value: function sortAndFilterNodes(props) {
      var _ref = props || this.props,
          nodelist = _ref.nodelist,
          search = _ref.search;

      var list = nodelist.nodes || [];

      if (nodelist.nodes && nodelist.nodes.length && !_lodash2.default.isEmpty(search)) {
        list = (0, _searchUtils2.default)(nodelist.nodes, search);
      } else {
        list = nodelist.nodes || [];
      }

      if (!_lodash2.default.isEmpty(nodelist.filterByType) && nodelist.filterByType !== 'all') {
        list = _lodash2.default.filter(list, { type: nodelist.filterByType });
      }

      if (nodelist.filterByLevel) {
        list = _lodash2.default.filter(list, { level: nodelist.filterByLevel });
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

      var sortedGroups = this.groupListByTime(list);

      this.setState({ 'list': list, sortedGroups: sortedGroups });
    }
  }, {
    key: 'shouldExpand',
    value: function shouldExpand(activePanels, groupName) {
      return activePanels.indexOf(groupName) >= 0 ? 'active' : '';
    }
  }, {
    key: 'renderListGroup',
    value: function renderListGroup(groupName) {
      var _state = this.state,
          sortedGroups = _state.sortedGroups,
          groups = _state.groups,
          activePanels = _state.activePanels;

      return _react2.default.createElement(
        'li',
        { className: groupName + '-list', key: groupName },
        _react2.default.createElement(
          'div',
          { id: groupName, className: 'collapsible-header' },
          groups[groupName],
          _react2.default.createElement(
            'span',
            { className: 'badge' },
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
              return _react2.default.createElement(_NodeListItem2.default, { node: node, key: node.id });
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


      return _react2.default.createElement(
        'div',
        { className: 'node-list' },
        _react2.default.createElement(
          'h4',
          { className: 'list-header' },
          list.length,
          ' results'
        ),
        _react2.default.createElement(
          'ul',
          { className: 'collapsible popout', ref: function ref(list) {
              _this3.collapseList = list;
            } },
          Object.keys(sortedGroups).map(function (group) {
            return renderListGroup(group, 'Active');
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

var _timeUtils = require('../utils/timeUtils');

var _watchListActions = require('../actions/watchListActions');

var _NodeStars = require('../components/NodeStars');

var _NodeStars2 = _interopRequireDefault(_NodeStars);

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
          toggleSelect = _props.toggleSelect;
      var stars = this.stars;

      var active = (0, _timeUtils.isActive)(clock.time, node.time, node.duration);

      var position = '',
          slot = node.slot || '?',
          timeRemaining,
          earthTimeRemaining,
          selected = _lodash2.default.indexOf(watchlist, node.id) !== -1;

      if (_lodash2.default.isArray(node.pos)) {
        position = node.pos.join(', ').replace(/\:/g, ' ');
      } else if (node.pos) {
        position = node.pos.replace(/\:/g, ' ');
      }

      if (active) {
        earthTimeRemaining = (0, _timeUtils.getEarthTimeRemaining)(node.time, node.duration, this.props.clock.time);
      }

      return _react2.default.createElement(
        'div',
        { className: 'col s12' },
        _react2.default.createElement(
          'div',
          { className: 'node node-list-item clearfix ' + (selected ? 'selected' : ''), onClick: toggleSelect.bind(this, node.id) },
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
              position
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
    watchlist: state.watchlist
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleSelect: function toggleSelect(id) {
      dispatch((0, _watchListActions.toggleSelect)(id));
      //dispatch(updateStorage({watchlist: this.props.watchlist}));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NodeListItem);

});

require.register("js/reducers/clockReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _timeUtils = require('../utils/timeUtils');

var clock = function clock() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments[1];

  switch (action.type) {
    case 'INCREMENT_CLOCK':
      return (0, _timeUtils.setTime)();
    default:
      return state;
  }
};

exports.default = clock;

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

var _listReducer = require('./listReducer');

var _listReducer2 = _interopRequireDefault(_listReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  clock: _clockReducer2.default,
  routing: _reactRouterRedux.routerReducer,
  nodelist: _nodeListReducer2.default,
  search: _searchReducer2.default,
  watchlist: _watchListReducer2.default,
  settings: _settingsReducer2.default,
  lists: _listReducer2.default
});

exports.default = rootReducer;

});

require.register("js/reducers/listReducer.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var list = function list() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];


    switch (action.type) {
        default:
            return state;
    }
};

exports.default = list;

});

require.register("js/reducers/nodeListReducer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeListActions = require('../actions/nodeListActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nodes() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isFetching: false,
    nodes: [],
    filterByType: 'all',
    filterByLevel: null,
    featureFilters: []
  };
  var action = arguments[1];

  switch (action.type) {
    case _nodeListActions.REQUEST_NODELIST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case _nodeListActions.RECEIVE_NODELIST:
      var nodes = [],
          id = 0;

      // merge the lists of nodes to a single array,
      // and create a unique entry for each time per node.
      _lodash2.default.each(action.nodes, function (list, key) {

        _lodash2.default.each(list, function (node) {
          var times = _lodash2.default.isArray(node.times) ? node.times : [node.times];

          _lodash2.default.each(times, function (time) {
            nodes.push(Object.assign({}, node, {
              time: time,
              type: key,
              id: key + '-' + id++
            }));
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
        filterByLevel: parseFloat(newFilter)
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

var _watchListActions = require('../actions/watchListActions');

var settings = function settings() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];


    switch (action.type) {
        default:
            return state;
    }
};

exports.default = settings;

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
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case _watchListActions.TOGGLE_SELECT:
      var list = _lodash2.default.clone(state),
          id = action.id,
          existsAt = _lodash2.default.indexOf(list, id);

      // if exists, remove from list
      if (existsAt !== -1) {
        list.splice(existsAt, 1);

        // otherwise we add it
      } else {
        list.push(id);
      }

      return list;
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

var _MainNav = require('./components/MainNav');

var _MainNav2 = _interopRequireDefault(_MainNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
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
        _react2.default.createElement(_reactRouterDom.Route, { path: '/about', component: _About2.default })
      )
    )
  );
};

});

require.register("js/utils/searchUtils.js", function(exports, require, module) {
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
  try {
    var serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

var saveState = exports.saveState = function saveState(state) {
  try {
    var serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
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

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

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

    _underscore2.default.each([a, b], function (time, idx) {
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
    var startUntil = getTimeDifference(currTime, nodeTime);
    durStr = getDurationStringFromObject(startUntil);

    return getEarthDurationfromEorzean(durStr);
};

// Expects format: 12:00 AM
var getTimeObjFromString = exports.getTimeObjFromString = function getTimeObjFromString(stringTime) {
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