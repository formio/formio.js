'use strict';
import DataGridComponent from './DataGrid';
import { components as comps } from './fixtures/index';
import { Harness as Harness } from '../../../test/harness';
describe('DataGrid Component', function() {
  it('Should build a data grid component', function(done) {
    Harness.testCreate(DataGridComponent, comps.comp1).then((component) => {
      Harness.testInputs(component, 'input[type="text"]', 2);
      Harness.testInputs(component, 'input[type="number"]', 1);
      done();
    });
  });
});
