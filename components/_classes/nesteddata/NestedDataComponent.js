'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _Component = _interopRequireDefault(require("../component/Component"));

var _NestedComponent2 = _interopRequireDefault(require("../nested/NestedComponent"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var NestedDataComponent = /*#__PURE__*/function (_NestedComponent) {
  _inherits(NestedDataComponent, _NestedComponent);

  var _super = _createSuper(NestedDataComponent);

  function NestedDataComponent() {
    _classCallCheck(this, NestedDataComponent);

    return _super.apply(this, arguments);
  }

  _createClass(NestedDataComponent, [{
    key: "hasChanged",
    value: function hasChanged(newValue, oldValue) {
      // If we do not have a value and are getting set to anything other than undefined or null, then we changed.
      if (newValue !== undefined && newValue !== null && !this.hasValue()) {
        return true;
      }

      return !_lodash.default.isEqual(newValue, oldValue);
    }
  }, {
    key: "allowData",
    get: function get() {
      return true;
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value, options) {
      if (options !== null && options !== void 0 && options.email) {
        var result = "\n        <table border=\"1\" style=\"width:100%\">\n          <tbody>\n      ";
        this.everyComponent(function (component) {
          if (component.isInputComponent && component.visible && !component.skipInEmail) {
            result += "\n            <tr>\n              <th style=\"padding: 5px 10px;\">".concat(component.label, "</th>\n              <td style=\"width:100%;padding:5px 10px;\">").concat(component.getView(component.dataValue, options), "</td>\n            </tr>\n          ");
          }
        }, _objectSpread(_objectSpread({}, options), {}, {
          fromRoot: true
        }));
        result += "\n          </tbody>\n        </table>\n      ";
        return result;
      }

      if (_lodash.default.isEmpty(value)) {
        return '';
      }

      if (options !== null && options !== void 0 && options.modalPreview) {
        delete options.modalPreview;
        return this.getDataValueAsTable(value, options);
      }

      return '[Complex Data]';
    }
  }, {
    key: "getDataValueAsTable",
    value: function getDataValueAsTable(value, options) {
      var result = "\n      <table border=\"1\" style=\"width:100%\">\n        <tbody>\n    ";
      var htmlTagRegExp = new RegExp('<(.*?)>');
      this.components.forEach(function (component) {
        if (component.isInputComponent && component.visible && !component.skipInEmail) {
          var componentValue = component.getView(component.dataValue, options);
          result += "\n          <tr>\n            <th style=\"padding: 5px 10px;\">".concat(component.label, "</th>\n            <td style=\"width:100%;padding:5px 10px;\">").concat(component.component && component.component.inputFormat === 'html' && htmlTagRegExp.test(componentValue) ? componentValue : "<input type=\"text\" value=\"".concat(componentValue.replace(/"/g, '&quot;'), "\" readonly/>"), "</td>\n          </tr>\n        ");
        }
      }, _objectSpread(_objectSpread({}, options), {}, {
        fromRoot: true
      }));
      result += "\n        </tbody>\n      </table>\n    ";
      return result;
    }
  }, {
    key: "everyComponent",
    value: function everyComponent(fn, options) {
      if (options !== null && options !== void 0 && options.email) {
        if (options.fromRoot) {
          delete options.fromRoot;
        } else {
          return;
        }
      }

      return _get(_getPrototypeOf(NestedDataComponent.prototype), "everyComponent", this).call(this, fn, options);
    }
    /**
     * Get the value of this component.
     *
     * @returns {*}
     */

  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "updateValue",
    value: function updateValue(value) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // Intentionally skip over nested component updateValue method to keep
      // recursive update from occurring with sub components.
      return _Component.default.prototype.updateValue.call(this, value, flags);
    }
  }]);

  return NestedDataComponent;
}(_NestedComponent2.default);

exports.default = NestedDataComponent;