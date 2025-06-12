export default {
  _id: '67ea94c6848c242d23244618',
  title: 'kkk',
  name: 'kkk',
  path: 'kkk',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Use Input to add moment.js for minDate',
      tableView: false,
      defaultValue: false,
      validateWhenHidden: false,
      key: 'enableMinDateInput',
      type: 'checkbox',
      input: true,
    },
    {
      label: 'Use Input to add moment.js for maxDate',
      tableView: false,
      validateWhenHidden: false,
      key: 'enableMaxDateInput',
      type: 'checkbox',
      input: true,
    },
    {
      label: 'Minimum Date',
      tooltip:
        "The minimum date that can be picked. You can also use Moment.js functions. For example: \\n \\n moment().subtract(10, 'days')",
      applyMaskOn: 'change',
      tableView: true,
      validateWhenHidden: false,
      key: 'datePicker.minDate',
      logic: [
        {
          name: 'check input mode',
          trigger: {
            type: 'javascript',
            javascript:
              "if (component.datePicker && component.datePicker.minDate && component.datePicker.minDate.indexOf('moment') !== -1) {\r\n  result = false;\r\n}\r\nelse {\r\n  result = !data.enableMinDateInput;\r\n}",
          },
          actions: [
            {
              name: 'change component',
              type: 'mergeComponentSchema',
              schemaDefinition:
                "schema = {\n  type: 'datetime',\n  label: 'Use calendar to set minDate',\n  enableDate: true,\n  enableTime: true,\n  tooltip: 'Enables to use calendar to set date.',\n  widget: {\n    type: 'calendar',\n    displayInTimezone: 'viewer',\n    locale: 'en',\n    useLocaleSettings: false,\n    allowInput: true,\n    mode: 'single',\n    enableTime: true,\n    noCalendar: false,\n    format: 'yyyy-MM-dd hh:mm a',\n    hourIncrement: 1,\n    minuteIncrement: 1,\n    time_24hr: false,\n    disableWeekends: false,\n    disableWeekdays: false,\n    maxDate: null,\n  },\n};",
            },
          ],
        },
        {
          name: 'clear value',
          trigger: {
            type: 'event',
            event: 'componentChange',
          },
          actions: [
            {
              name: 'reset value',
              type: 'customAction',
              customAction:
                "var isDateInput = instance.component.type === 'datetime';\nvar enableInput = data.enableMinDateInput;\nvar allowReset = result[0].component && result[0].component.key === 'enableMinDateInput' && !result[0].flags?.fromSubmission;\nif(((enableInput && isDateInput) || (!enableInput && !isDateInput)) && allowReset) {\n  instance.resetValue()\n}\n",
            },
          ],
        },
      ],
      type: 'textfield',
      input: true,
      skipMerge: true,
      weight: 10,
    },
    {
      label: 'Maximum Date',
      tooltip:
        "The maximum date that can be picked. You can also use Moment.js functions. For example: \\n \\n moment().add(10, 'days')",
      applyMaskOn: 'change',
      tableView: true,
      validateWhenHidden: false,
      key: 'datePicker.maxDate',
      logic: [
        {
          name: 'check input mode',
          trigger: {
            type: 'javascript',
            javascript:
              "  if (component.datePicker && component.datePicker.maxDate && component.datePicker.maxDate.indexOf('moment') !== -1) {\r\n  result = false;\r\n}\r\nelse {\r\n  result = !data.enableMaxDateInput;\r\n}",
          },
          actions: [
            {
              name: 'change component',
              type: 'mergeComponentSchema',
              schemaDefinition:
                "schema = {\n  type: 'datetime',\n  label: 'Use calendar to set maxDate',\n  enableDate: true,\n  enableTime: true,\n  tooltip: 'Enables to use calendar to set date.',\n  widget: {\n    type: 'calendar',\n    displayInTimezone: 'viewer',\n    locale: 'en',\n    useLocaleSettings: false,\n    allowInput: true,\n    mode: 'single',\n    enableTime: true,\n    noCalendar: false,\n    format: 'yyyy-MM-dd hh:mm a',\n    hourIncrement: 1,\n    minuteIncrement: 1,\n    time_24hr: false,\n    disableWeekends: false,\n    disableWeekdays: false,\n    maxDate: null,\n  },\n};",
            },
          ],
        },
        {
          name: 'clear value',
          trigger: {
            type: 'event',
            event: 'componentChange',
          },
          actions: [
            {
              name: 'resetV value',
              type: 'customAction',
              customAction:
                "var isDateInput = instance.component.type === 'datetime';\nvar enableInput = data.enableMaxDateInput;\nvar allowReset = result[0].component && result[0].component.key === 'enableMaxDateInput' && !result[0].flags?.fromSubmission;\nif(((enableInput && isDateInput) || (!enableInput && !isDateInput)) && allowReset) {\n  instance.resetValue()\n}\n",
            },
          ],
        },
      ],
      type: 'textfield',
      input: true,
      enableTime: false,
      skipMerge: true,
      weight: 20,
    },
    {
      label: 'Text Field',
      applyMaskOn: 'change',
      tableView: true,
      validateWhenHidden: false,
      key: 'textField',
      type: 'textfield',
      input: true,
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
  project: '67caad5b0416ffb92916c9ad',
  created: '2025-03-31T13:12:38.477Z',
  modified: '2025-04-01T10:19:44.322Z',
  machineName: 'bcmuuifnsbrkvdx:kkk',
};
