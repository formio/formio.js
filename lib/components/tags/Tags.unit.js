"use strict";

require("core-js/modules/es.array.for-each");

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Tags = _interopRequireDefault(require("./Tags"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Tags Component', function () {
  it('Should build a tags component', function () {
    return _harness.default.testCreate(_Tags.default, _fixtures.comp1);
  });
  it('Should not exceed maxTags limit', function (done) {
    _harness.default.testCreate(_Tags.default, _fixtures.comp2).then(function (component) {
      var blurEvent = new Event('blur');
      var inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true
      });
      var element = component.choices.input.element;
      var values = ['1', '2', '3', '4', '5'];
      values.forEach(function (value) {
        element.value = value;
        element.dispatchEvent(inputEvent);
        element.dispatchEvent(blurEvent);
      });

      _powerAssert.default.equal(component.choices.getValue(true).length, 4);

      done();
    });
  });
});