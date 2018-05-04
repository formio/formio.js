"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormioBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formio = require('./formio.full');

var _formioForm = require('./formio.form.builder');

var _formioWizard = require('./formio.wizard.builder');

var _formioPdf = require('./formio.pdf.builder');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormioBuilder = exports.FormioBuilder = function () {
  function FormioBuilder(element, form, options) {
    _classCallCheck(this, FormioBuilder);

    this.instance = null;
    this.element = element;
    this.form = form || {};
    this.form.components = this.form.components || [];
    this.options = options;
  }

  _createClass(FormioBuilder, [{
    key: 'newForm',
    value: function newForm(form) {
      this.instance = null;
      this.element.innerHTML = '';
      if (form.display === 'wizard') {
        this.instance = new _formioWizard.FormioWizardBuilder(this.element, this.options);
      } else if (form.display === 'pdf') {
        this.instance = new _formioPdf.FormioPDFBuilder(this.element, this.options);
      } else {
        this.instance = new _formioForm.FormioFormBuilder(this.element, this.options);
      }
      return this.instance;
    }
  }, {
    key: 'setForm',
    value: function setForm(formObj) {
      this.form = formObj;
      return this.loadForm();
    }
  }, {
    key: 'setDisplay',
    value: function setDisplay(display) {
      this.form.display = display;
      return this.loadForm();
    }
  }, {
    key: 'loadForm',
    value: function loadForm() {
      var _this = this;

      if (typeof this.form === 'string') {
        return new _formio.Formio(this.form).loadForm().then(function (formObj) {
          _this.newForm(formObj);
          _this.instance.url = _this.form;
          _this.instance.nosubmit = false;
          _this.instance.loadSubmission();
          _this.form = _this.instance.form = formObj;
          return _this.instance.ready.then(function () {
            return _this.instance;
          });
        });
      } else {
        this.newForm(this.form);
        this.instance.form = this.form;
        return this.instance.ready.then(function () {
          return _this.instance;
        });
      }
    }
  }]);

  return FormioBuilder;
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


_formio.Formio.builder = function (element, form, options) {
  var builder = new FormioBuilder(element, form, options);
  return builder.loadForm();
};

_formio.Formio.Builder = FormioBuilder;
exports.Formio = global.Formio = _formio.Formio;