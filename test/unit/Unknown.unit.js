import UnknownComponent from '../../src/components/unknown/Unknown';

import {
  comp1
} from './fixtures/unknown';

describe('Custom Component', () => {
  it('Should build a Custom component in builder mode', (done) => {
    new UnknownComponent(comp1, {
      builder: true
    });
    done();
  });
});
