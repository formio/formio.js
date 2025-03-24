export default {
  'label': 'Text Field',
  'allowMultipleMasks': true,
  'spellcheck': true,
  'tableView': true,
  'calculateServer': false,
  'key': 'textField1',
  'type': 'textfield',
  'data': {
    'textField1': {
      'value': '555',
      'maskName': 'mask1'
    },
    'submit': true,
  },
  'inputMasks': [{
    'label': 'mask1',
    'mask': '999'
  }, {
    'label': 'mask2',
    'mask': 'aaa'
  }],
  'input': true,
  'disabled': true
};
