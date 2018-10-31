import ContentComponent from './Content';
import assert from 'assert';
describe('Content Unit Tests', () => {
  it('Should create a new Content component', () => {
    const content = new ContentComponent({
      label: 'Content',
      key: 'content',
      type: 'content'
    });

    assert.equal(content.component.key, 'content');
  });
  it('Check the html for content component', () => {
    const content = new ContentComponent({
      label: 'Content',
      key: 'content',
      type: 'content',
      html: ''
    });

    assert.equal(content.component.html, '');
  });
});
