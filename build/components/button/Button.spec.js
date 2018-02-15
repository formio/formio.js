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
      var buttons = _harness.Harness.testElements(component, 'button[type="submit"]', 1);
      for (var i = 0; i < buttons.length; i++) {
        _powerAssert2.default.equal(buttons[i].name, 'data[' + _index.components.comp1.key + ']');
        _powerAssert2.default.equal(buttons[i].innerHTML, _index.components.comp1.label);
      }
      done();
    });
  });
});