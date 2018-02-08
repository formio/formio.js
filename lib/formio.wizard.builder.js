'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormioWizardBuilder = undefined;

var _formio = require('./formio.wizard');

var _formio2 = _interopRequireDefault(_formio);

var _dragula = require('dragula');

var _dragula2 = _interopRequireDefault(_dragula);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormioWizardBuilder = exports.FormioWizardBuilder = function (_FormioWizard) {
  _inherits(FormioWizardBuilder, _FormioWizard);

  function FormioWizardBuilder() {
    _classCallCheck(this, FormioWizardBuilder);

    return _possibleConstructorReturn(this, (FormioWizardBuilder.__proto__ || Object.getPrototypeOf(FormioWizardBuilder)).apply(this, arguments));
  }

  return FormioWizardBuilder;
}(_formio2.default);