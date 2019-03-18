import StripeComponent from './stripe/stripe/Stripe';
import StripeCheckoutComponent from './stripe/checkout/StripeCheckout';
import Tagpad from './tagpad/tagpad';
const Contrib = {
  stripe: {
    stripe: StripeComponent,
    checkout: StripeCheckoutComponent
  },
  tagpad: Tagpad
};

export default Contrib;
if (typeof global === 'object' && global.Formio) {
  global.Formio.contrib = Contrib;
}
