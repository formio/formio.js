"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _Webform2 = _interopRequireDefault(require("./Webform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PDF =
/*#__PURE__*/
function (_Webform) {
  _inherits(PDF, _Webform);

  function PDF(element, options) {
    var _this;

    _classCallCheck(this, PDF);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PDF).call(this, element, options)); // Resolve when the iframe is ready.

    _this.iframeReady = new _nativePromiseOnly.default(function (resolve) {
      return _this.iframeReadyResolve = resolve;
    });
    return _this;
  }

  _createClass(PDF, [{
    key: "postMessage",
    value: function postMessage(message) {
      var _this2 = this;

      if (!message || !this.iframeReady) {
        return;
      }

      if (!message.type) {
        message.type = 'iframe-data';
      }

      this.iframeReady.then(function () {
        if (_this2.iframe && _this2.iframe.contentWindow) {
          _this2.iframe.contentWindow.postMessage(JSON.stringify(message), '*');
        }
      });
    } // Do not clear the iframe.

  }, {
    key: "clear",
    value: function clear() {}
  }, {
    key: "redraw",
    value: function redraw() {
      this.postMessage({
        name: 'redraw'
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

      if (this.options.builder) {
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
      var _this3 = this;

      var formCopy = _lodash.default.cloneDeep(form);

      return _get(_getPrototypeOf(PDF.prototype), "setForm", this).call(this, form).then(function () {
        if (_this3.formio) {
          form.projectUrl = _this3.formio.projectUrl;
          form.url = _this3.formio.formUrl;
          form.base = _this3.formio.base;

          _this3.postMessage({
            name: 'token',
            data: _this3.formio.getToken()
          });
        }

        _this3.postMessage({
          name: 'form',
          data: formCopy
        });

        return form;
      });
    }
  }, {
    key: "setSubmission",
    value: function setSubmission(submission) {
      var _this4 = this;

      submission.readOnly = !!this.options.readOnly;
      this.postMessage({
        name: 'submission',
        data: submission
      });
      return _get(_getPrototypeOf(PDF.prototype), "setSubmission", this).call(this, submission).then(function () {
        if (_this4.formio) {
          _this4.formio.getDownloadUrl().then(function (url) {
            // Add a download button if it has a download url.
            if (!url) {
              return;
            }

            if (!_this4.downloadButton) {
              if (_this4.options.primaryProject) {
                url += "&project=".concat(_this4.options.primaryProject);
              }

              _this4.downloadButton = _this4.ce('a', {
                href: url,
                target: '_blank',
                style: 'position:absolute;right:10px;top:110px;cursor:pointer;'
              }, _this4.ce('img', {
                src: require('./pdf.image'),
                style: 'width:3em;'
              }));

              _this4.element.insertBefore(_this4.downloadButton, _this4.iframe);
            }
          });
        }
      });
    }
  }, {
    key: "addComponent",
    value: function addComponent(component, element, data, before, noAdd, state) {
      // Never add the component to the DOM.
      _get(_getPrototypeOf(PDF.prototype), "addComponent", this).call(this, component, element, data, before, true, state);
    } // Iframe should always be shown.

  }, {
    key: "showElement",
    value: function showElement() {}
  }, {
    key: "build",
    value: function build() {
      var _this5 = this;

      // Do not rebuild the iframe...
      if (this.iframe) {
        this.addComponents();
        return;
      }

      this.zoomIn = this.ce('span', {
        style: 'position:absolute;right:10px;top:10px;cursor:pointer;',
        class: 'btn btn-default btn-secondary no-disable'
      }, this.ce('i', {
        class: this.iconClass('zoom-in')
      }));
      this.addEventListener(this.zoomIn, 'click', function (event) {
        event.preventDefault();

        _this5.postMessage({
          name: 'zoomIn'
        });
      });
      this.zoomOut = this.ce('span', {
        style: 'position:absolute;right:10px;top:60px;cursor:pointer;',
        class: 'btn btn-default btn-secondary no-disable'
      }, this.ce('i', {
        class: this.iconClass('zoom-out')
      }));
      this.addEventListener(this.zoomOut, 'click', function (event) {
        event.preventDefault();

        _this5.postMessage({
          name: 'zoomOut'
        });
      });
      this.iframe = this.ce('iframe', {
        src: this.getSrc(),
        id: "iframe-".concat(this.id),
        seamless: true,
        class: 'formio-iframe'
      }); // Handle an iframe submission.

      this.on('iframe-submission', function (submission) {
        _this5.setSubmission(submission).then(function () {
          return _this5.submit();
        });
      }, true); // Trigger when this form is ready.

      this.on('iframe-ready', function () {
        return _this5.iframeReadyResolve();
      }, true);
      this.appendChild(this.element, [this.zoomIn, this.zoomOut, this.iframe]);

      if (!this.options.readOnly && _lodash.default.find(this.form.components, function (component) {
        return component.type === 'button' && component.action === 'submit' && !component.hidden;
      })) {
        this.submitButton = this.ce('button', {
          type: 'button',
          class: 'btn btn-primary'
        }, 'Submit');
        this.addEventListener(this.submitButton, 'click', function () {
          _this5.postMessage({
            name: 'getSubmission'
          });
        });
        this.appendChild(this.element, this.submitButton);
      }

      this.addComponents();
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
    eventData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
  } catch (err) {
    eventData = null;
  } // If this form exists, then emit the event within this form.


  if (eventData && eventData.name && eventData.formId && _Formio.default.forms.hasOwnProperty(eventData.formId)) {
    _Formio.default.forms[eventData.formId].emit("iframe-".concat(eventData.name), eventData.data);
  }
});