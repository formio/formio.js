export default {
  'components': [{
    'label': 'Edit Grid',
    'tableView': false,
    'rowDrafts': false,
    'key': 'editGrid',
    'type': 'editgrid',
    'input': true,
    'components': [
      {
        'label': 'Select',
        'widget': 'choicesjs',
        'tableView': true,
        'dataSrc': 'custom',
        'data': {
          'custom': "values = [\n  {id: 1, name: 'Apple'},\n  {id: 2, name: 'Banana'},\n  {id: 3, name: 'Orange'},\n  {id: 3, name: 'Pineapple'}\n];"
        },
        'valueProperty': 'id',
        'template': '<span>{{ item.name }}</span>',
        'selectThreshold': 0.3,
        'key': 'select',
        'type': 'select',
        'input': true
      }
    ]
  }]
};
