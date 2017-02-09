'use strict';
import PhoneNumberComponent from './PhoneNumber';
import { components as comps } from './fixtures/index';
import Harness from '../../../test/harness';
describe('PhoneNumber Component', function() {
  it('Should build a phone number component', function(done) {
    Harness.testCreate(PhoneNumberComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });
});
