'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _Button = require('./Button');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Button Component', function () {
  it('Should build a button component', function (done) {
    _harness.Harness.testCreate(_Button.ButtonComponent, _index.components.comp1).then(function (component) {
      _powerAssert2.default.equal(component.element.nodeName, 'BUTTON');
      done();
    });
  });
});