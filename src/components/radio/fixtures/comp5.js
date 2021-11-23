export default {
	type: 'form',
	components: [
		{
			label: 'Radio',
			optionsLabelPosition: 'right',
			inline: true,
			tableView: false,
			values: [
				{ label: 'one', value: 'one', shortcut: '' },
				{ label: 'two', value: 'two', shortcut: '' },
				{ label: 'three', value: 'three', shortcut: '' }
			],
			validate: { onlyAvailableItems: true },
			key: 'radio',
			type: 'radio',
			input: true
		},
		{
			label: 'Submit',
			showValidations: false,
			alwaysEnabled: false,
			tableView: false,
			key: 'submit',
			type: 'button',
			input: true
		}
	],
	title: 'test testrer',
	display: 'form',
	name: 'testTestrer',
	path: 'testtestrer',
};
