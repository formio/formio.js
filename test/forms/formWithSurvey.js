export default {
	_id: '60e563c2e27f1e9264473826',
	type: 'form',
	components: [
		{
			label: 'Survey',
			tableView: true,
			questions: [
				{ label: 'question 1', value: 'question1', tooltip: '' },
				{ label: 'question 2', value: 'question2', tooltip: '' }
			],
			values: [
				{ label: 'a1', value: 'a1', tooltip: '' },
				{ label: 'a2', value: 'a2', tooltip: '' },
				{ label: 'a3', value: 'a3', tooltip: '' }
			],
			key: 'survey',
			type: 'survey',
			input: true
		},
		{
			label: 'Submit',
			showValidations: false,
			tableView: false,
			key: 'submit',
			type: 'button',
			input: true
		}
	],
	title: 'survey test',
	display: 'form',
	name: 'surveyTest',
	path: 'surveytest',
	machineName: 'cjksbatcpbhyfbs:surveyTest',
};
