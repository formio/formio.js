"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

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

var _Field2 = _interopRequireDefault(require("../_classes/field/Field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RadioComponent =
/*#__PURE__*/
function (_Field) {
  _inherits(RadioComponent, _Field);

  function RadioComponent() {
    _classCallCheck(this, RadioComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(RadioComponent).apply(this, arguments));
  }

  _createClass(RadioComponent, [{
    key: "render",
    value: function render() {
      return _get(_getPrototypeOf(RadioComponent.prototype), "render", this).call(this, this.renderTemplate('radio', {
        input: this.inputInfo,
        inline: this.component.inline,
        values: this.component.values,
        value: this.dataValue,
        row: this.row
      }));
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this = this;

      this.loadRefs(element, {
        input: 'multiple',
        wrapper: 'multiple'
      });
      this.refs.input.forEach(function (input, index) {
        _this.addEventListener(input, _this.inputInfo.changeEvent, function () {
          return _this.updateValue(null, {
            modified: true
          });
        });

        _this.addShortcut(input, _this.component.values[index].shortcut);
      });
      return _get(_getPrototypeOf(RadioComponent.prototype), "attach", this).call(this, element);
    }
  }, {
    key: "detach",
    value: function detach(element) {
      var _this2 = this;

      if (element && this.refs.input) {
        this.refs.input.forEach(function (input, index) {
          _this2.removeShortcut(input, _this2.component.values[index].shortcut);
        });
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
        return this.dataValue;
      }

      var value = this.dataValue;
      this.refs.input.forEach(function (input) {
        if (input.checked) {
          value = input.value;
        }
      });
      return value;
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      if (!value) {
        return '';
      }

      if (!_lodash.default.isString(value)) {
        return _lodash.default.toString(value);
      }

      var option = _lodash.default.find(this.component.values, function (v) {
        return v.value === value;
      });

      return _lodash.default.get(option, 'label');
    }
  }, {
    key: "setValueAt",
    value: function setValueAt(index, value) {
      if (this.refs.input && this.refs.input[index] && value !== null && value !== undefined) {
        var inputValue = this.refs.input[index].value;
        this.refs.input[index].checked = inputValue === value.toString();
      }
    }
  }, {
    key: "updateValue",
    value: function updateValue(value, flags) {
      var _this3 = this;

      var changed = _get(_getPrototypeOf(RadioComponent.prototype), "updateValue", this).call(this, value, flags);

      if (changed && this.refs.wrapper) {
        //add/remove selected option class
        var _value = this.dataValue;
        var optionSelectedClass = 'radio-selected';
        this.refs.wrapper.forEach(function (wrapper, index) {
          var input = _this3.refs.input[index];

          if (input && input.value.toString() === _value.toString()) {
            //add class to container when selected
            _this3.addClass(wrapper, optionSelectedClass);
          } else {
            _this3.removeClass(wrapper, optionSelectedClass);
          }
        });
      }

      return changed;
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
      var dataType = _lodash.default.get(this.component, 'dataType', 'auto');

      switch (dataType) {
        case 'auto':
          if (!isNaN(parseFloat(value)) && isFinite(value)) {
            value = +value;
          }

          if (value === 'true') {
            value = true;
          }

          if (value === 'false') {
            value = false;
          }

          break;

        case 'number':
          value = +value;
          break;

        case 'string':
          if (_typeof(value) === 'object') {
            value = JSON.stringify(value);
          } else {
            value = value.toString();
          }

          break;

        case 'boolean':
          value = !!value;
          break;
      }

      return _get(_getPrototypeOf(RadioComponent.prototype), "normalizeValue", this).call(this, value);
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return RadioComponent.schema();
    }
  }, {
    key: "inputInfo",
    get: function get() {
      var info = _get(_getPrototypeOf(RadioComponent.prototype), "elementInfo", this).call(this);

      info.type = 'input';
      info.changeEvent = 'click';
      info.attr.class = 'form-check-input';
      info.attr.name = info.attr.name += "[".concat(this.id, "]");
      return info;
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return '';
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Field2.default.schema.apply(_Field2.default, [{
        type: 'radio',
        inputType: 'radio',
        label: 'Radio',
        key: 'radio',
        values: [{
          label: '',
          value: ''
        }],
        fieldSet: false
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Radio',
        group: 'basic',
        icon: 'dot-circle-o',
        weight: 80,
        documentation: 'http://help.form.io/userguide/#radio',
        schema: RadioComponent.schema()
      };
    }
  }]);

  return RadioComponent;
}(_Field2.default);

exports.default = RadioComponent;