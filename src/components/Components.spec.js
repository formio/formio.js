'use strict';
import { FormioComponents } from './Components';
import { Harness } from '../../test/harness';
import assert from 'power-assert';
import each from 'lodash/each';
describe('FormioComponents class', () => {
  let component = null;
  it('Should create a new FormioComponents class', (done) => {
    Harness.testCreate(FormioComponents, {
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
      done();
    });
  });

  it('Should be able to add new components', () => {
    component.addComponent({
      type: 'email',
      key: 'email',
      input: true
    });
    Harness.testElements(component, 'input[name="data[firstName]"]', 1);
  });

  it('Should be able to set data within the components.', () => {
    let value = {
      firstName: 'Joe',
      lastName: 'Smith',
      email: 'joe@example.com'
    };
    component.setValue(value);
    assert.deepEqual(component.getValue(), value);
    each(component.components, (component) => {
      assert.equal(component.getValue(), value[component.component.key]);
    });
  });
});
