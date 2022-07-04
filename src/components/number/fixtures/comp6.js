export default {
	type: 'form',
	components: [
		{
			label: 'Number',
			mask: false,
			spellcheck: true,
			tableView: false,
			delimiter: false,
			requireDecimal: false,
			inputFormat: 'plain',
			validate: { min: 20, max: 555 },
			key: 'number',
			type: 'number',
			input: true
		},
		{ label: 'Submit', showValidations: false, tableView: false, key: 'submit', type: 'button', input: true }
	],
	revisions: '',
	_vid: 0,
	title: 'number tests',
	display: 'form',
	name: 'numberTests',
	path: 'numbertests',
};
