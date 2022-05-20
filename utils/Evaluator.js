"use strict";

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.reflect.construct.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _stringHash = _interopRequireDefault(require("string-hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var Evaluator = {
  noeval: false,
  protectedEval: false,
  // This property can be customized only by plugins
  cache: {},
  templateSettings: {
    evaluate: /\{%([\s\S]+?)%\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g,
    escape: /\{\{\{([\s\S]+?)\}\}\}/g
  },
  evaluator: function evaluator(func) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    if (Evaluator.noeval) {
      console.warn('No evaluations allowed for this renderer.');
      return _lodash.default.noop;
    }

    if (_typeof(params[0]) === 'object') {
      params = _lodash.default.keys(params[0]);
    }

    return _construct(Function, _toConsumableArray(params).concat([func]));
  },
  template: function template(_template, hash) {
    hash = hash || (0, _stringHash.default)(_template);

    try {
      // Ensure we handle copied templates from the ejs files.
      _template = _template.replace(/ctx\./g, '');
      return Evaluator.cache[hash] = _lodash.default.template(_template, Evaluator.templateSettings);
    } catch (err) {
      console.warn('Error while processing template', err, _template);
    }
  },
  interpolate: function interpolate(rawTemplate, data, _options) {
    // Ensure reverse compatability.
    var options = _lodash.default.isObject(_options) ? _options : {
      noeval: _options
    };

    if (typeof rawTemplate === 'function') {
      try {
        return rawTemplate(data);
      } catch (err) {
        console.warn('Error interpolating template', err, data);
        return err.message;
      }
    }

    rawTemplate = String(rawTemplate);
    var hash = (0, _stringHash.default)(rawTemplate);
    var template;

    if (Evaluator.cache[hash]) {
      template = Evaluator.cache[hash];
    } else if (Evaluator.noeval || options.noeval) {
      // No cached template methods available. Use poor-mans interpolate without eval.
      return rawTemplate.replace(/({{\s*(.*?)\s*}})/g, function (match, $1, $2) {
        // Allow for conditional values.
        var parts = $2.split('||').map(function (item) {
          return item.trim();
        });
        var value = '';
        var path = '';

        for (var i = 0; i < parts.length; i++) {
          path = parts[i];
          value = _lodash.default.get(data, path);

          if (value) {
            break;
          }
        }

        if (options.data) {
          _lodash.default.set(options.data, path, value);
        }

        return value;
      });
    } else {
      template = Evaluator.template(rawTemplate, hash);
    }

    if (typeof template === 'function') {
      try {
        return template(data);
      } catch (err) {
        console.warn('Error interpolating template', err, rawTemplate, data);
        return err.message;
      }
    }

    return template;
  },
  evaluate: function evaluate(func, args) {
    return Array.isArray(args) ? func.apply(void 0, _toConsumableArray(args)) : func(args);
  }
};

Evaluator.registerEvaluator = function (evaluator) {
  Object.keys(evaluator).forEach(function (key) {
    Evaluator[key] = evaluator[key];
  });
};

var _default = Evaluator;
exports.default = _default;