'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextFieldComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Base = require('../base/Base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextFieldComponent = exports.TextFieldComponent = function (_BaseComponent) {
  _inherits(TextFieldComponent, _BaseComponent);

  function TextFieldComponent() {
    _classCallCheck(this, TextFieldComponent);

    return _possibleConstructorReturn(this, (TextFieldComponent.__proto__ || Object.getPrototypeOf(TextFieldComponent)).apply(this, arguments));
  }

  _createClass(TextFieldComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(TextFieldComponent.prototype.__proto__ || Object.getPrototypeOf(TextFieldComponent.prototype), 'elementInfo', this).call(this);
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
    key: 'emptyValue',
    get: function get() {
      return '';
    }
  }]);

  return TextFieldComponent;
}(_Base.BaseComponent);