'use strict';
import { Validator } from './Validator';
import assert from 'power-assert';
describe('Validator Tests', () => {
  it('Should test for minLength', () => {
    assert.equal(Validator.validators.minLength.check({}, 5, 'test'), false);
    assert.equal(Validator.validators.minLength.check({}, 4, 'test'), true);
    assert.equal(Validator.validators.minLength.check({}, 3, 'test'), true);
    assert.equal(Validator.validators.minLength.check({}, 6, 'test'), false);
    assert.equal(Validator.validators.minLength.check({}, 6, ''), false);
  });

  it('Should test for maxLength', () => {
    assert.equal(Validator.validators.maxLength.check({}, 5, 'test'), true);
    assert.equal(Validator.validators.maxLength.check({}, 4, 'test'), true);
    assert.equal(Validator.validators.maxLength.check({}, 3, 'test'), false);
    assert.equal(Validator.validators.maxLength.check({}, 6, 'test'), true);
    assert.equal(Validator.validators.maxLength.check({}, 6, ''), true);
  });

  it('Should test for email', () => {
    assert.equal(Validator.validators.email.check({}, '', 'test'), false);
    assert.equal(Validator.validators.email.check({}, '', 'test@a'), false);
    assert.equal(Validator.validators.email.check({}, '', 'test@example.com'), true);
    assert.equal(Validator.validators.email.check({}, '', 'test@a.com'), true);
    assert.equal(Validator.validators.email.check({}, '', 'test@a.co'), true);
  });

  it('Should test for required', () => {
    assert.equal(Validator.validators.required.check({}, true, ''), false);
    assert.equal(Validator.validators.required.check({}, true, 't'), true);
    assert.equal(Validator.validators.required.check({}, false, ''), true);
    assert.equal(Validator.validators.required.check({}, false, 'tes'), true);
    assert.equal(Validator.validators.required.check({}, true, undefined), false);
    assert.equal(Validator.validators.required.check({}, true, null), false);
    assert.equal(Validator.validators.required.check({}, true, []), false);
    assert.equal(Validator.validators.required.check({}, true, ['test']), true);
  });

  it('Should test for custom', () => {
    assert.equal(Validator.validators.custom.check({}, 'valid = (input == "test")', 'test'), true);
    assert.equal(Validator.validators.custom.check({}, 'valid = (input == "test")', 'test2'), false);
    assert.equal(Validator.validators.custom.check({}, 'valid = (input == "test") ? true : "Should be false."', 'test2'), 'Should be false.');
    assert.equal(Validator.validators.custom.check({}, 'valid = (input == "test") ? true : "Should be false."', 'test'), true);
  });

  it('Should test for pattern', () => {
    assert.equal(Validator.validators.pattern.check({}, 'A.*', 'A'), true);
    assert.equal(Validator.validators.pattern.check({}, 'A.*', 'Aaaa'), true);
    assert.equal(Validator.validators.pattern.check({}, '\w+', 'test'), false);
    assert.equal(Validator.validators.pattern.check({}, '\\w+', 'test'), true);
    assert.equal(Validator.validators.pattern.check({}, '\\w+@\\w+', 'test@a'), true);
    assert.equal(Validator.validators.pattern.check({}, '\\w+@\\w+', 'test@example.com'), false);
  });
});
