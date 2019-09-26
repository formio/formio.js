"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

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

var RadioComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(RadioComponent, _BaseComponent);

  function RadioComponent() {
    _classCallCheck(this, RadioComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(RadioComponent).apply(this, arguments));
  }

  _createClass(RadioComponent, [{
    key: "elementInfo",
    value: function elementInfo() {
      var info = _get(_getPrototypeOf(RadioComponent.prototype), "elementInfo", this).call(this);

      info.type = 'input';
      info.changeEvent = 'click';
      info.attr.class = 'form-check-input';
      return info;
    }
  }, {
    key: "createInput",
    value: function createInput(container) {
      var _this = this;

      var inputGroup = this.ce('div', {
        class: 'form-group'
      });
      var labelOnTheTopOrOnTheLeft = this.optionsLabelOnTheTopOrLeft();
      var wrappers = [];

      _lodash.default.each(this.component.values, function (value) {
        var wrapperClass = "form-check ".concat(_this.optionWrapperClass);

        var labelWrapper = _this.ce('div', {
          class: wrapperClass
        });

        var label = _this.ce('label', {
          class: 'control-label form-check-label'
        });

        _this.addShortcut(label, value.shortcut); // Determine the attributes for this input.


        var inputId = _this.id;

        if (_this.options.row) {
          inputId += "-".concat(_this.options.row);
        }

        inputId += "-".concat(_this.root.id, "-").concat(value.value);
        _this.info.attr.id = inputId;
        _this.info.attr.value = value.value;
        label.setAttribute('for', _this.info.attr.id); // Create the input.

        var input = _this.ce('input');

        _lodash.default.each(_this.info.attr, function (attrValue, key) {
          if (key === 'name' && _this.component.inputType === 'radio') {
            attrValue += "[".concat(_this.root.id, "]");
          }

          input.setAttribute(key, attrValue);
        });

        var labelSpan = _this.ce('span');

        if (value.label && labelOnTheTopOrOnTheLeft) {
          label.appendChild(labelSpan);
        }

        _this.setInputLabelStyle(label);

        _this.setInputStyle(input);

        _this.addInput(input, label);

        if (value.label) {
          labelSpan.appendChild(_this.text(_this.addShortcutToLabel(value.label, value.shortcut)));
        }

        if (value.label && !labelOnTheTopOrOnTheLeft) {
          label.appendChild(labelSpan);
        }

        labelWrapper.appendChild(label);
        inputGroup.appendChild(labelWrapper);
        wrappers.push(labelWrapper);
      });

      this.wrappers = wrappers;
      container.appendChild(inputGroup);
      this.errorContainer = container;
    }
  }, {
    key: "optionsLabelOnTheTopOrLeft",
    value: function optionsLabelOnTheTopOrLeft() {
      return ['top', 'left'].includes(this.component.optionsLabelPosition);
    }
  }, {
    key: "optionsLabelOnTheTopOrBottom",
    value: function optionsLabelOnTheTopOrBottom() {
      return ['top', 'bottom'].includes(this.component.optionsLabelPosition);
    }
  }, {
    key: "setInputLabelStyle",
    value: function setInputLabelStyle(label) {
      if (this.component.optionsLabelPosition === 'left') {
        _lodash.default.assign(label.style, {
          textAlign: 'center',
          paddingLeft: 0
        });
      }

      if (this.optionsLabelOnTheTopOrBottom()) {
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
      if (this.component.optionsLabelPosition === 'left') {
        _lodash.default.assign(input.style, {
          position: 'initial',
          marginLeft: '7px'
        });
      }

      if (this.optionsLabelOnTheTopOrBottom()) {
        _lodash.default.assign(input.style, {
          width: '100%',
          position: 'initial',
          marginLeft: 0
        });
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.viewOnly) {
        return this.dataValue;
      }

      var value = '';

      _lodash.default.each(this.inputs, function (input) {
        if (input.checked) {
          value = input.value;

          if (value === 'true') {
            value = true;
          } else if (value === 'false') {
            value = false;
          } else if (!isNaN(parseInt(value, 10)) && isFinite(value)) {
            value = parseInt(value, 10);
          }
        }
      });

      return value;
    }
  }, {
    key: "getView",
    value: function getView(value) {
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
      if (this.inputs && this.inputs[index] && value !== null && value !== undefined) {
        var inputValue = this.inputs[index].value;
        this.inputs[index].checked = inputValue === value.toString();
      }
    }
  }, {
    key: "updateValue",
    value: function updateValue(flags, value) {
      var _this2 = this;

      var changed = _get(_getPrototypeOf(RadioComponent.prototype), "updateValue", this).call(this, flags, value);

      if (changed) {
        //add/remove selected option class
        var _value = this.dataValue;
        var optionSelectedClass = 'radio-selected';

        _lodash.default.each(this.wrappers, function (wrapper, index) {
          var input = _this2.inputs[index];

          if (input.value.toString() === _value.toString()) {
            //add class to container when selected
            _this2.addClass(wrapper, optionSelectedClass);
          } else {
            _this2.removeClass(wrapper, optionSelectedClass);
          }
        });
      }

      return changed;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return RadioComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return '';
    }
  }, {
    key: "optionWrapperClass",
    get: function get() {
      var inputType = this.component.inputType;
      var wrapperClass = this.component.inline ? "form-check-inline ".concat(inputType, "-inline") : inputType;
      return wrapperClass;
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
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
        icon: 'fa fa-dot-circle-o',
        weight: 80,
        documentation: 'http://help.form.io/userguide/#radio',
        schema: RadioComponent.schema()
      };
    }
  }]);

  return RadioComponent;
}(_Base.default);

exports.default = RadioComponent;