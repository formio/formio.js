'use strict';
import {Validator} from './Validator';
import {BaseComponent} from './base/Base';
import assert from 'power-assert';
describe('Validator Tests', () => {
  const baseComponent = new BaseComponent({});

  it('Should test for minLength', () => {
    assert.equal(Validator.validators.minLength.check(baseComponent, 5, 'test'), false);
    assert.equal(Validator.validators.minLength.check(baseComponent, 4, 'test'), true);
    assert.equal(Validator.validators.minLength.check(baseComponent, 3, 'test'), true);
    assert.equal(Validator.validators.minLength.check(baseComponent, 6, 'test'), false);
    assert.equal(Validator.validators.minLength.check(baseComponent, 6, ''), false);
  });

  it('Should test for maxLength', () => {
    assert.equal(Validator.validators.maxLength.check(baseComponent, 5, 'test'), true);
    assert.equal(Validator.validators.maxLength.check(baseComponent, 4, 'test'), true);
    assert.equal(Validator.validators.maxLength.check(baseComponent, 3, 'test'), false);
    assert.equal(Validator.validators.maxLength.check(baseComponent, 6, 'test'), true);
    assert.equal(Validator.validators.maxLength.check(baseComponent, 6, ''), true);
  });

  it('Should test for email', () => {
    assert.equal(Validator.validators.email.check(baseComponent, '', 'test'), false);
    assert.equal(Validator.validators.email.check(baseComponent, '', 'test@a'), false);
    assert.equal(Validator.validators.email.check(baseComponent, '', 'test@example.com'), true);
    assert.equal(Validator.validators.email.check(baseComponent, '', 'test@a.com'), true);
    assert.equal(Validator.validators.email.check(baseComponent, '', 'test@a.co'), true);
  });

  it('Should test for required', () => {
    assert.equal(Validator.validators.required.check(baseComponent, true, ''), false);
    assert.equal(Validator.validators.required.check(baseComponent, true, 't'), true);
    assert.equal(Validator.validators.required.check(baseComponent, false, ''), true);
    assert.equal(Validator.validators.required.check(baseComponent, false, 'tes'), true);
    assert.equal(Validator.validators.required.check(baseComponent, true, undefined), false);
    assert.equal(Validator.validators.required.check(baseComponent, true, null), false);
    assert.equal(Validator.validators.required.check(baseComponent, true, []), false);
    assert.equal(Validator.validators.required.check(baseComponent, true, ['test']), true);
  });

  it('Should test for custom', () => {
    assert.equal(Validator.validators.custom.check(baseComponent, 'valid = (input == "test")', 'test'), true);
    assert.equal(Validator.validators.custom.check(baseComponent, 'valid = (input == "test")', 'test2'), false);
    assert.equal(Validator.validators.custom.check(baseComponent, 'valid = (input == "test") ? true : "Should be false."', 'test2'), 'Should be false.');
    assert.equal(Validator.validators.custom.check(baseComponent, 'valid = (input == "test") ? true : "Should be false."', 'test'), true);
  });

  it('Should test for pattern', () => {
    assert.equal(Validator.validators.pattern.check(baseComponent, 'A.*', 'A'), true);
    assert.equal(Validator.validators.pattern.check(baseComponent, 'A.*', 'Aaaa'), true);
    assert.equal(Validator.validators.pattern.check(baseComponent, '\w+', 'test'), false);
    assert.equal(Validator.validators.pattern.check(baseComponent, '\\w+', 'test'), true);
    assert.equal(Validator.validators.pattern.check(baseComponent, '\\w+@\\w+', 'test@a'), true);
    assert.equal(Validator.validators.pattern.check(baseComponent, '\\w+@\\w+', 'test@example.com'), false);
  });

  it('Should test for json', () => {
    assert.equal(Validator.validators.json.check(baseComponent, {
      or: [{'_isEqual': [{var: 'data.test'}, ['1', '2', '3']]}, 'Should be false.']
    }, null, {test: ['1', '2', '3']}), true);
    assert.equal(Validator.validators.json.check(baseComponent, {
      or: [{'_isEqual': [{var: 'data.test'}, ['1', '2', '3']]}, 'Should be false.']
    }, null, {test: ['1', '2', '4']}), 'Should be false.');
  });
});
