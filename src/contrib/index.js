import Formio from '../Formio';
import StripeComponent from './stripe/stripe/Stripe';
import StripeCheckoutComponent from './stripe/checkout/StripeCheckout';
Formio.contrib = {
  stripe: {
    stripe: StripeComponent,
    checkout: StripeCheckoutComponent
  }
};

export default Formio.contrib;
