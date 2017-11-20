'use strict';

var _Columns = require('./Columns');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Columns Component', function () {
  it('Should build a columns component', function (done) {
    _harness.Harness.testCreate(_Columns.ColumnsComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });
});