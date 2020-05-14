"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _TextArea = _interopRequireDefault(require("./TextArea"));

var _sinon = _interopRequireDefault(require("sinon"));

var _chai = require("chai");

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TextArea Component', function () {
  it('Should build a TextArea component', function () {
    return _harness.default.testCreate(_TextArea.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'textarea', 1);
    });
  });
  it('setValue should be called only once', function () {
    return _harness.default.testCreate(_TextArea.default, _fixtures.comp2).then(function (component) {
      var valueToSet = [{
        firstName: 'Bobby',
        lastName: 'Lynch'
      }, {
        firstName: 'Harold',
        lastName: 'Freeman'
      }];

      var emit = _sinon.default.spy(component, 'setValue');

      component.setValue(valueToSet);
      (0, _chai.expect)(component.getValue()).to.deep.equal([{
        firstName: 'Bobby',
        lastName: 'Lynch'
      }, {
        firstName: 'Harold',
        lastName: 'Freeman'
      }]);
      (0, _chai.expect)(emit.callCount).to.equal(1);
    });
  });
});