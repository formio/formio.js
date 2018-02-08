'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _nativePromiseOnly = require('native-promise-only');

var _nativePromiseOnly2 = _interopRequireDefault(_nativePromiseOnly);

var _formio = require('./formio');

var _formio2 = _interopRequireDefault(_formio);

var _formio3 = require('./formio.form');

var _formio4 = _interopRequireDefault(_formio3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormioPDF = function (_FormioForm) {
  _inherits(FormioPDF, _FormioForm);

  function FormioPDF(element, options) {
    _classCallCheck(this, FormioPDF);

    // Resolve when the iframe is ready.
    var _this = _possibleConstructorReturn(this, (FormioPDF.__proto__ || Object.getPrototypeOf(FormioPDF)).call(this, element, options));

    _this.iframeReady = new _nativePromiseOnly2.default(function (resolve) {
      return _this.on('iframe-ready', resolve);
    });

    // Handle an iframe submission.
    _this.on('iframe-submission', function (submission) {
      _this.setSubmission(submission).then(function () {
        return _this.submit();
      });
    });
    return _this;
  }

  _createClass(FormioPDF, [{
    key: 'postMessage',
    value: function postMessage(message) {
      var _this2 = this;

      this.iframeReady.then(function () {
        return _this2.iframe.contentWindow.postMessage(JSON.stringify(message), '*');
      });
    }
  }, {
    key: 'getSrc',
    value: function getSrc() {
      if (!this._form || !this._form.settings || !this._form.settings.pdf) {
        return '';
      }
      var iframeSrc = this._form.settings.pdf.src + '.html';
      var params = ['id=' + this.id];
      if (this.options.readOnly) {
        params.push('readonly=1');
      }
      if (this.options.zoom) {
        params.push('zoom=' + this.options.zoom);
      }
      if (params.length) {
        iframeSrc += '?' + params.join('&');
      }
      return iframeSrc;
    }
  }, {
    key: 'setForm',
    value: function setForm(form) {
      this.postMessage({ name: 'form', data: form });
      return _get(FormioPDF.prototype.__proto__ || Object.getPrototypeOf(FormioPDF.prototype), 'setForm', this).call(this, form);
    }
  }, {
    key: 'setSubmission',
    value: function setSubmission(submission) {
      var _this3 = this;

      submission.readOnly = !!this.options.readOnly;
      this.postMessage({ name: 'submission', data: submission });
      return _get(FormioPDF.prototype.__proto__ || Object.getPrototypeOf(FormioPDF.prototype), 'setSubmission', this).call(this, submission).then(function () {
        _this3.formio.getDownloadUrl().then(function (url) {
          // Add a download button if it has a download url.
          if (!url) {
            return;
          }
          if (!_this3.downloadButton) {
            _this3.downloadButton = _this3.ce('a', {
              href: url,
              target: '_blank',
              style: 'position:absolute;right:10px;top:110px;cursor:pointer;'
            }, _this3.ce('img', {
              src: require('./pdf.image'),
              style: 'width:3em;'
            }));
            _this3.element.insertBefore(_this3.downloadButton, _this3.iframe);
          }
        });
      });
    }
  }, {
    key: 'setValue',
    value: function setValue(submission) {
      this._submission = submission || { data: {} };
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this._submission;
    }
  }, {
    key: 'build',
    value: function build() {
      var _this4 = this;

      this.zoomIn = this.ce('span', {
        style: 'position:absolute;right:10px;top:10px;cursor:pointer;',
        class: 'btn btn-default btn-secondary no-disable'
      }, this.ce('i', {
        class: this.iconClass('zoom-in')
      }));
      this.addEventListener(this.zoomIn, 'click', function (event) {
        event.preventDefault();
        _this4.postMessage({ name: 'zoomIn' });
      });

      this.zoomOut = this.ce('span', {
        style: 'position:absolute;right:10px;top:60px;cursor:pointer;',
        class: 'btn btn-default btn-secondary no-disable'
      }, this.ce('i', {
        class: this.iconClass('zoom-out')
      }));
      this.addEventListener(this.zoomOut, 'click', function (event) {
        event.preventDefault();
        _this4.postMessage({ name: 'zoomOut' });
      });

      this.iframe = this.ce('iframe', {
        src: this.getSrc(),
        seamless: true,
        class: 'formio-iframe'
      });

      this.appendChild(this.element, [this.zoomIn, this.zoomOut, this.iframe]);

      if (!this.options.readOnly) {
        this.submitButton = this.ce('button', {
          type: 'button',
          class: 'btn btn-primary'
        }, 'Submit');

        this.addEventListener(this.submitButton, 'click', function () {
          _this4.postMessage({ name: 'getSubmission' });
        });
        this.appendChild(this.element, this.submitButton);
      }
    }
  }]);

  return FormioPDF;
}(_formio4.default);

/**
 * Listen for window messages.
 */


exports.default = FormioPDF;
window.addEventListener('message', function (event) {
  var eventData = null;
  try {
    eventData = JSON.parse(event.data);
  } catch (err) {
    eventData = null;
  }

  // If this form exists, then emit the event within this form.
  if (eventData && eventData.formId && _formio2.default.forms.hasOwnProperty(eventData.formId)) {
    _formio2.default.forms[eventData.formId].emit('iframe-' + eventData.name, eventData.data);
  }
});