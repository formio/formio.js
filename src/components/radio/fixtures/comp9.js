export default {
    type: 'form',
    components: [
        {
            type: 'radio',
            label: 'Radio',
            key: 'radio',
            dataSrc: 'url',
            data: {
                url: 'https://cdn.rawgit.com/mshafrir/2646763/raw/states_titlecase.json'
            },
            valueProperty: 'abbreviation',
            template: '<span>{{ item.name }}</span>',
            input: true
        },
        {
			label: 'Submit',
			showValidations: false,
			alwaysEnabled: false,
			tableView: false,
			key: 'submit',
			type: 'button',
			input: true
		}
    ],
    title: 'test radio Url',
	display: 'form',
	name: 'testRadioUrl',
	path: 'testRadioUrl',
};
