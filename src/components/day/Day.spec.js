import assert from 'power-assert';

import Harness from '../../../test/harness';
import DayComponent from './Day';

import {
  comp1,
  comp2
} from './fixtures';

describe('Day Component', () => {
  it('Should build a day component', (done) => {
    Harness.testCreate(DayComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="number"]', 2);
      Harness.testElements(component, 'select', 1);
      done();
    });
  });

  it('Should change the max day when the month changes', (done) => {
    Harness.testCreate(DayComponent, comp1).then((component) => {
      Harness.testElements(component, 'option', 13);
      assert(!!component.yearInput, 'There should be a year');
      // Set the year to a non-leap year.
      component.yearInput.value = 2017;
      component.setSelectValue(component.monthInput, '1');
      assert.equal(component.dayInput.max, '31');
      component.setSelectValue(component.monthInput, '2');
      assert.equal(component.dayInput.max, '28');
      component.setSelectValue(component.monthInput, '3');
      assert.equal(component.dayInput.max, '31');
      component.setSelectValue(component.monthInput, '4');
      assert.equal(component.dayInput.max, '30');

      // Set to a leap year.
      component.yearInput.value = 2020;
      component.setSelectValue(component.monthInput, '1');
      assert.equal(component.dayInput.max, '31');
      component.setSelectValue(component.monthInput, '2');
      assert.equal(component.dayInput.max, '29');
      component.setSelectValue(component.monthInput, '3');
      assert.equal(component.dayInput.max, '31');
      component.setSelectValue(component.monthInput, '4');
      assert.equal(component.dayInput.max, '30');
      done();
    });
  });

  it('Should put the month select first', (done) => {
    Harness.testCreate(DayComponent, comp1).then((component) => {
      const inputs = Harness.testElements(component, '.form-control', 4);
      assert.equal(inputs[0].id, `${component.component.key}-month`);
      assert.equal(inputs[1].id, `${component.component.key}-day`);
      assert.equal(inputs[2].id, `${component.component.key}-year`);
      component.setValue('03/20/2017');
      assert.equal(component.getValue(), '03/20/2017');
      done();
    });
  });

  it('Should put the day select first on configuration', (done) => {
    comp1.dayFirst = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      const inputs = Harness.testElements(component, '.form-control', 4);
      assert.equal(inputs[0].id, `${component.component.key}-day`);
      assert.equal(inputs[1].id, `${component.component.key}-month`);
      assert.equal(inputs[2].id, `${component.component.key}-year`);
      component.setValue('20/03/2017');
      assert.equal(component.getValue(), '20/03/2017');
      done();
    });
  });

  it('Should not allow invalid days', (done) => {
    comp1.dayFirst = false;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.on('componentError', (err) => {
        assert.equal(err.message, 'Date is not a valid day.');
        assert.equal(err.component.key, 'date');
        done();
      });

      component.on('componentChange', () => {
        component.checkValidity(null, true);
      });

      component.setValue('3/40/2017');
    });
  });

  it('Should ignore invalid months and use zeros as default', (done) => {
    comp1.dayFirst = false;

    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('15/20/2017');
      assert.equal(component.getValue(), '00/20/2017');
      done();
    });
  });

  it('Should keep day value when switching months', (done) => {
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('01/05/2018');
      assert.equal(component.getValue(), '01/05/2018');
      component.on('componentChange', () => {
        assert.equal(component.getValue(), '02/05/2018');
        done();
      });
      component.monthInput.value = 2;
      component.monthInput.dispatchEvent(new Event('change'));
    });
  });

  it('Should adjust day value when day is great then maxDay of month', (done) => {
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('01/31/2018');
      assert.equal(component.getValue(), '01/31/2018');
      component.on('componentChange', () => {
        assert.equal(component.getValue(), '02/28/2018');
        done();
      });
      component.monthInput.value = 2;
      component.monthInput.dispatchEvent(new Event('change'));
    });
  });

  it('Should validate required fields', (done) => {
    Harness.testCreate(DayComponent, comp2).then((component) => {
      const valid = () => component.checkValidity(null, true);
      const tests = {
        '12/18/2018': true,
        '12/00/0000': false,
        '00/18/0000': false,
        '00/00/2018': false,
        '01/05/2018': true,
      };

      for (const v in tests) {
        component.setValue(v);
        console.log(valid(), tests[v]);
        assert.equal(valid(), tests[v]);
      }

      done();
    });
  });
});
