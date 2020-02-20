import StripeComponent from './stripe/stripe/Stripe';
import StripeCheckoutComponent from './stripe/checkout/StripeCheckout';
import LocationComponent from './location/Location';
import EditTableComponent from './edittable/EditTable';
import ModalEdit from './modaledit/ModalEdit';
import Tagpad from './tagpad/Tagpad';

const Contrib = {
  stripe: {
    stripe: StripeComponent,
    checkout: StripeCheckoutComponent,
  },
  location: LocationComponent,
  edittable: EditTableComponent,
  modaledit: ModalEdit,
  tagpad: Tagpad
};

export default Contrib;
if (typeof global === 'object' && global.Formio) {
  global.Formio.contrib = Contrib;
}
