export default {
	type: 'form',
	components: [
		{
			label: 'select',
			tableView: true,
			data: { values: [ { label: 'select', value: 'select' }, { label: 'error', value: 'error' } ] },
			selectThreshold: 0.3,
			validate: { required: true, onlyAvailableItems: false },
			key: 'select',
			type: 'select',
			indexeddb: { filter: {} },
			input: true
		},
		{ label: 'Submit', showValidations: false, tableView: false, key: 'submit', type: 'button', input: true }
	],
	title: 'test translation',
	display: 'form',
	name: 'testTranslation',
	path: 'testtranslation',
	machineName: 'cjksbatcpbhyfbs:testTranslation',
};
