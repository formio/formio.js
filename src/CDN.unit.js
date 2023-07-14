import CDN from './CDN';
import assert from 'power-assert';

describe('Formio.js CDN class Tests', () => {
  let cdn;
  before(() => {
    cdn = new CDN('https://cdn.form.io');
  });

  it('Should give correct CDN URLs', () => {
    for (const lib in cdn.libs) {
      let expectedUrl = `${cdn.baseUrl}/${lib}/${cdn.libs[lib]}`;
      if (cdn.libs[lib] === '' || cdn.libs[lib] === 'latest') {
        expectedUrl = `${cdn.baseUrl}/${lib}`;
      }
      assert.equal(cdn[lib], expectedUrl);
    }
  });

  it('Should update lib versions', () => {
    cdn.setVersion('grid', '1.1.1');
    assert.equal(cdn.grid, 'https://cdn.form.io/grid/1.1.1');
  });

  it('Shoudl override CDN urls', () => {
    cdn.setOverrideUrl('grid', 'http://cdn.test-form.io');
    cdn.setVersion('grid', 'latest');
    assert.equal(cdn.grid, 'http://cdn.test-form.io/grid');

    cdn.setOverrideUrl('ace', 'http://cdn.test-form.io');
  });

  it('Should remove overrides', () => {
    cdn.removeOverrides();
    for (const lib in cdn.libs) {
      let expectedUrl = `${cdn.baseUrl}/${lib}/${cdn.libs[lib]}`;
      if (cdn.libs[lib] === '' || cdn.libs[lib] === 'latest') {
        expectedUrl = `${cdn.baseUrl}/${lib}`;
      }
      assert.equal(cdn[lib], expectedUrl);
    }
  });
});
