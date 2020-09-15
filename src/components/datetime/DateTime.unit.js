import assert from 'power-assert';
import Harness from '../../../test/harness';
import Webform from '../../Webform';
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
    Harness.testCreate(DateTimeComponent, comp2).then((dateTime) => {
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
});
