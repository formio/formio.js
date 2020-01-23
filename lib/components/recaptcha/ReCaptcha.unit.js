"use strict";

var _ReCaptcha = _interopRequireDefault(require("./ReCaptcha"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('reCAPTCHA Component', function () {
  it('Should build a reCAPTCHA component in builder mode', function (done) {
    new _ReCaptcha.default(_fixtures.comp1, {
      builder: true
    });
    done();
  });
});