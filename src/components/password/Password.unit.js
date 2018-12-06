import PasswordComponent from './Password';
import assert from 'assert';
describe('Password Unit Tests', () => {
  it('Should create a new Password component', () => {
    const password = new PasswordComponent();
    assert.equal(password.key,'password');
  });
  it('Checking the  default schema of the password component', () => {
    const password = new PasswordComponent();
    assert.equal(password.defaultSchema.type,'password');
  });
  it('Checking the input info of the component', () => {
    const password = new PasswordComponent();
    assert.equal(password.inputInfo.id,'password');
    assert.equal(password.inputInfo.attr.name,'data[password]');
    assert.equal(password.inputInfo.attr.class,'form-control');
    assert.equal(password.inputInfo.attr.lang,'en');
  });
});
