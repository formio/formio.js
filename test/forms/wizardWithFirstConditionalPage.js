export default {
	_id: '5f9149b4d0f4d37edc66e759',
	type: 'form',
	tags: [],
	owner: '5f04635a0b7e4512160f3d9f',
	components: [
		{
			title: 'Page 1',
			breadcrumbClickable: true,
			buttonSettings: {
				previous: true,
				cancel: true,
				next: true,
			},
			collapsible: false,
			key: 'page1',
			conditional: {
				show: true,
				when: 'b',
				eq: 'true',
			},
			type: 'panel',
			label: 'Page 1',
			components: [
				{
					label: 'Parent A',
					tableView: true,
					validate: {
						required: true,
					},
					key: 'parentA',
					type: 'textfield',
					input: true,
				},
			],
			input: false,
			tableView: false,
		},
		{
			title: 'Page 2',
			label: 'Page 2',
			type: 'panel',
			key: 'page2',
			components: [
				{
					label: 'Parent B',
					tableView: true,
					key: 'b',
					type: 'textfield',
					input: true,
				},
			],
			input: false,
			tableView: false,
		},
	],
	revisions: '',
	_vid: 0,
	title: 'FJS-1299',
	display: 'wizard',
	access: [
		{
			roles: [
				'5f47eadc8aeb8509a99f61b6',
				'5f47eadc8aeb8509a99f61b7',
				'5f47eadc8aeb8509a99f61b8',
			],
			type: 'read_all',
		},
	],
	submissionAccess: [],
	controller: '',
	properties: {},
	settings: {},
	name: 'conditionalWizardTest',
	path: 'conditionalwizardtest',
	project: '5f47eadc8aeb8509a99f61b5',
	created: '2020-08-27T17:19:15.128Z',
	modified: '2020-08-27T17:19:15.131Z',
	machineName: 'ywvqkdghljvoegd:conditionalWizardTest',
};
