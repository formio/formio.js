'use strict';
import ResourceComponent from './Resource';
import {components as comps} from './fixtures/index';
import Harness from '../../../test/harness';
describe('Resource Component', () => {
  it('Should build a resource component', (done) => {
    Harness.testCreate(ResourceComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'select', 1);
      done();
    });
  });
});
