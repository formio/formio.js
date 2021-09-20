export default {
	type: 'form',
	components: [
		{
			label: 'Select',
			tableView: true,
			dataSrc: 'resource',
			data: { values: [{ label: '', value: '' }], resource: '60114dd32cab36ad94ac4f94' },
			valueProperty: 'data.name',
			template: '<span>{{ item.data.name }}</span>',
			selectThreshold: 0.3,
			validate: { onlyAvailableItems: false },
			key: 'select',
			type: 'select',
			indexeddb: { filter: {} },
			searchField: 'data.name__regex',
			input: true,
			addResource: false,
			reference: false
		},
		{ type: 'button', label: 'Submit', key: 'submit', disableOnInvalid: true, input: true, tableView: false }
	],
	title: 'test',
	display: 'form',
	name: 'test',
	path: 'test',
};
