import StripeComponent from './stripe/stripe/Stripe';
import StripeCheckoutComponent from './stripe/checkout/StripeCheckout';
import LocationComponent from './location/Location';
const Contrib = {
  stripe: {
    stripe: StripeComponent,
    checkout: StripeCheckoutComponent,
  },
  location: LocationComponent,
};

export default Contrib;
if (typeof global === 'object' && global.Formio) {
  global.Formio.contrib = Contrib;
}
