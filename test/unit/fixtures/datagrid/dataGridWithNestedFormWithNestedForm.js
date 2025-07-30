export default {
  title: 'FD61237 Parent',
  name: 'fd61237Parent',
  path: 'fd61237parent',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Data Grid',
      reorder: false,
      addAnotherPosition: 'bottom',
      layoutFixed: false,
      enableRowGroups: false,
      initEmpty: false,
      tableView: false,
      defaultValue: [{}],
      validateWhenHidden: false,
      key: 'dataGrid',
      type: 'datagrid',
      input: true,
      components: [
        {
          label: 'Select',
          widget: 'choicesjs',
          tableView: true,
          data: {
            values: [
              {
                label: 'show',
                value: 'show',
              }, {
                label: 'no show',
                value: 'noShow',
              },
            ],
          },
          validateWhenHidden: false,
          key: 'select',
          type: 'select',
          input: true,
        }, {
          label: 'Form',
          tableView: true,
          form: 'child',
          useOriginalRevision: false,
          key: 'form',
          conditional: {
            show: true,
            conjunction: 'any',
            conditions: [
              {
                component: 'dataGrid.select',
                operator: 'isEqual',
                value: 'show',
              },
            ],
          },
          type: 'form',
          input: true,
        },
      ],
    }, {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false,
    },
  ],
};
