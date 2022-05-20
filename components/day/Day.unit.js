"use strict";

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Day = _interopRequireDefault(require("./Day"));

var _fixtures = require("./fixtures");

var _Panel = _interopRequireDefault(require("../panel/Panel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Day Component', function () {
  it('Should build a day component', function () {
    return _harness.default.testCreate(_Day.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="number"]', 2);

      _harness.default.testElements(component, 'select', 1);
    });
  });
  it('Should change the max day when the month changes', function (done) {
    _harness.default.testCreate(_Day.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'option', 13);

      (0, _powerAssert.default)(!!component.refs.year, 'There should be a year'); // Set the year to a non-leap year.

      component.refs.year.value = 2017;
      component.setSelectValue(component.refs.month, '1');
      component.refs.month.dispatchEvent(new Event('input'));

      _powerAssert.default.equal(component.refs.day.max, '31');

      component.setSelectValue(component.refs.month, '2');
      component.refs.month.dispatchEvent(new Event('input'));

      _powerAssert.default.equal(component.refs.day.max, '28');

      component.setSelectValue(component.refs.month, '3');
      component.refs.month.dispatchEvent(new Event('input'));

      _powerAssert.default.equal(component.refs.day.max, '31');

      component.setSelectValue(component.refs.month, '4');
      component.refs.month.dispatchEvent(new Event('input'));

      _powerAssert.default.equal(component.refs.day.max, '30'); // Set to a leap year.


      component.refs.year.value = 2020;
      component.setSelectValue(component.refs.month, '1');
      component.refs.month.dispatchEvent(new Event('input'));

      _powerAssert.default.equal(component.refs.day.max, '31');

      component.setSelectValue(component.refs.month, '2');
      component.refs.month.dispatchEvent(new Event('input'));

      _powerAssert.default.equal(component.refs.day.max, '29');

      component.setSelectValue(component.refs.month, '3');
      component.refs.month.dispatchEvent(new Event('input'));

      _powerAssert.default.equal(component.refs.day.max, '31');

      component.setSelectValue(component.refs.month, '4');
      component.refs.month.dispatchEvent(new Event('input'));

      _powerAssert.default.equal(component.refs.day.max, '30');

      done();
    });
  });
  it('Should put the month select first', function (done) {
    _harness.default.testCreate(_Day.default, _fixtures.comp1).then(function (component) {
      var inputs = _harness.default.testElements(component, '.form-control', 4);

      _powerAssert.default.equal(inputs[0].id, "".concat(component.component.key, "-month"));

      _powerAssert.default.equal(inputs[1].id, "".concat(component.component.key, "-day"));

      _powerAssert.default.equal(inputs[2].id, "".concat(component.component.key, "-year"));

      component.setValue('03/20/2017');

      _powerAssert.default.equal(component.getValue(), '03/20/2017');

      done();
    });
  });
  it('Should put the day select first on configuration', function (done) {
    _fixtures.comp1.dayFirst = true;

    _harness.default.testCreate(_Day.default, _fixtures.comp1).then(function (component) {
      var inputs = _harness.default.testElements(component, '.form-control', 4);

      _powerAssert.default.equal(inputs[0].id, "".concat(component.component.key, "-day"));

      _powerAssert.default.equal(inputs[1].id, "".concat(component.component.key, "-month"));

      _powerAssert.default.equal(inputs[2].id, "".concat(component.component.key, "-year"));

      component.setValue('20/03/2017');

      _powerAssert.default.equal(component.getValue(), '20/03/2017');

      done();
    });
  });
  it('Should not allow invalid days', function (done) {
    _fixtures.comp1.dayFirst = false;

    _harness.default.testCreate(_Day.default, _fixtures.comp1).then(function (component) {
      component.on('componentError', function (err) {
        _powerAssert.default.equal(err.message, 'Date is not a valid day.');

        _powerAssert.default.equal(err.component.key, 'date');

        done();
      });
      component.on('componentChange', function () {
        component.checkValidity();
      });
      component.setValue('3/40/2017');
    });
  });
  it('Should ignore invalid months and use zeros as default', function (done) {
    _fixtures.comp1.dayFirst = false;

    _harness.default.testCreate(_Day.default, _fixtures.comp1).then(function (component) {
      component.setValue('15/20/2017');

      _powerAssert.default.equal(component.getValue(), '00/20/2017');

      done();
    });
  });
  it('Should keep day value when switching months', function (done) {
    _harness.default.testCreate(_Day.default, _fixtures.comp1).then(function (component) {
      component.setValue('01/05/2018');

      _powerAssert.default.equal(component.getValue(), '01/05/2018');

      component.on('componentChange', function () {
        _powerAssert.default.equal(component.getValue(), '02/05/2018');

        done();
      });
      component.refs.month.value = 2;
      component.refs.month.dispatchEvent(new Event('input'));
    });
  });
  it('Should adjust day value when day is great then maxDay of month', function (done) {
    _harness.default.testCreate(_Day.default, _fixtures.comp1).then(function (component) {
      component.setValue('01/31/2018');

      _powerAssert.default.equal(component.getValue(), '01/31/2018');

      component.on('componentChange', function () {
        _powerAssert.default.equal(component.getValue(), '02/28/2018');

        done();
      });
      component.refs.month.value = 2;
      component.refs.month.dispatchEvent(new Event('input'));
    });
  });
  it('Should validate required fields', function (done) {
    _harness.default.testCreate(_Day.default, _fixtures.comp2).then(function (component) {
      component.pristine = false;

      var valid = function valid() {
        return component.checkValidity(component.data, true);
      };

      var tests = {
        '12/18/2018': true,
        '12/00/0000': false,
        '00/18/0000': false,
        '00/00/2018': false,
        '01/05/2018': true
      };

      for (var v in tests) {
        component.setValue(v);

        _powerAssert.default.equal(valid(), tests[v]);
      }

      done();
    });
  });
  it('should normalize min-max dates on dayFirst', function () {
    _harness.default.testCreate(_Day.default, _fixtures.comp3).then(function (component) {
      _powerAssert.default.deepEqual(component.normalizeMinMaxDates(), ['04/02/2020', '09/02/2020']);
    });
  });
  it('Should disable day component if parent component is disabled', function (done) {
    _harness.default.testCreate(_Panel.default, _fixtures.comp4).then(function (component) {
      _harness.default.testElements(component, '[disabled]', 4);

      done();
    });
  });
});