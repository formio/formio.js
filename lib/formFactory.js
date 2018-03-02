'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formio = require('./formio.wizard');

var _formio2 = _interopRequireDefault(_formio);

var _formio3 = require('./formio.pdf');

var _formio4 = _interopRequireDefault(_formio3);

var _formio5 = require('./formio.form');

var _formio6 = _interopRequireDefault(_formio5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Provided a form object, this will return the form instance.
 *
 * @param element
 * @param form
 * @param options
 * @return {*}
 */
exports.default = function (element, form, options) {
  var instance = null;
  if (form.display === 'wizard') {
    instance = new _formio2.default(element, options);
  } else if (form.display === 'pdf') {
    instance = new _formio4.default(element, options);
  } else {
    instance = new _formio6.default(element, options);
  }
  instance.form = form;
  return instance;
};