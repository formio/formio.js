import Harness from '../../../../test/harness';
import StripeCheckoutComponent from './StripeCheckout';

import {
  comp1
} from './fixtures';

describe('StripeCheckout Component', () => {
  it('Should build an stripeCheckout component', (done) => {
    Harness.testCreate(StripeCheckoutComponent, comp1).then(() => {
      done();
    });
  });
});
