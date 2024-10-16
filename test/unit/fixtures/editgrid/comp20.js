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
					input: true,
          validate :  {
            required: true
          }
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
	title: 'test20',
	display: 'form',
	name: 'test20',
	path: 'test20',
};
