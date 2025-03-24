export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Data Grid',
      key: 'dataGrid',
      type: 'datagrid',
      input: true,
      tableView: false,
      components: [
        {
          label: 'Team Name',
          widget: 'choicesjs',
          tableView: true,
          data: {
            values: [
              {
                label: 'Pre Risk Analysis',
                value: 'preRiskAnalysis',
              },
              {
                label: 'Docs',
                value: 'docs',
              },
            ],
          },
          key: 'teamName',
          type: 'select',
          input: true,
        },
        {
          label: 'Priority(For Pre-Risk Analysis, select priority as Urgent)',
          tableView: false,
          values: [
            {
              label: 'Normal',
              value: 'normal',
              shortcut: '',
            },
            {
              label: 'Urgent',
              value: 'urgent',
              shortcut: '',
            },
          ],
          key: 'actionadd3',
          type: 'radio',
          input: true,
        },
        {
          label: 'Follow-up Date(For Urgent)',
          format: 'dd-MMM-yyyy HH:mm',
          hidden: true,
          tableView: false,
          enableMinDateInput: false,
          datePicker: {
            disableWeekends: true,
            disableWeekdays: false,
          },
          enableMaxDateInput: false,
          timePicker: {
            showMeridian: false,
          },
          key: 'followUpDate',
          logic: [
            {
              name: 'logic',
              trigger: {
                type: 'javascript',
                javascript:
                  'return (row.teamName === "preRiskAnalysis" && row.actionadd3 === "urgent")',
              },
              actions: [
                {
                  name: 'action',
                  type: 'property',
                  property: {
                    label: 'Hidden',
                    value: 'hidden',
                    type: 'boolean',
                  },
                  state: false,
                },
              ],
            },
          ],
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
            format: 'dd-MMM-yyyy HH:mm',
            hourIncrement: 1,
            minuteIncrement: 1,
            'time_24hr': true,
            minDate: null,
            disableWeekends: true,
            disableWeekdays: false,
            maxDate: null,
          },
        },
        {
          label: 'Escalation ID',
          hidden: false,
          clearOnHide: true,
          disabled: true,
          tableView: true,
          key: 'escalationId',
          logic: [
            {
              name: 'logic1',
              trigger: {
                type: 'simple',
                simple: {
                  show: true,
                  when: 'dataGrid.teamName',
                  eq: 'preRiskAnalysis',
                },
              },
              actions: [
                {
                  name: 'ation1',
                  type: 'value',
                  value: 'value="RUSH"',
                },
              ],
            },
            {
              name: 'logic2',
              trigger: {
                type: 'simple',
                simple: {
                  show: true,
                  when: 'dataGrid.teamName',
                  eq: 'docs',
                },
              },
              actions: [
                {
                  name: 'action2',
                  type: 'value',
                  value: 'value="4DDJ"',
                },
              ],
            },
            {
              name: 'On Hide',
              trigger: {
                type: 'event',
                event: 'hide'
              },
              actions: [
                {
                  name: 'Hide Component',
                  type: 'property',
                  property: {
                    label: 'Hidden',
                    value: 'hidden',
                    type: 'boolean'
                  },
                  state: true
                }
              ]
            }
          ],
          type: 'textfield',
          input: true,
        },
      ],
    }
  ]
};
