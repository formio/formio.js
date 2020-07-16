"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Form = _interopRequireDefault(require("./Form"));

var _chai = require("chai");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _fixtures = require("./fixtures");

var _Webform = _interopRequireDefault(require("../../Webform"));

var _formModalEdit = _interopRequireDefault(require("./fixtures/formModalEdit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Form Component', function () {
  it('Should build a form component', function () {
    return _harness.default.testCreate(_Form.default, _fixtures.comp1);
  });
  describe('renderSubForm', function () {
    var formcmp = null;
    it('should set sub form parentVisible', function (done) {
      _harness.default.testCreate(_Form.default, _fixtures.comp1).then(function (cmp) {
        formcmp = cmp;
        formcmp.visible = false;
        return formcmp.subFormReady;
      }, done).then(function (subForm) {
        (0, _chai.expect)(formcmp).to.not.be.null;
        (0, _chai.expect)(formcmp.visible).to.be.false;
        (0, _chai.expect)(subForm.parentVisible).to.be.false;
        done();
      }, done).catch(done);
    });
  });
  describe('set visible', function () {
    it('should set visible flag on instance', function (done) {
      _harness.default.testCreate(_Form.default, _fixtures.comp1).then(function (formcmp) {
        (0, _chai.expect)(formcmp._visible).to.be.true;
        formcmp.visible = false;
        (0, _chai.expect)(formcmp._visible).to.be.false;
        done();
      }, done).catch(done);
    });
    it('should update sub form visibility', function (done) {
      var formcmp;

      _harness.default.testCreate(_Form.default, _fixtures.comp1).then(function (cmp) {
        formcmp = cmp;
        return formcmp.subFormReady;
      }, done).then(function (subform) {
        (0, _chai.expect)(formcmp.visible).to.be.true;
        (0, _chai.expect)(subform.parentVisible).to.be.true;
        formcmp.visible = false;
        (0, _chai.expect)(formcmp.visible).to.be.false;
        (0, _chai.expect)(subform.parentVisible).to.be.false;
        formcmp.visible = true;
        (0, _chai.expect)(formcmp.visible).to.be.true;
        (0, _chai.expect)(subform.parentVisible).to.be.true;
        done();
      }, done).catch(done);
    });
  });
  describe('get visible', function () {
    it('should get visible flag from instance', function (done) {
      _harness.default.testCreate(_Form.default, _fixtures.comp1).then(function (formcmp) {
        (0, _chai.expect)(formcmp._visible).to.be.true;
        (0, _chai.expect)(formcmp.visible).to.be.true;
        formcmp.visible = false;
        (0, _chai.expect)(formcmp.visible).to.be.false;
        done();
      }, done).catch(done);
    });
  });
  describe('set parentVisible', function () {
    it('should set parentVisible flag on instance', function (done) {
      _harness.default.testCreate(_Form.default, _fixtures.comp1).then(function (formcmp) {
        (0, _chai.expect)(formcmp._parentVisible).to.be.true;
        formcmp.parentVisible = false;
        (0, _chai.expect)(formcmp._parentVisible).to.be.false;
        done();
      }, done).catch(done);
    });
    it('should update sub form visibility', function (done) {
      var formcmp;

      _harness.default.testCreate(_Form.default, _fixtures.comp1).then(function (cmp) {
        formcmp = cmp;
        return formcmp.subFormReady;
      }, done).then(function (subform) {
        (0, _chai.expect)(formcmp.parentVisible).to.be.true;
        (0, _chai.expect)(subform.parentVisible).to.be.true;
        formcmp.parentVisible = false;
        (0, _chai.expect)(formcmp.parentVisible).to.be.false;
        (0, _chai.expect)(subform.parentVisible).to.be.false;
        formcmp.parentVisible = true;
        (0, _chai.expect)(formcmp.parentVisible).to.be.true;
        (0, _chai.expect)(subform.parentVisible).to.be.true;
        done();
      }, done).catch(done);
    });
  });
  describe('get parentVisible', function () {
    it('should get parentVisible flag from instance', function (done) {
      _harness.default.testCreate(_Form.default, _fixtures.comp1).then(function (formcmp) {
        (0, _chai.expect)(formcmp._parentVisible).to.be.true;
        (0, _chai.expect)(formcmp.parentVisible).to.be.true;
        formcmp.parentVisible = false;
        (0, _chai.expect)(formcmp.parentVisible).to.be.false;
        done();
      }, done).catch(done);
    });
  });
  describe('Modal Edit', function () {
    it('Should render preview when modalEdit', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      form.setForm(_formModalEdit.default).then(function () {
        var preview = form.element.querySelector('[ref="openModal"]');
        (0, _powerAssert.default)(preview, 'Should contain element to open a modal window');
        done();
      }).catch(done);
    });
  });
});
describe('Wizard Component', function () {
  it('Should build a wizard component and disable cancel, next and breadcrumbs', function (done) {
    _harness.default.testCreate(_Form.default, _fixtures.comp3, {
      breadcrumbSettings: {
        clickable: false
      },
      buttonSettings: {
        showCancel: false,
        showPrevious: false
      }
    }).then(function () {
      done();
    });
  });
});