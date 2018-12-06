import TextFieldComponent from './TextField';
import assert from 'assert';
describe('TextField Unit Tests', () => {
  it('Checking default schema', () => {
    const textField = new TextFieldComponent();
    assert.equal(textField.defaultSchema.input, true);
    assert.equal(textField.defaultSchema.key, 'textField');
    assert.equal(textField.defaultSchema.multiple, false);
    assert.equal(textField.defaultSchema.validateOn, 'change');
  });
  it('Checking input info', () => {
    const textField = new TextFieldComponent();
    assert.equal(textField.inputInfo.type, 'input');
    assert.equal(textField.inputInfo.id, 'textField');
    assert.equal(textField.inputInfo.changeEvent, 'input');
  });
  it('Input Mapping', () => {
    const textField = new TextFieldComponent();
    assert.equal(textField.performInputMapping('Test'),'Test');
  });
});
