export default {
  'type': 'stripeCheckout',
  'theme': 'primary',
  'disableOnInvalid': false,
  'action': 'button',
  'block': false,
  'rightIcon': '',
  'leftIcon': '',
  'size': 'md',
  'key': 'card',
  'tableView': false,
  'label': 'Authorize payment',
  'input': true,
  'stripe': {
    'apiKey': '',
    'handlerConfiguration': {},
    'popupConfiguration': {}
  }
};
