export default {
	_id: '60eea4803b352ff0441d4843',
	type: 'form',
	components: [
		{
			label: 'Select Boxes',
			optionsLabelPosition: 'right',
			tableView: false,
			values: [
				{
					label: 'a',
					value: 'a',
					shortcut: ''
				},
				{
					label: 'b',
					value: 'b',
					shortcut: ''
				},
				{
					label: 'c',
					value: 'c',
					shortcut: ''
				}
			],
			key: 'selectBoxes',
			type: 'selectboxes',
			input: true,
			inputType: 'checkbox'
		},
		{
			type: 'button',
			label: 'Submit',
			key: 'submit',
			disableOnInvalid: true,
			input: true,
			tableView: false
		}
	],
	title: 'select boxes test',
	display: 'form',
	name: 'selectBoxesTest',
	path: 'selectboxestest',
};
