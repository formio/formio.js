'use strict';

var _Table = require('./Table');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Table Component', function () {
  it('Should build a Table component', function (done) {
    _harness.Harness.testCreate(_Table.TableComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="text"]', 6);
      done();
    });
  });
});