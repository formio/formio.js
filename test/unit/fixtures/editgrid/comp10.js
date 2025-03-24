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
				{
					label: 'Text Field',
					tableView: true,
					key: 'textField',
					type: 'textfield',
					input: true
				},
				{
					label: 'Number',
					mask: false,
					spellcheck: true,
					tableView: false,
					delimiter: false,
					requireDecimal: false,
					inputFormat: 'plain',
					key: 'number',
					type: 'number',
					input: true
				}
			]
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
	title: 'test11',
	display: 'form',
	name: 'test11',
	path: 'test11',
};
