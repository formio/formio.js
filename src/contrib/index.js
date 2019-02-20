import StripeComponent from './stripe/stripe/Stripe';
import StripeCheckoutComponent from './stripe/checkout/StripeCheckout';
import SketchPad from './sketchpad/sketchpad';

const Contrib = {
  stripe: {
    stripe: StripeComponent,
    checkout: StripeCheckoutComponent
  },
  sketchpad: SketchPad
};

export default Contrib;
if (typeof global === 'object' && global.Formio) {
  global.Formio.contrib = Contrib;
}
