'use strict';
import {ColumnsComponent} from './Columns';
import {components as comps} from './fixtures/index';
import {Harness} from '../../../test/harness';
describe('Columns Component', () => {
  it('Should build a columns component', (done) => {
    Harness.testCreate(ColumnsComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });
});
