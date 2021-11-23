export default {
	type: 'form',
	components: [
		{
			label: 'Date / Time',
			tableView: false,
			enableMinDateInput: false,
			datePicker: { disableWeekends: false, disableWeekdays: false },
			enableMaxDateInput: false,
			key: 'dateTime',
			type: 'datetime',
			input: true,
			widget: {
				type: 'calendar',
				displayInTimezone: 'utc',
				locale: 'en',
				useLocaleSettings: false,
				allowInput: true,
				mode: 'single',
				enableTime: true,
				noCalendar: false,
				format: 'yyyy-MM-dd hh:mm a',
				hourIncrement: 1,
				minuteIncrement: 1,
				'time_24hr': false,
				minDate: null,
				disableWeekends: false,
				disableWeekdays: false,
				maxDate: null
			}
		},
		{ label: 'Submit', showValidations: false, tableView: false, key: 'submit', type: 'button', input: true }
	],
	title: 'test11',
	display: 'form',
	name: 'test11',
	path: 'test11',
};
