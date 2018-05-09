'use strict';
import StripeCheckoutComponent from './StripeCheckout';
import {components as comps} from './fixtures/index';
import Harness from '../../../../test/harness';
describe('StripeCheckout Component', () => {
  it('Should build an stripeCheckout component', (done) => {
    Harness.testCreate(StripeCheckoutComponent, comps.comp1).then((component) => {
      done();
  });
  });
});
