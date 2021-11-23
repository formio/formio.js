export default {
	type: 'form',
	components: [
		{
			title: 'Parent 1',
			breadcrumbClickable: true,
			buttonSettings: {
				previous: true,
				cancel: true,
				next: true
			},
			scrollToTop: false,
			collapsible: false,
			key: 'parent1',
			type: 'panel',
			label: 'Page 1',
			components: [
				{
					label: 'Select Boxes Parent',
					optionsLabelPosition: 'right',
					tableView: false,
					values: [
						{
							label: 'a',
							value: 'a',
							shortcut: ''
						},
						{
							label: 'b',
							value: 'b',
							shortcut: ''
						},
						{
							label: 'c',
							value: 'c',
							shortcut: ''
						}
					],
					validate: {
						onlyAvailableItems: false
					},
					key: 'selectBoxesParent',
					type: 'selectboxes',
					input: true,
					inputType: 'checkbox',
					defaultValue: {
						a: false,
						b: false,
						c: false
					}
				}
			],
			input: false,
			tableView: false
		},
		{
			title: 'Parent 2',
			breadcrumbClickable: true,
			buttonSettings: {
				previous: true,
				cancel: true,
				next: true
			},
			scrollToTop: false,
			collapsible: false,
			key: 'parent2',
			type: 'panel',
			label: 'Page 2',
			components: [
				{
					label: 'Number Parent',
					mask: false,
					spellcheck: true,
					tableView: false,
					delimiter: false,
					requireDecimal: false,
					inputFormat: 'plain',
					key: 'numberParent',
					type: 'number',
					input: true
				},
				{
					label: 'Form Nested',
					tableView: true,
				//	form: '6038a2744efbab80ec1cf523',
					useOriginalRevision: false,
					key: 'formNested',
					type: 'form',
					input: true
				}
			],
			input: false,
			tableView: false
		}
	],
	revisions: '',
	_vid: 0,
	title: 'with nested wizard',
	display: 'wizard',
	name: 'withNestedWizard',
	path: 'withnestedwizard'
};


