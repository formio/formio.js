import UnknownComponent from '../../src/components/unknown/Unknown';

import { comp1 } from './fixtures/unknown';

describe('Custom Component', function () {
  it('Should build a Custom component in builder mode', function (done) {
    new UnknownComponent(comp1, {
      builder: true,
    });
    done();
  });
});
