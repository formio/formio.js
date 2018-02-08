'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormioPDFBuilder = undefined;

var _formio = require('./formio.pdf');

var _formio2 = _interopRequireDefault(_formio);

var _dragula = require('dragula');

var _dragula2 = _interopRequireDefault(_dragula);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormioPDFBuilder = exports.FormioPDFBuilder = function (_FormioPDF) {
  _inherits(FormioPDFBuilder, _FormioPDF);

  function FormioPDFBuilder() {
    _classCallCheck(this, FormioPDFBuilder);

    return _possibleConstructorReturn(this, (FormioPDFBuilder.__proto__ || Object.getPrototypeOf(FormioPDFBuilder)).apply(this, arguments));
  }

  return FormioPDFBuilder;
}(_formio2.default);