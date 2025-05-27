export default {
  _id: '67e3af3f876288d40c93efa4',
  title: 'Conditional hidden',
  name: 'conditionalHidden',
  path: 'conditionalhidden',
  type: 'form',
  display: 'form',
  owner: '67e3b096876288d40c93f436',
  components: [
    {
      label: 'Checkbox',
      tableView: false,
      validateWhenHidden: false,
      key: 'checkbox',
      type: 'checkbox',
      input: true,
    },
    {
      label: 'Text Field',
      applyMaskOn: 'change',
      tableView: true,
      validateWhenHidden: false,
      key: 'textField',
      conditional: {
        show: 'true',
        conjunction: 'all',
        conditions: [
          {
            component: 'checkbox',
            operator: 'isEqual',
            value: true,
          },
        ],
      },
      type: 'textfield',
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
  project: '67caad5b0416ffb92916c9ad',
};
