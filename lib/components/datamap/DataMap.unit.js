"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _DataMap = _interopRequireDefault(require("./DataMap"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DataMap Component', function () {
  it('Should build a data map component', function () {
    return _harness.default.testCreate(_DataMap.default, _fixtures.comp1);
  });
  it('Should get and set values within the datamap.', function () {
    return _harness.default.testCreate(_DataMap.default, _fixtures.comp1).then(function (component) {
      _harness.default.testSetGet(component, {
        one: 'One',
        two: 'Two',
        three: 'Three'
      });
    });
  });
});