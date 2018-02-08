'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _Well = require('./Well');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Well Component', function () {
  it('Should build a Well component', function (done) {
    _harness.Harness.testCreate(_Well.WellComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });

  it('Should include the correct classes', function (done) {
    _harness.Harness.testCreate(_Well.WellComponent, _index.components.comp1).then(function (component) {
      var componentClass = component.element.getAttribute('class');
      (0, _powerAssert2.default)(componentClass.indexOf('card card-body bg-faded') !== -1, 'Bootstrap 4 classes not present.');
      (0, _powerAssert2.default)(componentClass.indexOf('well') !== -1, 'Bootstrap 3 classes not present.');
      done();
    });
  });
});