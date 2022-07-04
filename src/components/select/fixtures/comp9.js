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
			type: 'number',
			input: true
		},
		{
			label: 'Select',
			tableView: true,
			dataSrc: 'url',
			data: {
				values: [
					{
						label: '',
						value: ''
					}
				],
				url: 'https://test.com/{{ data.number }}',
				headers: [
					{
						key: '',
						value: ''
					}
				]
			},
			template: '<span>{{ item.name }}</span>',
			refreshOn: 'number',
			lazyLoad: false,
			selectThreshold: 0.3,
			validate: {
				onlyAvailableItems: false
			},
			key: 'select',
			type: 'select',
			indexeddb: {
				filter: {}
			},
			input: true,
			disableLimit: true
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
	title: 'test checkbox',
	display: 'form',
	name: 'testCheckbox',
	path: 'testcheckbox',
	project: '5ebcf8938bdebc4c58a949a3',
	machineName: 'cjksbatcpbhyfbs:testCheckbox'
};
