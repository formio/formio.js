'use strict';
import PhoneNumberComponent from './PhoneNumber';
import {components as comps} from './fixtures/index';
import Harness from '../../../test/harness';
describe('PhoneNumber Component', () => {
  it('Should build a phone number component', (done) => {
    Harness.testCreate(PhoneNumberComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });
});
