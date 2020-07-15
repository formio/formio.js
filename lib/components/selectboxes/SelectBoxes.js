"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

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

var _Radio = _interopRequireDefault(require("../radio/Radio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SelectBoxesComponent = /*#__PURE__*/function (_RadioComponent) {
  _inherits(SelectBoxesComponent, _RadioComponent);

  var _super = _createSuper(SelectBoxesComponent);

  _createClass(SelectBoxesComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Radio.default.schema.apply(_Radio.default, [{
        type: 'selectboxes',
        label: 'Select Boxes',
        key: 'selectBoxes',
        inline: false
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Select Boxes',
        group: 'basic',
        icon: 'plus-square',
        weight: 60,
        documentation: 'http://help.form.io/userguide/#selectboxes',
        schema: SelectBoxesComponent.schema()
      };
    }
  }]);

  function SelectBoxesComponent() {
    var _this;

    _classCallCheck(this, SelectBoxesComponent);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.validators = _this.validators.concat('minSelectedCount', 'maxSelectedCount');
    return _this;
  }

  _createClass(SelectBoxesComponent, [{
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(SelectBoxesComponent.prototype), "init", this).call(this);

      this.component.inputType = 'checkbox';
    }
  }, {
    key: "isEmpty",

    /**
     * Only empty if the values are all false.
     *
     * @param value
     * @return {boolean}
     */
    value: function isEmpty() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataValue;
      var empty = true;

      for (var key in value) {
        if (value.hasOwnProperty(key) && value[key]) {
          empty = false;
          break;
        }
      }

      return empty;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
        return this.dataValue;
      }

      var value = {};

      _lodash.default.each(this.refs.input, function (input) {
        value[input.value] = !!input.checked;
      });

      return value;
    }
    /**
     * Normalize values coming into updateValue.
     *
     * @param value
     * @return {*}
     */

  }, {
    key: "normalizeValue",
    value: function normalizeValue(value) {
      value = value || {};

      if (_typeof(value) !== 'object') {
        if (typeof value === 'string') {
          value = _defineProperty({}, value, true);
        } else {
          value = {};
        }
      }

      if (Array.isArray(value)) {
        _lodash.default.each(value, function (val) {
          value[val] = true;
        });
      }

      return value;
    }
    /**
     * Set the value of this component.
     *
     * @param value
     * @param flags
     */

  }, {
    key: "setValue",
    value: function setValue(value) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var changed = this.updateValue(value, flags);
      value = this.dataValue;

      _lodash.default.each(this.refs.input, function (input) {
        if (_lodash.default.isUndefined(value[input.value])) {
          value[input.value] = false;
        }

        input.checked = !!value[input.value];
      });

      return changed;
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      if (!value) {
        return '';
      }

      return (0, _lodash.default)(this.component.values || []).filter(function (v) {
        return value[v.value];
      }).map('label').join(', ');
    }
  }, {
    key: "checkComponentValidity",
    value: function checkComponentValidity(data, dirty, rowData) {
      var _this2 = this;

      var minCount = this.component.validate.minSelectedCount;
      var maxCount = this.component.validate.maxSelectedCount;

      if ((maxCount || minCount) && !this.isValid(data, dirty)) {
        var count = Object.keys(this.validationValue).reduce(function (total, key) {
          if (_this2.validationValue[key]) {
            total++;
          }

          return total;
        }, 0);

        if (maxCount && count >= maxCount) {
          if (this.refs.input) {
            this.refs.input.forEach(function (item) {
              if (!item.checked) {
                item.disabled = true;
              }
            });
          }

          if (maxCount && count > maxCount) {
            var message = this.component.maxSelectedCountMessage ? this.component.maxSelectedCountMessage : "You can only select up to ".concat(maxCount, " items.");
            this.setCustomValidity(message, dirty);
            return false;
          }
        } else if (minCount && count < minCount) {
          if (this.refs.input) {
            this.refs.input.forEach(function (item) {
              item.disabled = false;
            });
          }

          var _message = this.component.minSelectedCountMessage ? this.component.minSelectedCountMessage : "You must select at least ".concat(minCount, " items.");

          this.setCustomValidity(_message, dirty);
          return false;
        } else {
          if (this.refs.input) {
            this.refs.input.forEach(function (item) {
              item.disabled = false;
            });
          }
        }
      }

      return _get(_getPrototypeOf(SelectBoxesComponent.prototype), "checkComponentValidity", this).call(this, data, dirty, rowData);
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return SelectBoxesComponent.schema();
    }
  }, {
    key: "inputInfo",
    get: function get() {
      var info = _get(_getPrototypeOf(SelectBoxesComponent.prototype), "elementInfo", this).call(this);

      info.attr.name += '[]';
      info.attr.type = 'checkbox';
      info.attr.class = 'form-check-input';
      return info;
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return this.component.values.reduce(function (prev, value) {
        prev[value.value] = false;
        return prev;
      }, {});
    }
  }]);

  return SelectBoxesComponent;
}(_Radio.default);

exports.default = SelectBoxesComponent;