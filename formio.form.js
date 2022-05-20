"use strict";

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
Object.defineProperty(exports, "Conjunctions", {
  enumerable: true,
  get: function get() {
    return _conjunctions.default;
  }
});
Object.defineProperty(exports, "Displays", {
  enumerable: true,
  get: function get() {
    return _Displays.default;
  }
});
Object.defineProperty(exports, "Form", {
  enumerable: true,
  get: function get() {
    return _Form.default;
  }
});
Object.defineProperty(exports, "Formio", {
  enumerable: true,
  get: function get() {
    return _Formio.default;
  }
});
Object.defineProperty(exports, "Operators", {
  enumerable: true,
  get: function get() {
    return _operators.default;
  }
});
Object.defineProperty(exports, "Providers", {
  enumerable: true,
  get: function get() {
    return _providers.default;
  }
});
Object.defineProperty(exports, "QuickRules", {
  enumerable: true,
  get: function get() {
    return _quickRules.default;
  }
});
Object.defineProperty(exports, "Rules", {
  enumerable: true,
  get: function get() {
    return _Rules.default;
  }
});
Object.defineProperty(exports, "Templates", {
  enumerable: true,
  get: function get() {
    return _Templates.default;
  }
});
Object.defineProperty(exports, "Transformers", {
  enumerable: true,
  get: function get() {
    return _transformers.default;
  }
});
Object.defineProperty(exports, "Utils", {
  enumerable: true,
  get: function get() {
    return _utils.default;
  }
});
Object.defineProperty(exports, "ValueSources", {
  enumerable: true,
  get: function get() {
    return _valueSources.default;
  }
});
Object.defineProperty(exports, "Widgets", {
  enumerable: true,
  get: function get() {
    return _widgets.default;
  }
});

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _components = _interopRequireDefault(require("./components"));

var _Builders = _interopRequireDefault(require("./builders/Builders"));

var _Components = _interopRequireDefault(require("./components/Components"));

var _Displays = _interopRequireDefault(require("./displays/Displays"));

var _Templates = _interopRequireDefault(require("./templates/Templates"));

var _providers = _interopRequireDefault(require("./providers"));

var _Rules = _interopRequireDefault(require("./validator/Rules"));

var _conjunctions = _interopRequireDefault(require("./validator/conjunctions"));

var _operators = _interopRequireDefault(require("./validator/operators"));

var _quickRules = _interopRequireDefault(require("./validator/quickRules"));

var _transformers = _interopRequireDefault(require("./validator/transformers"));

var _valueSources = _interopRequireDefault(require("./validator/valueSources"));

var _widgets = _interopRequireDefault(require("./widgets"));

var _Form = _interopRequireDefault(require("./Form"));

var _utils = _interopRequireDefault(require("./utils"));

var _Evaluator = _interopRequireDefault(require("./utils/Evaluator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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
_Formio.default.Providers = _providers.default;
_Formio.default.Rules = _Rules.default;
_Formio.default.Widgets = _widgets.default;
_Formio.default.Evaluator = _Evaluator.default;
_Formio.default.Conjunctions = _conjunctions.default;
_Formio.default.Operators = _operators.default;
_Formio.default.QuickRules = _quickRules.default;
_Formio.default.Transformers = _transformers.default;
_Formio.default.ValueSources = _valueSources.default;
_Formio.default.AllComponents = _components.default; // This is strange, but is needed for "premium" components to import correctly.

_Formio.default.Formio = _Formio.default;

_Formio.default.Components.setComponents(_components.default);

var registerPlugin = function registerPlugin(plugin) {
  // Sanity check.
  if (_typeof(plugin) !== 'object') {
    return;
  }

  for (var _i = 0, _Object$keys = Object.keys(plugin); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var current = plugin.framework || _Formio.default.Templates.framework || 'bootstrap';

    switch (key) {
      case 'options':
        _Formio.default.options = _lodash.default.merge(_Formio.default.options, plugin.options);
        break;

      case 'templates':
        for (var _i2 = 0, _Object$keys2 = Object.keys(plugin.templates); _i2 < _Object$keys2.length; _i2++) {
          var framework = _Object$keys2[_i2];

          _Formio.default.Templates.extendTemplate(framework, plugin.templates[framework]);
        }

        if (plugin.templates[current]) {
          _Formio.default.Templates.current = plugin.templates[current];
        }

        break;

      case 'components':
        _Formio.default.Components.setComponents(plugin.components);

        break;

      case 'framework':
        _Formio.default.Templates.framework = plugin.framework;
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

          _Formio.default.Providers.addProviders(type, plugin.providers[type]);
        }

        break;

      case 'displays':
        _Formio.default.Displays.addDisplays(plugin.displays);

        break;

      case 'builders':
        _Formio.default.Builders.addBuilders(plugin.builders);

        break;

      case 'rules':
        _Formio.default.Rules.addRules(plugin.rules);

        break;

      case 'evaluator':
        _Formio.default.Evaluator.registerEvaluator(plugin.evaluator);

        break;

      case 'conjunctions':
        _Formio.default.Conjunctions.addConjunctions(plugin.conjunctions);

        break;

      case 'operators':
        _Formio.default.Operators.addOperators(plugin.operators);

        break;

      case 'quickRules':
        _Formio.default.QuickRules.addQuickRules(plugin.quickRules);

        break;

      case 'transformers':
        _Formio.default.Transformers.addTransformers(plugin.transformers);

        break;

      case 'valueSources':
        _Formio.default.ValueSources.addValueSources(plugin.valueSources);

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
}; // Export the components.