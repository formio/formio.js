import Harness from '../../../test/harness';
import DateTimeComponent from './DateTime';

import {
  comp1
} from './fixtures';

describe('DateTime Component', () => {
  it('Should build a date time component', (done) => {
    Harness.testCreate(DateTimeComponent, comp1).then(() => {
      done();
    });
  });
});
