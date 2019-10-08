"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _HTML = _interopRequireDefault(require("./HTML"));

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
});