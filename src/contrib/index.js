import {StripeComponent} from './stripe/stripe/Stripe';
import {StripeCheckoutComponent} from './stripe/checkout/StripeCheckout';
export default {
  stripe: {
    stripe: StripeComponent,
    checkout: StripeCheckoutComponent
  }
};
