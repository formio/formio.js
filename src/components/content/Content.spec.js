import assert from 'power-assert';

import Harness from '../../../test/harness';
import ContentComponent from './Content';

import {
  comp1
} from './fixtures';

describe('Content Component', () => {
  it('Should build a content component', () => {
    return Harness.testCreate(ContentComponent, comp1).then((component) => {
      const html = component.element.querySelector('[ref="html"]');
      assert.equal(html.innerHTML.trim(), comp1.html.trim());
    });
  });
});
