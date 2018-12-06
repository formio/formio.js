import HTMLComponent from './HTML';
import assert from 'assert';
describe('HTML Unit Tests', () => {
  it('Should create a new HTML component', () => {
    const html = new HTMLComponent();
    assert.equal(html.key, '');
  });
  it('Checking the default schema of the component', () => {
    const html = new HTMLComponent();
    assert.equal(html.key, '');
    assert.equal(html.defaultSchema.input, '');
    assert.equal(html.defaultSchema.multiple, false);
    assert.equal(html.defaultSchema.tag, 'p');
    assert.equal(html.defaultSchema.content, '');
  });
  it('Rendering the HTML component', () => {
    const html = new HTMLComponent();
    assert.equal(html.rendered,false);
    html.render();
    assert.equal(html.rendered,true);
  });
});
