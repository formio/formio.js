export default {
  type: 'form',
  components: [
    {
      title: 'Page 1',
      breadcrumbClickable: true,
      buttonSettings: {
        previous: true,
        cancel: true,
        next: true
      },
      scrollToTop: false,
      collapsible: false,
      key: 'page1',
      type: 'panel',
      label: 'Page 1',
      input: false,
      tableView: false,
      components: [
        {
          breadcrumbClickable: true,
          buttonSettings: {
            previous: true,
            cancel: true,
            next: true
          },
          scrollToTop: false,
          collapsible: false,
          key: 'panel',
          type: 'panel',
          label: 'Panel',
          input: false,
          tableView: false,
          components: [
            {
              label: 'Text Field',
              tableView: true,
              validate: {
                required: true
              },
              key: 'textField',
              type: 'textfield',
              input: true
            }
          ]
        },
        {
          label: 'Edit Grid',
          tableView: false,
          rowDrafts: false,
          key: 'editGrid',
          type: 'editgrid',
          input: true,
          components: [
            {
              label: 'Select',
              tableView: true,
              data: {
                values: [
                  {
                    label: 'a',
                    value: 'a'
                  },
                  {
                    label: 'b',
                    value: 'b'
                  },
                  {
                    label: 'c',
                    value: 'c'
                  }
                ]
              },
              selectThreshold: 0.3,
              validate: {
                onlyAvailableItems: false
              },
              key: 'select',
              type: 'select',
              indexeddb: {
                filter: {

                }
              },
              input: true
            }
          ]
        }
      ]
    },
    {
      title: 'Page 2',
      breadcrumbClickable: true,
      buttonSettings: {
        previous: true,
        cancel: true,
        next: true
      },
      collapsible: false,
      key: 'page2',
      logic: [
        {
          name: 'hide',
          trigger: {
            type: 'simple',
            simple: {
              show: true,
              when: 'textField',
              eq: 'hide'
            }
          },
          actions: [
            {
              name: 'hide',
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
      type: 'panel',
      label: 'Page 2',
      components: [
        {
          label: 'Columns',
          columns: [
            {
              components: [
                {
                  label: 'Checkbox',
                  tableView: false,
                  validate: {
                    required: true
                  },
                  key: 'checkbox',
                  type: 'checkbox',
                  input: true,
                  hideOnChildrenHidden: false,
                  defaultValue: false
                }
              ],
              width: 6,
              offset: 0,
              push: 0,
              pull: 0,
              size: 'md'
            },
            {
              components: [
                {
                  label: 'Date / Time',
                  displayInTimezone: 'utc',
                  format: 'yyyy-MM-dd',
                  tableView: false,
                  enableMinDateInput: false,
                  datePicker: {
                    disableWeekends: false,
                    disableWeekdays: false
                  },
                  enableMaxDateInput: false,
                  enableTime: false,
                  timePicker: {
                    showMeridian: false
                  },
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
                    enableTime: false,
                    noCalendar: false,
                    format: 'yyyy-MM-dd',
                    hourIncrement: 1,
                    minuteIncrement: 1,
                    time_24hr: true,
                    minDate: null,
                    disableWeekends: false,
                    disableWeekdays: false,
                    maxDate: null
                  },
                  hideOnChildrenHidden: false
                }
              ],
              width: 6,
              offset: 0,
              push: 0,
              pull: 0,
              size: 'md'
            }
          ],
          key: 'columns',
          type: 'columns',
          input: false,
          tableView: false
        },
        {
          label: 'Data Grid',
          reorder: false,
          addAnotherPosition: 'bottom',
          layoutFixed: false,
          enableRowGroups: false,
          initEmpty: false,
          tableView: false,
          defaultValue: [
            {

            }
          ],
          key: 'dataGrid',
          type: 'datagrid',
          input: true,
          components: [
            {
              label: 'Text Field',
              tableView: true,
              key: 'textFielde',
              type: 'textfield',
              input: true
            }
          ]
        }
      ],
      input: false,
      tableView: false
    },
    {
      title: 'Page 3',
      breadcrumbClickable: true,
      buttonSettings: {
        previous: true,
        cancel: true,
        next: true
      },
      scrollToTop: false,
      collapsible: false,
      key: 'page3',
      conditional: {
        show: false,
        when: 'textField',
        eq: 'hide2'
      },
      type: 'panel',
      label: 'Page 3',
      components: [
        {
          label: 'Well',
          key: 'well1',
          type: 'well',
          input: false,
          tableView: false,
          components: [
            {
              label: 'Email',
              tableView: true,
              key: 'email',
              type: 'email',
              input: true
            }
          ]
        }
      ],
      input: false,
      tableView: false
    }
  ],
  title: 'FIO-2494 2',
  display: 'wizard',
};
