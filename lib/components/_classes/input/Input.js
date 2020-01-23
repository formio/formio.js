"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Multivalue2 = _interopRequireDefault(require("../multivalue/Multivalue"));

var _utils = require("../../../utils/utils");

var _widgets = _interopRequireDefault(require("../../../widgets"));

var _lodash = _interopRequireDefault(require("lodash"));

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

var Input =
/*#__PURE__*/
function (_Multivalue) {
  _inherits(Input, _Multivalue);

  function Input(component, options, data) {
    var _this;

    _classCallCheck(this, Input);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Input).call(this, component, options, data));
    _this.triggerUpdateValueAt = _lodash.default.debounce(_this.updateValueAt.bind(_assertThisInitialized(_this)), 100);
    return _this;
  }

  _createClass(Input, [{
    key: "getMaskByName",
    value: function getMaskByName(maskName) {
      var inputMask = _lodash.default.find(this.component.inputMasks, function (inputMask) {
        return inputMask.label === maskName;
      });

      return inputMask ? inputMask.mask : undefined;
    }
  }, {
    key: "setInputMask",
    value: function setInputMask(input, inputMask) {
      return _get(_getPrototypeOf(Input.prototype), "setInputMask", this).call(this, input, inputMask || this.component.inputMask, !this.component.placeholder);
    }
  }, {
    key: "getMaskOptions",
    value: function getMaskOptions() {
      return this.component.inputMasks.map(function (mask) {
        return {
          label: mask.label,
          value: mask.label
        };
      });
    }
  }, {
    key: "renderElement",
    value: function renderElement(value, index) {
      // Double quotes cause the input value to close so replace them with html quote char.
      if (value && typeof value === 'string') {
        value = value.replace(/"/g, '&quot;');
      }

      var info = this.inputInfo;
      info.attr = info.attr || {};
      info.attr.value = this.getValueAsString(this.formatValue(this.parseValue(value)));

      if (this.isMultipleMasksField) {
        info.attr.class += ' formio-multiple-mask-input';
      } // This should be in the calendar widget but it doesn't have access to renderTemplate.


      if (this.component.widget && this.component.widget.type === 'calendar') {
        var calendarIcon = this.renderTemplate('icon', {
          ref: 'icon',
          className: this.iconClass(this.component.enableDate || this.component.widget.enableDate ? 'calendar' : 'time'),
          styles: '',
          content: ''
        }).trim();

        if (this.component.prefix !== calendarIcon) {
          this.component.suffix = calendarIcon;
        }
      }

      return this.isMultipleMasksField ? this.renderTemplate('multipleMasksInput', {
        input: info,
        value: value,
        index: index,
        selectOptions: this.getMaskOptions() || []
      }) : this.renderTemplate('input', {
        input: info,
        value: this.formatValue(this.parseValue(value)),
        index: index
      });
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

        this.setContent(element, this.t("{{ remaining }} ".concat(type, " remaining."), {
          remaining: remaining
        }));
      } else {
        this.setContent(element, this.t("{{ count }} ".concat(type), {
          count: count
        }));
      }
    }
  }, {
    key: "updateValueAt",
    value: function updateValueAt(value, flags, index) {
      if (_lodash.default.get(this.component, 'showWordCount', false)) {
        if (this.refs.wordcount && this.refs.wordcount[index]) {
          var maxWords = _lodash.default.parseInt(_lodash.default.get(this.component, 'validate.maxWords', 0), 10);

          this.setCounter('words', this.refs.wordcount[index], _lodash.default.words(value).length, maxWords);
        }
      }

      if (_lodash.default.get(this.component, 'showCharCount', false)) {
        if (this.refs.charcount && this.refs.charcount[index]) {
          var maxChars = _lodash.default.parseInt(_lodash.default.get(this.component, 'validate.maxLength', 0), 10);

          this.setCounter('characters', this.refs.charcount[index], value.length, maxChars);
        }
      }
    }
  }, {
    key: "getValueAt",
    value: function getValueAt(index) {
      var input = this.performInputMapping(this.refs.input[index]);

      if (input && input.widget) {
        return input.widget.getValue();
      }

      return input ? input.value : undefined;
    }
  }, {
    key: "updateValue",
    value: function updateValue(value, flags, index) {
      var changed = _get(_getPrototypeOf(Input.prototype), "updateValue", this).call(this, value, flags);

      this.triggerUpdateValueAt(this.dataValue, flags, index);
      return changed;
    }
  }, {
    key: "parseValue",
    value: function parseValue(value) {
      return value;
    }
  }, {
    key: "formatValue",
    value: function formatValue(value) {
      return value;
    }
  }, {
    key: "attach",
    value: function attach(element) {
      this.loadRefs(element, {
        charcount: 'multiple',
        wordcount: 'multiple',
        prefix: 'multiple',
        suffix: 'multiple'
      });
      return _get(_getPrototypeOf(Input.prototype), "attach", this).call(this, element);
    }
  }, {
    key: "getWidget",
    value: function getWidget(index) {
      index = index || 0;

      if (this.refs.input && this.refs.input[index]) {
        return this.refs.input[index].widget;
      }

      return null;
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      return _get(_getPrototypeOf(Input.prototype), "getValueAsString", this).call(this, this.getWidgetValueAsString(value));
    }
  }, {
    key: "attachElement",
    value: function attachElement(element, index) {
      var _this2 = this;

      _get(_getPrototypeOf(Input.prototype), "attachElement", this).call(this, element, index);

      if (element.widget) {
        element.widget.destroy();
      } // Attach the widget.


      element.widget = this.createWidget(index);

      if (element.widget) {
        element.widget.attach(element);

        if (this.refs.prefix && this.refs.prefix[index]) {
          element.widget.addPrefix(this.refs.prefix[index]);
        }

        if (this.refs.suffix && this.refs.suffix[index]) {
          element.widget.addSuffix(this.refs.suffix[index]);
        }
      } // Add focus and blur events.


      this.addFocusBlurEvents(element);

      if (this.options.submitOnEnter) {
        this.addEventListener(element, 'keypress', function (event) {
          var key = event.keyCode || event.which;

          if (key === 13) {
            event.preventDefault();
            event.stopPropagation();

            _this2.emit('submitButton');
          }
        });
      }
    }
    /**
     * Creates an instance of a widget for this component.
     *
     * @return {null}
     */

  }, {
    key: "createWidget",
    value: function createWidget(index) {
      var _this3 = this;

      // Return null if no widget is found.
      if (!this.component.widget) {
        return null;
      } // Get the widget settings.


      var settings = typeof this.component.widget === 'string' ? {
        type: this.component.widget
      } : this.component.widget; // Make sure we have a widget.

      if (!_widgets.default.hasOwnProperty(settings.type)) {
        return null;
      } // Create the widget.


      var widget = new _widgets.default[settings.type](settings, this.component);
      widget.on('update', function () {
        return _this3.updateValue(widget.getValue(), {
          modified: true
        }, index);
      }, true);
      widget.on('redraw', function () {
        return _this3.redraw();
      }, true);
      return widget;
    }
  }, {
    key: "detach",
    value: function detach() {
      _get(_getPrototypeOf(Input.prototype), "detach", this).call(this);

      if (this.refs && this.refs.input) {
        for (var i = 0; i <= this.refs.input.length; i++) {
          var widget = this.getWidget(i);

          if (widget) {
            widget.destroy();
          }
        }
      }
    }
  }, {
    key: "addFocusBlurEvents",
    value: function addFocusBlurEvents(element) {
      var _this4 = this;

      this.addEventListener(element, 'focus', function () {
        if (_this4.root.focusedComponent !== _this4) {
          if (_this4.root.pendingBlur) {
            _this4.root.pendingBlur();
          }

          _this4.root.focusedComponent = _this4;

          _this4.emit('focus', _this4);
        } else if (_this4.root.focusedComponent === _this4 && _this4.root.pendingBlur) {
          _this4.root.pendingBlur.cancel();

          _this4.root.pendingBlur = null;
        }
      });
      this.addEventListener(element, 'blur', function () {
        _this4.root.pendingBlur = (0, _utils.delay)(function () {
          _this4.emit('blur', _this4);

          if (_this4.component.validateOn === 'blur') {
            _this4.root.triggerChange({}, {
              instance: _this4,
              component: _this4.component,
              value: _this4.dataValue,
              flags: {}
            });
          }

          _this4.root.focusedComponent = null;
          _this4.root.pendingBlur = null;
        });
      });
    }
  }, {
    key: "inputInfo",
    get: function get() {
      var attr = {
        name: this.options.name,
        type: this.component.inputType || 'text',
        class: 'form-control',
        lang: this.options.language
      };

      if (this.component.placeholder) {
        attr.placeholder = this.t(this.component.placeholder);
      }

      if (this.component.tabindex) {
        attr.tabindex = this.component.tabindex;
      }

      if (this.disabled) {
        attr.disabled = 'disabled';
      }

      _lodash.default.defaults(attr, this.component.attributes);

      return {
        id: this.key,
        type: 'input',
        changeEvent: 'input',
        content: '',
        attr: attr
      };
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
  }, {
    key: "remainingWords",
    get: function get() {
      var maxWords = _lodash.default.parseInt(_lodash.default.get(this.component, 'validate.maxWords'), 10);

      var wordCount = _lodash.default.words(this.dataValue).length;

      return maxWords - wordCount;
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Multivalue2.default.schema.apply(_Multivalue2.default, [{
        widget: {
          type: 'input'
        }
      }].concat(extend));
    }
  }]);

  return Input;
}(_Multivalue2.default);

exports.default = Input;