import Harness from '../../../test/harness';
import HTMLComponent from './HTML';

import {
  comp1
} from './fixtures';

describe('HTML Component', () => {
  it('Should build an html component', (done) => {
    Harness.testCreate(HTMLComponent, comp1).then(() => {
      done();
    });
  });

  it('Should build an html component and ignore empty attribute name', (done) => {
    const comp = comp1;
    comp.attrs.push({
      'attr': '',
      'value': ''
    });

    Harness.testCreate(HTMLComponent, comp1).then(() => {
      done();
    });
  });
});
