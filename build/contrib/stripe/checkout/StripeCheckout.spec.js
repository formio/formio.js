'use strict';

var _StripeCheckout = require('./StripeCheckout');

var _index = require('./fixtures/index');

var _harness = require('../../../../test/harness');

describe('StripeCheckout Component', function () {
  it('Should build an stripeCheckout component', function (done) {
    _harness.Harness.testCreate(_StripeCheckout.StripeCheckoutComponent, _index.components.comp1).then(function (component) {
      done();
    });
  });
});