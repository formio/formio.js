"use strict";

require("core-js/modules/es.object.assign");

var _lodash = _interopRequireDefault(require("lodash"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _chai = require("chai");

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _DataGrid = _interopRequireDefault(require("./DataGrid"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DataGrid Component', function () {
  it('Should build a data grid component', function () {
    return _harness.default.testCreate(_DataGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 3);
    });
  });
  it('Should get and set values within the grid.', function () {
    return _harness.default.testCreate(_DataGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testSetGet(component, [{
        make: 'Jeep',
        model: 'Wrangler',
        year: 1997
      }, {
        make: 'Chevy',
        model: 'Tahoe',
        year: 2014
      }]);
    });
  });
  it('Should be able to add another row.', function () {
    return _harness.default.testCreate(_DataGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testSetGet(component, [{
        make: 'Jeep',
        model: 'Wrangler',
        year: 1997
      }]);

      component.addRow();

      _powerAssert.default.deepEqual(component.getValue(), [{
        make: 'Jeep',
        model: 'Wrangler',
        year: 1997
      }, {
        make: '',
        model: ''
      }]);
    });
  });
  it('Should allow provide default value', function (done) {
    try {
      _harness.default.testCreate(_DataGrid.default, _fixtures.withDefValue).then(function (datagrid) {
        (0, _chai.expect)(datagrid.getValue()).to.deep.equal([{
          name: 'Alex',
          age: 1
        }, {
          name: 'Bob',
          age: 2
        }, {
          name: 'Conny',
          age: 3
        }]);
        done();
      }, done).catch(done);
    } catch (err) {
      done(err);
    }
  });
  it('Should allow provide default value in row-groups model', function (done) {
    try {
      _harness.default.testCreate(_DataGrid.default, _fixtures.withRowGroupsAndDefValue).then(function (datagrid) {
        (0, _chai.expect)(datagrid.getValue()).to.deep.equal([{
          name: 'Alex',
          age: 1
        }, {
          name: 'Bob',
          age: 2
        }, {
          name: 'Conny',
          age: 3
        }, {
          name: ''
        }, {
          name: ''
        }]);
        done();
      }, done).catch(done);
    } catch (err) {
      done(err);
    }
  });
  describe('get minLength', function () {
    it('should return minimal number of required rows', function () {
      var EIDV = 'Invalid default value';
      var EDFC = 'Differ from configured value';
      var EDFG = 'Differ from number of rows in groups';
      var base = {
        type: 'datagrid',
        key: 'testkey'
      };

      var schema = _lodash.default.cloneDeep(base);

      var datagrid = new _DataGrid.default(schema, {});
      (0, _chai.expect)(datagrid.minLength, EIDV).to.equal(0);
      schema = Object.assign(_lodash.default.cloneDeep(base), {
        validate: {
          minLength: 5
        }
      });
      datagrid = new _DataGrid.default(schema, {});
      (0, _chai.expect)(datagrid.minLength, EDFC).to.equal(5);
      schema = Object.assign(_lodash.default.cloneDeep(base), {
        enableRowGroups: true,
        rowGroups: [{
          label: 'H1',
          numberOfRows: 1
        }, {
          label: 'B2',
          numberOfRows: 3
        }, {
          label: 'C3',
          numberOfRows: 3
        }, {
          label: 'M4',
          numberOfRows: 2
        }]
      });
      datagrid = new _DataGrid.default(schema, {});
      (0, _chai.expect)(datagrid.minLength, EDFG).to.equal(9);
      schema = Object.assign(_lodash.default.cloneDeep(base), {
        validate: {
          minLength: 5
        },
        enableRowGroups: true,
        rowGroups: [{
          label: 'H1',
          numberOfRows: 1
        }, {
          label: 'B2',
          numberOfRows: 3
        }, {
          label: 'C3',
          numberOfRows: 3
        }, {
          label: 'M4',
          numberOfRows: 2
        }]
      });
      datagrid = new _DataGrid.default(schema, {});

      if (datagrid.minLength === 5) {
        _chai.expect.fail('Number of row should take precedence over config');
      } else {
        (0, _chai.expect)(datagrid.minLength, EDFG).to.equal(9);
      }
    });
  });
  describe('getGroupSizes', function () {
    it('should return array of numbers representing group sizes', function () {
      var getGroupSizes = _DataGrid.default.prototype.getGroupSizes;
      var self = {
        component: {}
      };
      (0, _chai.expect)(getGroupSizes.call(self)).to.deep.equal([]);
      self = {
        component: {
          rowGroups: [{
            numberOfRows: 1
          }]
        }
      };
      (0, _chai.expect)(getGroupSizes.call(self)).to.deep.equal([1]);
      self = {
        component: {
          rowGroups: [{
            numberOfRows: 1
          }, {
            numberOfRows: 2
          }]
        }
      };
      (0, _chai.expect)(getGroupSizes.call(self)).to.deep.equal([1, 2]);
      self = {
        component: {
          rowGroups: [{
            numberOfRows: 1
          }, {
            numberOfRows: 3
          }, {
            numberOfRows: 10
          }]
        }
      };
      (0, _chai.expect)(getGroupSizes.call(self)).to.deep.equal([1, 3, 10]);
    });
  });
});
describe('DataGrid Panels', function () {
  it('Should build a data grid component', function () {
    return _harness.default.testCreate(_DataGrid.default, _fixtures.comp2);
  });
  it('Should be able to set the values of one panel in the DataGrid.', function () {
    return _harness.default.testCreate(_DataGrid.default, _fixtures.comp2).then(function (component) {
      _harness.default.testSetGet(component, [{
        firstName: 'Joe',
        lastName: 'Smith'
      }]); // Now add a new row.


      component.addRow();

      _powerAssert.default.deepEqual(component.getValue(), [{
        firstName: 'Joe',
        lastName: 'Smith'
      }, {
        firstName: '',
        lastName: ''
      }]);
    });
  });
});