"use strict";

var _each = _interopRequireDefault(require("lodash/each"));

var _chai = require("chai");

var _wizards = _interopRequireDefault(require("../test/wizards"));

var _Wizard = _interopRequireDefault(require("./Wizard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Wizard Component', function () {
  describe('getPreviousPage', function () {
    it('should return previous page number or zero', function () {
      var getPreviousPage = _Wizard.default.prototype.getPreviousPage;
      (0, _chai.expect)(getPreviousPage.call({
        page: 3
      })).to.equal(2);
      (0, _chai.expect)(getPreviousPage.call({
        page: 9
      })).to.equal(8);
      (0, _chai.expect)(getPreviousPage.call({
        page: 199
      })).to.equal(198);
      (0, _chai.expect)(getPreviousPage.call({
        page: 1
      })).to.equal(0);
      (0, _chai.expect)(getPreviousPage.call({
        page: 0
      })).to.equal(0);
    });
  });
});
describe('WizardRenderer tests', function () {
  (0, _each.default)(_wizards.default, function (wizardTest) {
    (0, _each.default)(wizardTest.tests, function (wizardTestTest, title) {
      it(title, function (done) {
        var wizardElement = document.createElement('div');
        var wizard = new _Wizard.default(wizardElement);
        wizard.setForm(wizardTest.form).then(function () {
          return wizardTestTest(wizard, done);
        }).catch(function (error) {
          done(error);
        });
      });
    });
  });
});