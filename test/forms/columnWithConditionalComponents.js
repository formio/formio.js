export default {
	type: 'form',
	components: [
		{
			label: 'Select Boxes',
			optionsLabelPosition: 'right',
			tableView: false,
			values: [
				{
					label: '1',
					value: '1',
					shortcut: ''
				},
				{
					label: '2',
					value: '2',
					shortcut: ''
				},
				{
					label: '3',
					value: '3',
					shortcut: ''
				},
				{
					label: '4',
					value: '4',
					shortcut: ''
				},
				{
					label: '5',
					value: '5',
					shortcut: ''
				},
				{
					label: '6',
					value: '6',
					shortcut: ''
				}
			],
			key: 'selectBoxes',
			type: 'selectboxes',
			input: true,
			inputType: 'checkbox'
		},
		{
			label: 'Columns',
			columns: [
				{
					components: [
						{
							label: 'Text Field1',
							tableView: true,
							key: 'textField',
							customConditional:
								'let list=[data.selectBoxes];\r\n\r\nlet returnValue=false;\r\nlist.map((e)=>{\r\n  \r\n  if(e[1]===true){\r\n    returnValue=true;\r\n    \r\n}\r\n  \r\n});\r\n\r\nshow=returnValue;',
							type: 'textfield',
							input: true,
							hideOnChildrenHidden: false
						}
					],
					width: 2,
					offset: 0,
					push: 0,
					pull: 0,
					size: 'md',
					currentWidth: 2,
					element: {}
				},
				{
					components: [
						{
							label: 'Text Field2',
							tableView: true,
							key: 'textField1',
							customConditional:
								'let list=[data.selectBoxes];\r\n\r\nlet returnValue=false;\r\nlist.map((e)=>{\r\n  \r\n  if(e[2]===true){\r\n    returnValue=true;\r\n    \r\n}\r\n  \r\n});\r\n\r\nshow=returnValue;',
							type: 'textfield',
							input: true,
							hideOnChildrenHidden: false
						}
					],
					width: 2,
					offset: 0,
					push: 0,
					pull: 0,
					size: 'md',
					currentWidth: 2,
					element: {}
				},
				{
					components: [
						{
							label: 'Text Field3',
							hidden: true,
							tableView: true,
							key: 'textField2',
							customConditional:
								'let list=[data.selectBoxes];\r\n\r\nlet returnValue=false;\r\nlist.map((e)=>{\r\n  \r\n  if(e[3]===true){\r\n    returnValue=true;\r\n    \r\n}\r\n  \r\n});\r\n\r\nshow=returnValue;',
							type: 'textfield',
							input: true,
							hideOnChildrenHidden: false
						}
					],
					size: 'md',
					width: 2,
					offset: 0,
					push: 0,
					pull: 0,
					currentWidth: 2,
					element: {}
				},
				{
					components: [
						{
							label: 'Text Field4',
							tableView: true,
							key: 'textField3',
							customConditional:
								'let list=[data.selectBoxes];\r\n\r\nlet returnValue=false;\r\nlist.map((e)=>{\r\n  \r\n  if(e[4]===true){\r\n    returnValue=true;\r\n    \r\n}\r\n  \r\n});\r\n\r\nshow=returnValue;',
							type: 'textfield',
							input: true,
							hideOnChildrenHidden: false
						}
					],
					size: 'md',
					width: 2,
					offset: 0,
					push: 0,
					pull: 0,
					currentWidth: 2,
					element: {}
				},
				{
					components: [
						{
							label: 'Text Field5',
							tableView: true,
							key: 'textField4',
							customConditional:
								'let list=[data.selectBoxes];\r\n\r\nlet returnValue=false;\r\nlist.map((e)=>{\r\n  \r\n  if(e[5]===true){\r\n    returnValue=true;\r\n    \r\n}\r\n  \r\n});\r\n\r\nshow=returnValue;',
							type: 'textfield',
							input: true,
							hideOnChildrenHidden: false
						}
					],
					size: 'md',
					width: 2,
					offset: 0,
					push: 0,
					pull: 0,
					currentWidth: 2,
					element: {}
				},
				{
					components: [
						{
							label: 'Text Field6',
							tableView: true,
							key: 'textField5',
							customConditional:
								'let list=[data.selectBoxes];\r\n\r\nlet returnValue=false;\r\nlist.map((e)=>{\r\n  \r\n  if(e[6]===true){\r\n    returnValue=true;\r\n    \r\n}\r\n  \r\n});\r\n\r\nshow=returnValue;',
							type: 'textfield',
							input: true,
							hideOnChildrenHidden: false
						}
					],
					size: 'md',
					offset: 0,
					push: 0,
					pull: 0,
					width: 2,
					currentWidth: 2,
					element: {}
				}
			],
			autoAdjust: true,
			key: 'columns',
			type: 'columns',
			input: false,
			tableView: false
		},
		{
			type: 'button',
			label: 'Submit',
			key: 'submit',
			disableOnInvalid: true,
			input: true,
			tableView: false
		}
	],
	title: 'test column form',
	display: 'form',
	name: 'testColumnForm',
	path: 'testcolumnform',
	machineName: 'cjksbatcpbhyfbs:testColumnForm',
};
