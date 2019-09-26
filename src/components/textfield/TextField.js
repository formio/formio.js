"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TextFieldComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(TextFieldComponent, _BaseComponent);

  function TextFieldComponent() {
    _classCallCheck(this, TextFieldComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(TextFieldComponent).apply(this, arguments));
  }

  _createClass(TextFieldComponent, [{
    key: "elementInfo",
    value: function elementInfo() {
      var info = _get(_getPrototypeOf(TextFieldComponent.prototype), "elementInfo", this).call(this);

      info.type = 'input';

      if (this.component.hasOwnProperty('spellcheck')) {
        info.attr.spellcheck = this.component.spellcheck;
      }

      if (this.component.mask) {
        info.attr.type = 'password';
      } else {
        info.attr.type = 'text';
      }

      info.changeEvent = 'input';
      return info;
    }
  }, {
    key: "createInput",
    value: function createInput(container) {
      if (!this.isMultipleMasksField) {
        var _inputGroup = _get(_getPrototypeOf(TextFieldComponent.prototype), "createInput", this).call(this, container);

        this.addCounter(container);
        return _inputGroup;
      } //if component should have multiple masks


      var attr = this.info.attr;
      attr.class += ' formio-multiple-mask-input';
      var textInput = this.ce('input', attr);
      var inputGroup = this.ce('div', {
        class: 'input-group formio-multiple-mask-container'
      });
      this.addPrefix(textInput, inputGroup);
      var maskInput = this.createMaskInput(textInput);
      this.addTextInputs(textInput, maskInput, inputGroup);
      this.addSuffix(textInput, inputGroup);
      this.errorContainer = container;
      this.setInputStyles(inputGroup);
      this.addCounter(inputGroup);
      container.appendChild(inputGroup);
      return inputGroup;
    }
  }, {
    key: "addCounter",
    value: function addCounter(container) {
      if (_lodash.default.get(this.component, 'showWordCount', false)) {
        this.maxWordCount = _lodash.default.parseInt(_lodash.default.get(this.component, 'validate.maxWords', 0), 10);
        this.wordCount = this.ce('span', {
          class: 'text-muted pull-right',
          style: 'margin-left: 4px'
        });
        container.appendChild(this.wordCount);
      }

      if (_lodash.default.get(this.component, 'showCharCount', false)) {
        this.maxCharCount = _lodash.default.parseInt(_lodash.default.get(this.component, 'validate.maxLength', 0), 10);
        this.charCount = this.ce('span', {
          class: 'text-muted pull-right'
        });
        container.appendChild(this.charCount);
      }

      return container;
    }
  }, {
    key: "setCounter",
    value: function setCounter(type, element, count, max) {
      if (max) {
        var remaining = max - count;

        if (remaining > 0) {
          this.removeClass(element, 'text-danger');
        } else {
          this.addClass(element, 'text-danger');
        }

        element.innerHTML = this.t("{{ remaining }} ".concat(type, " remaining."), {
          remaining: remaining
        });
      } else {
        element.innerHTML = this.t("{{ count }} ".concat(type), {
          count: count
        });
      }
    }
  }, {
    key: "removeTags",
    value: function removeTags(value) {
      if (!value) {
        return;
      }

      var removeEditorBlank = function removeEditorBlank(input) {
        if (typeof input !== 'string') {
          return input;
        }

        return input.replace(/<(.*?)>/g, '');
      };

      if (Array.isArray(value)) {
        value.forEach(function (input, index) {
          value[index] = removeEditorBlank(input);
        });
      } else {
        value = removeEditorBlank(value);
      }

      return value;
    }
  }, {
    key: "onChange",
    value: function onChange(flags, fromRoot) {
      _get(_getPrototypeOf(TextFieldComponent.prototype), "onChange", this).call(this, flags, fromRoot);

      if (this.wordCount) {
        this.setCounter('words', this.wordCount, this.dataValue.trim().split(/\s+/).length, this.maxWordCount);
      }

      if (this.charCount) {
        var value = this.component.wysiwyg ? this.removeTags(this.dataValue) : this.dataValue;
        this.setCounter('characters', this.charCount, value.length, this.maxCharCount);
      }
    }
  }, {
    key: "setValueAt",
    value: function setValueAt(index, value, flags) {
      flags = flags || {};

      if (!this.isMultipleMasksField) {
        return _get(_getPrototypeOf(TextFieldComponent.prototype), "setValueAt", this).call(this, index, value, flags);
      }

      var defaultValue = flags.noDefault ? this.emptyValue : this.defaultValue;

      if (!value) {
        if (defaultValue) {
          value = defaultValue;
        } else {
          value = {
            maskName: this.component.inputMasks[0].label
          };
        }
      } //if value is a string, treat it as text value itself and use default mask or first mask in the list


      var defaultMaskName = _lodash.default.get(defaultValue, 'maskName', '');

      if (typeof value === 'string') {
        value = {
          value: value,
          maskName: defaultMaskName ? defaultMaskName : this.component.inputMasks[0].label
        };
      }

      var maskName = value.maskName || '';
      var textValue = value.value || '';
      var textInput = this.inputs[index] ? this.inputs[index].text : undefined;
      var maskInput = this.inputs[index] ? this.inputs[index].mask : undefined;

      if (textInput && maskInput) {
        maskInput.value = maskName;
        textInput.value = textValue;
        this.updateMask(textInput, maskName);
      }
    }
  }, {
    key: "getValueAt",
    value: function getValueAt(index) {
      if (!this.isMultipleMasksField) {
        return _get(_getPrototypeOf(TextFieldComponent.prototype), "getValueAt", this).call(this, index);
      }

      var textField = this.inputs[index];
      return {
        value: textField && textField.text ? textField.text.value : undefined,
        maskName: textField && textField.mask ? textField.mask.value : undefined
      };
    }
  }, {
    key: "performInputMapping",
    value: function performInputMapping(input) {
      if (!this.isMultipleMasksField) {
        return _get(_getPrototypeOf(TextFieldComponent.prototype), "performInputMapping", this).call(this, input);
      }

      return input && input.text ? input.text : input;
    }
  }, {
    key: "buildInput",
    value: function buildInput(container, value, index) {
      if (!this.isMultipleMasksField) {
        return _get(_getPrototypeOf(TextFieldComponent.prototype), "buildInput", this).call(this, container, value, index);
      }

      this.createInput(container);
      this.setValueAt(index, value);
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(value) {
      if (!this.isMultipleMasksField) {
        return _get(_getPrototypeOf(TextFieldComponent.prototype), "isEmpty", this).call(this, value);
      }

      return _get(_getPrototypeOf(TextFieldComponent.prototype), "isEmpty", this).call(this, value) || (this.component.multiple ? value.length === 0 : !value.maskName || !value.value);
    }
  }, {
    key: "createMaskInput",
    value: function createMaskInput(textInput) {
      var id = "".concat(this.key, "-mask");
      var maskInput = this.ce('select', {
        class: 'form-control formio-multiple-mask-select',
        id: id
      });
      var self = this;
      var maskOptions = this.maskOptions;
      this.selectOptions(maskInput, 'maskOption', maskOptions); // Change the text field mask when another mask is selected.

      maskInput.onchange = function () {
        self.updateMask(textInput, this.value);
      };

      return maskInput;
    }
  }, {
    key: "addTextInputs",
    value: function addTextInputs(textInput, maskInput, container) {
      if (textInput && maskInput && container) {
        var input = {
          mask: maskInput,
          text: textInput
        };
        this.inputs.push(input);
        container.appendChild(maskInput);
        container.appendChild(textInput);
      }

      this.hook('input', textInput, container);
      this.addFocusBlurEvents(textInput);
      this.addInputEventListener(textInput);
      this.addInputSubmitListener(textInput);
    }
  }, {
    key: "updateMask",
    value: function updateMask(textInput, newMaskName) {
      var newMask = this.getMaskByName(newMaskName); //destroy previous mask

      if (textInput.mask) {
        textInput.mask.destroy();
      } //set new text field mask


      this.setInputMask(textInput, newMask); //update text field value after new mask is applied

      this.updateValue();
    }
  }, {
    key: "getMaskByName",
    value: function getMaskByName(maskName) {
      var inputMask = _lodash.default.find(this.component.inputMasks, function (inputMask) {
        return inputMask.label === maskName;
      });

      return inputMask ? inputMask.mask : undefined;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return TextFieldComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return '';
    }
  }, {
    key: "maskOptions",
    get: function get() {
      return _lodash.default.map(this.component.inputMasks, function (mask) {
        return {
          label: mask.label,
          value: mask.label
        };
      });
    }
  }, {
    key: "isMultipleMasksField",
    get: function get() {
      return this.component.allowMultipleMasks && !!this.component.inputMasks && !!this.component.inputMasks.length;
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
        label: 'Text Field',
        key: 'textField',
        type: 'textfield',
        mask: false,
        inputType: 'text',
        inputMask: '',
        widget: {
          format: 'yyyy-MM-dd hh:mm a',
          dateFormat: 'yyyy-MM-dd hh:mm a',
          saveAs: 'text'
        },
        validate: {
          minLength: '',
          maxLength: '',
          minWords: '',
          maxWords: '',
          pattern: ''
        }
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Text Field',
        icon: 'fa fa-terminal',
        group: 'basic',
        documentation: 'http://help.form.io/userguide/#textfield',
        weight: 0,
        schema: TextFieldComponent.schema()
      };
    }
  }]);

  return TextFieldComponent;
}(_Base.default);

exports.default = TextFieldComponent;