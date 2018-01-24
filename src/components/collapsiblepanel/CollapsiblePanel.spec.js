'use strict';
import { CollapsiblePanelComponent } from './CollapsiblePanel';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Panel Component', function() {
  it('Should build a panel component', function(done) {
    Harness.testCreate(CollapsiblePanelComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });
});
