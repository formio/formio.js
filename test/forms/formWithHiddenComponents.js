export default {
  _id: '67e673ce068b3eb1202de1f3',
  title: 'data ready test',
  name: 'dataReadyTest',
  path: 'datareadytest',
  type: 'form',
  display: 'form',
  owner: '637b2e6b48c1227e60b1f910',
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
      label: 'Select',
      widget: 'choicesjs',
      hidden: true,
      tableView: true,
      data: {
        values: [
          {
            label: 'a',
            value: 'a',
          },
          {
            label: 'b',
            value: 'b',
          },
        ],
      },
      validateWhenHidden: false,
      key: 'select',
      type: 'select',
      input: true,
    },
    {
      label: 'Select',
      widget: 'choicesjs',
      tableView: true,
      data: {
        values: [
          {
            label: 'a',
            value: 'a',
          },
          {
            label: 'b',
            value: 'b',
          },
        ],
      },
      validateWhenHidden: false,
      key: 'select1',
      conditional: {
        show: true,
        conjunction: 'all',
        conditions: [
          {
            component: 'checkbox',
            operator: 'isEqual',
            value: true,
          },
        ],
      },
      type: 'select',
      input: true,
    },
    {
      label: 'Select Boxes',
      optionsLabelPosition: 'right',
      hidden: true,
      tableView: false,
      defaultValue: {
        a: false,
        b: false,
        c: false,
      },
      values: [
        {
          label: 'a',
          value: 'a',
          shortcut: '',
        },
        {
          label: 'b',
          value: 'b',
          shortcut: '',
        },
        {
          label: 'c',
          value: 'c',
          shortcut: '',
        },
      ],
      validateWhenHidden: false,
      key: 'selectBoxes',
      type: 'selectboxes',
      input: true,
      inputType: 'checkbox',
    },
    {
      label: 'Radio',
      optionsLabelPosition: 'right',
      inline: false,
      hidden: true,
      tableView: false,
      values: [
        {
          label: 'a',
          value: 'a',
          shortcut: '',
        },
        {
          label: 'b',
          value: 'b',
          shortcut: '',
        },
        {
          label: 'c',
          value: 'c',
          shortcut: '',
        },
      ],
      validateWhenHidden: false,
      key: 'radio',
      type: 'radio',
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
  created: '2025-03-28T10:02:54.960Z',
  modified: '2025-03-28T10:10:00.430Z',
  machineName: 'bcmuuifnsbrkvdx:dataReadyTest',
};
