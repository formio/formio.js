'use strict';

var _Signature = require('./Signature');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Signature Component', function () {
  it('Should build a Signature component', function (done) {
    _harness.Harness.testCreate(_Signature.SignatureComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="hidden"]', 1);
      done();
    });
  });
});