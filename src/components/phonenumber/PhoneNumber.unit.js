import Harness from '../../../test/harness';
import PhoneNumberComponent from './PhoneNumber';
import assert from 'power-assert';
import { Formio } from './../../Formio';

import {
  comp1,
} from './fixtures';

describe('PhoneNumber Component', () => {
  it('Should build a phone number component', () => {
    return Harness.testCreate(PhoneNumberComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
    });
  });
});
