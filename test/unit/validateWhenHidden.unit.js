import assert from 'power-assert';
import { Formio } from '../../src/Formio';

describe('Validate When Hidden behavior', function () {
  describe('Simple components', function () {
    it('Should not validate intentionally hidden components that do not include the `validateWhenHidden` parameter', async function () {
      const formWithIntentionallyHiddenField = {
        components: [
          {
            type: 'textfield',
            key: 'foo',
            label: 'Foo',
            hidden: true,
            validate: {
              required: true,
            },
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithIntentionallyHiddenField,
      );
      const errors = form.validate();
      assert.equal(errors.length, 0);
    });

    it('Should not validate conditionally hidden components that do not include the `validateWhenHidden` parameter', async function () {
      const formWithConditionallyHiddenField = {
        components: [
          {
            type: 'checkbox',
            key: 'checkbox',
            label: 'Checkbox',
            input: true,
          },
          {
            type: 'textfield',
            key: 'foo',
            label: 'Foo',
            conditional: {
              json: {
                var: 'data.checkbox',
              },
            },
            validate: {
              required: true,
            },
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithConditionallyHiddenField,
      );
      const errors = form.validate();
      assert.equal(errors.length, 0);
    });

    it('Should validate intentionally hidden components that include the `validateWhenHidden` parameter', async function () {
      const formWithIntentionallyHiddenField = {
        components: [
          {
            type: 'textfield',
            key: 'foo',
            label: 'Foo',
            hidden: true,
            validateWhenHidden: true,
            validate: {
              required: true,
            },
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithIntentionallyHiddenField,
      );
      const errors = form.validate();
      assert.equal(errors.length, 1);
    });

    it('Should validate conditionally hidden components that include the `validateWhenHidden` parameter', async function () {
      const formWithConditionallyHiddenField = {
        components: [
          {
            type: 'checkbox',
            key: 'checkbox',
            label: 'Checkbox',
            input: true,
          },
          {
            type: 'textfield',
            key: 'foo',
            label: 'Foo',
            conditional: {
              json: {
                var: 'data.checkbox',
              },
            },
            validateWhenHidden: true,
            validate: {
              required: true,
            },
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithConditionallyHiddenField,
      );
      const errors = form.validate();
      assert.equal(errors.length, 1);
    });
  });

  describe('Layout components', function () {
    it('Should not validate intentionally hidden components that are inside of a panel component', async function () {
      const formWithIntentionallyHiddenField = {
        components: [
          {
            type: 'panel',
            key: 'panel',
            components: [
              {
                type: 'textfield',
                key: 'foo',
                label: 'Foo',
                hidden: true,
                validate: {
                  required: true,
                },
              },
            ],
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithIntentionallyHiddenField,
      );
      const errors = form.validate();
      assert.equal(errors.length, 0);
    });

    it('Should validate intentionally hidden components that include the `validateWhenHidden` parameter that are inside of a panel component', async function () {
      const formWithIntentionallyHiddenField = {
        components: [
          {
            type: 'panel',
            key: 'panel',
            components: [
              {
                type: 'textfield',
                key: 'foo',
                label: 'Foo',
                hidden: true,
                validateWhenHidden: true,
                validate: {
                  required: true,
                },
              },
            ],
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithIntentionallyHiddenField,
      );
      const errors = form.validate();
      assert.equal(errors.length, 1);
    });

    it('Should not validate conditionally hidden components that are inside of a panel component', async function () {
      const formWithConditionallyHiddenField = {
        components: [
          {
            type: 'checkbox',
            key: 'checkbox',
            label: 'Checkbox',
            input: true,
          },
          {
            type: 'panel',
            key: 'panel',
            components: [
              {
                type: 'textfield',
                key: 'foo',
                label: 'Foo',
                conditional: {
                  json: {
                    var: 'data.checkbox',
                  },
                },
                validate: {
                  required: true,
                },
              },
            ],
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithConditionallyHiddenField,
      );
      const textField = form.getComponent('foo');
      assert.equal(textField.visible, false, 'The textfield should be hidden');
      const errors = form.validate();
      assert.equal(errors.length, 0);
    });

    it('Should validate conditionally hidden components that include the `validateWhenHidden` parameter that are inside of a panel component', async function () {
      const formWithConditionallyHiddenField = {
        components: [
          {
            type: 'checkbox',
            key: 'checkbox',
            label: 'Checkbox',
            input: true,
          },
          {
            type: 'panel',
            key: 'panel',
            components: [
              {
                type: 'textfield',
                key: 'foo',
                label: 'Foo',
                conditional: {
                  json: {
                    var: 'data.checkbox',
                  },
                },
                validateWhenHidden: true,
                validate: {
                  required: true,
                },
              },
            ],
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithConditionallyHiddenField,
      );
      const textField = form.getComponent('foo');
      assert.equal(textField.visible, false, 'The textfield should be hidden');
      const errors = form.validate();
      assert.equal(errors.length, 1);
    });

    it('Should not validate components that are children of an intentionally hidden panel component', async function () {
      const formWithIntentionallyHiddenPanel = {
        components: [
          {
            type: 'panel',
            key: 'panel',
            hidden: true,
            components: [
              {
                type: 'textfield',
                key: 'foo',
                label: 'Foo',
                validate: {
                  required: true,
                },
              },
            ],
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithIntentionallyHiddenPanel,
      );
      assert.equal(form.getComponent('foo').visible, false, 'The textfield should be hidden');
      const errors = form.validate();
      assert.equal(errors.length, 0);
    });

    it('Should validate components that are children of an intentionally hidden panel component if those components have the `validateWhenHidden` property', async function () {
      const formWithIntentionallyHiddenPanel = {
        components: [
          {
            type: 'panel',
            key: 'panel',
            hidden: true,
            components: [
              {
                type: 'textfield',
                key: 'foo',
                label: 'Foo',
                validateWhenHidden: true,
                validate: {
                  required: true,
                },
              },
            ],
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithIntentionallyHiddenPanel,
      );
      assert.equal(form.getComponent('foo').visible, false, 'The textfield should be hidden');
      const errors = form.validate();
      assert.equal(errors.length, 1);
    });

    it('Should not validate components that are children of a conditionally hidden panel component', async function () {
      const formWithConditionallyHiddenPanel = {
        components: [
          {
            type: 'checkbox',
            key: 'checkbox',
            label: 'Checkbox',
            input: true,
          },
          {
            type: 'panel',
            key: 'panel',
            conditional: {
              json: {
                var: 'data.checkbox',
              },
            },
            components: [
              {
                type: 'textfield',
                key: 'foo',
                label: 'Foo',
                validate: {
                  required: true,
                },
              },
            ],
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithConditionallyHiddenPanel,
      );
      assert.equal(form.getComponent('foo').visible, false, 'The textfield should be hidden');
      const errors = form.validate();
      assert.equal(errors.length, 0);
    });

    it('Should validate components that are children of a conditionally hidden panel component if those components include the `validateWhenHidden` parameter', async function () {
      const formWithConditionallyHiddenPanel = {
        components: [
          {
            type: 'checkbox',
            key: 'checkbox',
            label: 'Checkbox',
            input: true,
          },
          {
            type: 'panel',
            key: 'panel',
            conditional: {
              json: {
                var: 'data.checkbox',
              },
            },
            components: [
              {
                type: 'textfield',
                key: 'foo',
                label: 'Foo',
                validateWhenHidden: true,
                validate: {
                  required: true,
                },
              },
            ],
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithConditionallyHiddenPanel,
      );
      assert.equal(form.getComponent('foo').visible, false, 'The textfield should be hidden');
      const errors = form.validate();
      assert.equal(errors.length, 1);
    });
  });

  describe('Container components', function () {
    it('Should not validate components that are children of an intentionally hidden container component', async function () {
      const formWithIntentionallyHiddenContainer = {
        components: [
          {
            type: 'container',
            key: 'container',
            hidden: true,
            components: [
              {
                type: 'textfield',
                key: 'foo',
                label: 'Foo',
                validate: {
                  required: true,
                },
              },
            ],
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithIntentionallyHiddenContainer,
      );
      assert.equal(form.getComponent('foo').visible, false, 'The textfield should be hidden');
      const errors = form.validate();
      assert.equal(errors.length, 0);
    });

    it('Should validate components that are children of an intentionally hidden container component if those components have the `validateWhenHidden` property', async function () {
      const formWithIntentionallyHiddenContainer = {
        components: [
          {
            type: 'container',
            key: 'container',
            hidden: true,
            clearOnHide: false,
            components: [
              {
                type: 'textfield',
                key: 'foo',
                label: 'Foo',
                validateWhenHidden: true,
                validate: {
                  required: true,
                },
              },
            ],
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithIntentionallyHiddenContainer,
      );
      assert.equal(form.getComponent('foo').visible, false, 'The textfield should be hidden');
      const errors = form.validate();
      assert.equal(errors.length, 1);
    });

    it('Should not validate components that are children of a conditionally hidden container component', async function () {
      const formWithConditionallyHiddenContainer = {
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
            conditional: {
              json: {
                var: 'data.checkbox',
              },
            },
            components: [
              {
                type: 'textfield',
                key: 'foo',
                label: 'Foo',
                validate: {
                  required: true,
                },
              },
            ],
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithConditionallyHiddenContainer,
      );
      assert.equal(form.getComponent('foo').visible, false, 'The textfield should be hidden');
      const errors = form.validate();
      assert.equal(errors.length, 0);
    });

    it('Should validate components that are children of a conditionally hidden container component if those components include the `validateWhenHidden` parameter (NOTE THAT CLEAR ON HIDE MUST BE FALSE)', async function () {
      const formWithConditionallyHiddenContainer = {
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
            clearOnHide: false,
            conditional: {
              json: {
                var: 'data.checkbox',
              },
            },
            components: [
              {
                type: 'textfield',
                key: 'foo',
                label: 'Foo',
                validateWhenHidden: true,
                validate: {
                  required: true,
                },
              },
            ],
          },
        ],
      };
      const form = await Formio.createForm(
        document.createElement('div'),
        formWithConditionallyHiddenContainer,
      );
      assert.equal(form.getComponent('foo').visible, false, 'The textfield should be hidden');
      const errors = form.validate();
      assert.equal(errors.length, 1);
    });
  });
});
