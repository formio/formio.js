'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneNumberComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TextField = require('../textfield/TextField');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhoneNumberComponent = exports.PhoneNumberComponent = function (_TextFieldComponent) {
  _inherits(PhoneNumberComponent, _TextFieldComponent);

  function PhoneNumberComponent() {
    _classCallCheck(this, PhoneNumberComponent);

    return _possibleConstructorReturn(this, (PhoneNumberComponent.__proto__ || Object.getPrototypeOf(PhoneNumberComponent)).apply(this, arguments));
  }

  _createClass(PhoneNumberComponent, [{
    key: 'defaultSchema',
    get: function get() {
      return PhoneNumberComponent.schema();
    }
  }], [{
    key: 'schema',
    value: function schema() {
      for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _TextField.TextFieldComponent.schema.apply(_TextField.TextFieldComponent, [{
        type: 'phoneNumber',
        label: 'Phone Number',
        key: 'phoneNumber',
        inputType: 'tel',
        inputMask: '(999) 999-9999'
      }].concat(extend));
    }
  }, {
    key: 'builderInfo',
    get: function get() {
      return {
        title: 'Phone Number',
        group: 'advanced',
        icon: 'fa fa-phone-square',
        weight: 20,
        documentation: 'http://help.form.io/userguide/#phonenumber',
        schema: PhoneNumberComponent.schema()
      };
    }
  }]);

  return PhoneNumberComponent;
}(_TextField.TextFieldComponent);