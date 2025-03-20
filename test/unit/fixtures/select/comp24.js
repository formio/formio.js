export default {
  title: 'FIO-8234',
  name: 'fio8234',
  path: 'fio8234',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Select',
      widget: 'choicesjs',
      tableView: true,
      dataSrc: 'resource',
      data: {
        resource: '665446284c9b0163c3e0c7e6',
      },
      template: '<span>{{ item.data.textField1 }}</span>',
      validate: {
        select: false,
      },
      key: 'select',
      type: 'select',
      searchField: 'data.textField2__regex',
      input: true,
      noRefreshOnScroll: false,
      addResource: false,
      reference: false,
      valueProperty: 'data.textField2',
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
