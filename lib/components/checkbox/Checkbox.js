"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.create.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.date.to-string.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.function.bind.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _Field2 = _interopRequireDefault(require("../_classes/field/Field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CheckBoxComponent = /*#__PURE__*/function (_Field) {
  _inherits(CheckBoxComponent, _Field);

  var _super = _createSuper(CheckBoxComponent);

  function CheckBoxComponent() {
    _classCallCheck(this, CheckBoxComponent);

    return _super.apply(this, arguments);
  }

  _createClass(CheckBoxComponent, [{
    key: "defaultSchema",
    get: function get() {
      return CheckBoxComponent.schema();
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var name = this.component.name;

      var defaultValue = _get(_getPrototypeOf(CheckBoxComponent.prototype), "defaultValue", this);

      return name ? this.component[name] || this.emptyValue : (defaultValue || this.component.defaultValue || false).toString() === 'true';
    }
  }, {
    key: "labelClass",
    get: function get() {
      var className = '';

      if (this.isInputComponent && !this.options.inputsOnly && this.component.validate && this.component.validate.required) {
        className += ' field-required';
      }

      return "".concat(className);
    }
  }, {
    key: "hasSetValue",
    get: function get() {
      return this.hasValue();
    }
  }, {
    key: "inputInfo",
    get: function get() {
      var info = _get(_getPrototypeOf(CheckBoxComponent.prototype), "elementInfo", this).call(this);

      info.type = 'input';
      info.changeEvent = 'click';
      info.attr.type = this.component.inputType || 'checkbox';
      info.attr["class"] = 'form-check-input';

      if (this.component.name) {
        info.attr.name = "data[".concat(this.component.name, "]");
      }

      info.attr.value = this.component.value ? this.component.value : 0;
      info.label = this.t(this.component.label, {
        _userInput: true
      });
      info.labelClass = this.labelClass;
      return info;
    }
  }, {
    key: "labelInfo",
    get: function get() {
      return {
        hidden: true
      };
    }
  }, {
    key: "render",
    value: function render() {
      return _get(_getPrototypeOf(CheckBoxComponent.prototype), "render", this).call(this, this.renderTemplate('checkbox', {
        input: this.inputInfo,
        checked: this.checked,
        tooltip: this.interpolate(this.t(this.component.tooltip) || '', {
          _userInput: true
        }).replace(/(?:\r\n|\r|\n)/g, '<br />')
      }));
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this = this;

      this.loadRefs(element, {
        input: 'multiple'
      });
      this.input = this.refs.input[0];

      if (this.refs.input) {
        this.addEventListener(this.input, this.inputInfo.changeEvent, function () {
          return _this.updateValue(null, {
            modified: true
          });
        });
        this.addShortcut(this.input);
      }

      return _get(_getPrototypeOf(CheckBoxComponent.prototype), "attach", this).call(this, element);
    }
  }, {
    key: "detach",
    value: function detach(element) {
      if (element && this.input) {
        this.removeShortcut(this.input);
      }

      _get(_getPrototypeOf(CheckBoxComponent.prototype), "detach", this).call(this);
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return this.component.inputType === 'radio' ? null : false;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataValue;
      return _get(_getPrototypeOf(CheckBoxComponent.prototype), "isEmpty", this).call(this, value) || value === false;
    }
  }, {
    key: "key",
    get: function get() {
      return this.component.name ? this.component.name : _get(_getPrototypeOf(CheckBoxComponent.prototype), "key", this);
    }
  }, {
    key: "getValueAt",
    value: function getValueAt(index) {
      if (this.component.name) {
        return this.refs.input[index].checked ? this.component.value : '';
      }

      return !!this.refs.input[index].checked;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var value = _get(_getPrototypeOf(CheckBoxComponent.prototype), "getValue", this).call(this);

      if (this.component.name) {
        return value ? this.setCheckedState(value) : this.setCheckedState(this.dataValue);
      } else {
        return value === '' ? this.dataValue : !!value;
      }
    }
  }, {
    key: "checked",
    get: function get() {
      if (this.component.name) {
        return this.dataValue === this.component.value;
      }

      return !!this.dataValue;
    }
  }, {
    key: "setCheckedState",
    value: function setCheckedState(value) {
      if (!this.input) {
        return;
      }

      if (this.component.name) {
        this.input.value = value === this.component.value ? this.component.value : 0;
        this.input.checked = value === this.component.value ? 1 : 0;
      } else if (value === 'on') {
        this.input.value = 1;
        this.input.checked = 1;
      } else if (value === 'off') {
        this.input.value = 0;
        this.input.checked = 0;
      } else if (value) {
        this.input.value = 1;
        this.input.checked = 1;
      } else {
        this.input.value = 0;
        this.input.checked = 0;
      }

      if (this.input.checked) {
        this.input.setAttribute('checked', true);
      } else {
        this.input.removeAttribute('checked');
      }

      return value;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.setCheckedState(value) !== undefined || !this.input && value !== undefined && (this.visible || this.conditionallyVisible() || !this.component.clearOnHide)) {
        var changed = this.updateValue(value, flags);

        if (this.isHtmlRenderMode() && flags && flags.fromSubmission && changed) {
          this.redraw();
        }

        return changed;
      }

      return false;
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      return value ? 'Yes' : 'No';
    }
  }, {
    key: "updateValue",
    value: function updateValue(value, flags) {
      // If this is a radio and is alredy checked, uncheck it.
      if (this.component.name && flags.modified && this.dataValue === this.component.value) {
        this.input.checked = 0;
        this.input.value = 0;
        this.dataValue = '';
      }

      var changed = _get(_getPrototypeOf(CheckBoxComponent.prototype), "updateValue", this).call(this, value, flags); // Update attributes of the input element


      if (changed && this.input) {
        if (this.input.checked) {
          this.input.setAttribute('checked', 'true');
        } else {
          this.input.removeAttribute('checked');
        }
      }

      return changed;
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Field2["default"].schema.apply(_Field2["default"], [{
        type: 'checkbox',
        inputType: 'checkbox',
        label: 'Checkbox',
        key: 'checkbox',
        dataGridLabel: true,
        labelPosition: 'right',
        value: '',
        name: ''
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Checkbox',
        group: 'basic',
        icon: 'check-square',
        documentation: '/userguide/forms/form-components#check-box',
        weight: 50,
        schema: CheckBoxComponent.schema()
      };
    }
  }]);

  return CheckBoxComponent;
}(_Field2["default"]);

exports["default"] = CheckBoxComponent;