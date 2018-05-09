'use strict';
import StripeComponent from './Stripe';
import {components as comps} from './fixtures/index';
import Harness from '../../../../test/harness';
describe('Stripe Component', () => {
  it('Should build an stripe component', (done) => {
    Harness.testCreate(StripeComponent, comps.comp1).then((component) => {
      done();
  });
  });
});
