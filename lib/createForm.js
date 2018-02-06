'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nativePromiseOnly = require('native-promise-only');

var _nativePromiseOnly2 = _interopRequireDefault(_nativePromiseOnly);

var _formio = require('./formio');

var _formio2 = _interopRequireDefault(_formio);

var _formFactory = require('./formFactory');

var _formFactory2 = _interopRequireDefault(_formFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new form based on the form parameter.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */
exports.default = function (element, form, options) {
  if (typeof form === 'string') {
    return new _formio2.default(form).loadForm({ params: { live: 1 } }).then(function (formObj) {
      var instance = (0, _formFactory2.default)(element, formObj, options);
      instance.url = form;
      instance.nosubmit = false;
      instance.loadSubmission();
      return instance.ready.then(function () {
        return instance;
      });
    });
  } else {
    return _nativePromiseOnly2.default.resolve((0, _formFactory2.default)(element, form, options));
  }
};