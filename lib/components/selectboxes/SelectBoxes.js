'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectBoxesComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Radio = require('../radio/Radio');

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
      info.attr.class = 'form-check-input';
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
      if (this.viewOnly) {
        return this.dataValue;
      }
      var value = {};
      _lodash2.default.each(this.inputs, function (input) {
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
      value = value || {};
      flags = this.getFlags.apply(this, arguments);
      if (Array.isArray(value)) {
        _lodash2.default.each(value, function (val) {
          value[val] = true;
        });
      }

      _lodash2.default.each(this.inputs, function (input) {
        if (_lodash2.default.isUndefined(value[input.value])) {
          value[input.value] = false;
        }
        input.checked = !!value[input.value];
      });

      this.updateValue(flags);
    }
  }, {
    key: 'getView',
    value: function getView(value) {
      if (!value) {
        return '';
      }
      return (0, _lodash2.default)(this.component.values || []).filter(function (v) {
        return value[v.value];
      }).map('label').join(', ');
    }
  }]);

  return SelectBoxesComponent;
}(_Radio.RadioComponent);