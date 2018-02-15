'use strict';

var _Gmap = require('./Gmap');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

describe('Gmap Component', function () {
  it('Should build an gmap component', function (done) {
    _harness.Harness.testCreate(_Gmap.GmapComponent, _index.components.comp1).then(function (component) {
      done();
    });
  });
});