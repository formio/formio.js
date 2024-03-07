export default {
	components: [
		{
			label: 'Name',
			applyMaskOn: 'change',
			tableView: true,
			validate: {
				required: true,
				minLength: 2,
				maxLength: 5,
			},
			key: 'name',
			type: 'textfield',
			input: true,
		},
		{
			type: 'button',
			showValidations: false,
			label: 'Submit',
			key: 'submit',
			input: true,
			tableView: false,
		},
	],
};
