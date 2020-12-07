"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _HTML = _interopRequireDefault(require("./HTML"));

var _sinon = _interopRequireDefault(require("sinon"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('HTML Component', function () {
  it('Should build an html component', function () {
    return _harness.default.testCreate(_HTML.default, _fixtures.comp1);
  });
  it('Should build an html component and ignore empty attribute name', function () {
    var comp = _fixtures.comp1;
    comp.attrs.push({
      'attr': '',
      'value': ''
    });
    return _harness.default.testCreate(_HTML.default, _fixtures.comp1);
  });
  it('setContent should not be called if it is not conditionally visible', function () {
    return _harness.default.testCreate(_HTML.default, _fixtures.comp2).then(function (component) {
      var emit = _sinon.default.spy(component, 'setContent');

      component.checkRefreshOn(null);

      _powerAssert.default.equal(emit.callCount, 0);
    });
  });
});