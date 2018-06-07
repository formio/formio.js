import Harness from '../../../test/harness';
import HiddenComponent from './Hidden';

import {
  comp1
} from './fixtures';

describe('Hidden Component', () => {
  it('Should build a hidden component', (done) => {
    Harness.testCreate(HiddenComponent, comp1).then(() => {
      done();
    });
  });
});
