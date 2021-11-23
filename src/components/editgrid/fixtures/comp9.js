export default {
	type: 'form',
	components: [
		{
			label: 'Edit Grid',
			tableView: false,
			rowDrafts: false,
			key: 'editGrid',
			type: 'editgrid',
			input: true,
			components: [
				{ label: 'Text Field', tableView: true, key: 'textField', type: 'textfield', input: true },
				{
					label: 'Checkbox',
					tableView: true,
					key: 'checkbox',
					type: 'checkbox',
					input: true,
					defaultValue: false
				},
				{
					label: 'Text Area',
					autoExpand: false,
					tableView: true,
					key: 'textArea',
					conditional: { show: true, when: 'editGrid.checkbox', eq: 'true' },
					type: 'textarea',
					input: true
				},
				{
					label: 'Container',
					tableView: false,
					key: 'container',
					conditional: { show: true, when: 'editGrid.textField', eq: 'show' },
					type: 'container',
					input: true,
					components: [
						{
							label: 'Number',
							mask: false,
							spellcheck: true,
							tableView: true,
							delimiter: false,
							requireDecimal: false,
							inputFormat: 'plain',
							key: 'number1',
							type: 'number',
							input: true
						}
					]
				}
			]
		},
		{ type: 'button', label: 'Submit', key: 'submit', disableOnInvalid: true, input: true, tableView: false }
	],
	title: 'editGrid conditional',
	display: 'form',
	name: 'editGridConditional',
	path: 'editgridconditional',
};
