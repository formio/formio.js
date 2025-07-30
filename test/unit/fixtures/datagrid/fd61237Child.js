export default {
  title: 'FD61237 child',
  type: 'form',
  name: 'fd61237Child',
  path: 'fd61237child',
  pdfComponents: [],
  display: 'form',
  tags: [
    'common',
  ],
  settings: {},
  components: [
    {
      label: 'Select',
      widget: 'choicesjs',
      tableView: true,
      data: {
        values: [
          {
            label: 'dog',
            value: 'dog',
          },
          {
            label: 'cat',
            value: 'cat',
          },
          {
            label: 'horse',
            value: 'horse',
          },
        ],
      },
      validate: {
        required: true,
      },
      validateWhenHidden: false,
      key: 'selectnested',
      type: 'select',
      input: true,
    },
    {
      label: 'Form',
      tableView: true,
      form: 'grandChild',
      useOriginalRevision: false,
      key: 'form',
      conditional: {
        show: true,
        conjunction: 'all',
        conditions: [
          {
            component: 'selectnested',
            operator: 'isEqual',
            value: 'dog',
          },
        ],
      },
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
};
