"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormioGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formio = require('./formio.full');

var _gridFactory = require('./gridFactory');

var _gridFactory2 = _interopRequireDefault(_gridFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormioGrid = exports.FormioGrid = function () {
  function FormioGrid(element, form, options) {
    _classCallCheck(this, FormioGrid);

    this.instance = null;
    this.element = element;
    this.form = form;
    this.options = options;
  }

  _createClass(FormioGrid, [{
    key: 'loadGrid',
    value: function loadGrid() {
      var _this = this;

      this.instance = null;
      this.element.innerHTML = '';
      this.instance = (0, _gridFactory2.default)(this.element, this.form, this.options);
      return this.instance.ready.then(function () {
        return _this.instance;
      });
    }
  }]);

  return FormioGrid;
}();

/**
 * Creates a new form based on the form parameter.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */


_formio.Formio.grid = function (element, form, options) {
  var grid = new FormioGrid(element, form, options);
  return grid.loadGrid();
};

_formio.Formio.Grid = FormioGrid;
exports.Formio = global.Formio = _formio.Formio;