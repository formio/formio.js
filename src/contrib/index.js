import {StripeComponent} from './stripe/stripe/Stripe';
import {StripeCheckoutComponent} from './stripe/checkout/StripeCheckout';
module.exports = {
  stripe: {
    stripe: StripeComponent,
    checkout: StripeCheckoutComponent
  }
};
