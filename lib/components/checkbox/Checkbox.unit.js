"use strict";

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.function.name");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Checkbox Component', function () {
  it('Should build a checkbox component', function () {
    return _harness.default.testCreate(_Checkbox.default, _fixtures.comp1).then(function (component) {
      var inputs = _harness.default.testElements(component, 'input[type="checkbox"]', 1);

      for (var i = 0; i < inputs.length; i++) {
        (0, _powerAssert.default)(inputs[i].getAttribute('class').indexOf('form-check-input') !== -1, 'No form-check-input class');

        _powerAssert.default.equal(inputs[i].name, "data[".concat(_fixtures.comp1.key, "]"));
      }

      _harness.default.testElements(component, 'span', 1);
    });
  });
  it('Span should have correct text label', function () {
    return _harness.default.testCreate(_Checkbox.default, _fixtures.comp1).then(function (component) {
      var checkboxes = component.element.querySelectorAll('input[ref="input"]');

      _powerAssert.default.equal(checkboxes.length, 1);

      var componentClass = checkboxes[0].getAttribute('class');
      (0, _powerAssert.default)(componentClass.indexOf('form-check-input') !== -1, 'No form-check-input class.');
      var labels = component.element.querySelectorAll('label');

      _powerAssert.default.equal(labels.length, 1);

      (0, _powerAssert.default)(labels[0].getAttribute('class').indexOf('form-check-label') !== -1, 'No form-check-label class');
      var spans = labels[0].querySelectorAll('span');

      _powerAssert.default.equal(spans.length, 1);

      _powerAssert.default.equal(spans[0].innerHTML, 'Check me');
    });
  });
  it('Should be able to set and get data', function () {
    return _harness.default.testCreate(_Checkbox.default, _fixtures.comp1).then(function (component) {
      _harness.default.testSetGet(component, 1);

      _harness.default.testSetGet(component, 0);
    });
  });
});