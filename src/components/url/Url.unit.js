import UrlComponent from './Url';
import assert from 'assert';
describe('UrlComponent Unit Tests', () => {
  it('Should create a new UrlComponent component', () => {
    const url = new UrlComponent();
    assert.equal(url.key,'url');
  });
  it('Checking the  default schema of the url component', () => {
    const url = new UrlComponent();
    assert.equal(url.defaultSchema.input,true);
    assert.equal(url.defaultSchema.inputType,'url');
  });
});
