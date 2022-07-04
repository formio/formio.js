export default {
	_id: '60dd99f437685ab150b72a41',
	type: 'form',
	components: [
		{
			label: 'Data Grid',
			reorder: false,
			addAnotherPosition: 'bottom',
			layoutFixed: false,
			enableRowGroups: false,
			initEmpty: false,
			tableView: false,
			defaultValue: [ { container: { dataGrid6: [ { checkbox: false } ] } } ],
			key: 'dataGrid7',
			type: 'datagrid',
			input: true,
			components: [
				{
					label: 'Container',
					tableView: false,
					key: 'container',
					type: 'container',
					input: true,
					components: [
						{
							label: 'Data Grid',
							reorder: false,
							addAnotherPosition: 'bottom',
							layoutFixed: false,
							enableRowGroups: false,
							initEmpty: false,
							tableView: false,
							defaultValue: [ { checkbox: false } ],
							key: 'dataGrid6',
							type: 'datagrid',
							input: true,
							components: [
								{
									label: 'Checkbox',
									tableView: false,
									key: 'checkbox',
									type: 'checkbox',
									input: true
								},
								{
									label: 'Data Grid',
									reorder: false,
									addAnotherPosition: 'bottom',
									layoutFixed: false,
									enableRowGroups: false,
									initEmpty: false,
									tableView: false,
									defaultValue: [ { number: '' } ],
									key: 'dataGrid5',
									customConditional: 'show = row.checkbox === true',
									type: 'datagrid',
									input: true,
									components: [
										{
											label: 'Number',
											mask: false,
											tableView: false,
											delimiter: false,
											requireDecimal: false,
											inputFormat: 'plain',
											truncateMultipleSpaces: false,
											key: 'number',
											type: 'number',
											input: true
										}
									]
								}
							]
						}
					]
				}
			]
		}
	],
	title: 'test failure',
	display: 'form',
	name: 'testFailure',
	path: 'testfailure',
	machineName: 'cjksbatcpbhyfbs:testFailure',
};
