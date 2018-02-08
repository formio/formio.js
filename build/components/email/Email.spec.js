'use strict';

var _Email = require('./Email');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Email Component', function () {
  it('Should build a email component', function (done) {
    _harness.Harness.testCreate(_Email.EmailComponent, _index.components.comp1).then(function (component) {
      done();
    });
  });
});