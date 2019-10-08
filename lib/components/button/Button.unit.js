"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

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

describe('Button Component', function () {
  it('Should build a button component', function () {
    return _harness.default.testCreate(_Button.default, _fixtures.comp1).then(function (component) {
      var buttons = _harness.default.testElements(component, 'button[type="submit"]', 1);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var button = _step.value;

          _powerAssert.default.equal(button.name, "data[".concat(_fixtures.comp1.key, "]"));

          _powerAssert.default.equal(button.innerHTML.trim(), _fixtures.comp1.label);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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
});