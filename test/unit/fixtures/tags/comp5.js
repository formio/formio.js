export default {
  'type': 'form',
  'display': 'form',
  'components': [
    {
      'label': 'Tags',
      'tableView': true,
      'delimeter': ';',
      'storeas': 'array',
      'key': 'tags',
      'type': 'tags',
      'input': true,
    }, {
      'type': 'button',
      'label': 'Submit',
      'key': 'submit',
      'disableOnInvalid': true,
      'input': true,
      'tableView': false,
    },
  ],
};
