import assert from 'power-assert';

import Harness from '../../../test/harness';
import ContentComponent from './Content';

import {
  comp1
} from './fixtures';

describe('Content Component', () => {
  it('Should build a content component', (done) => {
    Harness.testCreate(ContentComponent, comp1).then((component) => {
      assert.equal(component.element.innerHTML, comp1.html);
      done();
    });
  });
});
