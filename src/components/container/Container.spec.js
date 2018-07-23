import assert from 'power-assert';
import Harness from '../../../test/harness';
import ContainerComponent from './Container';

import {
  comp1
} from './fixtures';

describe('Container Component', () => {
  it('Should build a container component', () => {
    return Harness.testCreate(ContainerComponent, comp1).then((component) => {
      const inputs = Harness.testElements(component, 'input[type="text"]', 2);
      for (let i=0; i < inputs.length; i++) {
        assert.equal(inputs[i].name, `data[${comp1.key}][${comp1.components[i].key}]`);
      }
    });
  });

  it('Should be able to set and get data', () => {
    return Harness.testCreate(ContainerComponent, comp1).then((component) => {
      const inputs = Harness.testElements(component, 'input[type="text"]', 2);
      Harness.testSetGet(component, {
        firstName: 'Joe',
        lastName: 'Smith'
      });
      assert.equal(inputs[0].value, 'Joe');
      assert.equal(inputs[1].value, 'Smith');
    });
  });
});
