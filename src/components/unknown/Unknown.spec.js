import UnknownComponent from './Unknown';
import assert from 'power-assert';

import {
  comp1
} from './fixtures';

describe('Custom Component', () => {
  it('Should build a Custom component in builder mode', (done) => {
    const componentInstance = new UnknownComponent(comp1, {
      builder: true
    });
    componentInstance.build();
    assert(componentInstance.element && componentInstance.element.innerHTML);
    done();
  });
});
