import StripeComponent from './stripe/stripe/Stripe';
import StripeCheckoutComponent from './stripe/checkout/StripeCheckout';
import LocationComponent from './location/Location';
import EditTableComponent from './edittable/EditTable';
import ModalEdit from './modaledit/ModalEdit';
import Sketchpad from './sketchpad/Sketchpad';

const Contrib = {
  stripe: {
    stripe: StripeComponent,
    checkout: StripeCheckoutComponent,
  },
  location: LocationComponent,
  edittable: EditTableComponent,
  modaledit: ModalEdit,
  sketchpad: Sketchpad
};

export default Contrib;
if (typeof global === 'object' && global.Formio) {
  global.Formio.contrib = Contrib;
}
