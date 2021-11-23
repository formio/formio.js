export default {
	type: 'form',
	components: [
		{
			label: 'Radio',
			optionsLabelPosition: 'right',
			inline: true,
			tableView: false,
			values: [
				{ label: '', value: '' },
			],
			validate: { onlyAvailableItems: false },
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
