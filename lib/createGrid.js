'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nativePromiseOnly = require('native-promise-only');

var _nativePromiseOnly2 = _interopRequireDefault(_nativePromiseOnly);

var _formio = require('./formio');

var _formio2 = _interopRequireDefault(_formio);

var _gridFactory = require('./gridFactory');

var _gridFactory2 = _interopRequireDefault(_gridFactory);

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
  if (typeof form === 'string') {
    var instance = (0, _gridFactory2.default)(element, form, options);
    return instance.ready.then(function () {
      return instance;
    });
  } else {
    return _nativePromiseOnly2.default.resolve((0, _gridFactory2.default)(element, form, options));
  }
};