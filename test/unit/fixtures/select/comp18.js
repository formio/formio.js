export default {
  _id: '6450b301441fa8778d1ca28e',
  type: 'form',
  components: [
    {
      label: 'Select',
      widget: 'choicesjs',
      tableView: true,
      dataSrc: 'resource',
      data: {
        resource: '6450b4bb441fa8778d1ca69e'
      },
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
  title: 'FIO-6760-Select Component',
  display: 'form',
  name: 'fio6760SelectComponent',
  path: 'fio6760selectcomponent',
  project: '6406eec64f70ff1b445c6f44',
};
