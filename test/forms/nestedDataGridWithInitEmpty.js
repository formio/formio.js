const form = {
  type: 'form',
  components: [
    {
      label: 'Edit Grid',
      tableView: false,
      clearOnHide: false,
      rowDrafts: false,
      key: 'editGrid',
      type: 'editgrid',
      displayAsTable: false,
      input: true,
      components: [
        {
          label: 'Data Grid',
          reorder: false,
          addAnotherPosition: 'bottom',
          layoutFixed: false,
          enableRowGroups: false,
          initEmpty: true,
          tableView: true,
          defaultValue: [{ select: '', email: '' }],
          key: 'dataGrid',
          type: 'datagrid',
          input: true,
          components: [
            {
              label: 'Select',
              widget: 'choicesjs',
              hideLabel: true,
              tableView: true,
              data: {
                values: [
                  { label: 'email', value: 'email' },
                  { label: 'phone', value: 'phone' },
                ],
              },
              key: 'select',
              type: 'select',
              input: true,
            },
            {
              label: 'Email',
              hideLabel: true,
              tableView: true,
              key: 'email',
              type: 'email',
              input: true,
            },
          ],
        },
      ],
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
  title: 'FIO-2721',
  display: 'form',  
  name: 'fio2721',
  path: 'fio2721',
};

const submission = {
  data: {
    editGrid: [{
      dataGrid: [{
        select: 'email',
        email: 'hhh@gmail.com',
      }]
    }],
    submit: true
  }
};

export default {
  form,
  submission,
};

