"use strict";

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _DateTime = _interopRequireDefault(require("./DateTime"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DateTime Component', function () {
  it('Should build a date time component', function () {
    return _harness.default.testCreate(_DateTime.default, _fixtures.comp1);
  });
  it('Test formatting', function (done) {
    _harness.default.testCreate(_DateTime.default, _fixtures.comp2).then(function (dateTime) {
      var value = '2020-09-22T00:00:00';
      var formattedValue = '2020-09-22';
      var input = dateTime.element.querySelector('[ref="input"]');

      _powerAssert.default.equal(input.getAttribute('placeholder'), dateTime.component.format, 'Placeholder should be equal to the format');

      dateTime.setValue(value);
      setTimeout(function () {
        _powerAssert.default.equal(dateTime.getValueAsString(value), formattedValue, 'getValueAsString should return formatted value');

        done();
      }, 250);
    }).catch(done);
  });
  it('Should format value', function () {
    _fixtures.comp2.format = 'yyyy-MM-dd hh:mm a';
    return _harness.default.testCreate(_DateTime.default, _fixtures.comp2).then(function (dateTime) {
      _powerAssert.default.equal(dateTime.getValueAsString('2020-09-18T12:12:00'), '2020-09-18 12:12 PM');
    });
  });
});