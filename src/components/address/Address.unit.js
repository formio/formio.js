import Harness from '../../../test/harness';
import AddressComponent from './Address';
import assert from 'power-assert';

import {
  comp1,
  comp2,
  comp3
} from './fixtures';

describe('Address Component', () => {
  it('Should build an address component', () => {
    return Harness.testCreate(AddressComponent, comp1);
  });

  it('Should adopt provider options in address component created on next.form.io', function(done) {
    Harness.testCreate(AddressComponent, comp2).then((component) => {
      const { region, key } = component.component.providerOptions.params;

      assert.equal(region, component.component.providerOptions.region);
      assert.equal(key, component.component.providerOptions.apiKey);

      done();
    });
  });

  it('Should adopt provider options in address component created on portal.form.io', function(done) {
    Harness.testCreate(AddressComponent, comp3).then((component) => {
      const { region, key } = component.component.providerOptions.params;

      assert.equal(region, component.component.map.region);
      assert.equal(key, component.component.map.key);

      done();
    });
  });
});
