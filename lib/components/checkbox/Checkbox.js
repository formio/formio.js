'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBoxComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Base = require('../base/Base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckBoxComponent = exports.CheckBoxComponent = function (_BaseComponent) {
  _inherits(CheckBoxComponent, _BaseComponent);

  function CheckBoxComponent() {
    _classCallCheck(this, CheckBoxComponent);

    return _possibleConstructorReturn(this, (CheckBoxComponent.__proto__ || Object.getPrototypeOf(CheckBoxComponent)).apply(this, arguments));
  }

  _createClass(CheckBoxComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(CheckBoxComponent.prototype.__proto__ || Object.getPrototypeOf(CheckBoxComponent.prototype), 'elementInfo', this).call(this);
      info.type = 'input';
      info.changeEvent = 'click';
      info.attr.type = this.component.inputType;
      info.attr.class = 'form-check-input';
      if (this.component.name) {
        info.attr.name = 'data[' + this.component.name + ']';
      }
      info.attr.value = this.component.value ? this.component.value : 0;
      return info;
    }
  }, {
    key: 'build',
    value: function build() {
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
    }
  }, {
    key: 'createElement',
    value: function createElement() {
      var className = 'form-check ' + this.className;
      if (this.component.label) {
        className += ' checkbox';
      }
      this.element = this.ce('div', {
        id: this.id,
        class: className
      });
    }
  }, {
    key: 'labelOnTheTopOrLeft',
    value: function labelOnTheTopOrLeft() {
      return ['top', 'left'].indexOf(this.component.labelPosition) !== -1;
    }
  }, {
    key: 'labelOnTheTopOrBottom',
    value: function labelOnTheTopOrBottom() {
      return ['top', 'bottom'].indexOf(this.component.labelPosition) !== -1;
    }
  }, {
    key: 'setInputLabelStyle',
    value: function setInputLabelStyle(label) {
      if (this.component.labelPosition === 'left') {
        _lodash2.default.assign(label.style, {
          textAlign: 'center',
          paddingLeft: 0
        });
      }

      if (this.labelOnTheTopOrBottom()) {
        _lodash2.default.assign(label.style, {
          display: 'block',
          textAlign: 'center',
          paddingLeft: 0
        });
      }
    }
  }, {
    key: 'setInputStyle',
    value: function setInputStyle(input) {
      if (this.component.labelPosition === 'left') {
        _lodash2.default.assign(input.style, {
          position: 'initial',
          marginLeft: '7px'
        });
      }

      if (this.labelOnTheTopOrBottom()) {
        _lodash2.default.assign(input.style, {
          width: '100%',
          position: 'initial',
          marginLeft: 0
        });
      }
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(value) {
      return _get(CheckBoxComponent.prototype.__proto__ || Object.getPrototypeOf(CheckBoxComponent.prototype), 'isEmpty', this).call(this, value) || value === false;
    }
  }, {
    key: 'createLabel',
    value: function createLabel(container, input) {
      if (!this.component.label) {
        return null;
      }

      var className = 'control-label form-check-label';
      if (this.component.input && !this.options.inputsOnly && this.component.validate && this.component.validate.required) {
        className += ' field-required';
      }

      this.labelElement = this.ce('label', {
        class: className
      });
      this.addShortcut();

      var labelOnTheTopOrOnTheLeft = this.labelOnTheTopOrLeft();

      // Create the SPAN around the textNode for better style hooks
      this.labelSpan = this.ce('span');

      if (this.info.attr.id) {
        this.labelElement.setAttribute('for', this.info.attr.id);
      }
      if (!this.options.inputsOnly && labelOnTheTopOrOnTheLeft) {
        this.setInputLabelStyle(this.labelElement);
        this.setInputStyle(input);
        this.labelSpan.appendChild(this.text(this.component.label));
        this.labelElement.appendChild(this.labelSpan);
      }
      this.addInput(input, this.labelElement);

      if (!this.options.inputsOnly && !labelOnTheTopOrOnTheLeft) {
        this.setInputLabelStyle(this.labelElement);
        this.setInputStyle(input);
        this.labelSpan.appendChild(this.text(this.addShortcutToLabel()));
        this.labelElement.appendChild(this.labelSpan);
      }
      this.createTooltip(this.labelElement);
      container.appendChild(this.labelElement);
    }
  }, {
    key: 'createInput',
    value: function createInput(container) {
      if (!this.component.input) {
        return;
      }
      var input = this.ce(this.info.type, this.info.attr);
      this.errorContainer = container;
      return input;
    }
  }, {
    key: 'updateValueByName',
    value: function updateValueByName() {
      var component = this.getRoot().getComponent(this.component.name);
      if (component) {
        component.setValue(this.component.value, { changed: true });
      } else {
        _lodash2.default.set(this.data, this.component.name, this.component.value);
      }
    }
  }, {
    key: 'addInputEventListener',
    value: function addInputEventListener(input) {
      var _this2 = this;

      this.addEventListener(input, this.info.changeEvent, function () {
        // If this input has a "name", then its other input elements are elsewhere on
        // the form. To get the correct submission object, we need to refresh the whole
        // data object.
        if (_this2.component.name) {
          _this2.updateValueByName();
          _this2.emit('refreshData');
        }

        _this2.updateValue();
      });
    }
  }, {
    key: 'getValueAt',
    value: function getValueAt(index) {
      return !!this.inputs[index].checked;
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);
      if (!this.input) {
        return;
      }
      if (value === 'on') {
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
      return this.updateValue(flags);
    }
  }, {
    key: 'getView',
    value: function getView(value) {
      return value ? 'Yes' : 'No';
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get(CheckBoxComponent.prototype.__proto__ || Object.getPrototypeOf(CheckBoxComponent.prototype), 'destroy', this).apply(this, Array.prototype.slice.apply(arguments));
      this.removeShortcut();
    }
  }, {
    key: 'emptyValue',
    get: function get() {
      return false;
    }
  }, {
    key: 'dataValue',
    get: function get() {
      if (this.component.name) {
        return _lodash2.default.get(this.data, this.component.name, this.emptyValue);
      }

      return _get(CheckBoxComponent.prototype.__proto__ || Object.getPrototypeOf(CheckBoxComponent.prototype), 'dataValue', this);
    },
    set: function set(value) {
      if (this.component.name) {
        _lodash2.default.set(this.data, this.component.name, value);
        return value;
      }

      _set(CheckBoxComponent.prototype.__proto__ || Object.getPrototypeOf(CheckBoxComponent.prototype), 'dataValue', value, this);
      return value;
    }
  }]);

  return CheckBoxComponent;
}(_Base.BaseComponent);