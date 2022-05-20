"use strict";

require("core-js/modules/es.string.trim.js");

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Url = _interopRequireDefault(require("./Url"));

var _Formio = _interopRequireDefault(require("./../../Formio"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Url Component', function () {
  it('Should build a url component', function (done) {
    _harness.default.testCreate(_Url.default, _fixtures.comp1).then(function () {
      done();
    });
  });
  it('Should provide min/max length validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    form.components[0].validate = {
      minLength: 6,
      maxLength: 10
    };
    var validValues = ['', 'www.hhh.by', 'uuu.by', 'TE2-t.est', 'te2-t.est'];
    var invalidMin = ['hh.jj', 'w.by'];
    var invalidMax = ['Test-t.Test', 'test.test.test', 't-t-t-t-t.tt'];

    var testValidity = function testValidity(values, valid, message, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('url');
          var changed = component.setValue(value);
          var error = message;

          if (value) {
            _powerAssert.default.equal(changed, true, 'Should set value');
          }

          setTimeout(function () {
            if (valid) {
              _powerAssert.default.equal(!!component.error, false, 'Should not contain error');
            } else {
              _powerAssert.default.equal(!!component.error, true, 'Should contain error');

              _powerAssert.default.equal(component.error.message, error, 'Should contain error message');

              _powerAssert.default.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');

              _powerAssert.default.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_lodash.default.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidMin, false, 'Url must have at least 6 characters.');
    testValidity(invalidMax, false, 'Url must have no more than 10 characters.', invalidMax[invalidMax.length - 1]);
  });
  it('Should provide pattern validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    form.components[0].validate = {
      pattern: '^(https?):\\/\\/(-\\.)?([^\\s\\/?\\.#-]+\\.?)+(\\/[^\\s]*)?$'
    };
    var validValues = ['https://someTest.com', 'http://test.com', 'http://userid@example.com:8080', ''];
    var invalidValues = ['www.test.com', 'test.hh', 'http://at--er.b.co'];

    var testValidity = function testValidity(values, valid, message, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('url');
          var changed = component.setValue(value);
          var error = message;

          if (value) {
            _powerAssert.default.equal(changed, true, 'Should set value');
          }

          setTimeout(function () {
            if (valid) {
              _powerAssert.default.equal(!!component.error, false, 'Should not contain error');
            } else {
              _powerAssert.default.equal(!!component.error, true, 'Should contain error');

              _powerAssert.default.equal(component.error.message.trim(), error, 'Should contain error message');

              _powerAssert.default.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');

              _powerAssert.default.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_lodash.default.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues, false, 'Url does not match the pattern ^(https?):\\/\\/(-\\.)?([^\\s\\/?\\.#-]+\\.?)+(\\/[^\\s]*)?$', invalidValues[invalidValues.length - 1]);
  });
  it('Should provide url validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    var validValues = ['', 'www.test.test', 'https://www.test.test', 'http://www.test.test', 'email://test1111@test.to', 'email://t-e-s-t@te-st.to', 'te.S-T.test', 'www.1111111.test'];
    var invalidValues = ['      ', 'e.S-T.test.', 'someText', '.www.test.to', 'htthhhhhps://www.test.test', '://www.test.test', '    www.test.test', 'www.test.test  ', 'www.te st.test', 'www.1111111.33', 'www.rrrrrr.66h', 'email://test111test.to', 'http://', 'http://.', 'http://..', 'http://../', 'http://?', 'http://??', 'http://??/', 'http://#', 'http://##', 'http://##/', 'http://foo.bar?q=Spaces should be encoded', '//', '//a', '///a', '///', 'http:///a'];

    var testValidity = function testValidity(values, valid, message, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('url');
          var changed = component.setValue(value);
          var error = message;

          if (value) {
            _powerAssert.default.equal(changed, true, 'Should set value');
          }

          setTimeout(function () {
            if (valid) {
              _powerAssert.default.equal(!!component.error, false, 'Should not contain error');
            } else {
              _powerAssert.default.equal(!!component.error, true, 'Should contain error');

              _powerAssert.default.equal(component.error.message.trim(), error, 'Should contain error message');

              _powerAssert.default.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');

              _powerAssert.default.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_lodash.default.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues, false, 'Url must be a valid url.', invalidValues[invalidValues.length - 1]);
  });
});