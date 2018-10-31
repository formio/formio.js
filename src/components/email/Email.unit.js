import EmailComponent from './Email';
import assert from 'assert';
describe('Email Unit Tests', () => {
  it('Should create a new Email component', () => {
    const email = new EmailComponent({
      label: 'Email',
      key: 'email',
      type: 'email'
    });

    assert.equal(email.key, 'email');
  });
  it('Should create a new Email component with Placeholder', () => {
    const email = new EmailComponent({
      label: 'Email',
      key: 'email',
      type: 'email',
      placeholder:'test@test.com'
    });

    assert.equal(email.component.placeholder, 'test@test.com');
  });
  it('Adding prefix', () => {
    const email = new EmailComponent({
      label: 'Email',
      key: 'email',
      type: 'email',
      prefix:'$'
    });

    assert.equal(email.component.prefix, '$');
  });
  it('Adding suffix', () => {
    const email = new EmailComponent({
      label: 'Email',
      key: 'email',
      type: 'email',
      suffix:'.com'
    });

    assert.equal(email.component.suffix, '.com');
  });
  it('Adding prefix and suffix', () => {
    const email = new EmailComponent({
      label: 'Email',
      key: 'email',
      type: 'email',
      suffix:'.com',
      prefix:'$'
    });

    assert.equal(email.component.prefix, '$');
    assert.equal(email.component.suffix, '.com');
  });
  it('Setting default value', () => {
    const email = new EmailComponent({
      label: 'Email',
      key: 'email',
      type: 'email',
      defaultValue: 'test@example.com'
    });

    assert.equal(email.component.defaultValue, 'test@example.com');
  });
  it('Setting required', () => {
    const email = new EmailComponent({
      label: 'Email',
      key: 'email',
      type: 'email',
      validate:{
        required:true
      }
    });

    assert.equal(email.component.validate.required, true);
  });
  it('Setting not required', () => {
    const email = new EmailComponent({
      label: 'Email',
      key: 'email',
      type: 'email'
    });

    assert.equal(email.component.validate.required, false);
  });
  it('Should create a new Email component without Label', () => {
    const email = new EmailComponent({
      label: '',
      key: 'email',
      type: 'email'
    });

    assert.equal(email.label, '');
  });
  it('Setting custom class', () => {
    const email = new EmailComponent({
      label: 'Email',
      key: 'email',
      type: 'email',
      customClass: 'my-class'
    });

    assert.equal(email.component.customClass, 'my-class');
  });
  it('Setting multi-valued', () => {
    const email = new EmailComponent({
      label: 'Email',
      key: 'email',
      type: 'email',
      multiple: true
    });

    assert.equal(email.component.multiple, true);
  });
  it('Adding removing rows', () => {
    const email = new EmailComponent({
      label: 'Email',
      key: 'email',
      type: 'email',
      defaultValue: 'test@example.com',
      multiple: true
    });

    assert.equal(email.dataValue.length,1);
    email.addNewValue('test@example.com');
    assert.equal(email.dataValue.length,2);
    email.removeValue(1);
    assert.equal(email.dataValue.length,1);
  });
});
