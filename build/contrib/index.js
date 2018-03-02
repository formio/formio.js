'use strict';

var _Stripe = require('./stripe/stripe/Stripe');

var _StripeCheckout = require('./stripe/checkout/StripeCheckout');

module.exports = {
  stripe: {
    stripe: _Stripe.StripeComponent,
    checkout: _StripeCheckout.StripeCheckoutComponent
  }
};