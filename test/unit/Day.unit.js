import { Formio } from '../../src/Formio';
import assert from 'power-assert';
import Harness from '../harness';
import DayComponent from '../../src/components/day/Day';
import PanelComponent from '../../src/components/panel/Panel';
import {
  comp1,
  comp2,
  comp3,
  comp4,
  comp5,
  comp6,
  comp7,
  comp8
} from './fixtures/day';

describe('Day Component', function() {
  it('Should build a day component', function() {
    return Harness.testCreate(DayComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="number"]', 2);
      Harness.testElements(component, 'select', 1);
    });
  });

  it('Should handle blank data correctly', function(done) {
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue();
      assert.equal(component.getValue(), '');
      component.checkValidity();
      assert.equal(component.errors.length, 0, 'Component should be valid with blank data');

      done();
    });
  });

  it('Should not show error when form loaded with defaultValue = "00/00/0000"', function(done) {
      Formio.createForm(document.createElement('div'), comp5, {}).then((form) => {
        const dayComponent = form.getComponent('day');
        assert.equal(dayComponent.visibleErrors.length, 0);
        assert.equal(form.data.day, '');
        const buttonComponent = form.getComponent('submit');
        buttonComponent.refs.button.click();
        setTimeout(()=>{
          assert.equal(dayComponent.visibleErrors.length, 1);
          assert.equal(dayComponent.visibleErrors[0].message, 'Day is required');
          done();
        },200);
      });
  });

  it('Should change the max day when the month changes', function(done) {
    Harness.testCreate(DayComponent, comp1).then((component) => {
      Harness.testElements(component, 'option', 13);
      assert(!!component.refs.year, 'There should be a year');
      // Set the year to a non-leap year.
      component.refs.year.value = 2017;
      component.setSelectValue(component.refs.month, '1');
      component.refs.month.dispatchEvent(new Event('input'));
      assert.equal(component.refs.day.max, '31');

      component.setSelectValue(component.refs.month, '2');
      component.refs.month.dispatchEvent(new Event('input'));
      assert.equal(component.refs.day.max, '28');

      component.setSelectValue(component.refs.month, '3');
      component.refs.month.dispatchEvent(new Event('input'));
      assert.equal(component.refs.day.max, '31');

      component.setSelectValue(component.refs.month, '4');
      component.refs.month.dispatchEvent(new Event('input'));
      assert.equal(component.refs.day.max, '30');

      // Set to a leap year.
      component.refs.year.value = 2020;
      component.setSelectValue(component.refs.month, '1');
      component.refs.month.dispatchEvent(new Event('input'));
      assert.equal(component.refs.day.max, '31');

      component.setSelectValue(component.refs.month, '2');
      component.refs.month.dispatchEvent(new Event('input'));
      assert.equal(component.refs.day.max, '29');

      component.setSelectValue(component.refs.month, '3');
      component.refs.month.dispatchEvent(new Event('input'));
      assert.equal(component.refs.day.max, '31');

      component.setSelectValue(component.refs.month, '4');
      component.refs.month.dispatchEvent(new Event('input'));
      assert.equal(component.refs.day.max, '30');

      done();
    });
  });

  it('Should put the month select first', function(done) {
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

  it('Should put the day select first on configuration', function(done) {
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

  it('Should not allow invalid days', function(done) {
    comp1.dayFirst = false;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('3/40/2017');
      component.checkValidity();
      assert.equal(component.errors.length, 1);
      assert.equal(component.errors[0].message, 'Date is not a valid day.');
      assert.equal(component.errors[0].component.key, 'date');
      done();
    });
  });

  it('Should ignore invalid months and use zeros as default', function(done) {
    comp1.dayFirst = false;

    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('15/20/2017');
      assert.equal(component.getValue(), '00/20/2017');
      done();
    });
  });

  it('Should keep day value when switching months', function(done) {
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('01/05/2018');
      assert.equal(component.getValue(), '01/05/2018');
      component.refs.month.value = 2;
      component.refs.month.dispatchEvent(new Event('input'));
      setTimeout(() => {
        assert.equal(component.getValue(), '02/05/2018');
        done();
      }, 10);
    });
  });

  it('Should adjust day value when day is great then maxDay of month', function(done) {
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('01/31/2018');
      assert.equal(component.getValue(), '01/31/2018');
      component.refs.month.value = 2;
      component.refs.month.dispatchEvent(new Event('input'));
      setTimeout(() => {
        assert.equal(component.getValue(), '02/28/2018');
        done();
      }, 10);
    });
  });

  it('Should validate required fields', function(done) {
    Harness.testCreate(DayComponent, comp2).then((component) => {
      component.pristine = false;
      const valid = () => component.checkValidity(component.data, true);
      const tests = {
        '12/18/2018': true,
        '12/00/0000': false,
        '00/18/0000': false,
        '00/00/2018': false,
        '01/05/2018': true,
      };

      for (const v in tests) {
        component.setValue(v);
        assert.equal(valid(), tests[v]);
      }

      done();
    });
  });

  it('Should properly validate min-max dates when dayFirst is checked', function(done) {
    Harness.testCreate(DayComponent, comp3).then((component) => {
      component.setValue('01/02/2020');
      assert(!component.checkValidity(component.data, true), 'Component should not be valid');

      component.setValue('04/01/2021');
      assert(!component.checkValidity(component.data, true), 'Component should not be valid');

      component.setValue('03/01/2021');
      assert(component.checkValidity(component.data, true), 'Component should be valid');

      component.setValue('01/03/2020');
      assert(component.checkValidity(component.data, true), 'Component should be valid');
      done();
    });
  });

  it('Should disable day component if parent component is disabled', function(done) {
    Harness.testCreate(PanelComponent, comp4).then((component) => {
      Harness.testElements(component, '[disabled]', 4);
      done();
    });
  });

  it('Should set value if the day field is hidden', function(done) {
    comp1.dayFirst = false;
    comp1.fields.day.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('12/2023');
      assert.equal(component.data.date, '12/2023');
      done();
    });
    comp1.fields.day.hide = false;
  });

  it('Should set value if the month field is hidden', function(done) {
    comp1.fields.month.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('12/2023');
      assert.equal(component.data.date, '12/2023');
      done();
    });
    comp1.fields.month.hide = false;
  });

  it('Should set value if the year field is hidden', function(done) {
    comp1.fields.year.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('12/21');
      assert.equal(component.data.date, '12/21');
      done();
    });
    comp1.fields.year.hide = false;
  });


  it('Should use the default day value if the day field is hidden', function(done) {
    comp1.dayFirst = false;
    comp1.defaultValue = '00/01/0000';
    comp1.fields.day.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('12/2023');
      assert.equal(component.data.date, '12/01/2023');
      done();
    });
    comp1.fields.day.hide = false;
  });

  it('Should use the default month value if the month field is hidden', function(done) {
    comp1.defaultValue = '03/00/0000';
    comp1.fields.month.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('12/2023');
      assert.equal(component.data.date, '03/12/2023');
      done();
    });
    comp1.fields.month.hide = false;
  });

  it('Should use the default year value if the year field is hidden', function(done) {
    comp1.defaultValue = '00/00/2023';
    comp1.fields.year.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('12/21');
      assert.equal(component.data.date, '12/21/2023');
      done();
    });
    comp1.fields.year.hide = false;
  });

  it('Should set correct default value if the day field is hidden', function(done) {
    comp1.dayFirst = false;
    comp1.defaultValue = '08/2019';
    comp1.fields.day.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.checkValidity();
      assert.equal(component.data.date, '08/2019');
      assert.equal(component.errors.length, 0);
      done();
    });
    comp1.fields.day.hide = false;
  });

  it('Should set correct default value if the month field is hidden', function(done) {
    comp1.defaultValue = '24/2024';
    comp1.fields.month.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.checkValidity();
      assert.equal(component.data.date, '24/2024');
      assert.equal(component.errors.length, 0);
      done();
    });
    comp1.fields.month.hide = false;
  });

  it('Should set correct default value if the year field is hidden', function(done) {
    comp1.defaultValue = '07/24';
    comp1.fields.year.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.checkValidity();
      assert.equal(component.data.date, '07/24');
      assert.equal(component.errors.length, 0);
      done();
    });
    comp1.fields.year.hide = false;
  });

  it('Should set correct default value if the day and month fields are hidden', function(done) {
    comp1.defaultValue = '2024';
    comp1.fields.day.hide = true;
    comp1.fields.month.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      assert.equal(component.data.date, '2024');
      done();
    }).catch(done);
    comp1.fields.day.hide = false;
    comp1.fields.month.hide = false;
    delete comp1.defaultValue;
  });

  it('Should return correct data value as a string if the day field is hidden', function(done) {
    comp1.dayFirst = false;
    comp1.fields.day.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      assert.equal(component.getValueAsString('03/2022'), '03/2022');
      done();
    }).catch(done);
    comp1.fields.day.hide = false;
  });

  it('Should return correct data value as a string if the month field is hidden', function(done) {
    comp1.fields.month.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      assert.equal(component.getValueAsString('24/2023'), '24/2023');
      done();
    }).catch(done);
    comp1.fields.month.hide = false;
  });

  it('Should return correct data value as a string if the month and year fields are hidden', function(done) {
    comp1.fields.year.hide = true;
    comp1.fields.month.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      assert.equal(component.getValueAsString('24'), '24');
      done();
    }).catch(done);
    comp1.fields.year.hide = false;
    comp1.fields.month.hide = false;
  });

  it('OnBlur validation should work properly with Day component', function(done) {
    const element = document.createElement('div');

    Formio.createForm(element, comp5).then(form => {
      const dayComponent = form.components[0];
      dayComponent.setValue('03/12/2023');

      setTimeout(() => {
        dayComponent.refs.day.focus();
        dayComponent.refs.day.value = '';
        dayComponent.refs.day.dispatchEvent(new Event('input'));

        setTimeout(() => {
          assert(dayComponent._errors.length && dayComponent._errors[0].message === 'Day is required', 'Day should be valid while changing');
          dayComponent.refs.day.dispatchEvent(new Event('blur'));

          setTimeout(() => {
            assert(dayComponent._errors.length && dayComponent._errors[0].message === 'Day is required', 'Should set error after Day component was blurred');
            done();
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should restore focus after redraw', function(done) {
    const element = document.createElement('div');
    document.body.appendChild(element);
    Formio.createForm(element, comp6).then(form => {
      const textField = form.getComponent(['textField']);
      textField.setValue('test');

      setTimeout(() => {
        const day = form.getComponent(['day']);
        document.querySelector('select.form-control').focus();
          day.refs.month.value = 2;
          day.refs.month.dispatchEvent(new Event('input'));

          setTimeout(() => {
            console.log(global.document.activeElement, day.refs.month);
            assert(global.document.activeElement === day.refs.month, 'Should keep focus on the year select');
            done();
          }, 200);
      }, 500);
    }).catch(done);
  });

  it('Should translate placeholder text', function() {
    const element = document.createElement('div');
    return Formio.createForm(element, comp7, {
      language: 'sp',
      i18n: {
        sp: {
          Day: "Day1",
          Month: "Month2",
          Year: "Year3"
        }
      }
    }).then((form) => {
      const dayComponent = form.getComponent('day');
      assert.equal(dayComponent.refs.day.placeholder, 'Day1');
      assert.equal(dayComponent.refs.month.placeholder, 'Month2');
      assert.equal(dayComponent.refs.year.placeholder, 'Year3');
    })
  });

  it('Should translate requiredDayEmpty to {{ field }} is required', function(done) {
    Formio.createForm(document.createElement('div'), comp8, {}).then((form) => {
      const dayComponent = form.getComponent('dayTable');
      const buttonComponent = form.getComponent('submit');
      buttonComponent.refs.button.click();
      setTimeout(()=>{
        assert.equal(dayComponent.errors[0].message, 'Day - Table is required');
        done();
      },200);
    }).catch(done);
  });

  it('Should save empty value after deleting the values', function(done) {
    delete comp1.defaultValue;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('10/12/2024');
      assert.equal(component.getValue(), '10/12/2024');
      component.refs.month.value = '';
      component.refs.month.dispatchEvent(new Event('input'));
      component.refs.day.value = '';
      component.refs.day.dispatchEvent(new Event('input'));
      component.refs.year.value = '';
      component.refs.year.dispatchEvent(new Event('input'));
      setTimeout(() => {
        assert.equal(component.getValue(), '');
        done();
      }, 100);
    }).catch(done);
  });

  it('Should save empty value after deleting the values if the day field is hidden', function(done) {
    comp1.fields.day.hide = true;
    Harness.testCreate(DayComponent, comp1).then((component) => {
      component.setValue('10/2024');
      assert.equal(component.getValue(), '10/2024');
      component.refs.month.value = '';
      component.refs.month.dispatchEvent(new Event('input'));
      component.refs.year.value = '';
      component.refs.year.dispatchEvent(new Event('input'));
      setTimeout(() => {
        assert.equal(component.getValue(), '');
        done();
      }, 100);
    }).catch(done);
    comp1.fields.day.hide = false;
  });

  it('Should save empty value after deleting values from fields if default value is set', function(done) {
    comp1.defaultValue = '10/12/2024';
    Harness.testCreate(DayComponent, comp1).then((component) => {
      assert.equal(component.getValue(), '10/12/2024');
      component.refs.month.value = '';
      component.refs.month.dispatchEvent(new Event('input'));
      component.refs.day.value = '';
      component.refs.day.dispatchEvent(new Event('input'));
      component.refs.year.value = '';
      component.refs.year.dispatchEvent(new Event('input'));
      setTimeout(() => {
        assert.equal(component.getValue(), '');
        done();
      }, 100);
    }).catch(done);
    delete comp1.defaultValue;
  });

  it('Should return correct values from getValueAsString without using default value', function(done) {
    comp1.defaultValue = '10/12/2024';
    Harness.testCreate(DayComponent, comp1)
      .then((component) => {
        assert.equal(component.getValue(), '10/12/2024');
        assert.equal(component.getValueAsString('11/12/2024'), '11/12/2024');
        assert.equal(component.getValueAsString(''), '');
        assert.equal(component.getValueAsString(null), '');
        assert.equal(component.getValueAsString(), '');
        done();
      })
      .catch(done);
    delete comp1.defaultValue;
  });
});
