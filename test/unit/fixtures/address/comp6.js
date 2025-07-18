export default {
  'label': 'Address',
  'multiple': false,
  'tableView': true,
  'provider': 'nominatim',
  'key': 'address',
  'enableManualMode': true,
  'manualModeViewString': "value = data.address.address1",
  'type': 'address',
  'input': true,
  'components': [
    {
      'label': 'Address 1',
      'tableView': false,
      'key': 'address1',
      'type': 'textfield',
      'input': true,
      'customConditional': "show = _.get(instance, 'parent.manualMode', false);"
    },
    {
      'label': 'Address 2',
      'tableView': false,
      'key': 'address2',
      'type': 'textfield',
      'input': true,
      'customConditional': "show = _.get(instance, 'parent.manualMode', false);"
    },
    {
      'label': 'City',
      'tableView': false,
      'key': 'city',
      'type': 'textfield',
      'input': true,
      'customConditional': "show = _.get(instance, 'parent.manualMode', false);"
    },
    {
      'label': 'State',
      'tableView': false,
      'key': 'state',
      'type': 'textfield',
      'input': true,
      'customConditional': "show = _.get(instance, 'parent.manualMode', false);"
    },
    {
      'label': 'Country',
      'tableView': false,
      'key': 'country',
      'type': 'textfield',
      'input': true,
      'customConditional': "show = _.get(instance, 'parent.manualMode', false);"
    },
    {
      'label': 'Zip Code',
      'tableView': false,
      'key': 'zip',
      'type': 'textfield',
      'input': true,
      'customConditional': "show = _.get(instance, 'parent.manualMode', false);"
    }
  ]
};
