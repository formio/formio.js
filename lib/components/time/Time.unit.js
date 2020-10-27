"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _Time = _interopRequireDefault(require("./Time"));

var _fixtures = require("./fixtures");

var _Webform = _interopRequireDefault(require("../../Webform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Time Component', function () {
  it('Should build a time component', function () {
    return _harness.default.testCreate(_Time.default, _fixtures.comp1);
  });
  it('Should format value on blur', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm(_fixtures.timeForm).then(function () {
      var component = form.components[0];
      var inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true
      });
      var blurEvent = new Event('blur');
      var timeInput = component.element.querySelector('input[name="data[time]"]');
      timeInput.value = '10:0_ __';
      timeInput.dispatchEvent(inputEvent);
      setTimeout(function () {
        _powerAssert.default.equal(timeInput.value, '10:0_ __');

        _powerAssert.default.equal(component.dataValue, '10:00:00');

        timeInput.dispatchEvent(blurEvent);
        setTimeout(function () {
          _powerAssert.default.equal(timeInput.value, '10:00 AM');

          done();
        }, 500);
      }, 250);
    }).catch(done);
  });
  it('Should not show error if value corresponds to the mask', function (done) {
    _harness.default.testCreate(_Time.default, _fixtures.comp2).then(function (component) {
      var inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true
      });
      var timeInput = component.element.querySelector('input[name="data[time]"]');
      timeInput.value = '12:0_';
      timeInput.dispatchEvent(inputEvent);
      setTimeout(function () {
        timeInput.value = '12:00';
        timeInput.dispatchEvent(inputEvent);
        setTimeout(function () {
          component.checkData(component.data);
          setTimeout(function () {
            _powerAssert.default.equal(component.errors.length, 0);

            done();
          }, 700);
        }, 600);
      }, 500);
    });
  });
  it('Should be invalid if time is not real', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm(_fixtures.timeForm2).then(function () {
      var component = form.components[0];

      _harness.default.setInputValue(component, 'data[time]', '89:19');

      setTimeout(function () {
        _powerAssert.default.equal(component.error.message, 'Invalid time', 'Should have an error');

        done();
      }, 650);
    }).catch(done);
  });
  it('Should build a time component', function (done) {
    _harness.default.testCreate(_Time.default, _fixtures.comp3).then(function (time) {
      _powerAssert.default.deepEqual(time.dataValue, ['10:00:00', '11:00:00'], 'Should be set to default value');

      done();
    }).catch(done);
  });
});