"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Builders", {
  enumerable: true,
  get: function get() {
    return _Builders.default;
  }
});
Object.defineProperty(exports, "Components", {
  enumerable: true,
  get: function get() {
    return _Components.default;
  }
});
Object.defineProperty(exports, "Displays", {
  enumerable: true,
  get: function get() {
    return _Displays.default;
  }
});
Object.defineProperty(exports, "Templates", {
  enumerable: true,
  get: function get() {
    return _Templates.default;
  }
});
Object.defineProperty(exports, "Providers", {
  enumerable: true,
  get: function get() {
    return _providers.default;
  }
});
Object.defineProperty(exports, "Formio", {
  enumerable: true,
  get: function get() {
    return _Formio.default;
  }
});
Object.defineProperty(exports, "Form", {
  enumerable: true,
  get: function get() {
    return _Form.default;
  }
});
Object.defineProperty(exports, "Utils", {
  enumerable: true,
  get: function get() {
    return _utils.default;
  }
});

var _components = _interopRequireDefault(require("./components"));

var _Builders = _interopRequireDefault(require("./builders/Builders"));

var _Components = _interopRequireDefault(require("./components/Components"));

var _Displays = _interopRequireDefault(require("./displays/Displays"));

var _Templates = _interopRequireDefault(require("./templates/Templates"));

var _providers = _interopRequireDefault(require("./providers"));

var _Rules = _interopRequireDefault(require("./validator/Rules"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _Form = _interopRequireDefault(require("./Form"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

_Components.default.setComponents(_components.default);

var registerPlugin = function registerPlugin(plugin) {
  // Sanity check.
  if (_typeof(plugin) !== 'object') {
    return;
  }

  for (var _i = 0, _Object$keys = Object.keys(plugin); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var current = plugin.framework || _Templates.default.framework || 'bootstrap';

    switch (key) {
      case 'options':
        _Formio.default.options = plugin.options;
        break;

      case 'templates':
        for (var _i2 = 0, _Object$keys2 = Object.keys(plugin.templates); _i2 < _Object$keys2.length; _i2++) {
          var framework = _Object$keys2[_i2];

          _Templates.default.extendTemplate(framework, plugin.templates[framework]);
        }

        if (plugin.templates[current]) {
          _Templates.default.current = plugin.templates[current];
        }

        break;

      case 'components':
        _Components.default.setComponents(plugin.components);

        break;

      case 'framework':
        _Templates.default.framework = plugin.framework;
        break;

      case 'fetch':
        for (var _i3 = 0, _Object$keys3 = Object.keys(plugin.fetch); _i3 < _Object$keys3.length; _i3++) {
          var name = _Object$keys3[_i3];

          _Formio.default.registerPlugin(plugin.fetch[name], name);
        }

        break;

      case 'providers':
        for (var _i4 = 0, _Object$keys4 = Object.keys(plugin.providers); _i4 < _Object$keys4.length; _i4++) {
          var type = _Object$keys4[_i4];

          _providers.default.addProviders(type, plugin.providers[type]);
        }

        break;

      case 'displays':
        _Displays.default.addDisplays(plugin.displays);

        break;

      case 'builders':
        _Builders.default.addBuilders(plugin.builders);

        break;

      case 'rules':
        _Rules.default.addRules(plugin.rules);

        break;

      default:
        console.log('Unknown plugin option', key);
    }
  }
};
/**
 * Allows passing in plugins as multiple arguments or an array of plugins.
 *
 * Formio.plugins(plugin1, plugin2, etc);
 * Formio.plugins([plugin1, plugin2, etc]);
 */


_Formio.default.use = function () {
  for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  plugins.forEach(function (plugin) {
    if (Array.isArray(plugin)) {
      plugin.forEach(function (p) {
        return registerPlugin(p);
      });
    } else {
      registerPlugin(plugin);
    }
  });
};

_Formio.default.loadModules = function () {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "".concat(_Formio.default.getApiUrl(), "/externalModules.js");
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'externalModules';

  _Formio.default.requireLibrary(name, name, path, true).then(function (modules) {
    _Formio.default.use(modules);
  });
}; // This is needed to maintain correct imports using the "dist" file.


_Formio.default.Components = _Components.default;
_Formio.default.Templates = _Templates.default;
_Formio.default.Builders = _Builders.default;
_Formio.default.Utils = _utils.default;
_Formio.default.Form = _Form.default;
_Formio.default.Displays = _Displays.default;
_Formio.default.Providers = _providers.default; // This is strange, but is needed for "premium" components to import correctly.

_Formio.default.Formio = _Formio.default; // Export the components.