import Harness from '../../../test/harness';
import HiddenComponent from './Hidden';

import {
  comp1
} from './fixtures';

describe('Hidden Component', function() {
  it('Should build a hidden component', function() {
    return Harness.testCreate(HiddenComponent, comp1);
  });
});
