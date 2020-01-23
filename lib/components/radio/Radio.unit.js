"use strict";

require("core-js/modules/web.dom-collections.for-each");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Radio = _interopRequireDefault(require("./Radio"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Radio Component', function () {
  it('Should build a radio component', function () {
    return _harness.default.testCreate(_Radio.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="radio"]', 4);

      _harness.default.testElements(component, 'span', 4);
    });
  });
  it('Span should have correct text label', function () {
    return _harness.default.testCreate(_Radio.default, _fixtures.comp1).then(function (component) {
      component.element.querySelectorAll('input').forEach(function (input) {
        (0, _powerAssert.default)(input.getAttribute('class').indexOf('form-check-input') !== -1, 'No form-check-input on radios.');
      });
      var spans = component.element.querySelectorAll('span');

      _powerAssert.default.equal(spans[0].innerHTML, 'Red');

      _powerAssert.default.equal(spans[1].innerHTML, 'Green');

      _powerAssert.default.equal(spans[2].innerHTML, 'Blue');

      _powerAssert.default.equal(spans[3].innerHTML, 'Yellow');
    });
  });
});