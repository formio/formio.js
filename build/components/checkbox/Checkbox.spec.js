'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _Checkbox = require('./Checkbox');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Checkbox Component', function () {
  it('Should build a checkbox component', function (done) {
    _harness.Harness.testCreate(_Checkbox.CheckBoxComponent, _index.components.comp1).then(function (component) {
      var inputs = _harness.Harness.testElements(component, 'input[type="checkbox"]', 1);
      for (var i = 0; i < inputs.length; i++) {
        (0, _powerAssert2.default)(inputs[i].getAttribute('class').indexOf('form-check-input') !== -1, 'No form-check-input class');
        _powerAssert2.default.equal(inputs[i].name, 'data[' + _index.components.comp1.key + ']');
      }
      _harness.Harness.testElements(component, 'span', 1);
      done();
    });
  });

  it('Span should have correct text label', function (done) {
    _harness.Harness.testCreate(_Checkbox.CheckBoxComponent, _index.components.comp1).then(function (component) {
      var componentClass = component.element.getAttribute('class');
      (0, _powerAssert2.default)(componentClass.indexOf('form-check') !== -1, 'No form-check class.');
      var labels = component.element.querySelectorAll('label');
      _powerAssert2.default.equal(labels.length, 1);
      (0, _powerAssert2.default)(labels[0].getAttribute('class').indexOf('form-check-label') !== -1, 'No form-check-label class');
      var spans = labels[0].querySelectorAll('span');
      _powerAssert2.default.equal(spans.length, 1);
      _powerAssert2.default.equal(spans[0].innerHTML, 'Check me');
      done();
    });
  });

  it('Should be able to set and get data', function (done) {
    _harness.Harness.testCreate(_Checkbox.CheckBoxComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testSetGet(component, 1);
      _harness.Harness.testSetGet(component, 0);
      done();
    });
  });
});