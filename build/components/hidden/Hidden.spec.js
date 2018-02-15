'use strict';

var _Hidden = require('./Hidden');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Hidden Component', function () {
  it('Should build a hidden component', function (done) {
    _harness.Harness.testCreate(_Hidden.HiddenComponent, _index.components.comp1).then(function (component) {
      done();
    });
  });
});