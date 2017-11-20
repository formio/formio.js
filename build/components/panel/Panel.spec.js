'use strict';

var _Panel = require('./Panel');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Panel Component', function () {
  it('Should build a panel component', function (done) {
    _harness.Harness.testCreate(_Panel.PanelComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });
});