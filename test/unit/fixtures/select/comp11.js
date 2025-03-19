export default {
	components: [
		{
			type: 'select',
			label: 'Select JSON',
			key: 'select',
			placeholder: 'Select one',
			data: {
				json: `[
          {"value":"a","label":"A"},
          {"value":"b","label":"B"},
          {"value":"c","label":"C"},
          {"value":"d","label":"D"}
        ]`
			},
			dataSrc: 'json',
			template: '<span>{{ item.label }}</span>',
			input: true
		},
		{ type: 'button', label: 'Submit', key: 'submit', disableOnInvalid: false, input: true, tableView: false }
	]
};
