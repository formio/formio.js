import PhoneNumberComponent from './PhoneNumber';
import assert from 'assert';
describe('PhoneNumber Unit Tests', () => {
  it('Should create a new PhoneNumber component', () => {
    const phoneNumber = new PhoneNumberComponent();
    assert.equal(phoneNumber.key,'phoneNumber');
  });
  it('Checking the  default schema of the phoneNumber component', () => {
    const phoneNumber = new PhoneNumberComponent();
    assert.equal(phoneNumber.defaultSchema.type,'phoneNumber');
  });
});
