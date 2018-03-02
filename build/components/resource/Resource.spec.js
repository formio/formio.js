'use strict';

var _Resource = require('./Resource');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Resource Component', function () {
  it('Should build a resource component', function (done) {
    _harness.Harness.testCreate(_Resource.ResourceComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'select', 1);
      done();
    });
  });
});