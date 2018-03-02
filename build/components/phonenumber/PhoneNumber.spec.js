'use strict';

var _PhoneNumber = require('./PhoneNumber');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('PhoneNumber Component', function () {
  it('Should build a phone number component', function (done) {
    _harness.Harness.testCreate(_PhoneNumber.PhoneNumberComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });
});