"use strict";

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _lodash = _interopRequireDefault(require("lodash"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Button = _interopRequireDefault(require("./Button"));

var _Formio = _interopRequireDefault(require("./../../Formio"));

var _sinon = _interopRequireDefault(require("sinon"));

var _fixtures = require("./fixtures");

var _Webform = _interopRequireDefault(require("../../Webform"));

var _formWithResetValue = _interopRequireDefault(require("../../../test/formtest/formWithResetValue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

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
  it('Test on error', function (done) {
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
        button.emit('submitError');
        setTimeout(function () {
          console.log('Text Content: ', button.refs.buttonMessage.innerHTML);

          _powerAssert.default.equal(button.refs.buttonMessage.textContent, 'Please check the form and correct all errors before submitting.');

          done();
        }, 100);
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
  it('Should reset values of all the form\'s components and update properties dependent on values', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm(_formWithResetValue.default).then(function () {
      var select = form.getComponent(['showPanel']);
      select.setValue('yes');
      setTimeout(function () {
        var panel = form.getComponent(['panel']);
        var textField = form.getComponent(['textField']);
        var textArea = form.getComponent(['textArea']);

        _powerAssert.default.equal(panel.visible, true, 'Panel should be visible');

        _powerAssert.default.equal(textField.visible, true, 'TextFiled should be visible');

        _powerAssert.default.equal(textArea.visible, true, 'TextArea should be visible');

        var resetButton = form.getComponent(['reset']);
        resetButton.emit('resetForm');
        setTimeout(function () {
          var panel = form.getComponent(['panel']);
          var textField = form.getComponent(['textField']);
          var textArea = form.getComponent(['textArea']);

          _powerAssert.default.equal(panel.visible, false, 'Panel should NOT be visible');

          _powerAssert.default.equal(textField.visible, false, 'TextFiled should NOT be visible');

          _powerAssert.default.equal(textArea.visible, false, 'TextArea should NOT be visible');

          done();
        }, 300);
      }, 300);
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should perform custom logic', function (done) {
    var element = document.createElement('div');
    var form = new _Webform.default(element);
    var testForm = {
      components: [{
        type: 'number',
        key: 'number',
        label: 'Number'
      }, {
        type: 'button',
        key: 'custom',
        label: 'Custom',
        action: 'custom',
        custom: 'data[\'number\'] = 5555'
      }]
    };
    form.setForm(testForm).then(function () {
      var button = form.getComponent('custom');

      var changeEventTriggered = _sinon.default.spy(button, 'triggerChange');

      button.refs.button.click();
      (0, _powerAssert.default)(changeEventTriggered.calledOnce, 'Click on custom button should trigger change event');
      form.on('change', function () {
        var data = form.submission.data;

        _powerAssert.default.deepEqual(data, {
          number: 5555,
          custom: true
        });

        done();
      });
    }).catch(function (err) {
      return done(err);
    });
  });
  it('Should correctly set theme', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (formObj) {
      var btns = formObj.components;
      var theme = ['warning', 'danger', 'success', 'info', 'secondary', 'primary'];

      _lodash.default.each(btns, function (btn, index) {
        var btnClass = "btn-".concat(theme[index]);
        var includeClass = btn.refs.button.classList.contains(btnClass);

        _powerAssert.default.equal(includeClass, true, "Should set ".concat(theme[index], " theme for button"));
      });

      done();
    }).catch(done);
  });
  it('Should render block btn', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    form.components = [{
      label: 'Submit',
      showValidations: false,
      block: true,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true
    }];
    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (formObj) {
      var btn = formObj.components[0];
      var btnClass = 'btn-block';
      var includeClass = btn.refs.button.classList.contains(btnClass);

      _powerAssert.default.equal(includeClass, true, 'Should set btn-block class for button');

      done();
    }).catch(done);
  });
  it('Test event, reset, post, save in state actions', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    var originalMakeRequest = _Formio.default.makeStaticRequest;

    _Formio.default.makeStaticRequest = function (url, method, data) {
      _powerAssert.default.equal(url, 'https://test.com');

      _powerAssert.default.equal(method, 'POST');

      _powerAssert.default.deepEqual(data.data, {
        event: false,
        number: '',
        post: true,
        reset: false,
        saveInState: false
      });

      return new Promise(function (resolve) {
        resolve(_objectSpread({}, data));
      });
    };

    _Formio.default.createForm(element, form).then(function (form) {
      var formio = new _Formio.default('http://test.localhost/test', {});

      formio.makeRequest = function (type, url, method, data) {
        _powerAssert.default.equal(data.state, 'testState');

        _powerAssert.default.equal(method.toUpperCase(), 'POST');

        return new Promise(function (resolve) {
          return resolve(_objectSpread({}, data));
        });
      };

      form.formio = formio;

      var click = function click(btnComp) {
        var elem = btnComp.refs.button;
        var clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };

      var saveInStateBtn = form.getComponent('saveInState');
      click(saveInStateBtn);
      setTimeout(function () {
        var eventBtn = form.getComponent('event');
        click(eventBtn);
        setTimeout(function () {
          var numberComp = form.getComponent('number');

          _powerAssert.default.equal(numberComp.dataValue, 2);

          _powerAssert.default.equal(numberComp.getValue(), 2);

          var resetBtn = form.getComponent('reset');
          click(resetBtn);
          setTimeout(function () {
            var numberComp = form.getComponent('number');

            _powerAssert.default.equal(numberComp.dataValue, '');

            _powerAssert.default.equal(numberComp.getValue(), '');

            var postBtn = form.getComponent('post');
            click(postBtn);
            setTimeout(function () {
              _Formio.default.makeStaticRequest = originalMakeRequest;
              done();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });
});