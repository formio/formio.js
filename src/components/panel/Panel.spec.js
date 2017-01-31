'use strict';
import PanelComponent from './Panel';
import { components as comps } from './fixtures/index';
import { Harness as Harness } from '../../../test/harness';
describe('Panel Component', function() {
  it('Should build a panel component', function(done) {
    Harness.testCreate(PanelComponent, comps.comp1).then((component) => {
      Harness.testInputs(component, 'input[type="text"]', 2);
      done();
    });
  });
});
