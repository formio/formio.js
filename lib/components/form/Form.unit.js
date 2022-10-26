"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Form = _interopRequireDefault(require("./Form"));

var _chai = require("chai");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _fixtures = require("./fixtures");

var _Webform = _interopRequireDefault(require("../../Webform"));

var _formModalEdit = _interopRequireDefault(require("./fixtures/formModalEdit"));

var _formtest = require("../../../test/formtest");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Form Component', function () {
  it('Should build a form component', function () {
    return _harness.default.testCreate(_Form.default, _fixtures.comp1);
  });
  it('Test refreshOn inside NestedForm', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    form.setForm(_fixtures.comp4).then(function () {
      var make = form.getComponent(['form', 'make']);
      var model = form.getComponent(['form', 'model']);
      make.setValue('ford');
      setTimeout(function () {
        _powerAssert.default.equal(make.dataValue, 'ford', 'Should set value');

        model.setValue('Focus', {
          modified: true
        });
        setTimeout(function () {
          _powerAssert.default.equal(model.dataValue, 'Focus', 'Should set value');

          make.setValue('honda', {
            modified: true
          });
          setTimeout(function () {
            _powerAssert.default.equal(make.dataValue, 'honda', 'Should set value');

            _powerAssert.default.equal(model.dataValue, '', 'Should refresh and clear value');

            done();
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
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
  describe('Conditional rendering', function () {
    it('Should render and set submission to conditional form component', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      form.setForm(_formtest.formComponentWithConditionalRenderingForm).then(function () {
        form.setSubmission({
          data: {
            checkbox: true,
            form: {
              data: {
                textField: 'test'
              }
            }
          }
        }).then(function () {
          setTimeout(function () {
            var checkbox = formElement.querySelector('input[name="data[checkbox]"]');
            var textField = formElement.querySelector('input[name="data[textField]"]');
            (0, _chai.expect)(checkbox).to.not.be.null;

            _powerAssert.default.equal(checkbox.checked, true);

            (0, _chai.expect)(textField).to.not.be.null;

            _powerAssert.default.equal(textField.value, 'test');

            done();
          }, 250);
        });
      }).catch(done);
    });
  });
  describe('Advanced Logic', function () {
    it('Should disable all components of the form', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      form.setForm(_fixtures.comp6).then(function () {
        var textField = form.getComponent(['textField']);
        var nestedForm = form.getComponent(['form']);
        textField.setValue('test', {
          modified: true
        });
        setTimeout(function () {
          _powerAssert.default.equal(textField.dataValue, 'test', 'Should set value');

          _powerAssert.default.equal(nestedForm.disabled, true, 'Nested Form should be disabled');

          done();
        }, 300);
      }).catch(done);
    });
  });
  describe('Inside Collapsed Panel', function () {
    it('Should be able to set value to Nested Form Component inside collapsed Panel', function (done) {
      var formElement = document.createElement('div');
      var form = new _Webform.default(formElement);
      form.setForm(_fixtures.comp5).then(function () {
        var textField = form.getComponent(['form', 'textField']);
        var panel = form.getComponent('panel333');
        textField.setValue('123', {
          modified: true
        });
        setTimeout(function () {
          _powerAssert.default.equal(textField.dataValue, '123', 'Should set value');

          panel.collapsed = false;
          setTimeout(function () {
            _powerAssert.default.equal(textField.dataValue, '123', 'Should keep the set value after the panel was expanded');

            done();
          }, 300);
        }, 300);
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