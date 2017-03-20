'use strict';
import { FieldsetComponent } from './Fieldset';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Fieldset Component', function() {
  it('Should build a fieldset component', function(done) {
    Harness.testCreate(FieldsetComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });
});
