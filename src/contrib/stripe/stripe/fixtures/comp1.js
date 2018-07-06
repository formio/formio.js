export const component = {
  'input': true,
  'tableView': true,
  'label': 'stripe',
  'key': 'stripe',
  'placeholder': '',
  'multiple': false,
  'protected': false,
  'clearOnHide': true,
  'unique': false,
  'persistent': true,
  'action': 'button',
  'stripe': {
    'apiKey': '',
    'payButton': {
      'enable': false,
      'separatorLabel': 'Or',
      'paymentRequest': {},
      'stripeOptions': {}
    },
    'cardData': {},
    'successLabel': 'Payment successful',
    'stripeElementsOptions': {},
    'stripeElementOptions': {}
  },
  'validate': {
    'required': true
  },
  'type': 'stripe',
  'tags': [

  ],
  'conditional': {
    'show': '',
    'when': null,
    'eq': ''
  }
};
