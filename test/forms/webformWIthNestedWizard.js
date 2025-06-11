export default {
	type: 'form',
	components: [
		{
			label: 'Parent Text',
			tableView: true,
			validate: {
			  required: true
			},
			key: 'parentText',
			type: 'textfield',
			input: true
		},
		{
			label: 'Parent Number',
			mask: false,
			spellcheck: true,
			tableView: false,
			delimiter: false,
			requireDecimal: false,
			inputFormat: 'plain',
			validate: {
			  required: true
			},
			key: 'parentNumber',
			type: 'number',
			input: true
		},
		{
			label: 'Form Nested',
			tableView: true,
			useOriginalRevision: false,
			key: 'formNested',
			type: 'form',
			input: true
		},
		{
			label: 'Submit',
			showValidations: false,
			tableView: false,
			key: 'submit',
			type: 'button',
			input: true,
			saveOnEnter: false
		}
	],
	revisions: '',
	_vid: 0,
	title: 'webform with nested wizard',
	display: 'form',
	name: 'webformWithNestedWizard',
	path: 'webformwithnestedwizard'
};
