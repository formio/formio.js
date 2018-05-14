import StripeComponent from './stripe/stripe/Stripe';
import StripeCheckoutComponent from './stripe/checkout/StripeCheckout';
const Contrib = {
  stripe: {
    stripe: StripeComponent,
    checkout: StripeCheckoutComponent
  }
};

export default Contrib;
if (typeof global === 'object' && global.Formio) {
  global.Formio.contrib = Contrib;
}
