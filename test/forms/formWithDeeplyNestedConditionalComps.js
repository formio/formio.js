export default {
	title: 'FD39656 Edit Grids in Panels',
	name: 'fd39656EditGridsInPanels',
	path: 'fd39656editgridsinpanels',
	type: 'form',
	display: 'form',
	components: [
		{
			label: 'Radio1',
			optionsLabelPosition: 'right',
			inline: false,
			tableView: false,
			values: [
				{
					label: 'yes',
					value: 'yes',
					shortcut: '',
				},
				{
					label: 'no',
					value: 'no',
					shortcut: '',
				},
			],
			key: 'radio1',
			type: 'radio',
			input: true,
		},
		{
			label: 'Container',
			tableView: false,
			key: 'container',
			conditional: {
				show: true,
				conjunction: 'all',
				conditions: [
					{
						component: 'radio1',
						operator: 'isEqual',
						value: 'yes',
					},
				],
			},
			type: 'container',
			input: true,
			components: [
				{
					title: 'Panel in Hidden Container',
					collapsible: false,
					key: 'panel',
					type: 'panel',
					label: 'Panel',
					input: false,
					tableView: false,
					components: [
						{
							label: 'Hidden Checkbox in Panel in Hidden Container',
							tableView: false,
							defaultValue: false,
							key: 'checkbox',
							conditional: {
								show: true,
								conjunction: 'all',
								conditions: [
									{
										component: 'radio1',
										operator: 'isEqual',
										value: 'yes',
									},
								],
							},
							type: 'checkbox',
							input: true,
						},
						{
							label: 'Checkbox in Panel in Hidden Container',
							tableView: false,
							key: 'checkboxInPanelInHiddenContainer',
							type: 'checkbox',
							input: true,
							defaultValue: false,
						},
						{
							label: 'Text Field',
							applyMaskOn: 'change',
							tableView: true,
							key: 'textField',
							conditional: {
								show: true,
								conjunction: 'all',
								conditions: [
									{
										component: 'radio1',
										operator: 'isEqual',
										value: 'yes',
									},
								],
							},
							type: 'textfield',
							input: true,
						},
						{
							label: 'Edit Grid',
							tableView: false,
							rowDrafts: false,
							key: 'editGrid',
							type: 'editgrid',
							displayAsTable: false,
							input: true,
							components: [
								{
									label: 'Text Field',
									applyMaskOn: 'change',
									tableView: true,
									key: 'textField',
									conditional: {
										show: true,
										conjunction: 'all',
										conditions: [
											{
												component: 'container.editGrid.number',
												operator: 'isEqual',
												value: 1,
											},
										],
									},
									type: 'textfield',
									input: true,
								},
								{
									label: 'Number',
									applyMaskOn: 'change',
									mask: false,
									tableView: true,
									delimiter: false,
									requireDecimal: false,
									inputFormat: 'plain',
									truncateMultipleSpaces: false,
									key: 'number',
									type: 'number',
									input: true,
								},
							],
						},
					],
				},
			],
		},
		{
			type: 'button',
			label: 'Submit',
			key: 'submit',
			disableOnInvalid: true,
			input: true,
			tableView: false,
		},
	],
};
