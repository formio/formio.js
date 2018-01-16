'use strict';
import { StripeComponent } from './Stripe';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Stripe Component', function() {
  it('Should build an stripe component', function(done) {
    Harness.testCreate(StripeComponent, comps.comp1).then((component) => {
      done();
  });
  });
});
