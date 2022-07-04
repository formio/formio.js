export default {
	type: 'form',
	components: [
		{
			label: 'Select',
			tableView: true,
			data: {
				values: [
					{ label: 'Paris', value: 'paris' },
					{ label: 'London', value: 'london' },
					{ label: 'Madrid', value: 'madrid' },
					{ label: 'Berlin', value: 'berlin' },
					{ label: 'Kiev', value: 'kiev' }
				]
			},
			selectThreshold: 0.3,
			validate: { onlyAvailableItems: false },
			key: 'select',
			type: 'select',
			indexeddb: { filter: {} },
			input: true
		},
		{ type: 'button', label: 'Submit', key: 'submit', disableOnInvalid: true, input: true, tableView: false }
	],
	title: 'test',
	display: 'form',
	name: 'testCheckbox',
	path: 'testcheckbox',
	project: '5ebcf8938bdebc4c58a949a3',
};
