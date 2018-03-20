'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Stripe = require('./stripe/stripe/Stripe');

var _StripeCheckout = require('./stripe/checkout/StripeCheckout');

exports.default = {
  stripe: {
    stripe: _Stripe.StripeComponent,
    checkout: _StripeCheckout.StripeCheckoutComponent
  }
};