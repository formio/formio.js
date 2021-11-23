export default {
	type: 'form',
	components: [
    {
      label: 'Text Field',
      tableView: true,
      key: 'textField',
      type: 'textfield',
      input: true
    },
		{ type: 'button', label: 'Submit', key: 'submit', disableOnInvalid: true, input: true, tableView: false }
	],
	revisions: '',
	_vid: 0,
	title: 'input mask',
	display: 'form',
	name: 'inputMask',
	path: 'inputmask',
};
