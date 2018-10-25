import TextFieldComponent from './TextField';
import assert from 'assert';
import Component from '../_classes/component/Component';
describe('TextField Unit Tests', () => {
  it('Should create a new TextField', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield'
    });

    assert.equal(textField.component.key, 'firstName');
  });
  it('Setting Placeholder', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield',
      placeholder: 'My Placeholder'
    });

    assert.equal(textField.component.placeholder,'My Placeholder');
  });
  it('Setting prefix', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield',
      prefix: 'My prefix'
    });

    assert.equal(textField.component.prefix,'My prefix');
  });
  it('Setting suffix', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield',
      suffix: 'My suffix'
    });

    assert.equal(textField.component.suffix,'My suffix');
  });
  it('Setting suffix and prefix', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield',
      suffix: 'My suffix',
      prefix: 'My prefix'
    });

    assert.equal(textField.component.prefix,'My prefix');
    assert.equal(textField.component.suffix,'My suffix');
  });
  it('Setting default value', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield',
      defaultValue: 'My default value'
    });

    assert.equal(textField.component.defaultValue,'My default value');
  });
  it('Setting textfield to be required', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield',
      validate: {
        required: true
      }
    });

    assert.equal(textField.component.validate.required,true);
  });
  it('Fulfilling required with default values', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield',
      defaultValue: 'My default value',
      validate: {
        required: true
      }
    });

    assert.equal(textField.isValid(textField.defaultValue,true),true);
  });
  it('Validating maxLength', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield',
      defaultValue: 'My default value',
      validate: {
        maxLength: 50
      }
    });

    assert.equal(textField.isValid(textField.defaultValue,true),true);
  });
  it('Validating minLength', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield',
      defaultValue: 'My default value',
      validate: {
        minLength: 50
      }
    });

    assert.equal(textField.isValid(textField.defaultValue,true),false);
  });
  it('Validating minLength and maxLength', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield',
      defaultValue: 'My default value',
      validate: {
        minLength: 2,
        maxLength: 50
      }
    });

    assert.equal(textField.isValid(textField.defaultValue,true),true);
  });
  it('Setting multi valued textField', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield',
      multiple: true
    });

    assert.equal(textField.component.multiple,true);
  });
  it('Setting multi valued adding and remove values', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield',
      defaultValue: 'test',
      multiple: true
    });

    assert.equal(textField.dataValue.length,1);
    textField.addNewValue('Second value');
    assert.equal(textField.dataValue.length,2);
    textField.removeValue(1);
    assert.equal(textField.dataValue.length,1);
  });
});
