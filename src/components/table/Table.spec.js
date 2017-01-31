'use strict';
import TableComponent from './Table';
import { components as comps } from './fixtures/index';
import { Harness as Harness } from '../../../test/harness';
describe('Table Component', function() {
  it('Should build a Table component', function(done) {
    Harness.testCreate(TableComponent, comps.comp1).then((component) => {
      Harness.testInputs(component, 'input[type="text"]', 6);
      done();
    });
  });
});
