"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Formio = _interopRequireDefault(require("./Formio"));

var _WebformBuilder = _interopRequireDefault(require("./WebformBuilder"));

var _WizardBuilder = _interopRequireDefault(require("./WizardBuilder"));

var _PDFBuilder = _interopRequireDefault(require("./PDFBuilder"));

var _Form2 = _interopRequireDefault(require("./Form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FormBuilder =
/*#__PURE__*/
function (_Form) {
  _inherits(FormBuilder, _Form);

  /**
   * Creates an easy to use interface for embedding a form builder into your application..
   *
   * @param {Object} element - The DOM element you wish to render this form within.
   * @param {Object | string} form - Either a Form JSON schema or the URL of a hosted form via. form.io.
   * @param {Object} options - The options to create a new form instance.
   * @param {boolean} options.readOnly - Set this form to readOnly
   * @param {boolean} options.noAlerts - Set to true to disable the alerts dialog.
   * @param {boolean} options.i18n - The translation file for this rendering. @see https://github.com/formio/formio.js/blob/master/i18n.js
   * @param {boolean} options.template - Provides a way to inject custom logic into the creation of every element rendered within the form.
   *
   * @example
   * import Form from 'formiojs/FormBuilder';
   * const builder = new FormBuilder(document.getElementById('formio'), {components:[
   *   {
   *     type: 'textfield',
   *     label: 'First Name',
   *     key: 'firstName',
   *     input: true
   *   }
   * ]});
   * builder.render();
   */
  function FormBuilder(element, form, options) {
    _classCallCheck(this, FormBuilder);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormBuilder).call(this, element, form, options));
  }

  _createClass(FormBuilder, [{
    key: "create",
    value: function create() {
      if (!this.form) {
        this.form = {};
      }

      if (!this.form.components) {
        this.form.components = [];
      }

      if (this.form.display === 'wizard') {
        return new _WizardBuilder.default(this.element, this.options);
      } else if (this.form.display === 'pdf') {
        return new _PDFBuilder.default(this.element, this.options);
      } else {
        return new _WebformBuilder.default(this.element, this.options);
      }
    }
  }]);

  return FormBuilder;
}(_Form2.default);
/**
 * Creates a new form based on the form parameter.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */


exports.default = FormBuilder;

_Formio.default.builder = function (element, form, options) {
  var builder = new FormBuilder(element, form, options);
  return builder.render();
};

_Formio.default.FormBuilder = FormBuilder;