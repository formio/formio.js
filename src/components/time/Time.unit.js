import Harness from '../../../test/harness';
import assert from 'power-assert';
import TimeComponent from './Time';
import {
  comp1,
  comp2,
  comp3,
  comp4,
  timeForm2,
  timeForm,
} from './fixtures';
import Webform from '../../Webform';

describe('Time Component', () => {
  it('Should build a time component', () => {
    return Harness.testCreate(TimeComponent, comp1);
  });

  it('Should format value on blur', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    form.setForm(timeForm).then(() => {
      const component = form.components[0];
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      const blurEvent = new Event('blur');
      const timeInput = component.element.querySelector('input[name="data[time]"]');

      timeInput.value = '10:0_ __';
      timeInput.dispatchEvent(inputEvent);

      setTimeout(() => {
        assert.equal(timeInput.value, '10:0_ __');
        assert.equal(component.dataValue, '10:00:00');
        timeInput.dispatchEvent(blurEvent);

        setTimeout(() => {
          assert.equal(timeInput.value, '10:00 AM');
          done();
        }, 500);
      }, 250);
    })
      .catch(done);
  });

  it('Should not show error if value corresponds to the mask', (done) => {
    Harness.testCreate(TimeComponent, comp2).then((component) => {
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      const timeInput = component.element.querySelector('input[name="data[time]"]');
      timeInput.value = '12:0_';
      timeInput.dispatchEvent(inputEvent);

      setTimeout(() => {
        component.setValue('12:00');
        setTimeout(() => {
          assert.equal(component.errors.length, 0);
          done();
        }, 700);
      }, 500);
    });
  });

  it('Should be invalid if time is not real', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    form.setForm(timeForm2).then(() => {
      const component = form.components[0];
      Harness.setInputValue(component, 'data[time]', '89:19');
      setTimeout(() => {
        assert.equal(component.errors[0].message, 'Invalid time', 'Should have an error');
        done();
      }, 650);
    }).catch(done);
  });

  it('Should return error if data in multiple time component is not valid', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    form.setForm(timeForm2).then(() => {
      const component = form.components[1];
      Harness.setInputValue(component, 'data[multipleTime]', ['89:19']);
      setTimeout(() => {
        assert.equal(component.errors[0].message, 'Invalid time', 'Should have an error');
        done();
      }, 650);
    }).catch(done);
  });

  it('Should not return error if data in multiple time component is not valid', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    form.setForm(timeForm2).then(() => {
      const component = form.components[1];
      Harness.setInputValue(component, 'data[multipleTime]', ['10:00:00']);
      setTimeout(() => {
        assert.equal(component.errors.length, 0, 'Should not have an error');
        done();
      }, 650);
    }).catch(done);
  });

  it('Should build a time component', (done) => {
    Harness.testCreate(TimeComponent, comp3).then((time) => {
      assert.deepEqual(time.dataValue, ['10:00:00', '11:00:00'], 'Should be set to default value');
      done();
    }).catch(done);
  });

  it('Should not display error when embedded in a wizard form', () => {
    return Formio.createForm(document.createElement('div'), comp4, {}).then((form) => {
      const timeComponent = form.getComponent('time1');
      assert.equal(timeComponent._errors.length, 0);
      assert.equal(timeComponent.rawData, '03:03');
    });
  });
});
