export default {
	name: "textrandom",
	path: "textrandom",
	type: "form",
	display: "form",
	components: [
		{
			label: "My textField",
			applyMaskOn: "change",
			tableView: true,
			validate: {
				minLength: 5,
				minWords: 2
			},
			validateWhenHidden: false,
			key: "textField",
			type: "textfield",
			input: true
		},
	],
	created: "2024-11-14T15:52:30.402Z",
	modified: "2024-11-15T07:03:41.301Z",
	machineName: "glvmkehegcvqksg:text",
}

