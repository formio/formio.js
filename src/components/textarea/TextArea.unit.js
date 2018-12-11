import TextArea from './TextArea';
import assert from 'assert';
describe('TextArea Unit Tests', () => {
  it('Should create a new TextArea component', () => {
    const textArea = new TextArea();
    assert.equal(textArea.key,'textArea');
  });
  it('Checking the  default schema of the textArea component', () => {
    const textArea = new TextArea();
    assert.equal(textArea.defaultSchema.input,true);
    assert.equal(textArea.defaultSchema.wysiwyg,false);
    assert.equal(textArea.defaultSchema.rows,3);
    assert.equal(textArea.defaultSchema.inputType,'text');
  });
  it('Get and set value', () => {
    const textArea = new TextArea();
    assert.equal(textArea.getConvertedValue('{"name":"John","age":30,"car":1}'),'{"name":"John","age":30,"car":1}');
    assert.equal(textArea.setConvertedValue('{"name":"John","age":30,"car":1}'),'{"name":"John","age":30,"car":1}');
  });
});
