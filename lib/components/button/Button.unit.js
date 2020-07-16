"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Button = _interopRequireDefault(require("./Button"));

var _Formio = _interopRequireDefault(require("./../../Formio"));

var _sinon = _interopRequireDefault(require("sinon"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

describe('Button Component', function () {
  it('Should build a button component', function () {
    return _harness.default.testCreate(_Button.default, _fixtures.comp1).then(function (component) {
      var buttons = _harness.default.testElements(component, 'button[type="submit"]', 1);

      var _iterator = _createForOfIteratorHelper(buttons),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var button = _step.value;

          _powerAssert.default.equal(button.name, "data[".concat(_fixtures.comp1.key, "]"));

          _powerAssert.default.equal(button.innerHTML.trim(), _fixtures.comp1.label);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
  });
  it('POST to URL button should pass URL and headers', function (done) {
    var formJson = {
      'type': 'form',
      'components': [{
        'label': 'Some Field',
        'type': 'textfield',
        'input': true,
        'key': 'someField'
      }, {
        'label': 'POST to URL',
        'action': 'url',
        'url': 'someUrl',
        'headers': [{
          'header': 'testHeader',
          'value': 'testValue'
        }],
        'type': 'button',
        'input': true,
        'key': 'postToUrl'
      }]
    };
    var element = document.createElement('div');

    _Formio.default.createForm(element, formJson).then(function (form) {
      var spy = _sinon.default.spy(_Formio.default, 'makeStaticRequest');

      form.getComponent('postToUrl').refs.button.click();
      var passedUrl = spy.firstCall.args[0];
      var passedHeaders = spy.firstCall.lastArg.headers;
      spy.restore();

      _powerAssert.default.deepEqual(passedHeaders, {
        'testHeader': 'testValue'
      });

      _powerAssert.default.equal(passedUrl, 'someUrl');

      done();
    }).catch(done);
  });
  it('Should disable on invalid', function (done) {
    var element = document.createElement('div');

    _Formio.default.createForm(element, {
      components: [{
        type: 'textfield',
        key: 'a',
        label: 'A',
        validate: {
          required: true
        }
      }, {
        type: 'button',
        action: 'submit',
        key: 'submit',
        disableOnInvalid: true,
        input: true
      }]
    }).then(function (form) {
      form.on('change', function () {
        var button = form.getComponent('submit');
        (0, _powerAssert.default)(button.disabled, 'Button should be disabled');
        done();
      });
      form.submission = {
        data: {}
      };
    }).catch(done);
  });
  it('POST to URL button should perform URL interpolation', function (done) {
    var formJson = {
      'type': 'form',
      'components': [{
        'label': 'Some Field',
        'type': 'textfield',
        'input': true,
        'key': 'someField'
      }, {
        'label': 'URL',
        'type': 'textfield',
        'input': true,
        'key': 'url'
      }, {
        'label': 'POST to URL',
        'action': 'url',
        'url': '{{data.url}}/submission',
        'type': 'button',
        'input': true,
        'key': 'postToUrl'
      }]
    };
    var element = document.createElement('div');

    _Formio.default.createForm(element, formJson).then(function (form) {
      form.submission = {
        data: {
          url: 'someUrl'
        }
      };
      return form.submissionReady.then(function () {
        var spy = _sinon.default.spy(_Formio.default, 'makeStaticRequest');

        form.getComponent('postToUrl').refs.button.click();
        var passedUrl = spy.firstCall.args[0];
        spy.restore();

        _powerAssert.default.equal(passedUrl, 'someUrl/submission');

        done();
      });
    }).catch(done);
  });
  it('POST to URL button should perform headers interpolation', function (done) {
    var formJson = {
      'type': 'form',
      'components': [{
        'label': 'Some Field',
        'type': 'textfield',
        'input': true,
        'key': 'someField'
      }, {
        'label': 'Header',
        'type': 'textfield',
        'input': true,
        'key': 'header'
      }, {
        'label': 'POST to URL',
        'action': 'url',
        'url': 'someUrl',
        'headers': [{
          'header': 'testHeader',
          'value': 'Value {{data.header}}'
        }],
        'type': 'button',
        'input': true,
        'key': 'postToUrl'
      }]
    };
    var element = document.createElement('div');

    _Formio.default.createForm(element, formJson).then(function (form) {
      form.submission = {
        data: {
          someField: 'some value',
          header: 'some header'
        }
      };
      return form.submissionReady.then(function () {
        var spy = _sinon.default.spy(_Formio.default, 'makeStaticRequest');

        form.getComponent('postToUrl').refs.button.click();
        var passedHeaders = spy.firstCall.lastArg.headers;
        spy.restore();

        _powerAssert.default.deepEqual(passedHeaders, {
          'testHeader': 'Value some header'
        });

        done();
      });
    }).catch(done);
  });
  it('Should not change color and show message if the error is silent', function (done) {
    var formJson = {
      'type': 'form',
      'components': [{
        'label': 'Some Field',
        'type': 'textfield',
        'input': true,
        'key': 'someField'
      }, {
        'label': 'Submit',
        'action': 'submit',
        'type': 'button',
        'input': true,
        'key': 'submit'
      }]
    };
    var element = document.createElement('div');

    _Formio.default.createForm(element, formJson, {
      hooks: {
        beforeSubmit: function beforeSubmit(submission, callback) {
          callback({
            message: 'Err',
            component: submission.component,
            silent: true
          }, submission);
        }
      }
    }).then(function (form) {
      var button = form.getComponent('submit');
      button.emit('submitButton', {
        state: button.component.state || 'submitted',
        component: button.component,
        instance: button
      });
      setTimeout(function () {
        (0, _powerAssert.default)(!button.refs.button.className.includes('btn-danger submit-fail'));
        (0, _powerAssert.default)(!button.refs.button.className.includes('btn-success submit-success'));
        (0, _powerAssert.default)(!button.refs.buttonMessageContainer.className.includes('has-success'));
        (0, _powerAssert.default)(!button.refs.buttonMessageContainer.className.includes('has-error'));
        (0, _powerAssert.default)(button.refs.buttonMessage.innerHTML === '');
        done();
      }, 100);
    }).catch(done);
  });
});