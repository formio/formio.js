'use strict';

var _DateTime = require('./DateTime');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('DateTime Component', function () {
  it('Should build a date time component', function (done) {
    _harness.Harness.testCreate(_DateTime.DateTimeComponent, _index.components.comp1).then(function (component) {
      done();
    });
  });
});