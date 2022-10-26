"use strict";

require("core-js/modules/es.string.trim.js");

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _TextArea = _interopRequireDefault(require("./TextArea"));

var _sinon = _interopRequireDefault(require("sinon"));

var _Formio = _interopRequireDefault(require("./../../Formio"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _chai = require("chai");

var _lodash = _interopRequireDefault(require("lodash"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TextArea Component', function () {
  it('Should build a TextArea component', function () {
    return _harness.default.testCreate(_TextArea.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'textarea', 1);
    });
  });
  it('setValue should be called only once', function () {
    return _harness.default.testCreate(_TextArea.default, _fixtures.comp2).then(function (component) {
      var valueToSet = [{
        firstName: 'Bobby',
        lastName: 'Lynch'
      }, {
        firstName: 'Harold',
        lastName: 'Freeman'
      }];

      var emit = _sinon.default.spy(component, 'setValue');

      component.setValue(valueToSet);
      (0, _chai.expect)(component.getValue()).to.deep.equal([{
        firstName: 'Bobby',
        lastName: 'Lynch'
      }, {
        firstName: 'Harold',
        lastName: 'Freeman'
      }]);
      (0, _chai.expect)(emit.callCount).to.equal(1);
    });
  });
  it('Should provide min/max length validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

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
          var component = form.getComponent('textArea');
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
    testValidity(invalidMin, false, 'Text Area must have at least 5 characters.');
    testValidity(invalidMax, false, 'Text Area must have no more than 10 characters.', invalidMax[invalidMax.length - 1]);
  });
  it('Should provide min/max words validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    form.components[0].validate = {
      minWords: 2,
      maxWords: 5
    };
    var validValues = ['', 'test value', 'some, test value', 'some - test - value', '   value      value     value    value   value      ', ' What ?', '" test "'];
    var invalidMin = ['  t   ', '? ', 'e', '_test    ', '   9', 't  ', 'What?', '"4"'];
    var invalidMax = ['te st __ va lue ""', '" te st va lue "', '11 - 22 - 33 - 44', 'te st : va lue :'];

    var testValidity = function testValidity(values, valid, message, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('textArea');
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
    testValidity(invalidMin, false, 'Text Area must have at least 2 words.');
    testValidity(invalidMax, false, 'Text Area must have no more than 5 words.', invalidMax[invalidMax.length - 1]);
  });
  it('Should provide pattern validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

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
          var component = form.getComponent('textArea');
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
    testValidity(invalidValues, false, 'Text Area does not match the pattern \\D+', invalidValues[invalidValues.length - 1]);
  });
  it('Should set custom number of rows', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    form.components[0].rows = 5;
    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var component = form.getComponent('textArea');

      _powerAssert.default.equal(component.refs.input[0].rows, component.component.rows, 'Should set custom number of rows');

      done();
    }).catch(done);
  });
  it('Should render HTML', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    form.components[0].inputFormat = 'html';
    var element = document.createElement('div');

    _Formio.default.createForm(element, form, {
      readOnly: true
    }).then(function (form) {
      form.setSubmission({
        data: {
          textArea: '<b>HTML!</b>'
        }
      });
      setTimeout(function () {
        var textArea = form.getComponent('textArea');

        _powerAssert.default.equal(textArea.refs.input[0].innerHTML, '<b>HTML!</b>');

        done();
      }, 300);
    }).catch(done);
  });
  it('Should render plain text', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    form.components[0].inputFormat = 'plain';
    var element = document.createElement('div');

    _Formio.default.createForm(element, form, {
      readOnly: true
    }).then(function (form) {
      form.setSubmission({
        data: {
          textArea: '<b>Plain text!</b>'
        }
      });
      setTimeout(function () {
        var textArea = form.getComponent('textArea');

        _powerAssert.default.equal(textArea.refs.input[0].innerText, '<b>Plain text!</b>');

        done();
      }, 300);
    }).catch(done);
  });
  it('Should correctly count characters if character counter is enabled', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    form.components[0].showCharCount = true;
    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var component = form.getComponent('textArea');

      var inputValue = function inputValue(value) {
        var input = component.refs.input[0];
        var inputEvent = new Event('input');
        input.value = value;
        input.dispatchEvent(inputEvent);
      };

      var checkValue = function checkValue(value) {
        _powerAssert.default.equal(component.dataValue, value, 'Should set value');

        _powerAssert.default.equal(parseInt(component.refs.charcount[0].textContent), value.length, 'Should show correct chars number');

        _powerAssert.default.equal(component.refs.charcount[0].textContent, "".concat(value.length, " characters"), 'Should show correct message');
      };

      var value = 'test Value (@#!-"]) _ 23.,5}/*&&';
      inputValue(value);
      setTimeout(function () {
        checkValue(value);
        value = '';
        inputValue(value);
        setTimeout(function () {
          checkValue(value);
          value = '  ';
          inputValue(value);
          setTimeout(function () {
            checkValue(value);
            done();
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  });
  it('Should correctly count words if word counter is enabled', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    form.components[0].showWordCount = true;
    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var component = form.getComponent('textArea');

      var inputValue = function inputValue(value) {
        var input = component.refs.input[0];
        var inputEvent = new Event('input');
        input.value = value;
        input.dispatchEvent(inputEvent);
      };

      var checkValue = function checkValue(value, expected) {
        _powerAssert.default.equal(component.dataValue, value, 'Should set value');

        _powerAssert.default.equal(parseInt(component.refs.wordcount[0].textContent), expected, 'Should show correct words number');

        _powerAssert.default.equal(component.refs.wordcount[0].textContent, "".concat(expected, " words"), 'Should show correct message');
      };

      var value = 'test , test_test 11 - "so me"';
      inputValue(value);
      setTimeout(function () {
        checkValue(value, 7);
        value = ' test ';
        inputValue(value);
        setTimeout(function () {
          checkValue(value, 1);
          value = ' .   .  ';
          inputValue(value);
          setTimeout(function () {
            checkValue(value, 2);
            done();
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  });
});