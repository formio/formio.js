'use strict';
import { AddressComponent } from './Address';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Address Component', function() {
  it('Should build an address component', function(done) {
    Harness.testCreate(AddressComponent, comps.comp1).then((component) => {
      done();
    });
  });
});
