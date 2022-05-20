"use strict";

require("core-js/modules/es.string.trim.js");

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Email = _interopRequireDefault(require("./Email"));

var _Formio = _interopRequireDefault(require("./../../Formio"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Email Component', function () {
  it('Should build a email component', function () {
    return _harness.default.testCreate(_Email.default, _fixtures.comp1);
  });
  it('Should provide min/max length validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    form.components[0].validate = {
      minLength: 7,
      maxLength: 10
    };
    var validValues = ['', 'test@te.st', 't__t@t.st', '_t@test.st'];
    var invalidMin = ['t@t.st'];
    var invalidMax = ['t@test.test', 'test@test.test'];

    var testValidity = function testValidity(values, valid, message, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('email');
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
    testValidity(invalidMin, false, 'Email must have at least 7 characters.');
    testValidity(invalidMax, false, 'Email must have no more than 10 characters.', invalidMax[invalidMax.length - 1]);
  });
  it('Should provide pattern validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    form.components[0].validate = {
      pattern: '^[0-9]+@[0-9]+\\.[a-z]{2,4}$'
    };
    var validValues = ['000@12.ts', '123456@1234.com', '123456@1234.come', ''];
    var invalidValues = ['123_456@1234.com', '123456@12.34.com', 'test@123.com', '00000@123t.com'];

    var testValidity = function testValidity(values, valid, message, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('email');
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
    testValidity(invalidValues, false, 'Email does not match the pattern ^[0-9]+@[0-9]+\\.[a-z]{2,4}$', invalidValues[invalidValues.length - 1]);
  });
  it('Should provide email validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp2);

    var validValues = ['', 'test_test@test.test', '123456@1234.test', 'TEST@TEST.test', 'te.st_te%st@test.com', 'te/st___te%st@test.com', '"John..Doe"@example.com', 'test-test@test.com', 'test-test@te-st.com', '0-0-0-0-0@12-3-t.com'];
    var invalidValues = ['te.st_te%st@test.123', '      ', 'test.test', 'test-te st@test.com', '   test_test@test.test', '.test_te%st@test.com', 'te/st___t,e%st@test.com', 'te[st]t@test.com', 'test@test.com     ', 'test@', 'test@test', 'test@test.', '@test.com', 'test@.com', '00000@123t.m', '00000@123t.m-com', 'test(test)@mail.com', 'John..Doe@example.com', 'john.smith(comment)@example.com', 'test-test.@test.com'];

    var testValidity = function testValidity(values, valid, message, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('email');
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
    testValidity(invalidValues, false, 'Email must be a valid email.', invalidValues[invalidValues.length - 1]);
  });
});