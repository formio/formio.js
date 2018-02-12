'use strict';

var _formio = require('./formio.wizard');

var _formio2 = _interopRequireDefault(_formio);

var _formio3 = require('./formio.pdf');

var _formio4 = _interopRequireDefault(_formio3);

var _formio5 = require('./formio.form');

var _formio6 = _interopRequireDefault(_formio5);

var _Components = require('./components/Components');

var _formio7 = require('./formio');

var _formio8 = _interopRequireDefault(_formio7);

var _createForm = require('./createForm');

var _createForm2 = _interopRequireDefault(_createForm);

var _formFactory = require('./formFactory');

var _formFactory2 = _interopRequireDefault(_formFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_formio8.default.formFactory = _formFactory2.default;

_formio8.default.createForm = _createForm2.default;

/**
 * Embed this form within the current page.
 * @param embed
 */
_formio8.default.embedForm = function (embed) {
  if (!embed || !embed.src) {
    return null;
  }
  var id = embed.id || 'formio-' + Math.random().toString(36).substring(7);
  var className = embed.class || 'formio-form-wrapper';
  var code = embed.styles ? '<link rel="stylesheet" href="' + embed.styles + '">' : '';
  code += '<div id="' + id + '" class="' + className + '"></div>';
  document.write(code);
  var formElement = document.getElementById(id);
  return _formio8.default.createForm(formElement, embed.src);
};

/**
 * Register a new component.
 *
 * @param type {string} - The type of the component.
 * @param component {function} - The constructor function of the component.
 */
_formio6.default.registerComponent = _formio8.default.registerComponent = function (type, component) {
  _Components.FormioComponents.customComponents[type] = component;
};

exports.Formio = global.Formio = _formio8.default;
exports.FormioForm = _formio6.default;
exports.FormioWizard = _formio2.default;
exports.FormioPDF = _formio4.default;