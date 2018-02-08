'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _Content = require('./Content');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Content Component', function () {
  it('Should build a content component', function (done) {
    _harness.Harness.testCreate(_Content.ContentComponent, _index.components.comp1).then(function (component) {
      _powerAssert2.default.equal(component.element.innerHTML, _index.components.comp1.html);
      done();
    });
  });
});