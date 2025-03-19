export default {
  title: 'FIO-8072',
  name: 'fio8072',
  path: 'fio8072',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Select',
      widget: 'choicesjs',
      tableView: true,
      data: {
        values: [
          {
            label: 'A',
            value: '1',
          },
          {
            label: 'B',
            value: '2',
          },
          {
            label: 'C',
            value: '10',
          },
          {
            label: 'D',
            value: '1d',
          },
        ],
      },
      dataType: 'number',
      key: 'select',
      type: 'select',
      input: true,
    },
    {
      label: 'Text Field',
      applyMaskOn: 'change',
      tableView: true,
      key: 'textField',
      type: 'textfield',
      input: true,
      conditional: {
        show: true,
        conjunction: 'all',
        conditions: [
          {
            component: 'select',
            operator: 'lessThan',
            value: 5,
          },
        ],
      },
    },
  ],
};
