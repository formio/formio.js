'use strict';
import { FormComponent } from './Form';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Form Component', function() {
  it('Should build a form component', function(done) {
    Harness.testCreate(FormComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });
});
