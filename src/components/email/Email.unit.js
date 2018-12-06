import EmailComponent from './Email';
import assert from 'assert';
describe('Email Unit Tests', () => {
  it('Should create a new Email component', () => {
    const email = new EmailComponent();
    assert.equal(email.key, 'email');
  });
  it('Checking default schema of the email component', () => {
    const email = new EmailComponent();
    assert.equal(email.defaultSchema.type,'email');
    assert.equal(email.defaultSchema.inputType,'email');
    assert.equal(email.defaultSchema.kickbox.enabled,false);
  });
});
