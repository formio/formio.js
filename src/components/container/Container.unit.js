import assert from 'power-assert';
import _ from 'lodash';
import Harness from '../../../test/harness';
import ContainerComponent from './Container';

import {
  comp1,
  comp2,
  comp3,
  comp4,
} from './fixtures';

import Formio from '../../Formio';

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

  it('Should set the dataValue, but after it sets the value of its nested components', () => {
    return Harness.testCreate(ContainerComponent, comp2).then((component) => {
      const editGrid = component.getComponent('children');
      const setValue = editGrid.setValue;
      editGrid.setValue = function(...args) {
        const changed = setValue.call(editGrid, ...args);
        assert(changed, 'The edit grid must have changed');
        return changed;
      };
      component.setValue({
        children: [
          {
            name: 'Joe'
          },
          {
            name: 'Sally'
          }
        ]
      });
    });
  });

  it('Should render form with a submission in a draft-state without validation errors', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      form.submission = {
        data: {
          'container': {
            'textField': 'a',
          }
        }
      };

      setTimeout(() => {
        const textField = form.getComponent(['textField']);
        const container = form.getComponent(['container']);
        assert.equal(textField.errors.length, 0);
        assert.equal(container.errors.length, 0);
        done();
      }, 100);
    }).catch(done);
  });

  it('Should not set the default value when clearOnHide during the server-side validation', (done) => {
    const form = _.cloneDeep(comp4);
    const element = document.createElement('div');

    Formio.createForm(element, form, { server: true, noDefaults: true }).then(form => {
      form.setValue({ data: { checkbox: false } }, {
        sanitize: true,
      }, true);

      form.checkConditions();
      form.clearOnHide();

      setTimeout(() => {
        assert.deepEqual(form._data, { checkbox: false }, 'Should not add Container\'s key');
        done();
      }, 200);
    }).catch(done);
  });
});
