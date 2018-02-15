'use strict';

var _Day = require('./Day');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Day Component', function () {
  it('Should build a day component', function (done) {
    _harness.Harness.testCreate(_Day.DayComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="number"]', 2);
      _harness.Harness.testElements(component, 'select', 1);
      done();
    });
  });

  it('Should change the max day when the month changes', function (done) {
    _harness.Harness.testCreate(_Day.DayComponent, _index.components.comp1).then(function (component) {
      var months = _harness.Harness.testElements(component, 'option', 13);
      (0, _powerAssert2.default)(!!component.yearInput, 'There should be a year');
      // Set the year to a non-leap year.
      component.yearInput.value = 2017;
      component.setSelectValue(component.monthInput, '1');
      _powerAssert2.default.equal(component.dayInput.max, '31');
      component.setSelectValue(component.monthInput, '2');
      _powerAssert2.default.equal(component.dayInput.max, '28');
      component.setSelectValue(component.monthInput, '3');
      _powerAssert2.default.equal(component.dayInput.max, '31');
      component.setSelectValue(component.monthInput, '4');
      _powerAssert2.default.equal(component.dayInput.max, '30');

      // Set to a leap year.
      component.yearInput.value = 2020;
      component.setSelectValue(component.monthInput, '1');
      _powerAssert2.default.equal(component.dayInput.max, '31');
      component.setSelectValue(component.monthInput, '2');
      _powerAssert2.default.equal(component.dayInput.max, '29');
      component.setSelectValue(component.monthInput, '3');
      _powerAssert2.default.equal(component.dayInput.max, '31');
      component.setSelectValue(component.monthInput, '4');
      _powerAssert2.default.equal(component.dayInput.max, '30');
      done();
    });
  });

  it('Should put the month select first', function (done) {
    _harness.Harness.testCreate(_Day.DayComponent, _index.components.comp1).then(function (component) {
      var inputs = _harness.Harness.testElements(component, '.form-control', 4);
      _powerAssert2.default.equal(inputs[0].id, component.component.key + '-month');
      _powerAssert2.default.equal(inputs[1].id, component.component.key + '-day');
      _powerAssert2.default.equal(inputs[2].id, component.component.key + '-year');
      component.setValue('3/20/2017');
      _powerAssert2.default.equal(component.getValue(), '3/20/2017');
      done();
    });
  });

  it('Should put the day select first on configuration', function (done) {
    _index.components.comp1.dayFirst = true;
    _harness.Harness.testCreate(_Day.DayComponent, _index.components.comp1).then(function (component) {
      var inputs = _harness.Harness.testElements(component, '.form-control', 4);
      _powerAssert2.default.equal(inputs[0].id, component.component.key + '-day');
      _powerAssert2.default.equal(inputs[1].id, component.component.key + '-month');
      _powerAssert2.default.equal(inputs[2].id, component.component.key + '-year');
      component.setValue('20/3/2017');
      _powerAssert2.default.equal(component.getValue(), '20/3/2017');
      done();
    });
  });

  it('Should not allow invalid days', function (done) {
    _index.components.comp1.dayFirst = false;
    _harness.Harness.testCreate(_Day.DayComponent, _index.components.comp1).then(function (component) {
      component.on('componentError', function (err) {
        _powerAssert2.default.equal(err.message, 'Date is not a valid date.');
        _powerAssert2.default.equal(err.component.key, 'date');
        done();
      });

      component.on('componentChange', function () {
        component.checkValidity();
      });

      component.setValue('3/40/2017');
    });
  });

  it('Should not allow invalid months', function (done) {
    _harness.Harness.testCreate(_Day.DayComponent, _index.components.comp1).then(function (component) {
      component.on('componentError', function (err) {
        _powerAssert2.default.equal(err.message, 'Date is not a valid date.');
        _powerAssert2.default.equal(err.component.key, 'date');
        done();
      });

      component.on('componentChange', function () {
        component.checkValidity();
      });

      component.setValue('15/20/2017');
    });
  });
});