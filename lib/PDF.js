"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _Webform2 = _interopRequireDefault(require("./Webform"));

var _utils = require("./utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PDF = /*#__PURE__*/function (_Webform) {
  _inherits(PDF, _Webform);

  var _super = _createSuper(PDF);

  function PDF(element, options) {
    var _this;

    _classCallCheck(this, PDF);

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
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this3 = this;

      return _get(_getPrototypeOf(PDF.prototype), "attach", this).call(this, element).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var iframeSrc, _this3$options, appEnv, headers, acceptedEnvs, bodyRequest, htmlBody, iframeWindow, iframeDoc, submitButton, form;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
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

                iframeSrc = _this3.getSrc();
                _this3.iframeElement = _this3.ce('iframe', {
                  src: iframeSrc,
                  id: "iframe-".concat(_this3.id),
                  seamless: true,
                  class: 'formio-iframe'
                });
                _this3.iframeElement.formioContainer = _this3.component.components;
                _this3.iframeElement.formioComponent = _this3; // Append the iframe to the iframeContainer in the template

                _this3.empty(_this3.refs.iframeContainer);

                _this3.appendChild(_this3.refs.iframeContainer, _this3.iframeElement);

                _this3$options = _this3.options, appEnv = _this3$options.appEnv, headers = _this3$options.headers;
                acceptedEnvs = [];

                if (!acceptedEnvs.includes(appEnv)) {
                  _context.next = 30;
                  break;
                }

                _context.prev = 13;
                _context.next = 16;
                return fetch(iframeSrc, {
                  method: 'GET',
                  headers: _objectSpread({
                    credentials: 'include'
                  }, headers)
                });

              case 16:
                bodyRequest = _context.sent;
                _context.next = 19;
                return bodyRequest.text();

              case 19:
                htmlBody = _context.sent;
                iframeWindow = _this3.iframeElement.contentWindow || _this3.iframeElement.contentDocument.parentWindow;
                iframeDoc = iframeWindow.document;
                iframeDoc.open();
                iframeDoc.write(htmlBody);
                iframeDoc.close();
                _context.next = 30;
                break;

              case 27:
                _context.prev = 27;
                _context.t0 = _context["catch"](13);
                console.log('error setting pdf iframe', _context.t0);

              case 30:
                // Post the form to the iframe
                _this3.postMessage({
                  name: 'form',
                  data: _this3.form
                }); // Hide the submit button if the associated component is hidden


                submitButton = _this3.components.find(function (c) {
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

                form = (0, _utils.fastCloneDeep)(_this3.form);

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

              case 38:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[13, 27]]);
      })));
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

      return _get(_getPrototypeOf(PDF.prototype), "setForm", this).call(this, form).then(function () {
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
          _this7.postMessage({
            name: 'submission',
            data: submission
          });
        });
      }

      return changed;
    }
  }, {
    key: "setSubmission",
    value: function setSubmission(submission) {
      var _this8 = this;

      return _get(_getPrototypeOf(PDF.prototype), "setSubmission", this).call(this, submission).then(function () {
        if (_this8.formio) {
          _this8.formio.getDownloadUrl().then(function (url) {
            // Add a download button if it has a download url.
            if (!url) {
              return;
            }

            if (!_this8.downloadButton) {
              if (_this8.options.primaryProject) {
                url += "&project=".concat(_this8.options.primaryProject);
              }

              _this8.downloadButton = _this8.ce('a', {
                href: url,
                target: '_blank',
                style: 'position:absolute;right:10px;top:110px;cursor:pointer;'
              }, _this8.ce('img', {
                src: require('./pdf.image'),
                style: 'width:3em;'
              }));

              _this8.element.insertBefore(_this8.downloadButton, _this8.iframe);
            }
          });
        }
      });
    }
  }, {
    key: "postMessage",
    value: function postMessage(message) {
      var _this9 = this;

      // If we get here before the iframeReady promise is set up, it's via the superclass constructor
      if (!this.iframeReady) {
        return;
      }

      if (!message.type) {
        message.type = 'iframe-data';
      }

      this.iframeReady.then(function () {
        if (_this9.iframeElement && _this9.iframeElement.contentWindow) {
          _this9.iframeElement.contentWindow.postMessage(JSON.stringify(message), '*');
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
      var helpBlock = document.getElementById('submit-error');

      if (!helpBlock && this.errors.length) {
        var p = this.ce('p', {
          class: 'help-block'
        });
        this.setContent(p, this.t('submitError'));
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
window.addEventListener('message', function (event) {
  var eventData = null;

  try {
    eventData = JSON.parse(event.data);
  } catch (err) {
    eventData = null;
  } // If this form exists, then emit the event within this form.


  if (eventData && eventData.name && eventData.formId && _Formio.default.forms.hasOwnProperty(eventData.formId)) {
    _Formio.default.forms[eventData.formId].emit("iframe-".concat(eventData.name), eventData.data);
  }
});