import Harness from '../../../test/harness';
import TagsComponent from './Tags';

import {
  comp1
} from './fixtures';

describe('Tags Component', function() {
  it('Should build a tags component', function() {
    return Harness.testCreate(TagsComponent, comp1);
  });
});
