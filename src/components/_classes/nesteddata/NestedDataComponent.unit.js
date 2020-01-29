'use strict';
import NestedDataComponent from './NestedDataComponent';
import Harness from '../../../../test/harness';

let component = null;
describe('NestedDataComponent class', () => {
  it('Should create a new NestedDataComponent class', () => {
    return Harness.testCreate(NestedDataComponent, {
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
