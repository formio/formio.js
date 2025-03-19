export default {
  type: 'select',
  label: 'Select',
  widget: 'choicesjs',
  tableView: true,
  dataSrc: 'custom',
  data: {
    custom: 'values = data.dataSource;'
  },
  dataType: 'string',
  idPath: 'name',
  valueProperty: 'name',
  template: '<span>{{ item.name }}</span>',
  validateWhenHidden: false,
  key: 'select',
  input: true
};
