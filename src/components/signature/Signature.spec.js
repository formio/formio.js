'use strict';
import SignatureComponent from './Signature';
import { components as comps } from './fixtures/index';
import Harness from '../../../test/harness';
describe('Signature Component', function() {
  it('Should build a Signature component', function(done) {
    Harness.testCreate(SignatureComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="hidden"]', 1);
      done();
    });
  });
});
