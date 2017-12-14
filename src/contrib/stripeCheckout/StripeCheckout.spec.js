'use strict';
import { StripeCheckoutComponent } from './StripeCheckout';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('StripeCheckout Component', function() {
  it('Should build an stripeCheckout component', function(done) {
    Harness.testCreate(StripeCheckoutComponent, comps.comp1).then((component) => {
      done();
  });
  });
});
