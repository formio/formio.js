export default {
  type: 'form',
  owner: '5e05a6b7549cdc2ece30c6b0',
  components: [
    {
      title: '+-*/',
      breadcrumbClickable: true,
      buttonSettings: {
        previous: true,
        cancel: true,
        next: true
      },
      collapsible: false,
      alwaysEnabled: false,
      tableView: false,
      key: 'page1',
      type: 'panel',
      label: 'Page 1',
      components: [
        {
          legend: 'Addition',
          alwaysEnabled: false,
          tableView: false,
          key: 'fieldset',
          type: 'fieldset',
          label: '',
          input: false,
          components: [
            {
              label: 'A',
              mask: false,
              alwaysEnabled: false,
              tableView: false,
              delimiter: false,
              requireDecimal: false,
              inputFormat: 'plain',
              key: 'a',
              type: 'number',
              input: true
            },
            {
              label: 'B',
              mask: false,
              alwaysEnabled: false,
              tableView: false,
              delimiter: false,
              requireDecimal: false,
              inputFormat: 'plain',
              key: 'b',
              type: 'number',
              input: true
            },
            {
              label: 'Total',
              mask: false,
              alwaysEnabled: false,
              tableView: false,
              delimiter: false,
              requireDecimal: false,
              inputFormat: 'plain',
              calculateValue: "value = (data['a'] || 0) + (data['b'] || 0);",
              key: 'total',
              type: 'number',
              input: true
            }
          ],
          path: 'fieldset'
        }
      ],
      input: false
    },
    {
      label: 'Submit',
      showValidations: false,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true
    }
  ],
  title: 'FIO-3086',
  display: 'form',
};
