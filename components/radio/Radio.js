"use strict";

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.find-index.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _Field2 = _interopRequireDefault(require("../_classes/field/Field"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

var RadioComponent = /*#__PURE__*/function (_Field) {
  _inherits(RadioComponent, _Field);

  var _super = _createSuper(RadioComponent);

  function RadioComponent(component, options, data) {
    var _this;

    _classCallCheck(this, RadioComponent);

    _this = _super.call(this, component, options, data);
    _this.previousValue = _this.dataValue || null;
    return _this;
  }

  _createClass(RadioComponent, [{
    key: "defaultSchema",
    get: function get() {
      return RadioComponent.schema();
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var defaultValue = _get(_getPrototypeOf(RadioComponent.prototype), "defaultValue", this);

      if (!defaultValue && this.component.defaultValue === false) {
        defaultValue = this.component.defaultValue;
      }

      return defaultValue;
    }
  }, {
    key: "inputInfo",
    get: function get() {
      var _this$root;

      var info = _get(_getPrototypeOf(RadioComponent.prototype), "elementInfo", this).call(this);

      info.type = 'input';
      info.changeEvent = 'click';
      info.attr.class = 'form-check-input';
      info.attr.name = info.attr.name += "[".concat((_this$root = this.root) === null || _this$root === void 0 ? void 0 : _this$root.id, "-").concat(this.id, "]");
      return info;
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return '';
    }
  }, {
    key: "isRadio",
    get: function get() {
      return this.component.inputType === 'radio';
    }
  }, {
    key: "optionSelectedClass",
    get: function get() {
      return 'radio-selected';
    }
  }, {
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(RadioComponent.prototype), "init", this).call(this);

      this.validators = this.validators.concat(['select', 'onlyAvailableItems']);
    }
  }, {
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
      var _this2 = this;

      this.loadRefs(element, {
        input: 'multiple',
        wrapper: 'multiple'
      });
      this.refs.input.forEach(function (input, index) {
        _this2.addEventListener(input, _this2.inputInfo.changeEvent, function () {
          _this2.updateValue(null, {
            modified: true
          });
        });

        _this2.addShortcut(input, _this2.component.values[index].shortcut);

        if (_this2.isRadio) {
          var dataValue = _this2.dataValue;

          if (!_lodash.default.isString(_this2.dataValue)) {
            dataValue = _lodash.default.toString(_this2.dataValue);
          }

          input.checked = dataValue === input.value;

          _this2.addEventListener(input, 'keyup', function (event) {
            if (event.key === ' ' && dataValue === input.value) {
              event.preventDefault();

              _this2.updateValue(null, {
                modified: true
              });
            }
          });
        }
      });
      this.setSelectedClasses();
      return _get(_getPrototypeOf(RadioComponent.prototype), "attach", this).call(this, element);
    }
  }, {
    key: "detach",
    value: function detach(element) {
      var _this3 = this;

      if (element && this.refs.input) {
        this.refs.input.forEach(function (input, index) {
          _this3.removeShortcut(input, _this3.component.values[index].shortcut);
        });
      }

      _get(_getPrototypeOf(RadioComponent.prototype), "detach", this).call(this);
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
    key: "validateValueAvailability",
    value: function validateValueAvailability(setting, value) {
      var _this4 = this;

      if (!(0, _utils.boolValue)(setting) || !value) {
        return true;
      }

      var values = this.component.values;

      if (values) {
        return values.findIndex(function (_ref) {
          var optionValue = _ref.value;
          return _this4.normalizeValue(optionValue) === value;
        }) !== -1;
      }

      return false;
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      if (!value) {
        return '';
      }

      if (!_lodash.default.isString(value)) {
        value = _lodash.default.toString(value);
      }

      var option = _lodash.default.find(this.component.values, function (v) {
        return v.value === value;
      });

      return _lodash.default.get(option, 'label', '');
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
    key: "setSelectedClasses",
    value: function setSelectedClasses() {
      var _this5 = this;

      if (this.refs.wrapper) {
        //add/remove selected option class
        var value = this.dataValue;
        this.refs.wrapper.forEach(function (wrapper, index) {
          var input = _this5.refs.input[index];
          var checked = input.type === 'checkbox' ? value[input.value] : input.value.toString() === value.toString();

          if (checked) {
            //add class to container when selected
            _this5.addClass(wrapper, _this5.optionSelectedClass); //change "checked" attribute


            input.setAttribute('checked', 'true');
          } else {
            _this5.removeClass(wrapper, _this5.optionSelectedClass);

            input.removeAttribute('checked');
          }
        });
      }
    }
  }, {
    key: "updateValue",
    value: function updateValue(value, flags) {
      var changed = _get(_getPrototypeOf(RadioComponent.prototype), "updateValue", this).call(this, value, flags);

      if (changed) {
        this.setSelectedClasses();
      }

      if (!flags || !flags.modified || !this.isRadio) {
        return changed;
      } // If they clicked on the radio that is currently selected, it needs to reset the value.


      this.currentValue = this.dataValue;
      var shouldResetValue = !(flags && flags.noUpdateEvent) && this.previousValue === this.currentValue;

      if (shouldResetValue) {
        this.resetValue();
        this.triggerChange(flags);
      }

      this.previousValue = this.dataValue;
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
      var dataType = this.component.dataType || 'auto';

      if (value === this.emptyValue) {
        return value;
      }

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
            value = String(value);
          }

          break;

        case 'boolean':
          value = !(!value || value.toString() === 'false');
          break;
      }

      return _get(_getPrototypeOf(RadioComponent.prototype), "normalizeValue", this).call(this, value);
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
        validate: {
          onlyAvailableItems: false
        },
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
        documentation: '/userguide/#radio',
        schema: RadioComponent.schema()
      };
    }
  }]);

  return RadioComponent;
}(_Field2.default);

exports.default = RadioComponent;