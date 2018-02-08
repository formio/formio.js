'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _Panel = require('./Panel');

var _index = require('./fixtures/index');

var _harness = require('../../../test/harness');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Panel Component', function () {
  it('Should build a panel component', function (done) {
    _harness.Harness.testCreate(_Panel.PanelComponent, _index.components.comp1).then(function (component) {
      _harness.Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });

  it('Panel should have correct classes', function (done) {
    _harness.Harness.testCreate(_Panel.PanelComponent, _index.components.comp1).then(function (component) {
      var panelClass = component.element.getAttribute('class');
      (0, _powerAssert2.default)(panelClass.indexOf('card border-secondary') !== -1, 'No Bootstrap 4 classes');
      (0, _powerAssert2.default)(panelClass.indexOf('panel panel-default') !== -1, 'No Bootstrap 3 classes');
      (0, _powerAssert2.default)(component.element.childNodes[0].getAttribute('class').indexOf('card-header panel-heading') !== -1);
      (0, _powerAssert2.default)(component.element.childNodes[0].childNodes[0].getAttribute('class').indexOf('card-title panel-title') !== -1);
      (0, _powerAssert2.default)(component.element.childNodes[1].getAttribute('class').indexOf('card-body panel-body') !== -1);
      done();
    });
  });
});