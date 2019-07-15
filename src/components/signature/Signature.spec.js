import Harness from '../../../test/harness';
import SignatureComponent from './Signature';

import {
  comp1
} from './fixtures';

describe('Signature Component', () => {
  it('Should build a Signature component', () => {
    return Harness.testCreate(SignatureComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="hidden"]', 1);
    });
  });
});
