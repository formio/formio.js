import Harness from '../../../test/harness';
import LocationComponent from './Location';

import {
  comp1
} from './fixtures/index';

describe('Location Component', function() {
  it('Should build a location component', function() {
    return Harness.testCreate(LocationComponent, comp1);
  });
});
