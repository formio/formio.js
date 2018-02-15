'use strict';

var _SelectBoxes = require('./SelectBoxes');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('SelectBoxes Component', function () {
  it('Should build a SelectBoxes component', function (done) {
    _harness.Harness.testCreate(_SelectBoxes.SelectBoxesComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="checkbox"]', 8);
      done();
    });
  });

  it('Should build a required SelectBoxes component', function (done) {
    _harness.Harness.testCreate(_SelectBoxes.SelectBoxesComponent, _index.components.comp2).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="checkbox"]', 8);
      _harness.Harness.testElements(component, 'label.control-label > span', 8);
      _harness.Harness.testElements(component, 'label.control-label.field-required', 1);
      done();
    });
  });
});