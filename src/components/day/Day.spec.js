import assert from 'power-assert';

import Harness from '../../../test/harness';
import DayComponent from './Day';

import {
  comp1
} from './fixtures';

describe('Day Component', () => {
  it('Should build a day component', () => {
    return Harness.testCreate(DayComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="number"]', 2);
      Harness.testElements(component, 'select', 1);
    });
  });

  // it('Should change the max day when the month changes', () => {
  //   return Harness.testCreate(DayComponent, comp1).then((component) => {
  //     Harness.testElements(component, 'option', 13);
  //     assert(!!component.refs.year, 'There should be a year');
  //     // Set the year to a non-leap year.
  //     component.refs.year.value = 2017;
  //     console.log('setmonth');
  //     component.setSelectValue(component.refs.month, '1');
  //     assert.equal(component.refs.day.max, '31');
  //     component.setSelectValue(component.refs.month, '2');
  //     assert.equal(component.refs.day.max, '28');
  //     component.setSelectValue(component.refs.month, '3');
  //     assert.equal(component.refs.day.max, '31');
  //     component.setSelectValue(component.refs.month, '4');
  //     assert.equal(component.refs.day.max, '30');
  //
  //     // Set to a leap year.
  //     component.refs.year.value = 2020;
  //     component.setSelectValue(component.refs.month, '1');
  //     assert.equal(component.refs.day.max, '31');
  //     component.setSelectValue(component.refs.month, '2');
  //     assert.equal(component.refs.day.max, '29');
  //     component.setSelectValue(component.refs.month, '3');
  //     assert.equal(component.refs.day.max, '31');
  //     component.setSelectValue(component.refs.month, '4');
  //     assert.equal(component.refs.day.max, '30');
  //   });
  // });
  //
  // it('Should put the month select first', () => {
  //   return Harness.testCreate(DayComponent, comp1).then((component) => {
  //     const inputs = Harness.testElements(component, '.form-control', 4);
  //     assert.equal(inputs[0].id, `${component.component.key}-month`);
  //     assert.equal(inputs[1].id, `${component.component.key}-day`);
  //     assert.equal(inputs[2].id, `${component.component.key}-year`);
  //     component.setValue('3/20/2017');
  //     assert.equal(component.getValue(), '3/20/2017');
  //   });
  // });
  //
  // it('Should put the day select first on configuration', () => {
  //   comp1.dayFirst = true;
  //   return Harness.testCreate(DayComponent, comp1).then((component) => {
  //     const inputs = Harness.testElements(component, '.form-control', 4);
  //     assert.equal(inputs[0].id, `${component.component.key}-day`);
  //     assert.equal(inputs[1].id, `${component.component.key}-month`);
  //     assert.equal(inputs[2].id, `${component.component.key}-year`);
  //     component.setValue('20/3/2017');
  //     assert.equal(component.getValue(), '20/3/2017');
  //   });
  // });
  //
  // it('Should not allow invalid days', (done) => {
  //   comp1.dayFirst = false;
  //   Harness.testCreate(DayComponent, comp1).then((component) => {
  //     component.on('componentError', (err) => {
  //       assert.equal(err.message, 'Date is not a valid date.');
  //       assert.equal(err.component.key, 'date');
  //       done();
  //     });
  //
  //     component.on('componentChange', () => {
  //       component.checkValidity();
  //     });
  //
  //     component.setValue('3/40/2017');
  //   });
  // });
  //
  // it('Should not allow invalid months', (done) => {
  //   Harness.testCreate(DayComponent, comp1).then((component) => {
  //     component.on('componentError', (err) => {
  //       assert.equal(err.message, 'Date is not a valid date.');
  //       assert.equal(err.component.key, 'date');
  //       done();
  //     });
  //
  //     component.on('componentChange', () => {
  //       component.checkValidity();
  //     });
  //
  //     component.setValue('15/20/2017');
  //   });
  // });
});
