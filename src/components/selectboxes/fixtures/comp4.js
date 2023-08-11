export default {
	_id: '638743c823671dec2ace618b',
	title: '5685',
	name: '5685',
	path: '5685',
	type: 'form',
	display: 'form',
	components: [
	{
		label: 'Checkbox',
		tableView: false,
		key: 'checkbox',
		type: 'checkbox',
		input: true
	},
	{
		label: 'Container',
		tableView: false,
		key: 'container',
		conditional: {
			show: true,
			conjunction: 'all',
			conditions: [
			{
				component: 'checkbox',
				operator: 'isEqual',
				value: true
			}
			]
		},
		type: 'container',
		input: true,
		components: [
			{
				label: 'Select Boxes',
				optionsLabelPosition: 'right',
				tableView: false,
				defaultValue:
				{
					'1': false,
					'2': false,
					'3': false
				},
				values: [
				{
					label: '1',
					value: '1',
					shortcut: ''
				},
				{
					label: '2',
					value: '2',
					shortcut: ''
				},
				{
					label: '3',
					value: '3',
					shortcut: ''
				}],
				validate:
				{
					minSelectedCount: 1
				},
				key: 'selectBoxes',
				type: 'selectboxes',
				input: true,
				inputType: 'checkbox'
			}
		]
	},
	{
		type: 'button',
		label: 'Submit',
		key: 'submit',
		disableOnInvalid: true,
		input: true,
		tableView: false
	}]
};
