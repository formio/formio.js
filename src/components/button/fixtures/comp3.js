export default {
	type: 'form',
	components: [
		{
			label: 'Number',
			mask: false,
			spellcheck: true,
			tableView: false,
			delimiter: false,
			requireDecimal: false,
			inputFormat: 'plain',
			key: 'number',
			logic: [
				{
					name: 'show two',
					trigger: {
						type: 'event',
						event: 'showTwo'
					},
					actions: [
						{
							name: 'simple action',
							type: 'value',
							value: 'value = 2;'
						}
					]
				}
			],
			type: 'number',
			input: true
		},
		{
			label: 'Save in state',
			action: 'saveState',
			showValidations: false,
			tableView: false,
			key: 'saveInState',
			type: 'button',
			state: 'testState',
			input: true
		},
		{
			label: 'Event',
			action: 'event',
			showValidations: false,
			tableView: false,
			key: 'event',
			type: 'button',
			event: 'showTwo',
			input: true
		},
		{
			label: 'Reset',
			action: 'reset',
			showValidations: false,
			tableView: false,
			key: 'reset',
			type: 'button',
			input: true
		},
		{
			label: 'Post',
			action: 'url',
			showValidations: false,
			tableView: false,
			key: 'post',
			type: 'button',
			url: 'https://test.com',
			headers: [
				{
					header: '',
					value: ''
				}
			],
			input: true
		}
	],
	title: 'test',
	display: 'form',
	name: 'test',
	path: 'test'
};
