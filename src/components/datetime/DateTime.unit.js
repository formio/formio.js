import Harness from '../../../test/harness';
import DateTimeComponent from './DateTime';
import assert from 'power-assert';

import {
  comp1,
  comp2,
} from './fixtures';

describe('DateTime Component', () => {
  it('Should build a date time component', () => {
    return Harness.testCreate(DateTimeComponent, comp1);
  });

  it('Should format value', () => {
    return Harness.testCreate(DateTimeComponent, comp2)
      .then((dateTime) => {
        assert.equal(dateTime.getValueAsString('2020-09-18T12:12:00'), '2020-09-18 12:12 PM');
      });
  });
});
