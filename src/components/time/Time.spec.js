import Harness from '../../../test/harness';
import TimeComponent from './Time';

import {
  comp1
} from './fixtures';

describe('Time Component', () => {
  it('Should build a time component', (done) => {
    Harness.testCreate(TimeComponent, comp1).then(() => {
      done();
    });
  });
});
