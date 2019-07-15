import Harness from '../../../test/harness';
import AddressComponent from './Address';

import {
  comp1
} from './fixtures';

describe('Address Component', () => {
  it('Should build an address component', () => {
    return Harness.testCreate(AddressComponent, comp1);
  });
});
