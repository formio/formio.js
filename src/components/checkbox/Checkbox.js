"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Base = _interopRequireDefault(require("../base/Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CheckBoxComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(CheckBoxComponent, _BaseComponent);

  function CheckBoxComponent() {
    _classCallCheck(this, CheckBoxComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(CheckBoxComponent).apply(this, arguments));
  }

  _createClass(CheckBoxComponent, [{
    key: "getRadioGroupItems",
    value: function getRadioGroupItems() {
      var _this = this;

      if (!this.isRadioCheckbox) {
        return [];
      }

      return this.currentForm ? this.currentForm.getAllComponents().filter(function (c) {
        return c.isRadioCheckbox && c.component.name === _this.component.name;
      }) : [];
    }
  }, {
    key: "getRadioGroupValue",
    value: function getRadioGroupValue() {
      if (!this.isRadioCheckbox) {
        return null;
      }

      var selectedRadios = this.getRadioGroupItems().filter(function (c) {
        return c.input.checked;
      });
      return _lodash.default.get(selectedRadios, '[0].component.value');
    }
  }, {
    key: "elementInfo",
    value: function elementInfo() {
      var info = _get(_getPrototypeOf(CheckBoxComponent.prototype), "elementInfo", this).call(this);

      info.type = 'input';
      info.changeEvent = 'click';
      info.attr.type = this.component.inputType || 'checkbox';
      info.attr.class = 'form-check-input';

      if (this.component.name) {
        info.attr.name = "data[".concat(this.component.name, "][").concat(this.root.id, "]");
      }

      info.attr.value = this.component.value ? this.component.value : 0;
      return info;
    }
  }, {
    key: "build",
    value: function build() {
      // Refresh element info.
      this.info = this.elementInfo();

      if (this.viewOnly) {
        return this.viewOnlyBuild();
      }

      if (!this.component.input) {
        return;
      }

      this.createElement();
      this.input = this.createInput(this.element);
      this.createLabel(this.element, this.input);

      if (!this.labelElement) {
        this.addInput(this.input, this.element);
      }

      this.createDescription(this.element);
      this.restoreValue();

      if (this.shouldDisable) {
        this.disabled = true;
      }

      this.autofocus();
      this.attachLogic();
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(value) {
      return _get(_getPrototypeOf(CheckBoxComponent.prototype), "isEmpty", this).call(this, value) || value === false;
    }
  }, {
    key: "createElement",
    value: function createElement() {
      var className = "form-check ".concat(this.className);

      if (!this.labelIsHidden()) {
        className += " ".concat(this.component.inputType || 'checkbox');
      } // If the element is already created, don't recreate.


      if (this.element) {
        //update class for case when Logic changed container class (customClass)
        this.element.className = className;
        return this.element;
      }

      this.element = this.ce('div', {
        id: this.id,
        class: className
      });
      this.element.component = this;
    }
  }, {
    key: "labelOnTheTopOrLeft",
    value: function labelOnTheTopOrLeft() {
      return ['top', 'left'].includes(this.component.labelPosition);
    }
  }, {
    key: "labelOnTheTopOrBottom",
    value: function labelOnTheTopOrBottom() {
      return ['top', 'bottom'].includes(this.component.labelPosition);
    }
  }, {
    key: "setInputLabelStyle",
    value: function setInputLabelStyle(label) {
      if (this.component.labelPosition === 'left') {
        _lodash.default.assign(label.style, {
          textAlign: 'center',
          paddingLeft: 0
        });
      }

      if (this.labelOnTheTopOrBottom()) {
        _lodash.default.assign(label.style, {
          display: 'block',
          textAlign: 'center',
          paddingLeft: 0
        });
      }
    }
  }, {
    key: "setInputStyle",
    value: function setInputStyle(input) {
      if (!input) {
        return;
      }

      if (this.component.labelPosition === 'left') {
        _lodash.default.assign(input.style, {
          position: 'initial',
          marginLeft: '7px'
        });
      }

      if (this.labelOnTheTopOrBottom()) {
        _lodash.default.assign(input.style, {
          width: '100%',
          position: 'initial',
          marginLeft: 0
        });
      }
    }
  }, {
    key: "createLabel",
    value: function createLabel(container, input) {
      var isLabelHidden = this.labelIsHidden();
      var className = 'control-label form-check-label';

      if (this.component.input && !this.options.inputsOnly && this.component.validate && this.component.validate.required) {
        className += ' field-required';
      }

      this.labelElement = this.ce('label', {
        class: className
      });
      this.addShortcut();
      var labelOnTheTopOrOnTheLeft = this.labelOnTheTopOrLeft();

      if (!isLabelHidden) {
        // Create the SPAN around the textNode for better style hooks
        this.labelSpan = this.ce('span');

        if (this.info.attr.id) {
          this.labelElement.setAttribute('for', this.info.attr.id);
        }
      }

      if (!isLabelHidden && labelOnTheTopOrOnTheLeft) {
        this.setInputLabelStyle(this.labelElement);
        this.setInputStyle(input);
        this.labelSpan.appendChild(this.text(this.component.label));
        this.labelElement.appendChild(this.labelSpan);
      }

      this.addInput(input, this.labelElement);

      if (!isLabelHidden && !labelOnTheTopOrOnTheLeft) {
        this.setInputLabelStyle(this.labelElement);
        this.setInputStyle(input);
        this.labelSpan.appendChild(this.text(this.addShortcutToLabel()));
        this.labelElement.appendChild(this.labelSpan);
      }

      this.createTooltip(this.labelElement);
      container.appendChild(this.labelElement);
    }
  }, {
    key: "createInput",
    value: function createInput(container) {
      if (!this.component.input) {
        return;
      }

      var inputId = this.id;

      if (this.options.row) {
        inputId += "-".concat(this.options.row);
      }

      inputId += "-".concat(this.root.id);
      this.info.attr.id = inputId;
      var input = this.ce(this.info.type, this.info.attr);
      this.errorContainer = container;
      return input;
    }
  }, {
    key: "getValueAt",
    value: function getValueAt(index) {
      if (this.isRadioCheckbox) {
        return this.inputs[index].checked ? this.component.value : '';
      }

      return !!this.inputs[index].checked;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return _get(_getPrototypeOf(CheckBoxComponent.prototype), "getValue", this).call(this);
    }
  }, {
    key: "setCheckedState",
    value: function setCheckedState(value) {
      if (!this.input) {
        return;
      }

      if (this.isRadioCheckbox) {
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

      return value;
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);

      if (this.isRadioCheckbox && !value) {
        return;
      }

      this.setCheckedState(value);
      return this.updateValue(flags, value);
    }
  }, {
    key: "getView",
    value: function getView(value) {
      return value ? 'Yes' : 'No';
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(CheckBoxComponent.prototype), "destroy", this).call(this);

      this.removeShortcut();
    }
  }, {
    key: "updateValue",
    value: function updateValue(flags, value) {
      var _this2 = this;

      if (this.isRadioCheckbox) {
        if (value === undefined && this.input.checked) {
          // Force all siblings elements in radio group to unchecked
          this.getRadioGroupItems().filter(function (c) {
            return c !== _this2 && c.input.checked;
          }).forEach(function (c) {
            return c.input.checked = false;
          });
          value = this.component.value;
        } else {
          value = this.getRadioGroupValue();
        }
      } else if (flags && flags.modified && this.input.checked && value === undefined) {
        value = true;
      }

      var changed = _get(_getPrototypeOf(CheckBoxComponent.prototype), "updateValue", this).call(this, flags, value);

      if (this.input.checked) {
        this.input.setAttribute('checked', true);
        this.addClass(this.element, 'checkbox-checked');
      } else {
        this.input.removeAttribute('checked');
        this.removeClass(this.element, 'checkbox-checked');
      }

      return changed;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return CheckBoxComponent.schema();
    }
  }, {
    key: "defaultValue",
    get: function get() {
      return this.isRadioCheckbox ? '' : (this.component.defaultValue || false).toString() === 'true';
    }
  }, {
    key: "hasSetValue",
    get: function get() {
      return this.hasValue();
    }
  }, {
    key: "isRadioCheckbox",
    get: function get() {
      return this.component.inputType === 'radio';
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return false;
    }
  }, {
    key: "dataValue",
    set: function set(value) {
      var setValue = _set(_getPrototypeOf(CheckBoxComponent.prototype), "dataValue", value, this, true);

      if (this.isRadioCheckbox) {
        _lodash.default.set(this.data, this.component.key, setValue === this.component.value);

        this.setCheckedState(setValue);
      }

      return setValue;
    },
    get: function get() {
      var getValue = _get(_getPrototypeOf(CheckBoxComponent.prototype), "dataValue", this);

      if (this.isRadioCheckbox) {
        _lodash.default.set(this.data, this.component.key, getValue === this.component.value);
      }

      return getValue;
    }
  }, {
    key: "key",
    get: function get() {
      return this.isRadioCheckbox && this.component.name ? this.component.name : _get(_getPrototypeOf(CheckBoxComponent.prototype), "key", this);
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
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
        icon: 'fa fa-check-square',
        documentation: 'http://help.form.io/userguide/#checkbox',
        weight: 50,
        schema: CheckBoxComponent.schema()
      };
    }
  }]);

  return CheckBoxComponent;
}(_Base.default);

exports.default = CheckBoxComponent;