'use strict';
import { TextFieldComponent } from './TextField';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('TextField Component', function() {
  it('Should build a TextField component', function(done) {
    Harness.testCreate(TextFieldComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });
});
