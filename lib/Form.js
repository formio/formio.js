"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Element2 = _interopRequireDefault(require("./Element"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _displays = _interopRequireDefault(require("./displays"));

var _templates = _interopRequireDefault(require("./templates"));

var FormioUtils = _interopRequireWildcard(require("./utils/utils"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Form = /*#__PURE__*/function (_Element) {
  _inherits(Form, _Element);

  var _super = _createSuper(Form);

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
   * form.build();
   */
  function Form() {
    var _this;

    _classCallCheck(this, Form);

    var options = (arguments.length <= 0 ? undefined : arguments[0]) instanceof HTMLElement ? arguments.length <= 2 ? undefined : arguments[2] : arguments.length <= 1 ? undefined : arguments[1];

    if (_Formio.default.options && _Formio.default.options.form) {
      options = Object.assign(options, _Formio.default.options.form);
    }

    _this = _super.call(this, options);
    _this.ready = new _nativePromiseOnly.default(function (resolve, reject) {
      _this.readyResolve = resolve;
      _this.readyReject = reject;
    });
    _this.instance = null;

    if ((arguments.length <= 0 ? undefined : arguments[0]) instanceof HTMLElement) {
      _this.element = arguments.length <= 0 ? undefined : arguments[0];
      _this.options = (arguments.length <= 2 ? undefined : arguments[2]) || {};
      _this.options.events = _this.events;

      _this.setForm(arguments.length <= 1 ? undefined : arguments[1]).then(function () {
        return _this.readyResolve(_this.instance);
      }).catch(_this.readyReject);
    } else if (arguments.length <= 0 ? undefined : arguments[0]) {
      _this.element = null;
      _this.options = (arguments.length <= 1 ? undefined : arguments[1]) || {};
      _this.options.events = _this.events;

      _this.setForm(arguments.length <= 0 ? undefined : arguments[0]).then(function () {
        return _this.readyResolve(_this.instance);
      }).catch(_this.readyReject);
    } else {
      _this.element = null;
      _this.options = {};
      _this.options.events = _this.events;
    }

    _this.display = '';
    return _this;
  }
  /**
   * Create a new form instance provided the display of the form.
   *
   * @param {string} display - The display of the form, either "wizard", "form", or "pdf"
   * @return {*}
   */


  _createClass(Form, [{
    key: "create",
    value: function create(display) {
      if (this.options && (this.options.flatten || this.options.renderMode === 'flat')) {
        display = 'form';
      }

      this.display = display;

      if (_displays.default.displays[display]) {
        return new _displays.default.displays[display](this.element, this.options);
      } else {
        // eslint-disable-next-line new-cap
        return new _displays.default.displays['webform'](this.element, this.options);
      }
    }
    /**
     * Sets the form. Either as JSON or a URL to a form JSON schema.
     *
     * @param {string|object} formParam - Either the form JSON or the URL of the form json.
     * @return {*}
     */

  }, {
    key: "errorForm",
    value: function errorForm(err) {
      return {
        components: [{
          'label': 'HTML',
          'tag': 'div',
          'className': 'error error-message alert alert-danger ui red message',
          'attrs': [{
            'attr': 'role',
            'value': 'alert'
          }],
          'key': 'errorMessage',
          'type': 'htmlelement',
          'input': false,
          'content': typeof err === 'string' ? err : err.message
        }]
      };
    }
  }, {
    key: "setForm",
    value: function setForm(formParam) {
      var _this2 = this;

      var result;
      formParam = formParam || this.form;

      if (typeof formParam === 'string') {
        var formio = new _Formio.default(formParam);
        var error;
        result = this.getSubmission(formio).catch(function (err) {
          error = err;
        }).then(function (submission) {
          return formio.loadForm() // If the form returned an error, show it instead of the form.
          .catch(function (err) {
            error = err;
          }).then(function (form) {
            // If the submission returned an error, show it instead of the form.
            if (error) {
              form = _this2.errorForm(error);
            }

            _this2.instance = _this2.instance || _this2.create(form.display);
            _this2.instance.url = formParam;
            _this2.instance.nosubmit = false;
            _this2._form = _this2.instance.form = form;

            if (submission) {
              _this2.instance.submission = submission;
            }

            if (error) {
              throw error;
            }

            return _this2.instance;
          });
        });
      } else {
        this.instance = this.instance || this.create(formParam.display);
        this._form = this.instance.form = formParam;
        result = this.instance.ready;
      } // A redraw has occurred so save off the new element in case of a setDisplay causing a rebuild.


      return result.then(function () {
        _this2.element = _this2.instance.element;
        return _this2.instance;
      });
    }
  }, {
    key: "getSubmission",
    value: function getSubmission(formio) {
      if (formio.submissionId) {
        return formio.loadSubmission();
      }

      return _nativePromiseOnly.default.resolve();
    }
    /**
     * Returns the loaded forms JSON.
     *
     * @return {object} - The loaded form's JSON
     */

  }, {
    key: "setDisplay",

    /**
     * Changes the display of the form.
     *
     * @param {string} display - The display to set this form. Either "wizard", "form", or "pdf"
     * @return {Promise<T>}
     */
    value: function setDisplay(display) {
      if (this.display === display && this.instance) {
        return _nativePromiseOnly.default.resolve(this.instance);
      }

      this.form.display = display;
      this.instance.destroy();
      this.instance = this.create(display);
      return this.setForm(this.form);
    }
  }, {
    key: "empty",
    value: function empty() {
      if (this.element) {
        while (this.element.firstChild) {
          this.element.removeChild(this.element.firstChild);
        }
      }
    }
  }, {
    key: "sanitize",

    /**
     * Sanitize an html string.
     *
     * @param string
     * @returns {*}
     */
    value: function sanitize(dirty) {
      return FormioUtils.sanitize(dirty, this.options);
    }
  }, {
    key: "setContent",
    value: function setContent(element, content) {
      if (element instanceof HTMLElement) {
        element.innerHTML = this.sanitize(content);
        return true;
      }

      return false;
    }
    /**
     * Build a new form.
     *
     * @return {Promise<T>}
     */

  }, {
    key: "build",
    value: function build() {
      var _this3 = this;

      if (!this.instance) {
        return _nativePromiseOnly.default.reject('Form not ready. Use form.ready promise');
      }

      if (!this.element) {
        return _nativePromiseOnly.default.reject('No DOM element for form.');
      } // Add temporary loader.


      var template = this.options && this.options.template ? this.options.template : 'bootstrap';
      var loader = _templates.default[template].loader || _templates.default.bootstrap.loader;
      this.setContent(this.element, loader.form);
      return this.render().then(function (html) {
        _this3.setContent(_this3.element, html);

        return _this3.attach(_this3.element).then(function () {
          return _this3.instance;
        });
      }).then(function (param) {
        _this3.emit('build', param);

        return param;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      if (!this.instance) {
        return _nativePromiseOnly.default.reject('Form not ready. Use form.ready promise');
      }

      return _nativePromiseOnly.default.resolve(this.instance.render()).then(function (param) {
        _this4.emit('render', param);

        return param;
      });
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this5 = this;

      if (!this.instance) {
        return _nativePromiseOnly.default.reject('Form not ready. Use form.ready promise');
      }

      this.element = element;
      return this.instance.attach(this.element).then(function (param) {
        _this5.emit('attach', param);

        return param;
      });
    }
  }, {
    key: "form",
    set: function set(formParam) {
      return this.setForm(formParam);
    },
    get: function get() {
      return this._form;
    }
  }], [{
    key: "embed",
    value: function embed(_embed) {
      var _this6 = this;

      return new _nativePromiseOnly.default(function (resolve) {
        if (!_embed || !_embed.src) {
          resolve();
        }

        var id = _this6.id || "formio-".concat(Math.random().toString(36).substring(7));
        var className = _embed.class || 'formio-form-wrapper';
        var code = _embed.styles ? "<link rel=\"stylesheet\" href=\"".concat(_embed.styles, "\">") : '';
        code += "<div id=\"".concat(id, "\" class=\"").concat(className, "\"></div>");
        document.write(code);
        var attempts = 0;
        var wait = setInterval(function () {
          attempts++;
          var formElement = document.getElementById(id);

          if (formElement || attempts > 10) {
            resolve(new Form(formElement, _embed.src).ready);
            clearInterval(wait);
          }
        }, 10);
      });
    }
  }]);

  return Form;
}(_Element2.default); // Allow simple embedding.


exports.default = Form;

_Formio.default.embedForm = function (embed) {
  return Form.embed(embed);
};
/**
 * Factory that creates a new form based on the form parameters.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */


_Formio.default.createForm = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _construct(Form, args).ready;
};

_Formio.default.Form = Form;