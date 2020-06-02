export default {
    'label': 'Address',
    'tableView': false,
    'calculateServer': false,
    'provider': 'google',
    'key': 'address',
    'type': 'address',
    'providerOptions': {
      'apiKey': 'someApiKeyForNext',
      'region': 'France'
    },
    'input': true,
    'components': [{
      'label': 'Address 1',
      'tableView': false,
      'key': 'address1',
      'type': 'textfield',
      'input': true,
      'customConditional': 'show = _.get(instance, "parent.manualMode", false);'
    }, {
      'label': 'Address 2',
      'tableView': false,
      'key': 'address2',
      'type': 'textfield',
      'input': true,
      'customConditional': 'show = _.get(instance, "parent.manualMode", false);'
    }, {
      'label': 'City',
      'tableView': false,
      'key': 'city',
      'type': 'textfield',
      'input': true,
      'customConditional': 'show = _.get(instance, "parent.manualMode", false);'
    }, {
      'label': 'State',
      'tableView': false,
      'key': 'state',
      'type': 'textfield',
      'input': true,
      'customConditional': 'show = _.get(instance, "parent.manualMode", false);'
    }, {
      'label': 'Country',
      'tableView': false,
      'key': 'country',
      'type': 'textfield',
      'input': true,
      'customConditional': 'show = _.get(instance, "parent.manualMode", false);'
    }, {
      'label': 'Zip Code',
      'tableView': false,
      'key': 'zip',
      'type': 'textfield',
      'input': true,
      'customConditional': 'show = _.get(instance, "parent.manualMode", false);'
    }]
  };
