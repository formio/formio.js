import assert from 'power-assert';
import _ from 'lodash';
import Harness from '../harness';
import ContainerComponent from '../../src/components/container/Container';

import {
  comp1,
  comp2,
  comp3,
  comp4,
} from './fixtures/container';

import { Formio } from '../../src/Formio';

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

  it('Should submit form with a submission in a draft-state without validation errors', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    Formio.createForm(element, form).then(form => {
      form.nosubmit = true;
      form.setSubmission({
        state: 'draft',
        data: {
          'container': {
            'textField': 'a',
          }
        }
      }).then(() => {
        form.submitForm().then((event) => {
          // It should allow the submission in the renderer.
          assert.equal(event.submission.state, 'draft');
          done();
        }).catch((err) => done(err));
      }).catch(done);
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

  describe('Container component calculations when noDefaults Form Renderer Option', () => {
    const formTemplate = {
      "_id": "67978d7ab71bdbf9f76c6bf7",
      "title": "testNoDef",
      "name": "testNoDef",
      "path": "testnodef",
      "type": "form",
      "display": "form",
      "components": [
        {
          "label": "Container",
          "tableView": false,
          "key": "container",
          "type": "container",
          "input": true,
          "components": [
            {
              "label": "Text Field",
              "key": "textField",
              "type": "textfield",
              "input": true,
            },
            {
              "label": "Text Field Calculation",
              "key": "textFieldCalculation",
              "type": "textfield",
              "input": true,
              "calculateValue": "value = data.container.textField"
            }
          ]
        },
        {
          "type": "button",
          "label": "Submit",
          "key": "submit",
          "disableOnInvalid": true,
          "input": true
        }
      ]
    };

    it('Should set correct form data and make correct container component calculations when noDefaults Form Renderer Option is set', async () => {
      const element = document.createElement('div');
      const form = await Formio.createForm(element, formTemplate, { noDefaults: true });

      const textField = form.getComponent('textField');
      textField.setValue('test');
      await new Promise((resolve) => setTimeout(resolve, 300));

      assert.deepEqual(form._data, {
        container: {
          textField: 'test',
          textFieldCalculation: 'test'
        },
      });
    });

    it('Should set correct form data and make correct container component calculations when noDefaults Form Renderer Option is not set', async () => {
      const element = document.createElement('div');
      const form = await Formio.createForm(element, formTemplate);

      const textField = form.getComponent('textField');
      textField.setValue('test');
      await new Promise((resolve) => setTimeout(resolve, 300));

      assert.ok(Object.hasOwn(form._data, 'container'));
      assert.deepEqual(form._data.container, {
          textField: 'test',
          textFieldCalculation: 'test'
      });
    });
  })

});
