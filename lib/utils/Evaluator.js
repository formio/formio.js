"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _stringHash = _interopRequireDefault(require("string-hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Evaluator = {
  noeval: false,
  cache: {},
  templateSettings: {
    evaluate: /\{%([\s\S]+?)%\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g,
    escape: /\{\{\{([\s\S]+?)\}\}\}/g
  },
  evaluator: function evaluator(func) {
    if (Evaluator.noeval) {
      console.warn('No evaluations allowed for this renderer.');
      return _lodash.default.noop;
    }

    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    return _construct(Function, params.concat([func]));
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
  interpolate: function interpolate(rawTemplate, data) {
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
    } else if (Evaluator.noeval) {
      // No cached template methods available. Use poor-mans interpolate without eval.
      return rawTemplate.replace(/({{\s+(.*)\s+}})/, function (match, $1, $2) {
        return _lodash.default.get(data, $2);
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
  }
};
var _default = Evaluator;
exports.default = _default;