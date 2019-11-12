import Harness from '../../../test/harness';
import SignatureComponent from './Signature';

import {
  comp1
} from './fixtures';

// JSDOM does not have canvas so we can't test signature in a virtual environment.
// describe('Signature Component', () => {
//   it('Should build a Signature component', () => {
//     return Harness.testCreate(SignatureComponent, comp1);
//   });
// });
