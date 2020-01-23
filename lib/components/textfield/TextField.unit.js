"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

require("regenerator-runtime/runtime");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _lodash = _interopRequireDefault(require("lodash"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _TextField = _interopRequireDefault(require("./TextField"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TextField Component', function () {
  it('Should create a new TextField', function () {
    var textField = new _TextField.default({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield'
    });

    _powerAssert.default.equal(textField.component.key, 'firstName');
  });
  it('Should build a TextField component', function () {
    return _harness.default.testCreate(_TextField.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 1);
    });
  });
  it('Should provide required validation', function () {
    return _harness.default.testCreate(_TextField.default, _lodash.default.merge({}, _fixtures.comp2, {
      validate: {
        required: true
      }
    })).then(function _callee(component) {
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_harness.default.testInvalid(component, '', 'firstName', 'First Name is required'));

            case 2:
              _context.next = 4;
              return regeneratorRuntime.awrap(_harness.default.testValid(component, 'te'));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  });
  it('Should provide minLength validation', function () {
    return _harness.default.testCreate(_TextField.default, _lodash.default.merge({}, _fixtures.comp2, {
      validate: {
        minLength: 2
      }
    })).then(function _callee2(component) {
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_harness.default.testInvalid(component, 't', 'firstName', 'First Name must be longer than 1 characters.'));

            case 2:
              _context2.next = 4;
              return regeneratorRuntime.awrap(_harness.default.testValid(component, 'te'));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  });
  it('Should provide maxLength validation', function () {
    return _harness.default.testCreate(_TextField.default, _lodash.default.merge({}, _fixtures.comp2, {
      validate: {
        maxLength: 5
      }
    })).then(function _callee3(component) {
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_harness.default.testInvalid(component, 'testte', 'firstName', 'First Name must be shorter than 6 characters.'));

            case 2:
              _context3.next = 4;
              return regeneratorRuntime.awrap(_harness.default.testValid(component, 'te'));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
  });
  it('Should provide custom validation', function () {
    return _harness.default.testCreate(_TextField.default, _lodash.default.merge({}, _fixtures.comp2, {
      validate: {
        custom: 'valid = (input !== "Joe") ? true : "You cannot be Joe"'
      }
    })).then(function (component) {
      return Promise.all[(_harness.default.testInvalid(component, 'Joe', 'firstName', 'You cannot be Joe'), _harness.default.testValid(component, 'Tom'))];
    });
  });
  it('Should provide json validation', function () {
    return _harness.default.testCreate(_TextField.default, _lodash.default.merge({}, _fixtures.comp2, {
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
      return Promise.all[(_harness.default.testInvalid(component, 'Tom', 'firstName', 'You must be Joe'), _harness.default.testValid(component, 'Joe'))];
    });
  });
});