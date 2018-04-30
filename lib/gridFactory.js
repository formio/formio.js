'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formioGrid = require('./formio.grid.builder');

var _formioGrid2 = _interopRequireDefault(_formioGrid);

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
  var instance = new _formioGrid2.default(element, form, options);
  instance.form = form;
  return instance;
};