"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SelectBoxesComponent =
/*#__PURE__*/
function (_RadioComponent) {
  _inherits(SelectBoxesComponent, _RadioComponent);

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
        icon: 'fa fa-plus-square',
        weight: 60,
        documentation: 'http://help.form.io/userguide/#selectboxes',
        schema: SelectBoxesComponent.schema()
      };
    }
  }]);

  function SelectBoxesComponent(component, options, data) {
    var _this;

    _classCallCheck(this, SelectBoxesComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectBoxesComponent).call(this, component, options, data));
    _this.validators = _this.validators.concat(['minSelectedCount', 'maxSelectedCount']);
    _this.component.inputType = 'checkbox';
    return _this;
  }

  _createClass(SelectBoxesComponent, [{
    key: "elementInfo",
    value: function elementInfo() {
      var info = _get(_getPrototypeOf(SelectBoxesComponent.prototype), "elementInfo", this).call(this);

      info.attr.name += '[]';
      info.attr.type = 'checkbox';
      info.attr.class = 'form-check-input';
      return info;
    }
  }, {
    key: "isEmpty",

    /**
     * Only empty if the values are all false.
     *
     * @param value
     * @return {boolean}
     */
    value: function isEmpty(value) {
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
      if (this.viewOnly) {
        return this.dataValue;
      }

      var value = {};

      _lodash.default.each(this.inputs, function (input) {
        value[input.value] = !!input.checked;
      });

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
    value: function setValue(value, flags) {
      value = value || {};

      if (_typeof(value) !== 'object') {
        if (typeof value === 'string') {
          value = _defineProperty({}, value, true);
        } else {
          value = {};
        }
      }

      flags = this.getFlags.apply(this, arguments);

      if (Array.isArray(value)) {
        _lodash.default.each(value, function (val) {
          value[val] = true;
        });
      }

      _lodash.default.each(this.inputs, function (input) {
        if (_lodash.default.isUndefined(value[input.value])) {
          value[input.value] = false;
        }

        input.checked = !!value[input.value];
      });

      this.updateValue(flags);
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty, rowData) {
      var _this2 = this;

      var maxCount = this.component.validate.maxSelectedCount;

      if (maxCount) {
        var count = Object.keys(this.validationValue).reduce(function (total, key) {
          if (_this2.validationValue[key]) {
            total++;
          }

          return total;
        }, 0);

        if (count >= maxCount) {
          this.inputs.forEach(function (item) {
            if (!item.checked) {
              item.disabled = true;
            }
          });
          var message = this.component.maxSelectedCountMessage ? this.component.maxSelectedCountMessage : "You can only select up to ".concat(maxCount, " items to continue.");
          this.setCustomValidity(message);
          return false;
        } else {
          this.inputs.forEach(function (item) {
            item.disabled = false;
          });
        }
      }

      return _get(_getPrototypeOf(SelectBoxesComponent.prototype), "checkValidity", this).call(this, data, dirty, rowData);
    }
  }, {
    key: "getView",
    value: function getView(value) {
      if (!value) {
        return '';
      }

      return (0, _lodash.default)(this.component.values || []).filter(function (v) {
        return value[v.value];
      }).map('label').join(', ');
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return SelectBoxesComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return this.component.values.reduce(function (prev, value) {
        prev[value.value] = false;
        return prev;
      }, {});
    }
  }, {
    key: "validationValue",
    get: function get() {
      return _get(_getPrototypeOf(SelectBoxesComponent.prototype), "validationValue", this);
    }
  }]);

  return SelectBoxesComponent;
}(_Radio.default);

exports.default = SelectBoxesComponent;