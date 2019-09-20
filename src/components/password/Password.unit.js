import Harness from '../../../test/harness';
import PasswordComponent from './Password';

import {
  comp1
} from './fixtures';

describe('Password Component', () => {
  it('Should build a password component', () => {
    return Harness.testCreate(PasswordComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="password"]', 1);
    });
  });
});
