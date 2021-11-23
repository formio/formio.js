export default {
  components: [
    {
      label: 'Text Field',
      tableView: true,
      key: 'textField',
      type: 'textfield',
      input: true,
    },
    {
      label: 'Form',
      tableView: true,
      display: 'form',
      components: [
        {
          label: 'Text Field',
          tableView: true,
          key: 'textField',
          type: 'textfield',
          input: true,
        },
        {
          label: 'Text Area',
          autoExpand: false,
          tableView: true,
          key: 'textArea',
          type: 'textarea',
          input: true,
        },
      ],
      logic: [
        {
          name: 'disabled',
          trigger: {
            type: 'simple',
            simple: { show: true, when: 'textField', eq: 'test' },
            conditionConditionGrid: [],
          },
          actions: [
            {
              name: 'Disable',
              type: 'property',
              property: {
                label: 'Disabled',
                value: 'disabled',
                type: 'boolean',
              },
              state: true,
              variableVariableGrid: [],
            },
          ],
        },
        {
          name: 'required',
          trigger: {
            type: 'simple',
            simple: { show: true, when: 'textField', eq: 'required' },
            conditionConditionGrid: [],
          },
          actions: [
            {
              name: 'required',
              type: 'property',
              property: {
                label: 'Required',
                value: 'validate.required',
                type: 'boolean',
              },
              state: true,
              variableVariableGrid: [],
            },
          ],
        },
      ],
      key: 'form',
      type: 'form',
      input: true,
    },
    {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false,
    },
  ],
  title: 'MainFormWithNested',
  display: 'form',
  path: 'nestedmain',
  name: 'mainFormWithNested',
};
