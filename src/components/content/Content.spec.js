'use strict';
import assert from 'power-assert';
import ContentComponent from './Content';
import {components as comps} from './fixtures/index';
import Harness from '../../../test/harness';
describe('Content Component', () => {
  it('Should build a content component', (done) => {
    Harness.testCreate(ContentComponent, comps.comp1).then((component) => {
      assert.equal(component.element.innerHTML, comps.comp1.html);
      done();
    });
  });
});
