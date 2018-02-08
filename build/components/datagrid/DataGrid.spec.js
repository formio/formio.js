'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _DataGrid = require('./DataGrid');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DataGrid Component', function () {
  it('Should build a data grid component', function (done) {
    _harness.Harness.testCreate(_DataGrid.DataGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="text"]', 3);
      done();
    });
  });

  it('Should get and set values within the grid.', function (done) {
    _harness.Harness.testCreate(_DataGrid.DataGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testSetGet(component, [{
        make: 'Jeep',
        model: 'Wrangler',
        year: 1997
      }, {
        make: 'Chevy',
        model: 'Tahoe',
        year: 2014
      }]);
      done();
    });
  });

  it('Should be able to add another row.', function (done) {
    _harness.Harness.testCreate(_DataGrid.DataGridComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testSetGet(component, [{
        make: 'Jeep',
        model: 'Wrangler',
        year: 1997
      }]);
      component.addValue();
      _powerAssert2.default.deepEqual(component.getValue(), [{
        make: 'Jeep',
        model: 'Wrangler',
        year: 1997
      }, {
        make: "",
        model: "",
        year: null
      }]);
      done();
    });
  });
});