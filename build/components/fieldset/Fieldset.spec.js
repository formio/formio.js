'use strict';

var _Fieldset = require('./Fieldset');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Fieldset Component', function () {
  it('Should build a fieldset component', function (done) {
    _harness.Harness.testCreate(_Fieldset.FieldsetComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });
});