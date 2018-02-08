'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _Form = require('./Form');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Form Component', function () {
  it('Should build a form component', function (done) {
    _harness.Harness.testCreate(_Form.FormComponent, _index.components.comp1).then(function (component) {
      done();
    });
  });

  it('Should pass along the base parameter when set with src.', function (done) {
    _harness.Harness.testCreate(_Form.FormComponent, _index.components.comp2, {
      base: 'https://remote.form.io'
    }).then(function (component) {
      _powerAssert2.default.equal(component.formio.projectUrl, 'https://remote.form.io/testproject');
      done();
    });
  });
});