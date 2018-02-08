'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get2 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Base = require('../base/Base');

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _get3 = require('lodash/get');

var _get4 = _interopRequireDefault(_get3);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _toString2 = require('lodash/toString');

var _toString3 = _interopRequireDefault(_toString2);

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioComponent = exports.RadioComponent = function (_BaseComponent) {
  _inherits(RadioComponent, _BaseComponent);

  function RadioComponent() {
    _classCallCheck(this, RadioComponent);

    return _possibleConstructorReturn(this, (RadioComponent.__proto__ || Object.getPrototypeOf(RadioComponent)).apply(this, arguments));
  }

  _createClass(RadioComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get2(RadioComponent.prototype.__proto__ || Object.getPrototypeOf(RadioComponent.prototype), 'elementInfo', this).call(this);
      info.type = 'input';
      info.changeEvent = 'click';
      info.attr.class = 'form-check-input';
      return info;
    }
  }, {
    key: 'createInput',
    value: function createInput(container) {
      var _this2 = this;

      var inputGroup = this.ce('div', {
        class: 'input-group'
      });
      var labelOnTheTopOrOnTheLeft = this.optionsLabelOnTheTopOrLeft();
      var wrappers = [];

      (0, _each3.default)(this.component.values, function (value) {
        var wrapperClass = 'form-check ' + _this2.optionWrapperClass;
        var labelWrapper = _this2.ce('div', {
          class: wrapperClass
        });
        var label = _this2.ce('label', {
          class: 'control-label form-check-label'
        });

        _this2.addShortcut(label, value.shortcut);

        // Create the SPAN around the textNode for better style hooks
        var labelSpan = _this2.ce('span');

        // Determine the attributes for this input.
        var inputId = '' + _this2.component.key + _this2.row + '-' + value.value;
        _this2.info.attr.id = inputId;
        _this2.info.attr.value = value.value;
        label.setAttribute('for', _this2.info.attr.id);

        // Create the input.
        var input = _this2.ce('input');
        (0, _each3.default)(_this2.info.attr, function (value, key) {
          input.setAttribute(key, value);
        });

        if (labelOnTheTopOrOnTheLeft) {
          label.appendChild(labelSpan);
        }

        _this2.setInputLabelStyle(label);
        _this2.setInputStyle(input);

        _this2.addInput(input, label);

        labelSpan.appendChild(_this2.text(_this2.addShortcutToLabel(value.label, value.shortcut)));
        if (!labelOnTheTopOrOnTheLeft) {
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
    key: 'optionsLabelOnTheTopOrLeft',
    value: function optionsLabelOnTheTopOrLeft() {
      return ['top', 'left'].indexOf(this.component.optionsLabelPosition) !== -1;
    }
  }, {
    key: 'optionsLabelOnTheTopOrBottom',
    value: function optionsLabelOnTheTopOrBottom() {
      return ['top', 'bottom'].indexOf(this.component.optionsLabelPosition) !== -1;
    }
  }, {
    key: 'setInputLabelStyle',
    value: function setInputLabelStyle(label) {
      if (this.component.optionsLabelPosition === 'left') {
        (0, _assign3.default)(label.style, {
          textAlign: 'center',
          paddingLeft: 0
        });
      }

      if (this.optionsLabelOnTheTopOrBottom()) {
        (0, _assign3.default)(label.style, {
          display: 'block',
          textAlign: 'center',
          paddingLeft: 0
        });
      }
    }
  }, {
    key: 'setInputStyle',
    value: function setInputStyle(input) {
      if (this.component.optionsLabelPosition === 'left') {
        (0, _assign3.default)(input.style, {
          position: 'initial',
          marginLeft: '7px'
        });
      }

      if (this.optionsLabelOnTheTopOrBottom()) {
        (0, _assign3.default)(input.style, {
          width: '100%',
          position: 'initial',
          marginLeft: 0
        });
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      if (this.viewOnly) {
        return this.value;
      }
      var value = '';
      (0, _each3.default)(this.inputs, function (input) {
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
    key: 'getView',
    value: function getView(value) {
      if (!(0, _isString3.default)(value)) {
        return (0, _toString3.default)(value);
      }

      var option = (0, _find3.default)(this.component.values, function (v) {
        return v.value === value;
      });

      return (0, _get4.default)(option, 'label');
    }
  }, {
    key: 'setValueAt',
    value: function setValueAt(index, value) {
      if (this.inputs && this.inputs[index]) {
        var inputValue = this.inputs[index].value;
        if (inputValue === 'true') {
          inputValue = true;
        } else if (inputValue === 'false') {
          inputValue = false;
        } else if (!isNaN(parseInt(inputValue, 10)) && isFinite(inputValue)) {
          inputValue = parseInt(inputValue, 10);
        }

        this.inputs[index].checked = inputValue === value;
      }
    }
  }, {
    key: 'updateValue',
    value: function updateValue(value, flags) {
      var _this3 = this;

      var changed = _get2(RadioComponent.prototype.__proto__ || Object.getPrototypeOf(RadioComponent.prototype), 'updateValue', this).call(this, value, flags);
      if (changed) {
        //add/remove selected option class
        var _value = this.data[this.component.key];
        var optionSelectedClass = 'radio-selected';

        (0, _each3.default)(this.wrappers, function (wrapper, index) {
          var input = _this3.inputs[index];
          if (input.value === _value) {
            //add class to container when selected
            _this3.addClass(wrapper, optionSelectedClass);
          } else {
            _this3.removeClass(wrapper, optionSelectedClass);
          }
        });
      }
      return changed;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get2(RadioComponent.prototype.__proto__ || Object.getPrototypeOf(RadioComponent.prototype), 'destroy', this).apply(this, Array.prototype.slice.apply(arguments));
    }
  }, {
    key: 'optionWrapperClass',
    get: function get() {
      var inputType = this.component.inputType;
      var wrapperClass = this.component.inline ? 'form-check-inline ' + inputType + '-inline' : inputType;
      return wrapperClass;
    }
  }]);

  return RadioComponent;
}(_Base.BaseComponent);