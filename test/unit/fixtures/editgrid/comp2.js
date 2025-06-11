export default {
  'components': [
    {
      'components': [
        {
          'type': 'textfield',
          'conditional': {
            'show': '',
            'when': null,
            'eq': ''
          },
          'validate': {
            'required': false,
            'minLength': '',
            'maxLength': '',
            'pattern': '',
            'custom': '',
            'customPrivate': false
          },
          'customDefaultValue': "value = 'bar';",
          'clearOnHide': true,
          'hidden': false,
          'persistent': true,
          'unique': false,
          'protected': false,
          'defaultValue': '',
          'multiple': false,
          'suffix': '',
          'prefix': '',
          'placeholder': '',
          'key': 'field1',
          'label': 'Field 1',
          'inputMask': '',
          'inputType': 'text',
          'tableView': true,
          'input': true
        },
        {
          'properties': {
            '': ''
          },
          'tags': [],
          'type': 'textfield',
          'conditional': {
            'show': 'true',
            'when': 'field1',
            'eq': 'foo'
          },
          'validate': {
            'required': true,
            'minLength': '',
            'maxLength': '',
            'pattern': '',
            'custom': '',
            'customPrivate': false
          },
          'clearOnHide': true,
          'hidden': false,
          'persistent': true,
          'unique': false,
          'protected': false,
          'defaultValue': '',
          'multiple': false,
          'suffix': '',
          'prefix': '',
          'placeholder': '',
          'key': 'field2',
          'label': 'Field 2',
          'inputMask': '',
          'inputType': 'text',
          'tableView': true,
          'input': true
        }
      ],
      'clearOnHide': false,
      'key': 'editgridPanel',
      'input': false,
      'title': '',
      'theme': 'default',
      'tableView': false,
      'type': 'panel',
      'breadcrumb': 'default',
      'tags': [],
      'conditional': {
        'eq': '',
        'when': null,
        'show': ''
      },
      'properties': {
        '': ''
      }
    }
  ],
  'tags': [],
  'type': 'editgrid',
  'templates': {
    'header': '<div class="row"> \n  {%util.eachComponent(components, function(component) { %} \n    <div class="col-sm-2"> \n      {{ component.label }} \n    </div> \n  {% }) %} \n<div>{{value.length}}</div>\n</div>',
    'row': '<div class="row"> \n  {%util.eachComponent(components, function(component) { %} \n    <div class="col-sm-2"> \n      {{ row[component.key] }} \n    </div> \n  {% }) %} \n  <div class="col-sm-2"> \n    <div class="btn-group pull-right"> \n      <div class="btn btn-default editRow">Edit</div> \n      <div class="btn btn-danger removeRow">Delete</div> \n    </div> \n  </div> \n</div>',
    'footer': ''
  },
  'clearOnHide': true,
  'hidden': false,
  'persistent': true,
  'protected': false,
  'key': 'editgrid',
  'label': '',
  'tableView': true,
  'multiple': false,
  'tree': true,
  'input': true,
  'removeRow': 'Cancel'
};
