"use strict";

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

var _lodash = _interopRequireDefault(require("lodash"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _chai = require("chai");

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _DataGrid = _interopRequireDefault(require("./DataGrid"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DataGrid Component', function () {
  it('Should not show alert message in modal edit and close modal window when clicking on modal overlay and value was not changed', function (done) {
    _harness.default.testCreate(_DataGrid.default, _fixtures.comp4).then(function (component) {
      var hiddenModalWindow = component.element.querySelector('.component-rendering-hidden');

      _powerAssert.default.equal(!!hiddenModalWindow, true);

      var clickEvent = new Event('click');
      var openModalElement = component.refs.openModal;
      openModalElement.dispatchEvent(clickEvent);
      setTimeout(function () {
        _powerAssert.default.equal(!!component.element.querySelector('.component-rendering-hidden'), false);

        var clickEvent = new Event('click');
        var modalOverlay = component.refs.modalOverlay;
        modalOverlay.dispatchEvent(clickEvent);
        setTimeout(function () {
          var dialogWindowHeader = document.querySelector('[ref="dialogHeader"]'); //checking if there is dialog window

          _powerAssert.default.equal(!!dialogWindowHeader, false);

          var hiddenModalWindow = component.element.querySelector('.component-rendering-hidden'); //checking if the modal window was closed

          _powerAssert.default.equal(!!hiddenModalWindow, true);

          done();
        }, 300);
      }, 200);
    });
  });
  it("Should show alert message in modal edit, when clicking on modal overlay and value was changed, \n    and clear values when pushing 'yes, delete it' in alert container", function (done) {
    _harness.default.testCreate(_DataGrid.default, _fixtures.comp4).then(function (component) {
      var hiddenModalWindow = component.element.querySelector('.component-rendering-hidden');

      _powerAssert.default.equal(!!hiddenModalWindow, true);

      var clickEvent = new Event('click');
      var openModalElement = component.refs.openModal; //open modal edit window

      openModalElement.dispatchEvent(clickEvent);
      setTimeout(function () {
        _powerAssert.default.equal(!!component.element.querySelector('.component-rendering-hidden'), false);

        var inputEvent = new Event('input');
        var dataGridInputField = component.element.querySelector('[name="data[dataGrid][0][number]"]');
        dataGridInputField.value = 55555; //input value in dataGrid field inside modal edit window

        dataGridInputField.dispatchEvent(inputEvent);
        setTimeout(function () {
          _powerAssert.default.equal(component.element.querySelector('[name="data[dataGrid][0][number]"]').value, '55555');

          var clickEvent = new Event('click');
          var modalOverlay = component.refs.modalOverlay; //click outside modal edit window

          modalOverlay.dispatchEvent(clickEvent);
          setTimeout(function () {
            var dialogWindowHeader = document.querySelector('[ref="dialogHeader"]');

            _powerAssert.default.equal(!!dialogWindowHeader, true);

            var clickEvent = new Event('click');
            var btnForCleaningValues = document.querySelector('[ref="dialogYesButton"]'); //click on 'yes, delete it' button inside alert window

            btnForCleaningValues.dispatchEvent(clickEvent);
            setTimeout(function () {
              var clickEvent = new Event('click');
              var openModalElement = component.refs.openModal; //open edit modal window again

              openModalElement.dispatchEvent(clickEvent);
              setTimeout(function () {
                _powerAssert.default.equal(component.element.querySelector('[name="data[dataGrid][0][number]"]').value, '');

                done();
              }, 350);
            }, 300);
          }, 250);
        }, 200);
      }, 150);
    });
  });
  it('Should build a data grid component', function () {
    return _harness.default.testCreate(_DataGrid.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 3);
    });
  });
  it('Should not skip validation on input nested components', function (done) {
    _harness.default.testCreate(_DataGrid.default, _fixtures.comp1).then(function (cmp) {
      (0, _chai.expect)(cmp.shouldSkipValidation()).to.be.false;
      done();
    }, done).catch(done);
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
describe('Datagrid disabling', function () {
  it('Child components should be disabled', function () {
    return _harness.default.testCreate(_DataGrid.default, _fixtures.comp3).then(function (component) {
      _powerAssert.default.equal(component.components.reduce(function (acc, child) {
        return acc && child.parentDisabled;
      }, true), true);
    });
  });
});