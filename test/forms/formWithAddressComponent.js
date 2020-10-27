const form = {
  'type': 'form',
  'components': [{
    'label': 'Data Grid',
    'reorder': false,
    'addAnotherPosition': 'bottom',
    'defaultOpen': false,
    'layoutFixed': false,
    'enableRowGroups': false,
    'initEmpty': false,
    'tableView': false,
    'defaultValue': [{}],
    'key': 'dataGrid',
    'type': 'datagrid',
    'input': true,
    'components': [{
      'label': 'Address',
      'tableView': false,
      'provider': 'google',
      'key': 'address',
      'type': 'address',
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
      }],
      'providerOptions': {
        'params': {
          'key': 'someKey',
          'region': ''
        }
      }
    }]
  }, {
    'type': 'button',
    'label': 'Submit',
    'key': 'submit',
    'disableOnInvalid': true,
    'input': true,
    'tableView': false
  }],
  'title': 'test address',
  'display': 'form',
  'name': 'testAddress',
  'path': 'testaddress',
  'machineName': 'cjksbatcpbhyfbs:testAddress'
};

const submission = { 
  'dataGrid': [{
    'address': {
      'address_components': [{
        'long_name': 'Dallas',
        'short_name': 'Dallas',
        'types': ['locality', 'political']
      }, {
        'long_name': 'Dallas County',
        'short_name': 'Dallas County',
        'types': ['administrative_area_level_2', 'political']
      }, {
        'long_name': 'Texas',
        'short_name': 'TX',
        'types': ['administrative_area_level_1', 'political']
      }, {
        'long_name': 'United States',
        'short_name': 'US',
        'types': ['country', 'political']
      }],
      'formatted_address': 'Dallas, TX, USA',
      'geometry': {
        'bounds': {
          'northeast': {
            'lat': 33.0237921,
            'lng': -96.4637379
          },
          'southwest': {
            'lat': 32.617537,
            'lng': -96.999347
          }
        },
        'location': {
          'lat': 32.7766642,
          'lng': -96.79698789999999
        },
        'location_type': 'APPROXIMATE',
        'viewport': {
          'northeast': {
            'lat': 33.0237921,
            'lng': -96.4637379
          },
          'southwest': {
            'lat': 32.617537,
            'lng': -96.999347
          }
        }
      },
      'place_id': 'ChIJS5dFe_cZTIYRj2dH9qSb7Lk',
      'types': ['locality', 'political']
    }
  }]
};

export default {
  form: form,
  submission: submission,
};
