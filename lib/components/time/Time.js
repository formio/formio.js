'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _TextField = require('../textfield/TextField');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeComponent = exports.TimeComponent = function (_TextFieldComponent) {
  _inherits(TimeComponent, _TextFieldComponent);

  function TimeComponent() {
    _classCallCheck(this, TimeComponent);

    return _possibleConstructorReturn(this, (TimeComponent.__proto__ || Object.getPrototypeOf(TimeComponent)).apply(this, arguments));
  }

  _createClass(TimeComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(TimeComponent.prototype.__proto__ || Object.getPrototypeOf(TimeComponent.prototype), 'elementInfo', this).call(this);
      info.attr.type = 'time';
      return info;
    }
  }, {
    key: 'getValueAt',
    value: function getValueAt(index) {
      if (!this.inputs.length || !this.inputs[index]) {
        return null;
      }
      var val = this.inputs[index].value;
      if (!val) {
        return null;
      }

      return (0, _moment2.default)(val, this.component.format).format('HH:mm:ss');
    }
  }, {
    key: 'setValueAt',
    value: function setValueAt(index, value) {
      this.inputs[index].value = (0, _moment2.default)(value, 'HH:mm:ss').format(this.component.format);
    }
  }]);

  return TimeComponent;
}(_TextField.TextFieldComponent);