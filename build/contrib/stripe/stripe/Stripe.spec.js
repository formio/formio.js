'use strict';

var _Stripe = require('./Stripe');

var _index = require('./fixtures/index');

var _harness = require('../../../../test/harness');

describe('Stripe Component', function () {
  it('Should build an stripe component', function (done) {
    _harness.Harness.testCreate(_Stripe.StripeComponent, _index.components.comp1).then(function (component) {
      done();
    });
  });
});