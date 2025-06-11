export default {
  _id: '66fbb091481ea2ffbf5be5af',
  title: 'rwerw',
  name: 'rwerw',
  path: 'rwerw',
  type: 'form',
  display: 'form',
  owner: '637b2e6b48c1227e60b1f910',
  components: [
    {
      label: 'Radio',
      optionsLabelPosition: 'right',
      inline: false,
      tableView: true,
      values: [
        {
          label: 'english',
          value: 'english',
          shortcut: '',
        },
        {
          label: 'spanish',
          value: 'spanish',
          shortcut: '',
        },
      ],
      validateWhenHidden: false,
      key: 'radio',
      type: 'radio',
      input: true,
    },
    {
      label: 'Email',
      applyMaskOn: 'change',
      tableView: true,
      validateWhenHidden: false,
      key: 'email',
      conditional: {
        show: true,
        conjunction: 'all',
        conditions: [
          {
            component: 'radio',
            operator: 'isEqual',
            value: 'english',
          },
        ],
      },
      type: 'email',
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
  project: '66fbb04c481ea2ffbf5bdf02',
};
