import assert from 'power-assert';
import Harness from '../../../test/harness';
import DateTimeComponent from './DateTime';

import {
  comp1,
  comp2,
} from './fixtures';

describe('DateTime Component', () => {
  it('Should build a date time component', () => {
    return Harness.testCreate(DateTimeComponent, comp1);
  });

  it('Test formatting', (done) => {
    comp2.widget.format = 'yyyy-MM-dd';
    Harness.testCreate(DateTimeComponent, comp2.one).then((dateTime) => {
      const value = '2020-09-22T00:00:00';
      const formattedValue = '2020-09-22';
      const input = dateTime.element.querySelector('[ref="input"]');
      assert.equal(input.getAttribute('placeholder'), dateTime.component.format, 'Placeholder should be equal to the format');
      dateTime.setValue(value);
      setTimeout(() => {
        assert.equal(dateTime.getValueAsString(value), formattedValue, 'getValueAsString should return formatted value');
        done();
      }, 250);
    }).catch(done);
  });

  it('Should format value', () => {
    comp2.widget.format = 'yyyy-MM-dd hh:mm a';
    return Harness.testCreate(DateTimeComponent, comp2)
      .then((dateTime) => {
        assert.equal(dateTime.getValueAsString('2020-09-18T12:12:00'), '2020-09-18 12:12 PM');
      });
  });
});
