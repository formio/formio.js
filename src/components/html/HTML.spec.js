import Harness from '../../../test/harness';
import HTMLComponent from './HTML';

import {
  comp1
} from './fixtures';

describe('HTML Component', () => {
  it('Should build an html component', () => {
    return Harness.testCreate(HTMLComponent, comp1);
  });

  it('Should build an html component and ignore empty attribute name', () => {
    const comp = comp1;
    comp.attrs.push({
      'attr': '',
      'value': ''
    });

    return Harness.testCreate(HTMLComponent, comp1);
  });
});
