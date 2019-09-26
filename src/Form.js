"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Formio = _interopRequireDefault(require("./Formio"));

var _Wizard = _interopRequireDefault(require("./Wizard"));

var _PDF = _interopRequireDefault(require("./PDF"));

var _Webform = _interopRequireDefault(require("./Webform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Form =
/*#__PURE__*/
function () {
  /**
   * Creates an easy to use interface for embedding webforms, pdfs, and wizards into your application.
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
   * import Form from 'formiojs/Form';
   * const form = new Form(document.getElementById('formio'), 'https://examples.form.io/example');
   * form.render();
   */
  function Form(element, form, options) {
    _classCallCheck(this, Form);

    this.instance = null;
    this.element = element;
    this.form = form;
    this.options = options;
  }

  _createClass(Form, [{
    key: "create",
    value: function create() {
      var isFlat = this.options && this.options.flatten;

      if (this.form.display === 'wizard' && !isFlat) {
        return new _Wizard.default(this.element, this.options);
      } else if (this.form.display === 'pdf' && !isFlat) {
        return new _PDF.default(this.element, this.options);
      } else {
        return new _Webform.default(this.element, this.options);
      }
    }
  }, {
    key: "setForm",
    value: function setForm(formParam) {
      var _this = this;

      formParam = formParam || this.form;
      this.element.innerHTML = '';

      if (typeof formParam === 'string') {
        return new _Formio.default(formParam).loadForm().then(function (form) {
          _this.form = form;

          if (_this.instance) {
            _this.instance.destroy();
          }

          _this.instance = _this.create();
          _this.instance.url = formParam;
          _this.instance.nosubmit = false;

          _this.instance.loadSubmission();

          _this.form = _this.instance.form = form;
          return _this.instance.ready.then(function () {
            return _this.instance;
          });
        });
      } else {
        this.form = formParam;

        if (this.instance) {
          this.instance.destroy();
        }

        this.instance = this.create();
        this.instance.form = this.form;
        return this.instance.ready.then(function () {
          return _this.instance;
        });
      }
    }
  }, {
    key: "setDisplay",
    value: function setDisplay(display) {
      this.form.display = display;
      return this.render();
    }
  }, {
    key: "render",
    value: function render(form) {
      return this.setForm(form);
    }
  }], [{
    key: "embed",
    value: function embed(_embed) {
      if (!_embed || !_embed.src) {
        return null;
      }

      var id = this.id || "formio-".concat(Math.random().toString(36).substring(7));
      var className = _embed.class || 'formio-form-wrapper'; // Add the styles to the header.

      if (_embed.styles) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = _embed.styles;
        document.head.appendChild(link);
      }

      document.write("<div id=\"".concat(id, "\" class=\"").concat(className, "\"></div>"));
      var formElement = document.getElementById(id);
      return new Form(formElement, _embed.src).render();
    }
  }]);

  return Form;
}(); // Allow simple embedding.


exports.default = Form;

_Formio.default.embedForm = function (embed) {
  return Form.embed(embed);
};
/**
 * Creates a new form based on the form parameter.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */


_Formio.default.createForm = function (element, form, options) {
  return new Form(element, form, options).render();
};

_Formio.default.Form = Form;