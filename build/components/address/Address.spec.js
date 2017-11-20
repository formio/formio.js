'use strict';

var _Address = require('./Address');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Address Component', function () {
  it('Should build an address component', function (done) {
    _harness.Harness.testCreate(_Address.AddressComponent, _index.components.comp1).then(function (component) {
      done();
    });
  });
});