"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Url = _interopRequireDefault(require("./Url"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Url Component', function () {
  it('Should build a url component', function (done) {
    _harness.default.testCreate(_Url.default, _fixtures.comp1).then(function () {
      done();
    });
  });
});