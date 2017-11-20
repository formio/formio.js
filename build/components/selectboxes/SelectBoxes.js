'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectBoxesComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Radio = require('../radio/Radio');

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectBoxesComponent = exports.SelectBoxesComponent = function (_RadioComponent) {
  _inherits(SelectBoxesComponent, _RadioComponent);

  function SelectBoxesComponent(component, options, data) {
    _classCallCheck(this, SelectBoxesComponent);

    var _this = _possibleConstructorReturn(this, (SelectBoxesComponent.__proto__ || Object.getPrototypeOf(SelectBoxesComponent)).call(this, component, options, data));

    _this.component.inputType = 'checkbox';
    return _this;
  }

  _createClass(SelectBoxesComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(SelectBoxesComponent.prototype.__proto__ || Object.getPrototypeOf(SelectBoxesComponent.prototype), 'elementInfo', this).call(this);
      info.attr.name += '[]';
      info.attr.type = 'checkbox';
      return info;
    }

    /**
     * Only empty if the values are all false.
     *
     * @param value
     * @return {boolean}
     */

  }, {
    key: 'isEmpty',
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
    key: 'getValue',
    value: function getValue() {
      var value = {};
      (0, _each3.default)(this.inputs, function (input) {
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
    key: 'setValue',
    value: function setValue(value, flags) {
      var _this2 = this;

      value = value || {};
      flags = this.getFlags.apply(this, arguments);
      if ((0, _isArray3.default)(value)) {
        this.value = {};
        (0, _each3.default)(value, function (val) {
          _this2.value[val] = true;
        });
      } else {
        this.value = value;
      }

      (0, _each3.default)(this.inputs, function (input) {
        if (_this2.value[input.value] == undefined) {
          _this2.value[input.value] = false;
        }
        input.checked = !!_this2.value[input.value];
      });

      this.updateValue(flags);
    }
  }]);

  return SelectBoxesComponent;
}(_Radio.RadioComponent);