'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnknownComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('../base/Base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnknownComponent = exports.UnknownComponent = function (_BaseComponent) {
  _inherits(UnknownComponent, _BaseComponent);

  function UnknownComponent() {
    _classCallCheck(this, UnknownComponent);

    return _possibleConstructorReturn(this, (UnknownComponent.__proto__ || Object.getPrototypeOf(UnknownComponent)).apply(this, arguments));
  }

  _createClass(UnknownComponent, [{
    key: 'build',
    value: function build() {
      this.element = this.ce('div', {
        id: this.id
      });
      this.element.appendChild(this.text('Unknown component: ' + this.component.type));
      return this.element;
    }
  }]);

  return UnknownComponent;
}(_Base.BaseComponent);