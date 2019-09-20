import UnknownComponent from './Unknown';

import {
  comp1
} from './fixtures';

describe('Custom Component', () => {
  it('Should build a Custom component in builder mode', (done) => {
    new UnknownComponent(comp1, {
      builder: true
    });
    done();
  });
});
