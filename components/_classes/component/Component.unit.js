'use strict';

require("core-js/modules/es.string.trim.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

var _Component = _interopRequireDefault(require("./Component"));

var _Webform = _interopRequireDefault(require("../../../Webform"));

var _harness = _interopRequireDefault(require("../../../../test/harness"));

var _fixtures = require("./fixtures");

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _comp = _interopRequireDefault(require("./fixtures/comp3"));

var _comp2 = _interopRequireDefault(require("./fixtures/comp4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Component', function () {
  it('Should create a Component', function (done) {
    var component = new _Component.default(); // Test that we have a proper constructed component.

    _powerAssert.default.equal(component.options.renderMode, 'form');

    _powerAssert.default.equal(component.options.attachMode, 'full');

    _powerAssert.default.equal(component.attached, false);

    _powerAssert.default.equal(component.rendered, false);

    done();
  });
  it('Should build a base component', function () {
    return _harness.default.testCreate(_Component.default, {
      type: 'base'
    }).then(function (component) {
      var element = component.element.querySelector('[ref="component"]');

      _powerAssert.default.equal(element.textContent.trim(), 'Unknown component: base');
    });
  });
  it('Should provide required validation', function (done) {
    _harness.default.testCreate(_Component.default, (0, _merge2.default)({}, _fixtures.comp1, {
      validate: {
        required: true
      }
    })).then(function (component) {
      return _harness.default.testComponent(component, {
        bad: {
          value: '',
          field: 'firstName',
          error: 'First Name is required'
        },
        good: {
          value: 'te'
        }
      }, done);
    }).catch(done);
  });
  it('Should provide minLength validation', function (done) {
    _harness.default.testCreate(_Component.default, (0, _merge2.default)({}, _fixtures.comp1, {
      validate: {
        minLength: 2
      }
    })).then(function (component) {
      return _harness.default.testComponent(component, {
        bad: {
          value: 't',
          field: 'firstName',
          error: 'First Name must have at least 2 characters.'
        },
        good: {
          value: 'te'
        }
      }, done);
    });
  });
  it('Should provide maxLength validation', function (done) {
    _harness.default.testCreate(_Component.default, (0, _merge2.default)({}, _fixtures.comp1, {
      validate: {
        maxLength: 5
      }
    })).then(function (component) {
      return _harness.default.testComponent(component, {
        bad: {
          value: 'testte',
          field: 'firstName',
          error: 'First Name must have no more than 5 characters.'
        },
        good: {
          value: 'te'
        }
      }, done);
    });
  });
  it('Should provide maxWords validation', function (done) {
    _harness.default.testCreate(_Component.default, (0, _merge2.default)({}, _fixtures.comp1, {
      validate: {
        maxWords: 2
      }
    })).then(function (component) {
      return _harness.default.testComponent(component, {
        bad: {
          value: 'test test test',
          field: 'firstName',
          error: 'First Name must have no more than 2 words.'
        },
        good: {
          value: 'te st'
        }
      }, done);
    });
  });
  it('Should provide minWords validation', function (done) {
    _harness.default.testCreate(_Component.default, (0, _merge2.default)({}, _fixtures.comp1, {
      validate: {
        minWords: 2
      }
    })).then(function (component) {
      return _harness.default.testComponent(component, {
        bad: {
          value: 'test',
          field: 'firstName',
          error: 'First Name must have at least 2 words.'
        },
        good: {
          value: 'te st'
        }
      }, done);
    });
  });
  it('Should provide custom validation', function (done) {
    _harness.default.testCreate(_Component.default, (0, _merge2.default)({}, _fixtures.comp1, {
      validate: {
        custom: 'valid = (input !== "Joe") ? true : "You cannot be Joe"'
      }
    })).then(function (component) {
      return _harness.default.testComponent(component, {
        bad: {
          value: 'Joe',
          field: 'firstName',
          error: 'You cannot be Joe'
        },
        good: {
          value: 'Tom'
        }
      }, done);
    });
  });
  it('Should provide json validation', function (done) {
    _harness.default.testCreate(_Component.default, (0, _merge2.default)({}, _fixtures.comp1, {
      validate: {
        json: {
          'if': [{
            '===': [{
              var: 'data.firstName'
            }, 'Joe']
          }, true, 'You must be Joe']
        }
      }
    })).then(function (component) {
      return _harness.default.testComponent(component, {
        bad: {
          value: 'Tom',
          field: 'firstName',
          error: 'You must be Joe'
        },
        good: {
          value: 'Joe'
        }
      }, done);
    });
  });
  it('Should mark as invalid calculated fields that are invalid', function (done) {
    var formElement = document.createElement('div');
    var form = new _Webform.default(formElement);
    var formJson = {
      components: [{
        label: 'A',
        mask: false,
        tableView: false,
        delimiter: false,
        requireDecimal: false,
        inputFormat: 'plain',
        key: 'a',
        type: 'number',
        input: true
      }, {
        label: 'B',
        mask: false,
        disabled: true,
        tableView: false,
        delimiter: false,
        requireDecimal: false,
        inputFormat: 'plain',
        calculateValue: 'value = data.a + 1;',
        validate: {
          custom: 'valid = input <= 10 ? true : \'B should be less or equal to 10\';'
        },
        key: 'b',
        type: 'number',
        input: true
      }]
    };
    form.setForm(formJson).then(function () {
      return form.setSubmission({
        data: {
          a: 1
        }
      });
    }).then(function () {
      setTimeout(function () {
        var a = form.getComponent('a');
        a.updateComponentValue(10);
        setTimeout(function () {
          var _b$refs$messageContai;

          var b = form.getComponent('b');
          (0, _chai.expect)(((_b$refs$messageContai = b.refs.messageContainer) === null || _b$refs$messageContai === void 0 ? void 0 : _b$refs$messageContai.innerHTML.indexOf('B should be less or equal to 10')) > -1).to.be.true;
          (0, _chai.expect)(b.refs.input[0].classList.contains('is-invalid')).to.be.true;
          done();
        }, 300);
      }, 300);
    }).catch(done);
  });
  describe('shouldSkipValidation', function () {
    it('should return true if component is hidden', function (done) {
      _harness.default.testCreate(_Component.default, _fixtures.comp1).then(function (cmp) {
        cmp.visible = false;

        cmp.checkCondition = function () {
          return true;
        };

        (0, _chai.expect)(cmp.visible).to.be.false;
        (0, _chai.expect)(cmp.checkCondition()).to.be.true;
        (0, _chai.expect)(cmp.shouldSkipValidation()).to.be.true;
        done();
      }, done).catch(done);
    });
    it('should return true if component is conditionally hidden', function (done) {
      _harness.default.testCreate(_Component.default, _fixtures.comp1).then(function (cmp) {
        cmp.visible = true;

        cmp.checkCondition = function () {
          return false;
        };

        (0, _chai.expect)(cmp.visible).to.be.true;
        (0, _chai.expect)(cmp.checkCondition()).to.be.false;
        (0, _chai.expect)(cmp.shouldSkipValidation()).to.be.true;
        done();
      }, done).catch(done);
    });
    it('should return false if not hidden', function (done) {
      _harness.default.testCreate(_Component.default, _fixtures.comp1).then(function (cmp) {
        cmp.visible = true;

        cmp.checkCondition = function () {
          return true;
        };

        (0, _chai.expect)(cmp.visible).to.be.true;
        (0, _chai.expect)(cmp.checkCondition()).to.be.true;
        (0, _chai.expect)(cmp.shouldSkipValidation()).to.be.false;
        done();
      }, done).catch(done);
    });
  });
  describe('Component Modal', function () {
    it('Modal window should stay opened after redrawing component if it was opened ont hte moment of calling', function (done) {
      _harness.default.testCreate(_Component.default, _comp.default).then(function (component) {
        component.componentModal.openModal();
        component.redraw().then(function () {
          var isVisible = !component.componentModal.refs.modalWrapper.classList.contains('component-rendering-hidden');
          (0, _powerAssert.default)(isVisible);
          done();
        }).catch(done);
      }).catch(done);
    });
  });
});
it('Should return value for HTML mode', function () {
  return _harness.default.testCreate(_Component.default, _fixtures.comp1).then(function (component) {
    _powerAssert.default.equal(component.itemValueForHTMLMode(['option 1', 'option 2', 'option 3']), 'option 1, option 2, option 3');

    _powerAssert.default.equal(component.itemValueForHTMLMode(['option 1', ['option 2', 'option 3']]), 'option 1, option 2, option 3');

    _powerAssert.default.equal(component.itemValueForHTMLMode(['2020-03-18T15:00:00.000Z', '2020-03-31T09:05:00.000Z']), '2020-03-18T15:00:00.000Z, 2020-03-31T09:05:00.000Z');

    _powerAssert.default.equal(component.itemValueForHTMLMode('test'), 'test');
  });
});
it('Should protect against change loops', function (done) {
  var formElement = document.createElement('div');
  var form = new _Webform.default(formElement);
  var formJson = {
    components: [{
      key: 'textField',
      label: 'Text Field',
      type: 'textfield',
      calculateValue: "value = value + '_calculated'"
    }]
  };
  form.setForm(formJson).then(function () {
    var textField = form.getComponent('textField');

    var spy = _sinon.default.spy(textField, 'calculateComponentValue');

    form.onChange({
      textField: 'test'
    });
    setTimeout(function () {
      (0, _chai.expect)(spy.calledOnce).to.be.true;
      done();
    }, 500);
  }).catch(function (err) {
    return done(err);
  });
});
it('Should mark as invalid only invalid fields in multiple components', function (done) {
  var formElement = document.createElement('div');
  var form = new _Webform.default(formElement);
  var formJson = {
    components: [{
      label: 'Email',
      tableView: true,
      multiple: true,
      validate: {
        required: true
      },
      key: 'email',
      type: 'email',
      input: true
    }]
  };
  form.setForm(formJson).then(function () {
    return form.setSubmission({
      data: {
        email: ['oleg@form.io', 'oleg@form', '']
      }
    });
  }).then(function () {
    setTimeout(function () {
      var email = form.getComponent('email');
      (0, _chai.expect)(email.refs.input[0].classList.contains('is-invalid')).to.be.false;
      (0, _chai.expect)(email.refs.input[1].classList.contains('is-invalid')).to.be.true;
      (0, _chai.expect)(email.refs.input[2].classList.contains('is-invalid')).to.be.true;
      done();
    }, 300);
  }).catch(done);
});
describe('shouldDisplayRedAsterisk', function () {
  it('modalPreview template should have className "field-required" if component is required', function (done) {
    _harness.default.testCreate(_Component.default, (0, _merge2.default)({}, _comp2.default, {
      validate: {
        required: true
      }
    })).then(function (cmp) {
      _powerAssert.default.equal(!!cmp.element.querySelector('.field-required'), true);

      done();
    }, done).catch(done);
  });
});