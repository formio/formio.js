import TextFieldComponent from './TextField';
import assert from 'assert';
describe('TextField Unit Tests', () => {
  it('Setting value at an index', () => {
    const textField = new TextFieldComponent({
      allowMultipleMasks: true
    });
    textField.setValueAt(1,'Test Value 2');

    assert.equal(textField.getValueAt(0), 'Test Value 2');
  });
});
