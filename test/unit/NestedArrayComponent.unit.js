'use strict';
import NestedArrayComponent from '../../src/components/_classes/nestedarray/NestedArrayComponent';
import Harness from '../harness';

let component = null;
describe('NestedArrayComponent class', () => {
  it('Should create a new NestedArrayComponent class', () => {
    return Harness.testCreate(NestedArrayComponent, {
      // key: 'nested',
      components: [
        {
          type: 'textfield',
          key: 'firstName',
          input: true
        },
        {
          type: 'textfield',
          key: 'lastName',
          input: true
        }
      ]
    }).then((_component) => {
      component = _component;
      Harness.testElements(component, 'input[name="data[firstName]"]', 1);
      Harness.testElements(component, 'input[name="data[lastName]"]', 1);
    });
  });
});
