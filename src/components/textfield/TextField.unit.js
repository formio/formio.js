import assert from 'power-assert';
import _ from 'lodash';
import Harness from '../../../test/harness';
import TextFieldComponent from './TextField';

import {
  comp1,
  comp2
} from './fixtures';

describe('TextField Component', () => {
  it('Should create a new TextField', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield'
    });

    assert.equal(textField.component.key, 'firstName');
  });

  it('Should build a TextField component', () => {
    return Harness.testCreate(TextFieldComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
    });
  });

  it('Should provide required validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { required: true }
    })).then(async component => {
      await Harness.testInvalid(component, '', 'firstName', 'First Name is required');
      await Harness.testValid(component, 'te');
    });
  });

  it('Should provide minLength validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { minLength: 2 }
    })).then(async component => {
      await Harness.testInvalid(component, 't', 'firstName', 'First Name must be longer than 1 characters.');
      await Harness.testValid(component, 'te');
    });
  });

  it('Should provide maxLength validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { maxLength: 5 }
    })).then(async component => {
      await Harness.testInvalid(component, 'testte', 'firstName', 'First Name must be shorter than 6 characters.');
      await Harness.testValid(component, 'te');
    });
  });

  it('Should provide custom validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: {
        custom: 'valid = (input !== "Joe") ? true : "You cannot be Joe"'
      }
    })).then((component) => {
      return Promise.all[
        Harness.testInvalid(component, 'Joe', 'firstName', 'You cannot be Joe'),
        Harness.testValid(component, 'Tom')
      ];
    });
  });

  it('Should provide json validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: {
        json: {
          'if': [
            {
              '===': [
                { var: 'data.firstName' },
                'Joe'
              ]
            },
            true,
            'You must be Joe'
          ]
        }
      }
    })).then((component) => {
      return Promise.all[
        Harness.testInvalid(component, 'Tom', 'firstName', 'You must be Joe'),
        Harness.testValid(component, 'Joe')
      ];
    });
  });
});
