'use strict';
import ColumnsComponent from './Columns';
import { components as comps } from './fixtures/index';
import { Harness as Harness } from '../../../test/harness';
describe('Columns Component', function() {
  it('Should build a columns component', function(done) {
    Harness.testCreate(ColumnsComponent, comps.comp1).then((component) => {
      Harness.testInputs(component, 'input[type="text"]', 2);
      done();
    });
  });
});
