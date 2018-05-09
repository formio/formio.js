'use strict';
import AddressComponent from './Address';
import {components as comps} from './fixtures/index';
import Harness from '../../../test/harness';
describe('Address Component', () => {
  it('Should build an address component', (done) => {
    Harness.testCreate(AddressComponent, comps.comp1).then((component) => {
      done();
    });
  });
});
