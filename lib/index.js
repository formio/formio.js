'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Formio = exports.formFactory = exports.createForm = exports.FormioPDF = exports.FormioWizard = exports.FormioForm = undefined;

var _formio = require('./formio.form');

Object.defineProperty(exports, 'FormioForm', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_formio).default;
  }
});

var _formio2 = require('./formio.wizard');

Object.defineProperty(exports, 'FormioWizard', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_formio2).default;
  }
});

var _formio3 = require('./formio.pdf');

Object.defineProperty(exports, 'FormioPDF', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_formio3).default;
  }
});

var _createForm = require('./createForm');

Object.defineProperty(exports, 'createForm', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_createForm).default;
  }
});

var _formFactory = require('./formFactory');

Object.defineProperty(exports, 'formFactory', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_formFactory).default;
  }
});

var _formio4 = require('./formio');

var _formio5 = _interopRequireDefault(_formio4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.Formio = _formio5.default;
exports.Formio = _formio5.default;
exports.default = _formio5.default;