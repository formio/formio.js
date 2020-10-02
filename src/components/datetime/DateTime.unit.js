import assert from 'power-assert';
import Harness from '../../../test/harness';
import DateTimeComponent from './DateTime';
import Webform from '../../Webform';
import Flatpickr from 'flatpickr';
import ShortcutButtonsPlugin from 'shortcut-buttons-flatpickr';

import {
  comp1,
  comp2,
  comp3,
} from './fixtures';

describe('DateTime Component', () => {
  it('Should build a date time component', () => {
    return Harness.testCreate(DateTimeComponent, comp1).then((dateTime) => dateTime.destroy());
  });

  it('Test formatting', (done) => {
    Harness.testCreate(DateTimeComponent, comp2).then((dateTime) => {
      const value = '2020-09-22T00:00:00';
      const formattedValue = '2020-09-22';
      const input = dateTime.element.querySelector('[ref="input"]');
      assert.equal(input.getAttribute('placeholder'), dateTime.component.format, 'Placeholder should be equal to the format');
      dateTime.setValue(value);
      setTimeout(() => {
        assert.equal(dateTime.getValueAsString(value), formattedValue, 'getValueAsString should return formatted value');
        dateTime.destroy();
        done();
      }, 250);
    }).catch(done);
  });

  it('Should format value', () => {
    comp2.format = 'yyyy-MM-dd hh:mm a';
    return Harness.testCreate(DateTimeComponent, comp2)
      .then((dateTime) => {
        assert.equal(dateTime.getValueAsString('2020-09-18T12:12:00'), '2020-09-18 12:12 PM');
        dateTime.destroy();
      });
  });

  it('Test Shortcut Buttons', (done) => {
    // eslint-disable-next-line no-debugger
    debugger;
    window.flatpickr = Flatpickr;
    window.ShortcutButtonsPlugin = ShortcutButtonsPlugin;
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    form.setForm({ display: 'form', type: 'form', components: [comp2] })
      .then(() => {
        const dateTime = form.components[0];
        const buttonsWrappers = document.querySelectorAll('.shortcut-buttons-flatpickr-wrapper');
        const shortcutButtons = buttonsWrappers[buttonsWrappers.length - 1].querySelectorAll('.shortcut-buttons-flatpickr-button');

        assert.equal(shortcutButtons.length, 1);

        const input = dateTime.refs.input[0];
        Harness.clickElement(dateTime, shortcutButtons[0]);

        setTimeout(() => {
          input.widget.calendar.close();
          setTimeout(() => {
            assert.equal(form.data.date, '2020-10-10T00:00:00+00:00');
            dateTime.destroy();
            done();
          }, 250);
        }, 150);
      }).catch(done);
  });
});
