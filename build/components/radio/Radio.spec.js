'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _Radio = require('./Radio');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Radio Component', function () {
  it('Should build a radio component', function (done) {
    _harness.Harness.testCreate(_Radio.RadioComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="radio"]', 4);
      _harness.Harness.testElements(component, 'span', 4);
      done();
    });
  });

  it('Span should have correct text label', function (done) {
    _harness.Harness.testCreate(_Radio.RadioComponent, _index.components.comp1).then(function (component) {
      var spans = component.element.querySelectorAll('span');
      _powerAssert2.default.equal(spans[0].innerHTML, 'Red');
      _powerAssert2.default.equal(spans[1].innerHTML, 'Green');
      _powerAssert2.default.equal(spans[2].innerHTML, 'Blue');
      _powerAssert2.default.equal(spans[3].innerHTML, 'Yellow');
      done();
    });
  });
});