export default {
	type: 'form',
	components: [
		{
			label: 'Select Choices',
			tableView: true,
			data: {
				values: [{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }, { label: 'c', value: 'c' }]
			},
			selectThreshold: 0.3,
			validate: { onlyAvailableItems: false },
			key: 'selectChoices',
			type: 'select',
			indexeddb: { filter: {} },
			input: true
		},
		{
			label: 'Select HTML',
			widget: 'html5',
			tableView: true,
			data: {
				values: [{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }, { label: 'c', value: 'c' }]
			},
			selectThreshold: 0.3,
			validate: { onlyAvailableItems: false },
			key: 'selectHtml',
			type: 'select',
			indexeddb: { filter: {} },
			input: true
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
};
