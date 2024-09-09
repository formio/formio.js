import Harness from '../harness';
import HiddenComponent from '../../src/components/hidden/Hidden';

import {
  comp1
} from './fixtures/hidden';

describe('Hidden Component', () => {
  it('Should build a hidden component', () => {
    return Harness.testCreate(HiddenComponent, comp1);
  });
});
