"use strict";

var _Unknown = _interopRequireDefault(require("./Unknown"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Custom Component', function () {
  it('Should build a Custom component in builder mode', function (done) {
    new _Unknown.default(_fixtures.comp1, {
      builder: true
    });
    done();
  });
});