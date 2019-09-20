import Harness from '../../../test/harness';
import ResourceComponent from './Resource';

import {
  comp1
} from './fixtures';

describe('Resource Component', () => {
  it('Should build a resource component', (done) => {
    Harness.testCreate(ResourceComponent, comp1).then((component) => {
      Harness.testElements(component, 'select', 1);
      done();
    });
  });
});
