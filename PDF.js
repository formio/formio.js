"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _Formio = require("./Formio");

var _Webform2 = _interopRequireDefault(require("./Webform"));

var _utils = require("./utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PDF = /*#__PURE__*/function (_Webform) {
  _inherits(PDF, _Webform);

  var _super = _createSuper(PDF);

  function PDF(element, options) {
    var _this;

    _classCallCheck(this, PDF);

    options.display = 'pdf';
    _this = _super.call(this, element, options);
    _this.components = [];
    return _this;
  }

  _createClass(PDF, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      _get(_getPrototypeOf(PDF.prototype), "init", this).call(this); // Handle an iframe submission.


      this.on('iframe-submission', function (submission) {
        return _this2.setValue(submission, {
          fromIframe: true
        });
      }, true);
      this.on('iframe-change', function (submission) {
        return _this2.setValue(submission, {
          fromIframe: true
        });
      }, true);
      this.on('iframe-getIframePositions', function (query) {
        var iframe = document.getElementById("iframe-".concat(query.formId));

        if (iframe) {
          var iframeBoundingClientRect = iframe.getBoundingClientRect();

          _this2.postMessage({
            name: 'iframePositions',
            data: {
              formId: query.formId,
              iframe: {
                top: iframeBoundingClientRect.top
              },
              scrollY: window.scrollY || window.pageYOffset
            }
          });
        }
      }); // Trigger when this form is ready.

      this.on('iframe-ready', function () {
        return _this2.iframeReadyResolve();
      }, true);
    }
  }, {
    key: "render",
    value: function render() {
      this.submitButton = this.addComponent({
        input: true,
        type: 'button',
        action: 'submit',
        internal: true,
        label: 'Submit',
        key: 'submit',
        ref: 'button',
        hidden: this.isSubmitButtonHidden()
      });
      return this.renderTemplate('pdf', {
        submitButton: this.submitButton.render(),
        classes: 'formio-form-pdf',
        children: this.renderComponents()
      });
    }
  }, {
    key: "redraw",
    value: function redraw() {
      this.postMessage({
        name: 'redraw'
      });
      return this.builderMode ? _nativePromiseOnly.default.resolve() : _get(_getPrototypeOf(PDF.prototype), "redraw", this).call(this);
    }
  }, {
    key: "rebuild",
    value: function rebuild() {
      if (this.builderMode && this.component.components) {
        this.destroyComponents();
        this.addComponents();
        return _nativePromiseOnly.default.resolve();
      }

      this.postMessage({
        name: 'redraw'
      });
      return _get(_getPrototypeOf(PDF.prototype), "rebuild", this).call(this);
    } // Do not attach nested components for pdf.

  }, {
    key: "attachComponents",
    value: function attachComponents(element, components, container) {
      components = components || this.components;
      container = container || this.component.components;
      element = this.hook('attachComponents', element, components, container, this);
      return Promise.resolve();
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this3 = this;

      return _get(_getPrototypeOf(PDF.prototype), "attach", this).call(this, element).then(function () {
        _this3.loadRefs(element, {
          button: 'single',
          buttonMessageContainer: 'single',
          buttonMessage: 'single',
          zoomIn: 'single',
          zoomOut: 'single',
          iframeContainer: 'single'
        });

        _this3.submitButton.refs = _objectSpread({}, _this3.refs);

        _this3.submitButton.attachButton(); // Reset the iframeReady promise.


        _this3.iframeReady = new _nativePromiseOnly.default(function (resolve, reject) {
          _this3.iframeReadyResolve = resolve;
          _this3.iframeReadyReject = reject;
        }); // iframes cannot be in the template so manually create it

        _this3.iframeElement = _this3.ce('iframe', {
          src: _this3.getSrc(),
          id: "iframe-".concat(_this3.id),
          seamless: true,
          class: 'formio-iframe'
        });
        _this3.iframeElement.formioContainer = _this3.component.components;
        _this3.iframeElement.formioComponent = _this3; // Append the iframe to the iframeContainer in the template

        _this3.empty(_this3.refs.iframeContainer);

        _this3.appendChild(_this3.refs.iframeContainer, _this3.iframeElement); // Post the form to the iframe


        _this3.form.base = _Formio.GlobalFormio.getBaseUrl();
        _this3.form.projectUrl = _Formio.GlobalFormio.getProjectUrl();

        _this3.postMessage({
          name: 'form',
          data: _this3.form
        }); // Hide the submit button if the associated component is hidden


        var submitButton = _this3.components.find(function (c) {
          return c.element === _this3.refs.button;
        });

        if (submitButton) {
          _this3.refs.button.classList.toggle('hidden', !submitButton.visible);
        }

        _this3.addEventListener(_this3.refs.zoomIn, 'click', function (event) {
          event.preventDefault();

          _this3.postMessage({
            name: 'zoomIn'
          });
        });

        _this3.addEventListener(_this3.refs.zoomOut, 'click', function (event) {
          event.preventDefault();

          _this3.postMessage({
            name: 'zoomOut'
          });
        });

        var form = (0, _utils.fastCloneDeep)(_this3.form);

        if (_this3.formio) {
          form.projectUrl = _this3.formio.projectUrl;
          form.url = _this3.formio.formUrl;
          form.base = _this3.formio.base;

          _this3.postMessage({
            name: 'token',
            data: _this3.formio.getToken()
          });
        }

        _this3.emit('attach');
      });
    }
    /**
     * Get the submission from the iframe.
     *
     * @return {Promise<any>}
     */

  }, {
    key: "getSubmission",
    value: function getSubmission() {
      var _this4 = this;

      return new _nativePromiseOnly.default(function (resolve) {
        _this4.once('iframe-submission', resolve);

        _this4.postMessage({
          name: 'getSubmission'
        });
      });
    }
    /**
     * Ensure we have the submission from the iframe before we submit the form.
     *
     * @param options
     * @return {*}
     */

  }, {
    key: "submitForm",
    value: function submitForm() {
      var _this5 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.postMessage({
        name: 'getErrors'
      });
      return this.getSubmission().then(function () {
        return _get(_getPrototypeOf(PDF.prototype), "submitForm", _this5).call(_this5, options);
      });
    }
  }, {
    key: "getSrc",
    value: function getSrc() {
      if (!this._form || !this._form.settings || !this._form.settings.pdf) {
        return '';
      }

      var iframeSrc = "".concat(this._form.settings.pdf.src, ".html");
      var params = ["id=".concat(this.id)];

      if (this.options.showCheckboxBackground || this._form.settings.showCheckboxBackground) {
        params.push('checkboxbackground=1');
      }

      if (this.options.readOnly) {
        params.push('readonly=1');
      }

      if (this.options.zoom) {
        params.push("zoom=".concat(this.options.zoom));
      }

      if (this.builderMode) {
        params.push('builder=1');
      }

      if (params.length) {
        iframeSrc += "?".concat(params.join('&'));
      }

      return iframeSrc;
    }
  }, {
    key: "setForm",
    value: function setForm(form) {
      var _this6 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _get(_getPrototypeOf(PDF.prototype), "setForm", this).call(this, form, flags).then(function () {
        if (_this6.formio) {
          form.projectUrl = _this6.formio.projectUrl;
          form.url = _this6.formio.formUrl;
          form.base = _this6.formio.base;

          _this6.postMessage({
            name: 'token',
            data: _this6.formio.getToken()
          });
        }

        _this6.postMessage({
          name: 'form',
          data: _this6.form
        });
      });
    }
    /**
     * Set's the value of this form component.
     *
     * @param submission
     * @param flags
     */

  }, {
    key: "setValue",
    value: function setValue(submission) {
      var _this7 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var changed = _get(_getPrototypeOf(PDF.prototype), "setValue", this).call(this, submission, flags);

      if (!flags || !flags.fromIframe) {
        this.once('iframe-ready', function () {
          if (changed) {
            _this7.postMessage({
              name: 'submission',
              data: submission
            });
          }
        });
      }

      return changed;
    }
  }, {
    key: "postMessage",
    value: function postMessage(message) {
      var _this8 = this;

      // If we get here before the iframeReady promise is set up, it's via the superclass constructor
      if (!this.iframeReady) {
        return;
      }

      if (!message.type) {
        message.type = 'iframe-data';
      }

      this.iframeReady.then(function () {
        if (_this8.iframeElement && _this8.iframeElement.contentWindow && !(message.name === 'form' && _this8.iframeFormSetUp)) {
          _this8.iframeElement.contentWindow.postMessage(JSON.stringify(message), '*');

          _this8.iframeFormSetUp = message.name === 'form';
        }
      });
    }
  }, {
    key: "focusOnComponent",
    value: function focusOnComponent(key) {
      this.postMessage({
        name: 'focusErroredField',
        data: key
      });
    } // Do not clear the iframe.

  }, {
    key: "clear",
    value: function clear() {}
  }, {
    key: "showErrors",
    value: function showErrors(error, triggerEvent) {
      var _this$refs$buttonMess;

      var helpBlock = document.getElementById('submit-error');
      var submitError = this.t('submitError');
      var isSubmitErrorShown = ((_this$refs$buttonMess = this.refs.buttonMessage) === null || _this$refs$buttonMess === void 0 ? void 0 : _this$refs$buttonMess.textContent.trim()) === submitError;

      if (!helpBlock && this.errors.length && !isSubmitErrorShown) {
        var p = this.ce('p', {
          class: 'help-block'
        });
        this.setContent(p, submitError);
        p.addEventListener('click', function () {
          window.scrollTo(0, 0);
        });
        var div = this.ce('div', {
          id: 'submit-error',
          class: 'has-error'
        });
        this.appendTo(p, div);
        this.appendTo(div, this.element);
      }

      if (!this.errors.length && helpBlock) {
        helpBlock.remove();
      }

      _get(_getPrototypeOf(PDF.prototype), "showErrors", this).call(this, error, triggerEvent);
    }
  }, {
    key: "isSubmitButtonHidden",
    value: function isSubmitButtonHidden() {
      var hidden = false;
      (0, _utils.eachComponent)(this.component.components, function (component) {
        if (component.type === 'button' && (component.action === 'submit' || !component.action)) {
          hidden = component.hidden || false;
        }
      });
      return hidden;
    }
  }]);

  return PDF;
}(_Webform2.default);
/**
 * Listen for window messages.
 */


exports.default = PDF;

if (typeof window !== 'undefined') {
  window.addEventListener('message', function (event) {
    var eventData = null;

    try {
      eventData = JSON.parse(event.data);
    } catch (err) {
      eventData = null;
    } // If this form exists, then emit the event within this form.


    if (eventData && eventData.name && eventData.formId && _Formio.GlobalFormio.forms.hasOwnProperty(eventData.formId)) {
      _Formio.GlobalFormio.forms[eventData.formId].emit("iframe-".concat(eventData.name), eventData.data);
    }
  });
}