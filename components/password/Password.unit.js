"use strict";

require("core-js/modules/es.string.trim.js");

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Password = _interopRequireDefault(require("./Password"));

var _Formio = _interopRequireDefault(require("./../../Formio"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Password Component', function () {
  it('Should build a password component', function () {
    return _harness.default.testCreate(_Password.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="password"]', 1);
    });
  });
  it('Should provide min/max length validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    form.components[0].validate = {
      minLength: 5,
      maxLength: 10
    };
    var validValues = ['', 'te_st', 'test value', '      ', 'What?', 'test: ', 't    ', '   t '];
    var invalidMin = ['t', 'tt', 'ttt', 'tttt', '  t ', '  t', '_4_'];
    var invalidMax = ['test__value', 'test value ', ' test value', 'test: value'];

    var testValidity = function testValidity(values, valid, message, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('password');
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
    testValidity(invalidMin, false, 'Password must have at least 5 characters.');
    testValidity(invalidMax, false, 'Password must have no more than 10 characters.', invalidMax[invalidMax.length - 1]);
  });
  it('Should provide pattern validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    form.components[0].validate = {
      pattern: '\\D+'
    };
    var validValues = ['', '     ', 'test value', '& "" (test) _ ,.*', '  some - test - value   '];
    var invalidValues = ['test(2)', '123', '0 waste', '"9"', '   9'];

    var testValidity = function testValidity(values, valid, message, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('password');
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
    testValidity(invalidValues, false, 'Password does not match the pattern \\D+', invalidValues[invalidValues.length - 1]);
  });
});