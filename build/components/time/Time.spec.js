'use strict';

var _Time = require('./Time');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Time Component', function () {
  it('Should build a time component', function (done) {
    _harness.Harness.testCreate(_Time.TimeComponent, _index.components.comp1).then(function (component) {
      done();
    });
  });
});