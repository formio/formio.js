import StripeComponent from './stripe/stripe/Stripe';
import StripeCheckoutComponent from './stripe/checkout/StripeCheckout';
import SketchPad from './sketchpad/sketchpad';
import Tagpad from './tagpad/tagpad';

const Contrib = {
  stripe: {
    stripe: StripeComponent,
    checkout: StripeCheckoutComponent
  },
  sketchpad: SketchPad,
  tagpad: Tagpad,
};

export default Contrib;
if (typeof global === 'object' && global.Formio) {
  global.Formio.contrib = Contrib;
}
