'use strict';

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _Base = require('./Base');

var _harness = require('../../../test/harness');

var _index = require('./fixtures/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Base Component', function () {
  it('Should build a base component', function (done) {
    _harness.Harness.testCreate(_Base.BaseComponent, _index.components.comp1).then(function (component) {
      var inputs = _harness.Harness.testElements(component, 'input[type="text"]', 1);
      for (var i = 0; i < inputs.length; i++) {
        _powerAssert2.default.equal(inputs[i].name, 'data[' + _index.components.comp1.key + ']');
      }
      done();
    });
  });

  it('Should provide required validation', function (done) {
    _harness.Harness.testCreate(_Base.BaseComponent, (0, _merge3.default)({}, _index.components.comp1, {
      validate: { required: true }
    })).then(function (component) {
      return _harness.Harness.testComponent(component, {
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
    _harness.Harness.testCreate(_Base.BaseComponent, (0, _merge3.default)({}, _index.components.comp1, {
      validate: { minLength: 2 }
    })).then(function (component) {
      return _harness.Harness.testComponent(component, {
        bad: {
          value: 't',
          field: 'firstName',
          error: 'First Name must be longer than 1 characters.'
        },
        good: {
          value: 'te'
        }
      }, done);
    });
  });

  it('Should provide maxLength validation', function (done) {
    _harness.Harness.testCreate(_Base.BaseComponent, (0, _merge3.default)({}, _index.components.comp1, {
      validate: { maxLength: 5 }
    })).then(function (component) {
      return _harness.Harness.testComponent(component, {
        bad: {
          value: 'testte',
          field: 'firstName',
          error: 'First Name must be shorter than 6 characters.'
        },
        good: {
          value: 'te'
        }
      }, done);
    });
  });

  it('Should provide custom validation', function (done) {
    _harness.Harness.testCreate(_Base.BaseComponent, (0, _merge3.default)({}, _index.components.comp1, {
      validate: {
        custom: 'valid = (input !== "Joe") ? true : "You cannot be Joe"'
      }
    })).then(function (component) {
      return _harness.Harness.testComponent(component, {
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
    _harness.Harness.testCreate(_Base.BaseComponent, (0, _merge3.default)({}, _index.components.comp1, {
      validate: {
        json: {
          "if": [{
            "===": [{ var: "data.firstName" }, "Joe"]
          }, true, "You must be Joe"]
        }
      }
    })).then(function (component) {
      return _harness.Harness.testComponent(component, {
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

  it('Should allow for multiple values', function (done) {
    _harness.Harness.testCreate(_Base.BaseComponent, _index.components.comp2).then(function (component) {
      _harness.Harness.testElements(component, 'table', 1);
      _harness.Harness.testElements(component, 'table tr', 2);
      _harness.Harness.testElements(component, 'table tr:first-child td', 2);
      _harness.Harness.testElements(component, 'table tr:first-child td:first-child input[name="data[names]"]', 1);
      _harness.Harness.testElements(component, 'table tr:first-child td:last-child span.glyphicon-remove-circle', 1);
      done();
    });
  });
});