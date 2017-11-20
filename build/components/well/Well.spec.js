'use strict';

var _Well = require('./Well');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Well Component', function () {
  it('Should build a Well component', function (done) {
    _harness.Harness.testCreate(_Well.WellComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });
});