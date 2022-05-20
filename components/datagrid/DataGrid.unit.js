"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _DataGrid = _interopRequireDefault(require("./DataGrid"));

var _Formio = _interopRequireDefault(require("../../Formio"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('DataGrid Component', function () {
  it('Test modal edit confirmation dialog', function (done) {
    _harness.default.testCreate(_DataGrid.default, _fixtures.comp5).then(function (component) {
      component.componentModal.openModal();
      var fakeEvent = {
        preventDefault: function preventDefault() {}
      };
      component.componentModal.showDialogListener(fakeEvent);

      _powerAssert.default.equal(component.componentModal.isOpened, false, 'Should be closed without confirmation dialog since value was not changed');

      setTimeout(function () {
        component.componentModal.openModal();

        _harness.default.setInputValue(component, 'data[dataGrid][0][textField]', 'My Text');

        setTimeout(function () {
          component.componentModal.showDialogListener(fakeEvent);

          _powerAssert.default.equal(component.componentModal.isValueChanged(), true, 'Should return true since value was modified');

          _powerAssert.default.equal(component.componentModal.isOpened, true, 'Should stay opened and wait until user confirm closing without changes saving');

          (0, _powerAssert.default)(component.componentModal.dialog, 'Should open confirmation dialog');
          component.componentModal.closeDialog(fakeEvent);
          component.destroy();
          done();
        }, 100);
      }, 100);
    }).catch(done);
  });
  it("Should show alert message in modal edit, when clicking on modal overlay and value was changed,\n    and clear values when pushing 'yes, delete it' in alert container", function (done) {
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
            _powerAssert.default.equal(!!component.componentModal.dialog, true);

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
        model: '',
        year: ''
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
          name: '',
          age: ''
        }, {
          name: '',
          age: ''
        }]);
        done();
      }, done).catch(done);
    } catch (err) {
      done(err);
    }
  });
  it('Should not cause setValue loops when logic within hidden component is set', function (done) {
    _Formio.default.createForm(document.createElement('div'), _fixtures.withLogic).then(function (form) {
      var datagrid = form.getComponent('dataGrid');

      var spyFunc = _sinon.default.spy(datagrid, 'checkComponentConditions');

      var textField = form.getComponent('escalationId');
      var select = form.getComponent('teamName');
      textField.component.hidden = true;
      select.setValue('preRiskAnalysis', {
        modified: true
      });
      setTimeout(function () {
        (0, _chai.expect)(spyFunc.callCount).to.be.lessThan(4);
        done();
      }, 1500);
    });
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
  it('Test "components" property and their context', function (done) {
    var testComponentsData = function testComponentsData(components, expectedData) {
      components.forEach(function (comp) {
        return _powerAssert.default.deepEqual(comp.data, expectedData, 'Data of components inside DataGrid should be equal to row\'s data');
      });
    };

    _Formio.default.createForm(document.createElement('div'), _fixtures.withConditionalFieldsAndValidations).then(function (form) {
      var rootText = form.getComponent(['text']);
      rootText.setValue('Match', {
        modified: true
      });
      setTimeout(function () {
        var emptyRowData = {
          rootTest: '',
          rowTest: ''
        };
        var dataGrid = form.getComponent(['dataGrid']);

        _powerAssert.default.equal(dataGrid.components.length, 6, 'DataGrid.components should contain 6 components');

        testComponentsData(dataGrid.components, emptyRowData);
        var showTextFieldInsideDataGridRadio = form.getComponent(['radio']);
        showTextFieldInsideDataGridRadio.setValue('show', {
          modified: true
        });
        setTimeout(function () {
          var rowData1 = _objectSpread(_objectSpread({}, emptyRowData), {}, {
            radio1: ''
          });

          var dataGridRowRadio = form.getComponent(['dataGrid', 0, 'radio1']);

          _powerAssert.default.equal(dataGrid.components.length, 6, 'DataGrid.components should contain 6 components');

          testComponentsData(dataGrid.components, rowData1);

          _powerAssert.default.equal(dataGridRowRadio.visible, true, 'Radio inside DataGrid should become visible');

          dataGridRowRadio.setValue('dgShow', {
            modified: true
          });
          setTimeout(function () {
            var rowData2 = _objectSpread(_objectSpread({}, emptyRowData), {}, {
              radio1: 'dgShow',
              rowShowShowTextfieldWhenDataGridRadioHasShowValue: ''
            });

            var dataGridRowConditionalField = form.getComponent(['dataGrid', 0, 'rowShowShowTextfieldWhenDataGridRadioHasShowValue']);

            _powerAssert.default.equal(dataGrid.components.length, 6, 'DataGrid.components should contain 6 components');

            testComponentsData(dataGrid.components, rowData2);

            _powerAssert.default.equal(dataGridRowConditionalField.visible, true, 'Conditional field inside DataGrid should become visible');

            var rootTest = form.getComponent(['dataGrid', 0, 'rootTest']);
            var rowTest = form.getComponent(['dataGrid', 0, 'rowTest']);
            rootTest.setValue('Match', {
              modified: true
            });
            rowTest.setValue('Match', {
              modified: true
            });
            setTimeout(function () {
              var rowData3 = _objectSpread(_objectSpread({}, rowData2), {}, {
                rowTest: 'Match',
                rootTest: 'Match'
              });

              _powerAssert.default.equal(dataGrid.components.length, 6, 'DataGrid.components should contain 6 components');

              testComponentsData(dataGrid.components, rowData3);
              form.checkAsyncValidity(null, true).then(function (valid) {
                (0, _powerAssert.default)(valid, 'Form should be valid');
                done();
              }).catch(done);
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
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
describe('DataGrid disabling', function () {
  it('Child components should be disabled', function () {
    return _harness.default.testCreate(_DataGrid.default, _fixtures.comp3).then(function (component) {
      _powerAssert.default.equal(component.components.reduce(function (acc, child) {
        return acc && child.parentDisabled;
      }, true), true);
    });
  });
});
describe('DataGrid modal', function () {
  it('Should be highlighted in red when invalid', function (done) {
    var formElement = document.createElement('div');

    _Formio.default.createForm(formElement, {
      display: 'form',
      components: [_fixtures.modalWithRequiredFields]
    }).then(function (form) {
      var data = {
        dataGrid: [{
          textField: '',
          textArea: ''
        }]
      };
      form.checkValidity(data, true, data);
      setTimeout(function () {
        _harness.default.testModalWrapperErrorClasses(form);

        var validData = {
          dataGrid: [{
            textField: 'Some text',
            textArea: 'Mre text'
          }]
        };
        form.setSubmission({
          data: validData
        });
        setTimeout(function () {
          _harness.default.testModalWrapperErrorClasses(form, false);

          done();
        }, 200);
      }, 200);
    }).catch(done);
  });
});