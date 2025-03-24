export default {
	type: 'form',
	components: [
		{
			label: 'Password',
			tableView: false,
			key: 'password',
			type: 'password',
			input: true,
			protected: true
		},
		{
			label: 'Submit',
			showValidations: false,
			tableView: false,
			key: 'submit',
			type: 'button',
			input: true
		}
	],
	revisions: '',
	_vid: 0,
	title: 'password tests',
	display: 'form',
	name: 'passwordTests',
	path: 'passwordtests',
};
