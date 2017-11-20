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
        _powerAssert2.default.equal(inputs[i].name, 'data[' + _index.components.comp1.key + ']');
      }
      _harness.Harness.testElements(component, 'span', 1);
      done();
    });
  });

  it('Span should have correct text label', function (done) {
    _harness.Harness.testCreate(_Checkbox.CheckBoxComponent, _index.components.comp1).then(function (component) {
      var spans = component.element.querySelectorAll('span');
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