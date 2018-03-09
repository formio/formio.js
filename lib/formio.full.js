'use strict';
// DO NOT DELETE! THIS WILL BREAK PDF GENERATION.

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formio = require('./formio.polyfill');

var polyfill = _interopRequireWildcard(_formio);

var _formio2 = require('./formio.wizard');

var _formio3 = _interopRequireDefault(_formio2);

var _formio4 = require('./formio.pdf');

var _formio5 = _interopRequireDefault(_formio4);

var _formio6 = require('./formio.form');

var _formio7 = _interopRequireDefault(_formio6);

var _Components = require('./components/Components');

var _formio8 = require('./formio');

var _formio9 = _interopRequireDefault(_formio8);

var _createForm = require('./createForm');

var _createForm2 = _interopRequireDefault(_createForm);

var _formFactory = require('./formFactory');

var _formFactory2 = _interopRequireDefault(_formFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

_formio9.default.formFactory = _formFactory2.default;

_formio9.default.createForm = _createForm2.default;

/**
 * Embed this form within the current page.
 * @param embed
 */
_formio9.default.embedForm = function (embed) {
  if (!embed || !embed.src) {
    return null;
  }
  var id = embed.id || 'formio-' + Math.random().toString(36).substring(7);
  var className = embed.class || 'formio-form-wrapper';
  var code = embed.styles ? '<link rel="stylesheet" href="' + embed.styles + '">' : '';
  code += '<div id="' + id + '" class="' + className + '"></div>';
  document.write(code);
  var formElement = document.getElementById(id);
  return _formio9.default.createForm(formElement, embed.src);
};

/**
 * Register a new component.
 *
 * @param type {string} - The type of the component.
 * @param component {function} - The constructor function of the component.
 */
_formio7.default.registerComponent = _formio9.default.registerComponent = function (type, component) {
  _Components.FormioComponents.customComponents[type] = component;
};

exports.default = _formio9.default;

exports.Formio = global.Formio = _formio9.default;
exports.FormioForm = _formio7.default;
exports.FormioWizard = _formio3.default;
exports.FormioPDF = _formio5.default;