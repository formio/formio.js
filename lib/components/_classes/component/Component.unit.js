'use strict';

require("core-js/modules/es.string.trim");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _chai = require("chai");

var _Component = _interopRequireDefault(require("./Component"));

var _harness = _interopRequireDefault(require("../../../../test/harness"));

var _fixtures = require("./fixtures");

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _comp = _interopRequireDefault(require("./fixtures/comp3"));

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
    });
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