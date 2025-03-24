export default {
    _id: '6110fab8ca845631779c2bc5',
  type: 'form',
  components: [
    {
        label: 'Select',
        widget: 'choicesjs',
        tableView: true,
        dataSrc: 'resource',
        data: {
          resource: '63f8a8d04890866e84b9540c'
        },
        dataType: 'string',
        valueProperty: 'data.textField',
        template: '<span>{{ item.data.textField }}</span>',
        validate: {
          select: false
        },
        key: 'select',
        type: 'select',
        searchField: 'data.textField__regex',
        noRefreshOnScroll: false,
        addResource: false,
        reference: false,
        input: true
    },
    {
      label: 'Submit',
      showValidations: false,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true,
    },
  ],
  title: 'FIO-3011',
  display: 'form',
  name: 'fio3011',
  path: 'fio3011',
  project: '6108d710d447e01ac3d81b8f',
};
