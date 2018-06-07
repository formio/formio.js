import Harness from '../../../test/harness';
import SignatureComponent from './Signature';

import {
  comp1
} from './fixtures';

describe('Signature Component', () => {
  it('Should build a Signature component', (done) => {
    Harness.testCreate(SignatureComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="hidden"]', 1);
      done();
    });
  });
});
