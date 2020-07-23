import assert from 'power-assert';
import _ from 'lodash';
import Harness from '../../../test/harness';
import TextFieldComponent from './TextField';
import NativePromise from 'native-promise-only';

import {
  comp1,
  comp2,
  comp4,
  comp5
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

  it('Should disable multiple mask selector if component is disabled', (done) => {
    Harness.testCreate(TextFieldComponent, comp4).then((component) => {
      Harness.testElements(component, '[disabled]', 2);
      done();
    });
  });

  it('Should provide required validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { required: true }
    })).then((component) => {
      return Harness.testInvalid(component, '', 'firstName', 'First Name is required').then(() => component);
    }).then((component) => {
      return Harness.testValid(component, 'te').then(() => component);
    });
  });

  it('Should provide minWords validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { minWords: 2 }
    })).then((component) => {
      return Harness.testInvalid(component, 'test', 'firstName', 'First Name must have at least 2 words.').then(() => component);
    }).then((component) => {
      return Harness.testValid(component, 'te st').then(() => component);
    });
  });

  it('Should correctly calculate remaining words', (done) => {
    Harness.testCreate(TextFieldComponent, comp5).then((component) => {
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      const element = component.refs.input[0];

      element.value = 'paper format A4';
      element.dispatchEvent(inputEvent);

      setTimeout(()=>{
        assert.equal(component.refs.wordcount[0].textContent, '2 words remaining.');

        element.value = 'Hey, guys! We are here!!';
        element.dispatchEvent(inputEvent);

        setTimeout(()=>{
          assert.equal(component.refs.wordcount[0].textContent, '0 words remaining.');

          element.value = ' Some   test   text  111 ';
          element.dispatchEvent(inputEvent);

          setTimeout(()=>{
            assert.equal(component.refs.wordcount[0].textContent, '1 words remaining.');

            done();
          }, 300);
        }, 275);
      }, 250);
    });
  });

  it('Should provide maxWords validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { maxWords: 2 }
    })).then((component) => {
      return Harness.testInvalid(component, 'test test test', 'firstName', 'First Name must have no more than 2 words.').then(() => component);
    }).then((component) => {
      return Harness.testValid(component, 'te st').then(() => component);
    });
  });

  it('Should provide minLength validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { minLength: 2 }
    })).then((component) => {
      return Harness.testInvalid(component, 't', 'firstName', 'First Name must have at least 2 characters.').then(() => component);
    }).then((component) => {
      return Harness.testValid(component, 'te').then(() => component);
    });
  });

  it('Should provide maxLength validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { maxLength: 5 }
    })).then(component => {
      return Harness.testInvalid(component, 'testte', 'firstName', 'First Name must have no more than 5 characters.').then(() => component);
    }).then((component) => {
      return Harness.testValid(component, 'te').then(() => component);
    });
  });

  it('Should provide custom validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: {
        custom: 'valid = (input !== "Joe") ? true : "You cannot be Joe"'
      }
    })).then((component) => {
      return NativePromise.all[
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
      return NativePromise.all[
        Harness.testInvalid(component, 'Tom', 'firstName', 'You must be Joe'),
        Harness.testValid(component, 'Joe')
      ];
    });
  });
});
