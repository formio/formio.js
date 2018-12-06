import ContentComponent from './Content';
import assert from 'assert';
describe('Content Unit Tests', () => {
  it('Should create a new Content component', () => {
    const content = new ContentComponent();
    assert.equal(content.component.key, 'content');
  });
  it('Checking the default schema of the component', () => {
    const content = new ContentComponent();
    assert.equal(content.defaultSchema.input, false);
    assert.equal(content.defaultSchema.multiple, false);
    assert.equal(content.defaultSchema.type, 'content');
  });
  it('Rendering the content component', () => {
    const content = new ContentComponent();
    assert.equal(content.rendered,false);
    content.render();
    assert.equal(content.rendered,true);
  });
});
