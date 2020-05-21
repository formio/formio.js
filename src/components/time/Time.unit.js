import Harness from '../../../test/harness';
import assert from 'power-assert';
import TimeComponent from './Time';

import {
  comp1,
  comp2
} from './fixtures';

describe('Time Component', () => {
  it('Should build a time component', () => {
    return Harness.testCreate(TimeComponent, comp1);
  });

  it('Should show error if value does not correspond to the mask', (done) => {
    Harness.testCreate(TimeComponent, comp2).then((component) => {
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      const timeInput = component.element.querySelector('input[name="data[time]"]');

      timeInput.value = '12:0_';
      timeInput.dispatchEvent(inputEvent);

      setTimeout(() => {
        component.checkData(component.data);

        setTimeout(() => {
          assert.equal(component.errors.length, 1);
          done();
        }, 700);
      }, 500);
    });
  });

  it('Should not show error if value corresponds to the mask', (done) => {
    Harness.testCreate(TimeComponent, comp2).then((component) => {
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      const timeInput = component.element.querySelector('input[name="data[time]"]');
      timeInput.value = '12:0_';
      timeInput.dispatchEvent(inputEvent);

      setTimeout(() => {
        timeInput.value = '12:00';
        timeInput.dispatchEvent(inputEvent);

        setTimeout(() => {
          component.checkData(component.data);

          setTimeout(() => {
            assert.equal(component.errors.length, 0);
            done();
          }, 700);
        }, 600);
      }, 500);
    });
  });
});
