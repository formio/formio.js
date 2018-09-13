import Harness from '../../../test/harness';
import UrlComponent from './Url';

import {
  comp1
} from './fixtures';

describe('Url Component', () => {
  it('Should build a url component', (done) => {
    Harness.testCreate(UrlComponent, comp1).then(() => {
      done();
    });
  });
});
