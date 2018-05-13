'use strict';
import DayComponent from './Day';
import {components as comps} from './fixtures/index';
import Harness from '../../../test/harness';
import assert from 'power-assert';
import _each from 'lodash/each';
describe('Day Component', () => {
  it('Should build a day component', (done) => {
    Harness.testCreate(DayComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="number"]', 2);
      Harness.testElements(component, 'select', 1);
      done();
    });
  });

  it('Should change the max day when the month changes', (done) => {
    Harness.testCreate(DayComponent, comps.comp1).then((component) => {
      const months = Harness.testElements(component, 'option', 13);
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
    Harness.testCreate(DayComponent, comps.comp1).then((component) => {
      const inputs = Harness.testElements(component, '.form-control', 4);
      assert.equal(inputs[0].id, `${component.component.key}-month`);
      assert.equal(inputs[1].id, `${component.component.key}-day`);
      assert.equal(inputs[2].id, `${component.component.key}-year`);
      component.setValue('3/20/2017');
      assert.equal(component.getValue(), '3/20/2017');
      done();
    });
  });

  it('Should put the day select first on configuration', (done) => {
    comps.comp1.dayFirst = true;
    Harness.testCreate(DayComponent, comps.comp1).then((component) => {
      const inputs = Harness.testElements(component, '.form-control', 4);
      assert.equal(inputs[0].id, `${component.component.key}-day`);
      assert.equal(inputs[1].id, `${component.component.key}-month`);
      assert.equal(inputs[2].id, `${component.component.key}-year`);
      component.setValue('20/3/2017');
      assert.equal(component.getValue(), '20/3/2017');
      done();
    });
  });

  it('Should not allow invalid days', (done) => {
    comps.comp1.dayFirst = false;
    Harness.testCreate(DayComponent, comps.comp1).then((component) => {
      component.on('componentError', (err) => {
        assert.equal(err.message, 'Date is not a valid date.');
        assert.equal(err.component.key, 'date');
        done();
      });

      component.on('componentChange', () => {
        component.checkValidity();
      });

      component.setValue('3/40/2017');
    });
  });

  it('Should not allow invalid months', (done) => {
    Harness.testCreate(DayComponent, comps.comp1).then((component) => {
      component.on('componentError', (err) => {
        assert.equal(err.message, 'Date is not a valid date.');
        assert.equal(err.component.key, 'date');
        done();
      });

      component.on('componentChange', () => {
        component.checkValidity();
      });

      component.setValue('15/20/2017');
    });
  });
});
