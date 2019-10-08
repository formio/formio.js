'use strict';

var _Validator = _interopRequireDefault(require("./Validator"));

var _Component = _interopRequireDefault(require("./_classes/component/Component"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Validator Tests', function () {
  var baseComponent = new _Component.default({});
  it('Should test for minLength', function () {
    _powerAssert.default.equal(_Validator.default.validators.minLength.check(baseComponent, 5, 'test'), false);

    _powerAssert.default.equal(_Validator.default.validators.minLength.check(baseComponent, 4, 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.minLength.check(baseComponent, 3, 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.minLength.check(baseComponent, 6, 'test'), false);

    _powerAssert.default.equal(_Validator.default.validators.minLength.check(baseComponent, 6, ''), false);
  });
  it('Should test for maxLength', function () {
    _powerAssert.default.equal(_Validator.default.validators.maxLength.check(baseComponent, 5, 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.maxLength.check(baseComponent, 4, 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.maxLength.check(baseComponent, 3, 'test'), false);

    _powerAssert.default.equal(_Validator.default.validators.maxLength.check(baseComponent, 6, 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.maxLength.check(baseComponent, 6, ''), true);
  });
  it('Should test for email', function () {
    _powerAssert.default.equal(_Validator.default.validators.email.check(baseComponent, '', 'test'), false);

    _powerAssert.default.equal(_Validator.default.validators.email.check(baseComponent, '', 'test@a'), false);

    _powerAssert.default.equal(_Validator.default.validators.email.check(baseComponent, '', 'test@example.com'), true);

    _powerAssert.default.equal(_Validator.default.validators.email.check(baseComponent, '', 'test@a.com'), true);

    _powerAssert.default.equal(_Validator.default.validators.email.check(baseComponent, '', 'test@a.co'), true);
  });
  it('Should test for required', function () {
    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, true, ''), false);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, true, 't'), true);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, false, ''), true);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, false, 'tes'), true);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, true, undefined), false);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, true, null), false);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, true, []), false);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, true, ['test']), true);
  });
  it('Should test for custom', function () {
    _powerAssert.default.equal(_Validator.default.validators.custom.check(baseComponent, 'valid = (input == "test")', 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.custom.check(baseComponent, 'valid = (input == "test")', 'test2'), false);

    _powerAssert.default.equal(_Validator.default.validators.custom.check(baseComponent, 'valid = (input == "test") ? true : "Should be false."', 'test2'), 'Should be false.');

    _powerAssert.default.equal(_Validator.default.validators.custom.check(baseComponent, 'valid = (input == "test") ? true : "Should be false."', 'test'), true);
  });
  it('Should test for pattern', function () {
    _powerAssert.default.equal(_Validator.default.validators.pattern.check(baseComponent, 'A.*', 'A'), true);

    _powerAssert.default.equal(_Validator.default.validators.pattern.check(baseComponent, 'A.*', 'Aaaa'), true);

    _powerAssert.default.equal(_Validator.default.validators.pattern.check(baseComponent, 'w+', 'test'), false);

    _powerAssert.default.equal(_Validator.default.validators.pattern.check(baseComponent, '\\w+', 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.pattern.check(baseComponent, '\\w+@\\w+', 'test@a'), true);

    _powerAssert.default.equal(_Validator.default.validators.pattern.check(baseComponent, '\\w+@\\w+', 'test@example.com'), false);
  });
  it('Should test for json', function () {
    _powerAssert.default.equal(_Validator.default.validators.json.check(baseComponent, {
      or: [{
        '_isEqual': [{
          var: 'data.test'
        }, ['1', '2', '3']]
      }, 'Should be false.']
    }, null, {
      test: ['1', '2', '3']
    }), true);

    _powerAssert.default.equal(_Validator.default.validators.json.check(baseComponent, {
      or: [{
        '_isEqual': [{
          var: 'data.test'
        }, ['1', '2', '3']]
      }, 'Should be false.']
    }, null, {
      test: ['1', '2', '4']
    }), 'Should be false.');
  });
});