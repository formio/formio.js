'use strict';
import assert from 'power-assert';
import CheckBoxComponent from './Checkbox';
import { components as comps } from './fixtures/index';
import Harness from '../../../test/harness';
describe('Checkbox Component', function() {
  it('Should build a checkbox component', function(done) {
    Harness.testCreate(CheckBoxComponent, comps.comp1).then((component) => {
      let inputs = Harness.testElements(component, 'input[type="checkbox"]', 1);
      for (let i=0; i < inputs.length; i++) {
        assert.equal(inputs[i].name, 'data[' + comps.comp1.key + ']');
      }
      done();
    });
  });

  it('Should be able to set and get data', function(done) {
    Harness.testCreate(CheckBoxComponent, comps.comp1).then((component) => {
      Harness.testSetGet(component, 1);
      Harness.testSetGet(component, 0);
      done();
    });
  });
});
