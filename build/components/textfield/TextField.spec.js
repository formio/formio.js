'use strict';

var _TextField = require('./TextField');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('TextField Component', function () {
  it('Should build a TextField component', function (done) {
    _harness.Harness.testCreate(_TextField.TextFieldComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });
});