import RadioComponent from './Radio';
import assert from 'assert';
describe('Radio Unit Tests', () => {
  it('Should create a new Radio component', () => {
    const radio = new RadioComponent();
    assert.equal(radio.key,'radio');
  });
  it('Checking the  default schema of the radio component', () => {
    const radio = new RadioComponent();
    assert.equal(radio.defaultSchema.inputType,'radio');
    assert.equal(radio.defaultSchema.fieldSet,false);
    assert.equal(radio.defaultSchema.validate.customPrivate,false);
  });
});
