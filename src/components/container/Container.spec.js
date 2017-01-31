'use strict';
import assert from 'power-assert';
import ContainerComponent from './Container';
import { components as comps } from './fixtures/index';
import { Harness as Harness } from '../../../test/harness';
describe('Container Component', function() {
  it('Should build a container component', function(done) {
    Harness.testCreate(ContainerComponent, comps.comp1).then((component) => {
      let inputs = Harness.testInputs(component, 'input[type="text"]', 2);
      for (let i=0; i < inputs.length; i++) {
        assert.equal(inputs[i].name, 'data[' + comps.comp1.key + '][' + comps.comp1.components[i].key + ']');
      }
      done();
    });
  });

  it('Should be able to set and get data', function(done) {
    Harness.testCreate(ContainerComponent, comps.comp1).then((component) => {
      let inputs = Harness.testInputs(component, 'input[type="text"]', 2);
      Harness.testSetGet(component, {
        firstName: 'Joe',
        lastName: 'Smith'
      });
      assert.equal(inputs[0].value, 'Joe');
      assert.equal(inputs[1].value, 'Smith');
      done();
    });
  });
});
