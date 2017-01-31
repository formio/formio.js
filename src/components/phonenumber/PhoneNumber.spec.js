'use strict';
import PhoneNumberComponent from './PhoneNumber';
import { components as comps } from './fixtures/index';
import { Harness as Harness } from '../../../test/harness';
describe('PhoneNumber Component', function() {
  it('Should build a phone number component', function(done) {
    Harness.testCreate(PhoneNumberComponent, comps.comp1).then((component) => {
      Harness.testInputs(component, 'input[type="text"]', 1);
      done();
    });
  });
});
