'use strict';

var _Password = require('./Password');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Password Component', function () {
  it('Should build a password component', function (done) {
    _harness.Harness.testCreate(_Password.PasswordComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="password"]', 1);
      done();
    });
  });
});