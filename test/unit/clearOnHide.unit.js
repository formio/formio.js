import Harness from '../harness';
import assert from 'power-assert';
import { Formio } from '../../src/Formio';
import { wait } from '../util';

describe('Clear on Hide (Omit When Conditionally Hidden) Behavior', function () {
  describe('Layout components', function () {
    it('Should conditionally hide children of conditionally hidden layout parents', async function () {
      const formWithconditionallyHiddenPanel = {
        components: [
          {
            type: 'checkbox',
            key: 'checkbox',
            label: 'Checkbox',
            input: true,
          },
          {
            type: 'textfield',
            key: 'textField',
            label: 'Text Field',
            input: true,
          },
          {
            type: 'panel',
            key: 'panel',
            components: [
              {
                type: 'textfield',
                key: 'childTextField',
                label: 'Text Field',
                input: true,
              },
            ],
            conditional: {
              json: { '!': { var: 'data.checkbox' } },
            },
          },
        ],
      };
      const element = document.createElement('div');
      const form = await Formio.createForm(
        element,
        formWithconditionallyHiddenPanel
      );
      const checkbox = form.getComponent('checkbox');
      const textField = form.getComponent('textField');
      const panel = form.getComponent('panel');
      const childTextField = form.getComponent('childTextField');
      assert(checkbox, 'Checkbox component not found');
      assert(textField, 'Text Field component not found');
      assert(panel, 'Panel component not found');
      assert(childTextField, 'Child Text Field component not found');

      // Initially, all components should be visible.
      assert.equal(checkbox.visible, true);
      assert.equal(textField.visible, true);
      assert.equal(panel.visible, true);
      assert.equal(childTextField.visible, true);

      // Initially, all components should not be conditionally hidden
      assert.equal(checkbox.conditionallyHidden(), false);
      assert.equal(textField.conditionallyHidden(), false);
      assert.equal(panel.conditionallyHidden(), false);
      assert.equal(childTextField.conditionallyHidden(), false);

      // Set the checkbox to true, which should hide the panel and its children
      await form.setSubmission({ data: { checkbox: true } });
      await wait(250);
      assert.equal(checkbox.visible, true);
      assert.equal(textField.visible, true);
      assert.equal(panel.visible, false);
      assert.equal(childTextField.visible, false);

      // They should also be conditionally hidden
      assert.equal(checkbox.conditionallyHidden(), false);
      assert.equal(textField.conditionallyHidden(), false);
      assert.equal(panel.conditionallyHidden(), true);
      assert.equal(childTextField.conditionallyHidden(), true);
    });

    it('Should not conditionally hide children of layout components that are hidden using the "hidden" property', async function () {
      const formWithHiddenPanel = {
        components: [
          {
            type: 'panel',
            key: 'panel',
            components: [
              {
                type: 'textfield',
                key: 'childTextField',
                label: 'Text Field',
                input: true,
              },
            ],
            hidden: true,
          },
        ],
      };
      const element = document.createElement('div');
      const form = await Formio.createForm(element, formWithHiddenPanel);
      const panel = form.getComponent('panel');
      const childTextField = form.getComponent('childTextField');
      assert(panel, 'Panel component not found');
      assert(childTextField, 'Child Text Field component not found');

      // All components should not be visible
      assert.equal(panel.visible, false);
      assert.equal(childTextField.visible, false);

      // All components should NOT be conditionally hidden
      assert.equal(
        panel.conditionallyHidden(),
        false,
        'Panel should not be conditionally hidden'
      );
      assert.equal(childTextField.conditionallyHidden(), false);
    });

    it('Should conditionally hide children of a manually hidden layout component if they have a conditional', async function () {
      const formWithHiddenPanelAndConditionalChild = {
        components: [
          {
            type: 'checkbox',
            input: true,
            label: 'Checkbox',
            key: 'checkbox',
          },
          {
            type: 'panel',
            key: 'panel',
            components: [
              {
                type: 'textfield',
                key: 'childTextField',
                label: 'Text Field',
                input: true,
                conditional: {
                  json: { '!': { var: 'data.checkbox' } },
                },
              },
            ],
            hidden: true,
          },
        ],
      };
      const element = document.createElement('div');
      const form = await Formio.createForm(
        element,
        formWithHiddenPanelAndConditionalChild
      );
      const checkbox = form.getComponent('checkbox');
      const panel = form.getComponent('panel');
      const childTextField = form.getComponent('childTextField');
      assert(checkbox, 'Checkbox component not found');
      assert(panel, 'Panel component not found');
      assert(childTextField, 'Child Text Field component not found');

      // The panel and its child should not be visible
      assert.equal(checkbox.visible, true);
      assert.equal(panel.visible, false);
      assert.equal(childTextField.visible, false);

      // Initially, the panel and its child should NOT be conditionally hidden
      assert.equal(checkbox.conditionallyHidden(), false);
      assert.equal(panel.conditionallyHidden(), false);
      assert.equal(childTextField.conditionallyHidden(), false);

      // Set the checkbox to true, which should conditionally hide the child
      await form.setSubmission({ data: { checkbox: true } });
      await wait(250);
      assert.equal(checkbox.visible, true);
      assert.equal(panel.visible, false);
      assert.equal(childTextField.visible, false);
      assert.equal(panel.conditionallyHidden(), false);
      assert.equal(childTextField.conditionallyHidden(), true);
    });

    it('Should not clear the value of a conditionally hidden child component of a hidden layout component when hiding if the form is pristine', async function () {
      const formWithHiddenPanelAndConditionalChild = {
        components: [
          {
            type: 'checkbox',
            input: true,
            label: 'Checkbox',
            key: 'checkbox',
          },
          {
            type: 'panel',
            key: 'panel',
            components: [
              {
                type: 'textfield',
                key: 'childTextField',
                label: 'Text Field',
                input: true,
                conditional: {
                  json: { '!': { var: 'data.checkbox' } },
                },
              },
            ],
            hidden: true,
          },
        ],
      };
      const element = document.createElement('div');
      const form = await Formio.createForm(
        element,
        formWithHiddenPanelAndConditionalChild
      );
      const checkbox = form.getComponent('checkbox');
      const panel = form.getComponent('panel');
      const childTextField = form.getComponent('childTextField');
      assert(checkbox, 'Checkbox component not found');
      assert(panel, 'Panel component not found');
      assert(childTextField, 'Child Text Field component not found');

      assert.equal(form.pristine, true, 'Form should be pristine');

      // Initially, all components should not be conditionally hidden
      assert.equal(
        checkbox.conditionallyHidden(),
        false,
        'Checkbox should not be conditionally hidden'
      );
      assert.equal(
        panel.conditionallyHidden(),
        false,
        'Panel should not be conditionally hidden'
      );
      assert.equal(
        childTextField.conditionallyHidden(),
        false,
        'Child Text Field should not be conditionally hidden'
      );

      assert.deepEqual(
        form.data,
        { checkbox: false, childTextField: '' },
        'Initial form data is incorrect'
      );

      // Hide the panel, which should NOT clear the value of the child text field
      await form.setSubmission({
        data: { checkbox: true, childTextField: 'test' },
      });
      await wait(250);
      assert.equal(
        childTextField.conditionallyHidden(),
        true,
        'Child Text Field should be conditionally hidden'
      );
      assert.deepEqual(
        form.data,
        { checkbox: true, childTextField: 'test' },
        'Form data is incorrect'
      );
    });

    it('Should clear the value of a conditionally hidden child component of a hidden layout component when hiding if the form is not pristine', async function () {
      const formWithHiddenPanelAndConditionalChild = {
        components: [
          {
            type: 'checkbox',
            input: true,
            label: 'Checkbox',
            key: 'checkbox',
          },
          {
            type: 'panel',
            key: 'panel',
            components: [
              {
                type: 'textfield',
                key: 'childTextField',
                label: 'Text Field',
                input: true,
                conditional: {
                  json: { '!': { var: 'data.checkbox' } },
                },
              },
            ],
            hidden: true,
          },
        ],
      };
      const element = document.createElement('div');
      const form = await Formio.createForm(
        element,
        formWithHiddenPanelAndConditionalChild
      );
      const checkbox = form.getComponent('checkbox');
      const panel = form.getComponent('panel');
      const childTextField = form.getComponent('childTextField');
      assert(checkbox, 'Checkbox component not found');
      assert(panel, 'Panel component not found');
      assert(childTextField, 'Child Text Field component not found');

      assert.equal(form.pristine, true, 'Form should be pristine');

      // Initially, all components should not be conditionally hidden
      assert.equal(
        checkbox.conditionallyHidden(),
        false,
        'Checkbox should not be conditionally hidden'
      );
      assert.equal(
        panel.conditionallyHidden(),
        false,
        'Panel should not be conditionally hidden'
      );
      assert.equal(
        childTextField.conditionallyHidden(),
        false,
        'Child Text Field should not be conditionally hidden'
      );

      assert.deepEqual(
        form.data,
        { checkbox: false, childTextField: '' },
        'Initial form data is incorrect'
      );

      // Hide the panel, which should clear the value of the child text field
      form.pristine = false;
      await form.setSubmission({ data: { checkbox: true } });
      await wait(250);
      assert.equal(
        childTextField.conditionallyHidden(),
        true,
        'Child Text Field should be conditionally hidden'
      );
      assert.deepEqual(form.data, { checkbox: true }, 'Form data is incorrect');
    });
  });

  describe('Container components', function () {
    it('Should conditionally hide children of conditionally hidden container parents', async function () {
      const formWithconditionallyHiddenContainer = {
        components: [
          {
            type: 'checkbox',
            key: 'checkbox',
            label: 'Checkbox',
            input: true,
          },
          {
            type: 'textfield',
            key: 'textField',
            label: 'Text Field',
            input: true,
          },
          {
            type: 'container',
            key: 'container',
            components: [
              {
                type: 'textfield',
                key: 'childTextField',
                label: 'Text Field',
                input: true,
              },
            ],
            conditional: {
              json: { '!': { var: 'data.checkbox' } },
            },
          },
        ],
      };

      const element = document.createElement('div');
      const form = await Formio.createForm(
        element,
        formWithconditionallyHiddenContainer
      );
      const checkbox = form.getComponent('checkbox');
      const textField = form.getComponent('textField');
      const container = form.getComponent('container');
      const childTextField = form.getComponent('childTextField');
      assert(checkbox, 'Checkbox component not found');
      assert(textField, 'Text Field component not found');
      assert(container, 'Container component not found');
      assert(childTextField, 'Child Text Field component not found');

      // Initially, all components should be visible.
      assert.equal(checkbox.visible, true);
      assert.equal(textField.visible, true);
      assert.equal(container.visible, true);
      assert.equal(childTextField.visible, true);

      // Initially, all components should not be conditionally hidden
      assert.equal(checkbox.conditionallyHidden(), false);
      assert.equal(textField.conditionallyHidden(), false);
      assert.equal(container.conditionallyHidden(), false);
      assert.equal(childTextField.conditionallyHidden(), false);

      // Set the checkbox to true, which should hide the container and its children
      await form.setSubmission({ data: { checkbox: true } });
      await wait(250);
      assert.equal(checkbox.visible, true, 'Checkbox should be visible');
      assert.equal(textField.visible, true, 'Text Field should be visible');
      assert.equal(container.visible, false, 'Container should be hidden');
      assert.equal(
        childTextField.visible,
        false,
        'Child Text Field should be hidden'
      );

      // They should also be conditionally hidden
      assert.equal(
        checkbox.conditionallyHidden(),
        false,
        'Checkbox should not be conditionally hidden'
      );
      assert.equal(
        textField.conditionallyHidden(),
        false,
        'Text Field should not be conditionally hidden'
      );
      assert.equal(
        container.conditionallyHidden(),
        true,
        'Container should be conditionally hidden'
      );
      assert.equal(
        childTextField.conditionallyHidden(),
        true,
        'Child Text Field should be conditionally hidden'
      );
    });

    it('Should not conditionally hide children of container components that are hidden using the "hidden" property', async function () {
      const formWithHiddenContainer = {
        components: [
          {
            type: 'container',
            key: 'container',
            components: [
              {
                type: 'textfield',
                key: 'childTextField',
                label: 'Text Field',
                input: true,
              },
            ],
            hidden: true,
          },
        ],
      };
      const element = document.createElement('div');
      const form = await Formio.createForm(element, formWithHiddenContainer);
      const container = form.getComponent('container');
      const childTextField = form.getComponent('childTextField');
      assert(container, 'Container component not found');
      assert(childTextField, 'Child Text Field component not found');

      // All components should not be visible
      assert.equal(container.visible, false, 'Container should not be visible');
      assert.equal(childTextField.visible, false),
        'Child Text Field should not be visible';

      // All components should NOT be conditionally hidden
      assert.equal(
        container.conditionallyHidden(),
        false,
        'Container should not be conditionally hidden'
      );
      assert.equal(childTextField.conditionallyHidden(), false);
    });

    it('Should conditionally hide children of a manually hidden container component if they have a conditional', async function () {
      const formWithHiddenContainerAndConditionalChild = {
        components: [
          {
            type: 'checkbox',
            input: true,
            label: 'Checkbox',
            key: 'checkbox',
          },
          {
            type: 'container',
            key: 'container',
            components: [
              {
                type: 'textfield',
                key: 'childTextField',
                label: 'Text Field',
                input: true,
                conditional: {
                  json: { '!': { var: 'data.checkbox' } },
                },
              },
            ],
            hidden: true,
          },
        ],
      };
      const element = document.createElement('div');
      const form = await Formio.createForm(
        element,
        formWithHiddenContainerAndConditionalChild
      );
      const checkbox = form.getComponent('checkbox');
      const container = form.getComponent('container');
      const childTextField = form.getComponent('childTextField');
      assert(checkbox, 'Checkbox component not found');
      assert(container, 'Container component not found');
      assert(childTextField, 'Child Text Field component not found');

      // The panel and its child should not be visible
      assert.equal(checkbox.visible, true);
      assert.equal(container.visible, false);
      assert.equal(childTextField.visible, false);

      // Initially, the panel and its child should NOT be conditionally hidden
      assert.equal(checkbox.conditionallyHidden(), false);
      assert.equal(container.conditionallyHidden(), false);
      assert.equal(childTextField.conditionallyHidden(), false);

      // Set the checkbox to true, which should conditionally hide the child
      await form.setSubmission({ data: { checkbox: true } });
      await wait(250);
      assert.equal(checkbox.visible, true);
      assert.equal(container.visible, false);
      assert.equal(childTextField.visible, false);
      assert.equal(container.conditionallyHidden(), false);
      assert.equal(childTextField.conditionallyHidden(), true);
    });

    it('Should not clear the value of a conditionally hidden child component of a hidden container component when hiding if the form is pristine', async function () {
      const formWithHiddenContainerAndConditionalChild = {
        components: [
          {
            type: 'checkbox',
            input: true,
            label: 'Checkbox',
            key: 'checkbox',
          },
          {
            type: 'container',
            key: 'container',
            components: [
              {
                type: 'textfield',
                key: 'childTextField',
                label: 'Text Field',
                input: true,
                conditional: {
                  json: { '!': { var: 'data.checkbox' } },
                },
              },
            ],
            hidden: true,
          },
        ],
      };
      const element = document.createElement('div');
      const form = await Formio.createForm(
        element,
        formWithHiddenContainerAndConditionalChild
      );
      const checkbox = form.getComponent('checkbox');
      const container = form.getComponent('container');
      const childTextField = form.getComponent('childTextField');
      assert(checkbox, 'Checkbox component not found');
      assert(container, 'Container component not found');
      assert(childTextField, 'Child Text Field component not found');

      assert.equal(form.pristine, true, 'Form should be pristine');

      // Initially, all components should not be conditionally hidden
      assert.equal(
        checkbox.conditionallyHidden(),
        false,
        'Checkbox should not be conditionally hidden'
      );
      assert.equal(
        container.conditionallyHidden(),
        false,
        'Container should not be conditionally hidden'
      );
      assert.equal(
        childTextField.conditionallyHidden(),
        false,
        'Child Text Field should not be conditionally hidden'
      );

      assert.deepEqual(
        form.data,
        { checkbox: false, container: { childTextField: '' } },
        'Initial form data is incorrect'
      );

      // Hide the panel, which should NOT clear the value of the child text field because the form is pristine
      await form.setSubmission({
        data: { checkbox: true, container: { childTextField: 'test' } },
      });
      await wait(250);
      assert.equal(
        childTextField.conditionallyHidden(),
        true,
        'Child Text Field should be conditionally hidden'
      );
      assert.deepEqual(
        form.data,
        { checkbox: true, container: { childTextField: 'test' } },
        'Form data is incorrect'
      );
    });

    it('Should clear the value of a conditionally hidden child component of a hidden container component when hiding if the form is not pristine', async function () {
      const formWithHiddenContainerAndConditionalChild = {
        components: [
          {
            type: 'checkbox',
            input: true,
            label: 'Checkbox',
            key: 'checkbox',
          },
          {
            type: 'container',
            key: 'container',
            components: [
              {
                type: 'textfield',
                key: 'childTextField',
                label: 'Text Field',
                input: true,
                conditional: {
                  json: { '!': { var: 'data.checkbox' } },
                },
              },
            ],
            hidden: true,
          },
        ],
      };
      const element = document.createElement('div');
      const form = await Formio.createForm(
        element,
        formWithHiddenContainerAndConditionalChild
      );
      const checkbox = form.getComponent('checkbox');
      const container = form.getComponent('container');
      const childTextField = form.getComponent('childTextField');
      assert(checkbox, 'Checkbox component not found');
      assert(container, 'Container component not found');
      assert(childTextField, 'Child Text Field component not found');

      assert.equal(form.pristine, true, 'Form should be pristine');

      // Initially, all components should not be conditionally hidden
      assert.equal(
        checkbox.conditionallyHidden(),
        false,
        'Checkbox should not be conditionally hidden'
      );
      assert.equal(
        container.conditionallyHidden(),
        false,
        'Container should not be conditionally hidden'
      );
      assert.equal(
        childTextField.conditionallyHidden(),
        false,
        'Child Text Field should not be conditionally hidden'
      );

      assert.deepEqual(
        form.data,
        { checkbox: false, container: { childTextField: '' } },
        'Initial form data is incorrect'
      );

      // Hide the panel, which should clear the value of the child container
      form.pristine = false;
      await form.setSubmission({ data: { checkbox: true } });
      await wait(250);
      assert.equal(
        childTextField.conditionallyHidden(),
        true,
        'Child Text Field should be conditionally hidden'
      );
      assert.deepEqual(
        form.data,
        { checkbox: true, container: {} },
        'Form data is incorrect'
      );
    });
  });

  describe('Nested form components', function () {
    let oldMakeRequest;
    before(function () {
      oldMakeRequest = Formio.makeRequest;
      Formio.makeRequest = (formio, type, url, method, data) => {
        if (type === 'form' && method === 'get') {
          return Promise.resolve({
            type: 'form',
            components: [
              {
                label: 'Nested First Name',
                tableView: true,
                key: 'nestedFirstName',
                type: 'textfield',
                input: true,
              },
              {
                label: 'Nested Last Name',
                tableView: true,
                key: 'nestedLastName',
                type: 'textfield',
                input: true,
              },
              {
                type: 'container',
                key: 'nestedContainer',
                components: [
                  {
                    label: 'Nested Container Field',
                    tableView: true,
                    key: 'nestedContainerField',
                    type: 'textfield',
                    input: true,
                  },
                ],
              },
            ],
          });
        }
        if (
          type === 'submission' &&
          method === 'get' &&
          url.includes('nestedFormSubmissionId')
        ) {
          return Promise.resolve({
            _id: 'nestedFormSubmissionId',
            form: 'nestedFormId',
            owner: 'nestedFormOwnerId',
            data: {
              nestedFirstName: 'Nested First Name',
              nestedLastName: 'Nested Last Name',
              nestedContainer: {
                nestedContainerField: 'Nested Container Field',
              },
            },
            project: 'nestedFormProjectId',
          });
        }
        throw new Error('Invalid request');
      };
    });

    it('Should not conditionally hide intentionally hidden Nested Form components', async function () {
      const parentFormWithIntentionallyHiddenChild = {
        components: [
          {
            label: 'Parent Form Checkbox',
            tableView: true,
            key: 'checkbox',
            type: 'checkbox',
            input: true,
          },
          {
            label: 'Form',
            tableView: true,
            // Should resolve to the nested form in the before block
            src: 'http://localhost:3000/myproject/child',
            key: 'form',
            type: 'form',
            input: true,
            hidden: true,
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        parentFormWithIntentionallyHiddenChild
      );
      const checkbox = form.getComponent('checkbox');
      const nestedForm = form.getComponent('form');
      assert(checkbox, 'Parent component not found');
      assert(nestedForm, 'Nested Form component not found');

      assert.equal(checkbox.visible, true, 'Checkbox should be visible');
      assert.equal(nestedForm.visible, false, 'Nested Form should be hidden');
      assert.equal(
        checkbox.conditionallyHidden(),
        false,
        'Checkbox should not be conditionally hidden'
      );
      assert.equal(
        nestedForm.conditionallyHidden(),
        false,
        'Nested Form should not be conditionally hidden'
      );
    });

    it('Should conditionally hide conditionally hidden Nested Form components', async function () {
      const parentFormWithconditionallyHiddenChild = {
        components: [
          {
            label: 'Parent Form Checkbox',
            tableView: true,
            key: 'checkbox',
            type: 'checkbox',
            input: true,
          },
          {
            label: 'Form',
            tableView: true,
            // Should resolve to the nested form in the before block
            src: 'http://localhost:3000/myproject/child',
            key: 'form',
            type: 'form',
            input: true,
            conditional: {
              json: { var: 'data.checkbox' },
            },
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        parentFormWithconditionallyHiddenChild
      );
      const checkbox = form.getComponent('checkbox');
      const nestedForm = form.getComponent('form');
      assert(checkbox, 'Parent component not found');
      assert(nestedForm, 'Nested Form component not found');

      assert.equal(checkbox.visible, true, 'Checkbox should be visible');
      assert.equal(nestedForm.visible, false, 'Nested Form should be hidden');
      assert.equal(
        checkbox.conditionallyHidden(),
        false,
        'Checkbox should not be conditionally hidden'
      );
      assert.equal(
        nestedForm.conditionallyHidden(),
        true,
        'Nested Form should be conditionally hidden'
      );
    });

    it('Should not clear the data of an intentionally hidden Nested Form component', async function () {
      const parentFormWithIntentionallyHiddenChild = {
        components: [
          {
            label: 'Parent Form Checkbox',
            tableView: true,
            key: 'checkbox',
            type: 'checkbox',
            input: true,
          },
          {
            label: 'Form',
            tableView: true,
            // Should resolve to the nested form in the before block
            src: 'http://localhost:3000/myproject/child',
            key: 'form',
            type: 'form',
            input: true,
            hidden: true,
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        parentFormWithIntentionallyHiddenChild
      );
      const checkbox = form.getComponent('checkbox');
      const nestedForm = form.getComponent('form');
      assert(checkbox, 'Parent component not found');
      assert(nestedForm, 'Nested Form component not found');

      assert.deepEqual(
        form.data,
        {
          checkbox: false,
          form: {
            data: {
              nestedFirstName: '',
              nestedLastName: '',
              nestedContainer: { nestedContainerField: '' },
            },
            metadata: {}
          },
        },
        'Initial form data is incorrect'
      );

      await form.setSubmission({
        data: {
          checkbox: true,
          form: { _id: 'nestedFormSubmissionId' },
        },
      });
      await wait(250);
      assert.deepEqual(
        form.data,
        {
          checkbox: true,
          form: {
            _id: 'nestedFormSubmissionId',
            data: {
              nestedFirstName: 'Nested First Name',
              nestedLastName: 'Nested Last Name',
              nestedContainer: { nestedContainerField: 'Nested Container Field' },
            },
            form: 'nestedFormId',
            owner: 'nestedFormOwnerId',
            project: 'nestedFormProjectId',
          },
        },
        'Form data is incorrect'
      );
    });

    it('Should populate the data of a conditionally shown Nested Form component', async function () {
      const parentFormWithconditionallyHiddenChild = {
        components: [
          {
            label: 'Parent Form Checkbox',
            tableView: true,
            key: 'checkbox',
            type: 'checkbox',
            input: true,
          },
          {
            label: 'Form',
            tableView: true,
            // Should resolve to the nested form in the before block
            src: 'http://localhost:3000/myproject/child',
            key: 'form',
            type: 'form',
            input: true,
            conditional: {
              json: { var: 'data.checkbox' },
            }
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        parentFormWithconditionallyHiddenChild
      );
      const checkbox = form.getComponent('checkbox');
      const nestedForm = form.getComponent('form');
      assert(checkbox, 'Parent component not found');
      assert(nestedForm, 'Nested Form component not found');

      assert.deepEqual(
        form.data,
        {
          checkbox: false,
        },
        'Initial form data is incorrect'
      );

      await form.setSubmission({
        data: {
          checkbox: true,
          form: { _id: 'nestedFormSubmissionId' },
        },
      });
      await wait(400);
      assert.deepEqual(
        form.data,
        {
          checkbox: true,
          form: {
            _id: 'nestedFormSubmissionId',
            data: {
              nestedFirstName: 'Nested First Name',
              nestedLastName: 'Nested Last Name',
              nestedContainer: { nestedContainerField: 'Nested Container Field' },
            },
            form: 'nestedFormId',
            owner: 'nestedFormOwnerId',
            project: 'nestedFormProjectId',
            metadata: {}
          },
        },
        'Form data is incorrect'
      );
    });

    it('Should not clear the data of a conditionally hidden Nested Form component if the form is pristine', async function () {
      const parentFormWithconditionallyHiddenChild = {
        components: [
          {
            label: 'Parent Form Checkbox',
            tableView: true,
            key: 'checkbox',
            type: 'checkbox',
            input: true,
          },
          {
            label: 'Form',
            tableView: true,
            // Should resolve to the nested form in the before block
            src: 'http://localhost:3000/myproject/child',
            key: 'form',
            type: 'form',
            input: true,
            conditional: {
              json: { '!': { var: 'data.checkbox' } },
            }
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        parentFormWithconditionallyHiddenChild
      );
      await wait(200);
      const checkbox = form.getComponent('checkbox');
      const nestedForm = form.getComponent('form');
      assert(checkbox, 'Parent component not found');
      assert(nestedForm, 'Nested Form component not found');

      assert.equal(checkbox.visible, true, 'Checkbox should be visible');
      assert.equal(nestedForm.visible, true, 'Nested Form should be visible');
      assert.equal(checkbox.conditionallyHidden(), false, 'Checkbox should not be conditionally hidden');
      assert.equal(nestedForm.conditionallyHidden(), false, 'Nested Form should not be conditionally hidden');

      assert.deepEqual(
        form.data,
        {
          checkbox: false,
          form: {
            data: {
              nestedFirstName: '',
              nestedLastName: '',
              nestedContainer: { nestedContainerField: '' },
            },
            metadata: {}
          },
        },
        'Initial form data is incorrect'
      );

      await form.setSubmission({
        data: {
          checkbox: true,
        },
      });
      await wait(400);
      assert.deepEqual(
        form.data,
        {
          checkbox: true,
          form: {
            data: {
              nestedFirstName: '',
              nestedLastName: '',
              nestedContainer: { nestedContainerField: '' },
            },
            metadata: {}
          },
        },
        'Form data is incorrect'
      );
    });

    it('Should clear the data of a conditionally hidden Nested Form component if the form is not pristine', async function () {
      const parentFormWithconditionallyHiddenChild = {
        components: [
          {
            label: 'Parent Form Checkbox',
            tableView: true,
            key: 'checkbox',
            type: 'checkbox',
            input: true,
          },
          {
            label: 'Form',
            tableView: true,
            // Should resolve to the nested form in the before block
            src: 'http://localhost:3000/myproject/child',
            key: 'form',
            type: 'form',
            input: true,
            conditional: {
              json: { '!': { var: 'data.checkbox' } },
            }
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        parentFormWithconditionallyHiddenChild
      );
      await wait(200);
      const checkbox = form.getComponent('checkbox');
      const nestedForm = form.getComponent('form');
      assert(checkbox, 'Parent component not found');
      assert(nestedForm, 'Nested Form component not found');

      assert.equal(checkbox.visible, true, 'Checkbox should be visible');
      assert.equal(nestedForm.visible, true, 'Nested Form should be visible');
      assert.equal(checkbox.conditionallyHidden(), false, 'Checkbox should not be conditionally hidden');
      assert.equal(nestedForm.conditionallyHidden(), false, 'Nested Form should not be conditionally hidden');

      assert.deepEqual(
        form.data,
        {
          checkbox: false,
          form: {
            data: {
              nestedFirstName: '',
              nestedLastName: '',
              nestedContainer: { nestedContainerField: '' },
            },
            metadata: {}
          },
        },
        'Initial form data is incorrect'
      );

      form.pristine = false;
      await form.setSubmission({
        data: {
          checkbox: true,
        },
      });
      await wait(400);
      assert.deepEqual(
        form.data,
        {
          checkbox: true,
        },
        'Form data is incorrect'
      );
    });

    it('Should clear the submission data of a conditionally hidden Nested Form component when hiding and the form is not pristine', async function () {
      const parentFormWithconditionallyHiddenChild = {
        components: [
          {
            label: 'Parent Form Checkbox',
            tableView: true,
            key: 'checkbox',
            type: 'checkbox',
            input: true,
          },
          {
            label: 'Form',
            tableView: true,
            // Should resolve to the nested form in the before block
            src: 'http://localhost:3000/myproject/child',
            key: 'form',
            type: 'form',
            input: true,
            conditional: {
              json: { '!': { var: 'data.checkbox' } },
            }
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        parentFormWithconditionallyHiddenChild
      );
      await wait(200);
      const checkbox = form.getComponent('checkbox');
      const nestedForm = form.getComponent('form');
      assert(checkbox, 'Parent component not found');
      assert(nestedForm, 'Nested Form component not found');

      assert.equal(checkbox.visible, true, 'Checkbox should be visible');
      assert.equal(nestedForm.visible, true, 'Nested Form should be visible');
      assert.equal(checkbox.conditionallyHidden(), false, 'Checkbox should not be conditionally hidden');
      assert.equal(nestedForm.conditionallyHidden(), false, 'Nested Form should not be conditionally hidden');

      assert.deepEqual(
        form.data,
        {
          checkbox: false,
          form: {
            data: {
              nestedFirstName: '',
              nestedLastName: '',
              nestedContainer: { nestedContainerField: '' },
            },
            metadata: {}
          }
        },
        'Initial form data is incorrect'
      );

      form.pristine = false;
      // Hide the nested form AND set its submission id
      await form.setSubmission({
        data: {
          checkbox: true,
          form: { _id: 'nestedFormSubmissionId' },
        },
      });
      await wait(300);
      assert.deepEqual(
        form.data,
        {
          checkbox: true,
        },
        'Form data is incorrect'
      );
    });

    after(function () {
      Formio.makeRequest = oldMakeRequest;
    });
  });

  describe('Clear on Hide when Parent is conditionally hidden but clearOnHide=false', function() {
    it('Should not clear child data if their parent is conditionally hidden with clearOnHide=false', async function () {
      const formWithconditionallyHiddenContainer = {
        components: [
          {
            type: 'checkbox',
            key: 'checkbox',
            label: 'Checkbox',
            input: true,
          },
          {
            type: 'container',
            key: 'container',
            components: [
              {
                type: 'textfield',
                key: 'childTextField',
                label: 'Text Field',
                input: true,
              },
            ],
            clearOnHide: false,
            conditional: {
              json: { '!': { var: 'data.checkbox' } },
            },
          },
          {
            type: 'container',
            key: 'container2',
            components: [
              {
                type: 'textfield',
                key: 'childTextField2',
                label: 'Text Field 2',
                input: true,
              },
            ],
            conditional: {
              json: { '!': { var: 'data.checkbox' } },
            },
          },
        ],
      };

      const element = document.createElement('div');
      const form = await Formio.createForm(
        element,
        formWithconditionallyHiddenContainer
      );
      const checkbox = form.getComponent('checkbox');
      const container = form.getComponent('container');
      const container2 = form.getComponent('container2');
      const childTextField = form.getComponent('childTextField');
      const childTextField2 = form.getComponent('childTextField2');

      // Set a value on the child text field.
      childTextField.setValue('hello');
      childTextField2.setValue('hello');
      assert(checkbox, 'Checkbox component not found');
      assert(container, 'Container component not found');
      assert(childTextField, 'Child Text Field component not found');
      assert(container2, 'Container 2 component not found');
      assert(childTextField2, 'Child Text Field 2 component not found');

      // Initially, all components should be visible.
      assert.equal(checkbox.visible, true);
      assert.equal(container.visible, true);
      assert.equal(childTextField.visible, true);
      assert.equal(container2.visible, true);
      assert.equal(childTextField2.visible, true);

      // Initially, all components should not be conditionally hidden
      assert.equal(checkbox.conditionallyHidden(), false);
      assert.equal(container.conditionallyHidden(), false);
      assert.equal(childTextField.conditionallyHidden(), false);
      assert.equal(container2.conditionallyHidden(), false);
      assert.equal(childTextField2.conditionallyHidden(), false);

      // Set the checkbox to true, which should hide the container and its children
      await form.setSubmission({ data: { 
        checkbox: true,
        container: { childTextField: 'hello' },
        container2: { childTextField2: 'hello' }
      }});
      await wait(300);
      assert.equal(checkbox.visible, true, 'Checkbox should be visible');
      assert.equal(container.visible, false, 'Container should be hidden');
      assert.equal(
        childTextField.visible,
        false,
        'Child Text Field should be hidden'
      );

      // They should also be conditionally hidden
      assert.equal(
        checkbox.conditionallyHidden(),
        false,
        'Checkbox should not be conditionally hidden'
      );
      assert.equal(
        container.conditionallyHidden(),
        true,
        'Container should be conditionally hidden'
      );
      assert.equal(
        childTextField.conditionallyHidden(),
        true,
        'Child Text Field should be conditionally hidden'
      );
      assert.equal(
        container2.conditionallyHidden(),
        true,
        'Container 2 should be conditionally hidden'
      );
      assert.equal(
        childTextField2.conditionallyHidden(),
        true,
        'Child Text Field 2 should be conditionally hidden'
      );
      assert(!form.data.container2, 'There should not be any container 2 data.');
      assert.deepEqual(form.data.container, { childTextField: 'hello' }, 'Container data should be preserved.');
    });
  });
});
