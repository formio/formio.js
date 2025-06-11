export default {
  title: 'FIO-8281',
  name: 'fio8281',
  path: 'fio8281',
  type: 'form',
  display: 'form',
  components: [{
    label: 'Select',
    widget: 'choicesjs',
    tableView: true,
    dataSrc: 'url',
    data: {
      url: 'https://fake_url.com',
      headers: [
        {
          key: '',
          value: ''
        },
      ],
    },
    multiple: true,
    valueProperty: 'value',
    validateWhenHidden: false,
    key: 'select',
    type: 'select',
    input: true,
    defaultValue: ['value1', 'value3'],
    selectValues: 'data',
    disableLimit: false,
    noRefreshOnScroll: false,
    selectData: {
      value1: {
        label: 'Label 1',
      },
      value3: {
        label: 'Label 3',
      },
    },
  }, {
    type: 'button',
    label: 'Submit',
    key: 'submit',
    disableOnInvalid: true,
    input: true,
    tableView: false,
  }]
};
