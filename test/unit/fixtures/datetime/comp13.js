export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Min Date',
      tableView: false,
      datePicker: {
        disableWeekends: false,
        disableWeekdays: false
      },
      enableMinDateInput: false,
      enableMaxDateInput: false,
      key: 'minDate',
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
        format: 'yyyy-MM-dd hh:mm a',
        hourIncrement: 1,
        minuteIncrement: 1,
        // eslint-disable-next-line camelcase
        time_24hr: false,
        minDate: null,
        disableWeekends: false,
        disableWeekdays: false,
        maxDate: null
      }
    },
    {
      label: 'Max Date',
      tableView: false,
      enableMinDateInput: false,
      datePicker: {
        disableWeekends: false,
        disableWeekdays: false
      },
      enableMaxDateInput: false,
      validate: {
        custom: "var minDate = moment(data.minDate);\nvar maxDate = moment(data.maxDate);\nvalid = maxDate.isAfter(minDate)? true : 'Max date must be after min date'"
      },
      key: 'maxDate',
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
        format: 'yyyy-MM-dd hh:mm a',
        hourIncrement: 1,
        minuteIncrement: 1,
        // eslint-disable-next-line camelcase
        time_24hr: false,
        minDate: null,
        disableWeekends: false,
        disableWeekdays: false,
        maxDate: null
      }
    },
    {
      label: 'In Between Date',
      tableView: false,
      datePicker: {
        disableFunction: '!moment(date).isBetween(moment(data.minDate), moment(data.maxDate))',
        disableWeekends: false,
        disableWeekdays: false
      },
      enableMinDateInput: false,
      enableMaxDateInput: false,
      key: 'inBetweenDate',
      customConditional: 'show = !!data.minDate && !!data.maxDate',
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
        format: 'yyyy-MM-dd hh:mm a',
        hourIncrement: 1,
        minuteIncrement: 1,
        // eslint-disable-next-line camelcase
        time_24hr: false,
        minDate: null,
        disableWeekends: false,
        disableWeekdays: false,
        disableFunction: '!moment(date).isBetween(moment(data.minDate), moment(data.maxDate))',
        maxDate: null
      }
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
};
