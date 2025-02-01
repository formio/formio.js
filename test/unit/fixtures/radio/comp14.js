export default {
  type: 'form',
  components: [
    {
      type: 'radio',
      label: 'Radio',
      key: 'radio',
      dataSrc: 'url',
      data: {
          url: 'https://cdn.rawgit.com/mshafrir/2646763/raw/states_titlecase.json'
      },
      valueProperty: 'value',
      template: '<span>{{ item.label }}</span>',
      input: true
    },
    {
      label: 'Submit',
      showValidations: false,
      alwaysEnabled: false,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true
    }
  ],
  title: 'FIO-7225',
  display: 'form',
  name: 'fio7225',
  path: 'fio7225',
};
