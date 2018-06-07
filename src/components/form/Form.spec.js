import Harness from '../../../test/harness';
import FormComponent from './Form';

import {
  comp1
} from './fixtures';

describe('Form Component', () => {
  it('Should build a form component', (done) => {
    Harness.testCreate(FormComponent, comp1).then(() => {
      done();
    });
  });
});
