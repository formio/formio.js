export default {
	_id: '60e41b43e27f1e926447370b',
  type: 'form',
	components: [
		{
			label: 'Date / Time',
			format: 'MM/dd/yyyyy',
			tableView: false,
			enableMinDateInput: true,
			datePicker: {
				minDate: "moment().startOf('month')",
				disableFunction: 'date.getDate() !== 1',
				disableWeekends: false,
				disableWeekdays: false
			},
			enableMaxDateInput: false,
			key: 'dateTime',
			type: 'datetime',
			input: true,
			widget: {
				type: 'calendar',
				displayInTimezone: 'viewer',
				locale: 'en',
				useLocaleSettings: false,
				allowInput: true,
				mode: 'single',
				enableTime: true,
				noCalendar: false,
				format: 'MM/dd/yyyyy',
				hourIncrement: 1,
				minuteIncrement: 1,
				'time_24hr': false,
				minDate: "moment().startOf('month')",
				disableWeekends: false,
				disableWeekdays: false,
				disableFunction: 'date.getDate() !== 1',
				maxDate: null
			}
		},
		{ type: 'button', label: 'Submit', key: 'submit', disableOnInvalid: true, input: true, tableView: false }
	],
	title: 'test',
	display: 'form',
	name: 'test',
	path: 'test',
};
