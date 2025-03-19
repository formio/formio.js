export default {
    _id: '60ec032f86daf81238ab4e37',
	type: 'form',
	components: [
		{
			label: 'Select',
			widget: 'choicesjs',
			tableView: true,
			dataSrc: 'custom',
      valueProperty:'value',
			data: {
				custom:"values = Promise.resolve([\n  {label: 'A', value: 'aa'}, \n  {label: 'B', value: 'bb'}, \n  {label: 'C', value: 'cc'}\n]);",
			},
			key: 'select',
			type: 'select',
			input: true
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
	title: 'custom async',
	display: 'form',
	name: 'customAsync',
	path: 'customasync',
};
