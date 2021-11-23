export default {
	type: 'form',
	components: [
		{
			title: 'Page 1',
			label: 'Page 1',
			type: 'panel',
			key: 'page1',
			components: [
				{
					label: 'Edit Grid',
					tableView: false,
					rowDrafts: false,
					key: 'editGrid',
					type: 'editgrid',
					input: true,
					components: [
						{ label: 'Text Field', tableView: true, key: 'textField', type: 'textfield', input: true }
					]
				},
				{
					breadcrumbClickable: true,
					buttonSettings: { previous: true, cancel: true, next: true },
					scrollToTop: false,
					collapsible: false,
					key: 'panel',
					type: 'panel',
					label: 'Panel',
					input: false,
					tableView: false,
					components: [
						{
							label: 'Data Grid',
							reorder: false,
							addAnotherPosition: 'bottom',
							layoutFixed: false,
							enableRowGroups: false,
							initEmpty: false,
							tableView: false,
							defaultValue: [ {} ],
							key: 'dataGrid',
							type: 'datagrid',
							input: true,
							components: [
								{
									label: 'Number',
									mask: false,
									spellcheck: true,
									tableView: false,
									delimiter: false,
									requireDecimal: false,
									inputFormat: 'plain',
									key: 'number',
									type: 'number',
									input: true
								}
							]
						}
					]
				}
			],
			input: false,
			tableView: false
		}
	],
	title: 'test saving data',
	display: 'wizard',
	name: 'testSavingData',
	path: 'testsavingdata',
};
