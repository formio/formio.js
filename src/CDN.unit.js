import CDN from './CDN';
import assert from 'power-assert';

describe('Formio.js CDN class Tests', () => {
  it('Should give correct cdn URLs', () => {
    const cdn = new CDN('https://cdn.form.io');
    for (const lib in cdn.libs) {
      let expectedUrl = `${cdn.baseUrl}/${lib}/${cdn.libs[lib]}`;
      if (cdn.libs[lib] === '') {
        expectedUrl = `${cdn.baseUrl}/${lib}`;
      }
      assert.equal(cdn[lib], expectedUrl);
    }
  });
});
