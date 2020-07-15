'use strict';

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Component = _interopRequireDefault(require("../component/Component"));

var _NestedDataComponent2 = _interopRequireDefault(require("../nesteddata/NestedDataComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var NestedArrayComponent = /*#__PURE__*/function (_NestedDataComponent) {
  _inherits(NestedArrayComponent, _NestedDataComponent);

  var _super = _createSuper(NestedArrayComponent);

  function NestedArrayComponent() {
    _classCallCheck(this, NestedArrayComponent);

    return _super.apply(this, arguments);
  }

  _createClass(NestedArrayComponent, [{
    key: "componentContext",
    value: function componentContext(component) {
      return this.iteratableRows[component.rowIndex].data;
    }
  }, {
    key: "checkData",
    value: function checkData(data, flags, row) {
      data = data || this.rootValue;
      flags = flags || {};
      row = row || this.data;
      return this.checkRows('checkData', data, flags, _Component.default.prototype.checkData.call(this, data, flags, row));
    }
  }, {
    key: "checkRows",
    value: function checkRows(method, data, opts, defaultValue, silentCheck) {
      var _this = this;

      return this.iteratableRows.reduce(function (valid, row) {
        return _this.checkRow(method, data, opts, row.data, row.components, silentCheck) && valid;
      }, defaultValue);
    }
  }, {
    key: "checkRow",
    value: function checkRow(method, data, opts, row, components, silentCheck) {
      return _lodash.default.reduce(components, function (valid, component) {
        return component[method](data, opts, row, silentCheck) && valid;
      }, true);
    }
  }, {
    key: "hasAddButton",
    value: function hasAddButton() {
      var maxLength = _lodash.default.get(this.component, 'validate.maxLength');

      var conditionalAddButton = _lodash.default.get(this.component, 'conditionalAddButton');

      return !this.component.disableAddingRemovingRows && !this.options.readOnly && !this.disabled && this.fullMode && !this.options.preview && (!maxLength || this.iteratableRows.length < maxLength) && (!conditionalAddButton || this.evaluate(conditionalAddButton, {
        value: this.dataValue
      }, 'show'));
    }
  }, {
    key: "getComponent",
    value: function getComponent(path, fn, originalPath) {
      path = Array.isArray(path) ? path : [path];
      var key = path.shift();
      var remainingPath = path;
      var result = [];
      var possibleComp = null;
      var comp = null;
      var rowIndex = null;

      if (_lodash.default.isNumber(key)) {
        rowIndex = key;
        key = remainingPath.shift();
      }

      if (!_lodash.default.isString(key)) {
        return result;
      }

      this.everyComponent(function (component, components) {
        if (component.component.key === key) {
          possibleComp = component;

          if (remainingPath.length > 0 && 'getComponent' in component) {
            comp = component.getComponent(remainingPath, fn, originalPath);
          } else if (fn) {
            fn(component, components);
          }

          result = rowIndex !== null ? comp : result.concat(comp);
        }
      }, rowIndex);

      if ((!result || result.length === 0) && possibleComp) {
        result = rowIndex !== null ? possibleComp : [possibleComp];
      }

      return result;
    }
  }, {
    key: "everyComponent",
    value: function everyComponent(fn, rowIndex, options) {
      var _options;

      if (_lodash.default.isObject(rowIndex)) {
        options = rowIndex;
        rowIndex = null;
      }

      if ((_options = options) === null || _options === void 0 ? void 0 : _options.email) {
        return;
      }

      var components = this.getComponents(rowIndex);

      _lodash.default.each(components, function (component, index) {
        if (fn(component, components, index) === false) {
          return false;
        }

        if (typeof component.everyComponent === 'function') {
          if (component.everyComponent(fn, options) === false) {
            return false;
          }
        }
      });
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value, options) {
      if (options === null || options === void 0 ? void 0 : options.email) {
        var result = "\n        <table border=\"1\" style=\"width:100%\">\n          <thead>\n            <tr>\n      ";
        this.component.components.forEach(function (component) {
          var label = component.label || component.key;
          result += "<th style=\"padding: 5px 10px;\">".concat(label, "</th>");
        });
        result += "\n          </tr>\n        </thead>\n        <tbody>\n      ";
        this.iteratableRows.forEach(function (_ref) {
          var components = _ref.components;
          result += '<tr>';

          _lodash.default.each(components, function (component) {
            result += '<td style="padding:5px 10px;">';

            if (component.isInputComponent && component.visible && !component.skipInEmail) {
              result += component.getView(component.dataValue, options);
            }

            result += '</td>';
          });

          result += '</tr>';
        });
        result += "\n          </tbody>\n        </table>\n      ";
        return result;
      }

      return _get(_getPrototypeOf(NestedArrayComponent.prototype), "getValueAsString", this).call(this, value, options);
    }
  }, {
    key: "getComponents",
    value: function getComponents(rowIndex) {
      if (rowIndex) {
        if (!this.iteratableRows[rowIndex]) {
          return [];
        }

        return this.iteratableRows[rowIndex].components;
      }

      return _get(_getPrototypeOf(NestedArrayComponent.prototype), "getComponents", this).call(this);
    }
  }, {
    key: "iteratableRows",
    get: function get() {
      throw new Error('Getter #iteratableRows() is not implemented');
    }
  }, {
    key: "rowIndex",
    get: function get() {
      return _get(_getPrototypeOf(NestedArrayComponent.prototype), "rowIndex", this);
    },
    set: function set(value) {
      this._rowIndex = value;
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedDataComponent2.default.schema.apply(_NestedDataComponent2.default, [{
        disableAddingRemovingRows: false
      }].concat(extend));
    }
  }]);

  return NestedArrayComponent;
}(_NestedDataComponent2.default);

exports.default = NestedArrayComponent;