export default {
	_id: '60eea4803b352ff0441d4843',
	type: 'form',
	components: [
		{
			label: 'Day',
			hideInputLabels: false,
			inputsLabelPosition: 'top',
			useLocaleSettings: false,
			tableView: false,
			fields: { day: { hide: false }, month: { hide: false }, year: { hide: false } },
			key: 'day',
			type: 'day',
			input: true,
			defaultValue: '00/00/0000'
		},
		{ type: 'button', label: 'Submit', key: 'submit', disableOnInvalid: true, input: true, tableView: false }
	],
	title: 'dat test',
	display: 'form',
	controller: '',
	name: 'dateTest',
	path: 'datetest',
};
