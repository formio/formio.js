const form1 = {
  title: 'test new simple conditionals',
  name: 'testNewSimpleConditionals',
  path: 'testnewsimpleconditionals',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Conditional Field',
      tableView: true,
      key: 'conditionalField',
      conditional: {
        show: true,
        conjunction: 'all',
        conditions: [
          {
            component: 'number',
            operator: 'lessThan',
            value: 100,
          },
          {
            component: 'email',
            operator: 'endsWith',
            value: '@form.io',
          },
          {
            component: 'radio',
            operator: 'isNotEmpty',
          },
        ],
      },
      type: 'textfield',
      input: true,
    },
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
      input: true,
    },
    {
      label: 'Email',
      tableView: true,
      key: 'email',
      type: 'email',
      input: true,
    },
    {
      label: 'Radio',
      optionsLabelPosition: 'right',
      inline: false,
      tableView: false,
      values: [
        {
          label: 'one',
          value: 'one',
          shortcut: '',
        },
        {
          label: 'two',
          value: 'two',
          shortcut: '',
        },
        {
          label: 'three',
          value: 'three',
          shortcut: '',
        },
      ],
      key: 'radio',
      type: 'radio',
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
  created: '2022-09-29T07:59:47.393Z',
  modified: '2022-09-29T08:02:54.472Z',
  machineName: 'uubnbosxacwjzbk:testNewSimpleConditionals',
};

const form2 = {
  title: 'test conditions',
  name: 'testConditions',
  path: 'testconditions',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Text Field CONDITIONAL',
      tableView: true,
      key: 'conditionalField',
      conditional: {
        show: true,
        conjunction: 'all',
        conditions: [
          {
            component: 'email',
            operator: 'endsWith',
            value: '@form.io',
          },
          {
            component: 'day',
            operator: 'dateGreaterThan',
            value: '9/20/2022',
          },
          {
            component: 'currency',
            operator: 'greaterThan',
            value: 30,
          },
          {
            component: 'survey',
            operator: 'isNotEmpty',
          },
          {
            component: 'number',
            operator: 'lessThanOrEqual',
            value: 100,
          },
          {
            component: 'checkbox',
            operator: 'isEqual',
            value: true,
          },
          {
            component: 'selectBoxes',
            operator: 'isEqual',
            value: 'one',
          },
          {
            component: 'radio',
            operator: 'isNotEqual',
            value: 'one',
          },
          {
            component: 'tags',
            operator: 'includes',
            value: 'test',
          },
          {
            component: 'selectValues',
            operator: 'isEqual',
            value: 'one',
          },
          {
            component: 'selectCustomWithValuesOfNumberType',
            operator: 'isNotEqual',
            value: 2,
          },
        ],
      },
      type: 'textfield',
      input: true,
    },
    {
      label: 'Email',
      tableView: true,
      key: 'email',
      type: 'email',
      input: true,
    },
    {
      label: 'Day',
      hideInputLabels: false,
      inputsLabelPosition: 'top',
      useLocaleSettings: false,
      tableView: false,
      fields: {
        day: {
          hide: false,
        },
        month: {
          hide: false,
        },
        year: {
          hide: false,
        },
      },
      key: 'day',
      type: 'day',
      input: true,
    },
    {
      label: 'Currency',
      mask: false,
      spellcheck: true,
      tableView: false,
      currency: 'USD',
      inputFormat: 'plain',
      truncateMultipleSpaces: false,
      key: 'currency',
      type: 'currency',
      input: true,
      delimiter: true,
    },
    {
      label: 'Survey',
      tableView: false,
      questions: [
        {
          label: 'q1',
          value: 'q1',
          tooltip: '',
        },
        {
          label: 'q2',
          value: 'q2',
          tooltip: '',
        },
      ],
      values: [
        {
          label: 'true',
          value: 'true',
          tooltip: '',
        },
        {
          label: 'false',
          value: 'false',
          tooltip: '',
        },
      ],
      key: 'survey',
      type: 'survey',
      input: true,
    },
    {
      label: 'Number',
      mask: false,
      tableView: false,
      multiple: true,
      delimiter: false,
      requireDecimal: false,
      inputFormat: 'plain',
      truncateMultipleSpaces: false,
      key: 'number',
      type: 'number',
      input: true,
    },
    {
      label: 'Checkbox',
      tableView: false,
      key: 'checkbox',
      type: 'checkbox',
      input: true,
    },
    {
      label: 'Select Boxes',
      optionsLabelPosition: 'right',
      tableView: false,
      values: [
        {
          label: 'one',
          value: 'one',
          shortcut: '',
        },
        {
          label: 'two',
          value: 'two',
          shortcut: '',
        },
        {
          label: 'three',
          value: 'three',
          shortcut: '',
        },
        {
          label: 'four',
          value: 'four',
          shortcut: '',
        },
        {
          label: 'five',
          value: 'five',
          shortcut: '',
        },
      ],
      key: 'selectBoxes',
      type: 'selectboxes',
      input: true,
      inputType: 'checkbox',
    },
    {
      label: 'Radio',
      optionsLabelPosition: 'right',
      inline: false,
      tableView: false,
      values: [
        {
          label: 'one',
          value: 'one',
          shortcut: '',
        },
        {
          label: 'two',
          value: 'two',
          shortcut: '',
        },
        {
          label: 'three',
          value: 'three',
          shortcut: '',
        },
      ],
      key: 'radio',
      type: 'radio',
      input: true,
    },
    {
      label: 'Tags',
      tableView: false,
      key: 'tags',
      type: 'tags',
      input: true,
    },
    {
      label: 'Select Values',
      widget: 'choicesjs',
      tableView: true,
      data: {
        values: [
          {
            label: 'one',
            value: 'one',
          },
          {
            label: 'two',
            value: 'two',
          },
          {
            label: 'three',
            value: 'three',
          },
        ],
      },
      key: 'selectValues',
      type: 'select',
      input: true,
    },
    {
      label: 'Select custom with values of number type',
      widget: 'choicesjs',
      tableView: true,
      dataSrc: 'custom',
      data: {
        custom:
          "values = [ {label: 'one', value: 1}, {label: 'two', value: 2}, {label: 'three', value: 3}]",
      },
      dataType: 'boolean',
      valueProperty: 'value',
      key: 'selectCustomWithValuesOfNumberType',
      type: 'select',
      input: true,
    },
    {
      label: 'Submit',
      showValidations: false,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true,
      saveOnEnter: false,
    },
  ],
  created: '2022-09-16T15:10:25.867Z',
  modified: '2022-09-29T08:37:57.247Z',
  machineName: 'uubnbosxacwjzbk:testConditions',
};

const form3 = {
  title: 'simple conditional logic',
  name: 'simpleConditionalLogic',
  path: 'simpleconditionallogic',
  type: 'form',
  display: 'form',
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
      input: true,
    },
    {
      label: 'Radio',
      optionsLabelPosition: 'right',
      inline: false,
      tableView: false,
      values: [
        {
          label: 'one',
          value: 'one',
          shortcut: '',
        },
        {
          label: 'two',
          value: 'two',
          shortcut: '',
        },
        {
          label: 'three',
          value: 'three',
          shortcut: '',
        },
      ],
      key: 'radio',
      type: 'radio',
      input: true,
    },
    {
      label: 'Field With Logic',
      tableView: true,
      key: 'fieldWithLogic',
      logic: [
        {
          name: 'test logic',
          trigger: {
            type: 'simple',
            simple: {
              show: true,
              conjunction: 'all',
              conditions: [
                {
                  component: 'number',
                  operator: 'isEqual',
                  value: 2,
                },
                {
                  component: 'radio',
                  operator: 'isEqual',
                  value: 'two',
                },
              ],
            },
          },
          actions: [
            {
              name: 'test action',
              type: 'value',
              value: "value = 'logic works';",
            },
          ],
        },
      ],
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
  created: '2022-09-29T08:56:20.643Z',
  modified: '2022-09-29T08:56:20.646Z',
  machineName: 'uubnbosxacwjzbk:simpleConditionalLogic',
};

const form4 = {
  title: 'simple condition inside the row',
  name: 'simpleConditionInsideTheRow',
  path: 'simpleconditioninsidetherow',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Data Grid',
      reorder: false,
      addAnotherPosition: 'bottom',
      layoutFixed: false,
      enableRowGroups: false,
      initEmpty: false,
      tableView: false,
      defaultValue: [{}],
      key: 'dataGrid',
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
          input: true,
        },
        {
          label: 'Text Field',
          tableView: true,
          key: 'textField',
          conditional: {
            show: true,
            conjunction: 'all',
            conditions: [
              {
                component: 'dataGrid.number',
                operator: 'lessThanOrEqual',
                value: 50,
              },
            ],
          },
          type: 'textfield',
          input: true,
        },
      ],
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
  created: '2022-09-29T09:24:20.768Z',
  modified: '2022-09-29T09:24:20.780Z',
  machineName: 'uubnbosxacwjzbk:simpleConditionInsideTheRow',
};

const form5 = {
  title: 'test all conditional operators',
  name: 'testAllConditionalOperators',
  path: 'testallconditionaloperators',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Text Field CONDITIONAL',
      tableView: true,
      key: 'conditionalField',
      conditional: {
        show: true,
        conjunction: 'all',
        conditions: [
          {
            component: 'dateTime',
            operator: 'dateGreaterThan',
            value: '2021-09-16T12:00:00+03:00',
          },
          {
            component: 'day',
            operator: 'dateGreaterThanOrEqual',
            value: '8/12/2022',
          },
          {
            component: 'dateTime1',
            operator: 'dateLessThan',
            value: '2023-01-19T12:00:00+03:00',
          },
          {
            component: 'day1',
            operator: 'dateLessThanOrEqual',
            value: '10/13/2023',
          },
          {
            component: 'url',
            operator: 'endsWith',
            value: '.form.io',
          },
          {
            component: 'number',
            operator: 'greaterThan',
            value: 50,
          },
          {
            component: 'currency',
            operator: 'greaterThanOrEqual',
            value: 100,
          },
          {
            component: 'textField1',
            operator: 'includes',
            value: 'test',
          },
          {
            component: 'day2',
            operator: 'isDateEqual',
            value: '9/29/2022',
          },
          {
            component: 'select',
            operator: 'isEmpty',
          },
          {
            component: 'radio',
            operator: 'isEqual',
            value: 'one',
          },
          {
            component: 'dateTime3',
            operator: 'isNotDateEqual',
            value: '2022-09-29T12:00:00+03:00',
          },
          {
            component: 'textArea',
            operator: 'isNotEmpty',
          },
          {
            component: 'textField2',
            operator: 'isNotEqual',
            value: 'test',
          },
          {
            component: 'number2',
            operator: 'lessThan',
            value: 150,
          },
          {
            component: 'currency2',
            operator: 'lessThanOrEqual',
            value: 500,
          },
          {
            component: 'email',
            operator: 'notIncludes',
            value: 'test',
          },
          {
            component: 'url2',
            operator: 'startsWith',
            value: 'portal',
          },
        ],
      },
      type: 'textfield',
      input: true,
    },
    {
      label: 'Date / Time',
      tableView: false,
      datePicker: {
        disableWeekends: false,
        disableWeekdays: false,
      },
      enableMinDateInput: false,
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
        format: 'yyyy-MM-dd hh:mm a',
        hourIncrement: 1,
        minuteIncrement: 1,
        time_24hr: false,
        minDate: null,
        disableWeekends: false,
        disableWeekdays: false,
        maxDate: null,
      },
    },
    {
      label: 'Day',
      hideInputLabels: false,
      inputsLabelPosition: 'top',
      useLocaleSettings: false,
      tableView: false,
      fields: {
        day: {
          hide: false,
        },
        month: {
          hide: false,
        },
        year: {
          hide: false,
        },
      },
      key: 'day',
      type: 'day',
      input: true,
      defaultValue: '00/00/0000',
    },
    {
      label: 'Date / Time1',
      tableView: false,
      datePicker: {
        disableWeekends: false,
        disableWeekdays: false,
      },
      enableMinDateInput: false,
      enableMaxDateInput: false,
      key: 'dateTime1',
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
        time_24hr: false,
        minDate: null,
        disableWeekends: false,
        disableWeekdays: false,
        maxDate: null,
      },
    },
    {
      label: 'Day1',
      hideInputLabels: false,
      inputsLabelPosition: 'top',
      useLocaleSettings: false,
      tableView: false,
      fields: {
        day: {
          hide: false,
        },
        month: {
          hide: false,
        },
        year: {
          hide: false,
        },
      },
      key: 'day1',
      type: 'day',
      input: true,
      defaultValue: '00/00/0000',
    },
    {
      label: 'Url',
      tableView: true,
      key: 'url',
      type: 'url',
      input: true,
    },
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
      input: true,
    },
    {
      label: 'Currency',
      mask: false,
      spellcheck: true,
      tableView: false,
      currency: 'USD',
      inputFormat: 'plain',
      truncateMultipleSpaces: false,
      key: 'currency',
      type: 'currency',
      input: true,
      delimiter: true,
    },
    {
      label: 'Text Field',
      tableView: true,
      key: 'textField1',
      type: 'textfield',
      input: true,
    },
    {
      label: 'Day2',
      hideInputLabels: false,
      inputsLabelPosition: 'top',
      useLocaleSettings: false,
      tableView: false,
      fields: {
        day: {
          hide: false,
        },
        month: {
          hide: false,
        },
        year: {
          hide: false,
        },
      },
      key: 'day2',
      type: 'day',
      input: true,
      defaultValue: '00/00/0000',
    },
    {
      label: 'Select',
      widget: 'choicesjs',
      tableView: true,
      data: {
        values: [
          {
            label: 'one',
            value: 'one',
          },
          {
            label: 'two',
            value: 'two',
          },
        ],
      },
      key: 'select',
      type: 'select',
      input: true,
    },
    {
      label: 'Radio',
      optionsLabelPosition: 'right',
      inline: false,
      tableView: false,
      values: [
        {
          label: 'one',
          value: 'one',
          shortcut: '',
        },
        {
          label: 'two',
          value: 'two',
          shortcut: '',
        },
      ],
      key: 'radio',
      type: 'radio',
      input: true,
    },
    {
      label: 'Date / Time3',
      tableView: false,
      datePicker: {
        disableWeekends: false,
        disableWeekdays: false,
      },
      enableMinDateInput: false,
      enableMaxDateInput: false,
      key: 'dateTime3',
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
        time_24hr: false,
        minDate: null,
        disableWeekends: false,
        disableWeekdays: false,
        maxDate: null,
      },
    },
    {
      label: 'Text Area',
      autoExpand: false,
      tableView: true,
      key: 'textArea',
      type: 'textarea',
      input: true,
    },
    {
      label: 'Text Field 2',
      tableView: true,
      key: 'textField2',
      type: 'textfield',
      input: true,
    },
    {
      label: 'Number 2',
      mask: false,
      tableView: false,
      multiple: true,
      delimiter: false,
      requireDecimal: false,
      inputFormat: 'plain',
      truncateMultipleSpaces: false,
      key: 'number2',
      type: 'number',
      input: true,
      defaultValue: [null],
    },
    {
      label: 'Currency 2',
      mask: false,
      spellcheck: true,
      tableView: false,
      currency: 'USD',
      inputFormat: 'plain',
      truncateMultipleSpaces: false,
      key: 'currency2',
      type: 'currency',
      input: true,
      delimiter: true,
    },
    {
      label: 'Email',
      tableView: true,
      key: 'email',
      type: 'email',
      input: true,
    },
    {
      label: 'Url2',
      tableView: true,
      key: 'url2',
      type: 'url',
      input: true,
    },
    {
      label: 'Submit',
      showValidations: false,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true,
    },
  ],
  created: '2022-09-29T09:43:53.720Z',
  modified: '2022-09-29T10:13:37.115Z',
  machineName: 'uubnbosxacwjzbk:testAllConditionalOperators',
};

const form6 = {
  title: 'select boxes cond',
  name: 'selectBoxesCond',
  path: 'selectboxescond',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Text Field',
      applyMaskOn: 'change',
      hidden: true,
      tableView: true,
      key: 'textField',
      conditional: {
        show: true,
        conjunction: 'all',
        conditions: [
          {
            component: 'selectBoxes',
            operator: 'isEqual',
            value: '111',
          },
        ],
      },
      type: 'textfield',
      input: true,
    },
    {
      label: 'Select Boxes',
      optionsLabelPosition: 'right',
      tableView: false,
      values: [
        {
          label: 'test 1',
          value: '111',
          shortcut: '',
        },
        {
          label: 'test 2',
          value: '222',
          shortcut: '',
        },
      ],
      key: 'selectBoxes',
      type: 'selectboxes',
      input: true,
      inputType: 'checkbox',
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
  created: '2023-11-08T12:37:19.452Z',
  modified: '2023-11-09T08:54:09.529Z',
  machineName: 'cpxkpoxmfvhivle:selectBoxesCond',
};

const form7 = {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Checkbox',
      tableView: false,
      key: 'checkbox',
      type: 'checkbox',
      input: true,
    },
    {
      label: 'Text Field',
      applyMaskOn: 'change',
      tableView: true,
      key: 'textField',
      conditional: {
        show: true,
        conjunction: 'all',
        conditions: [
          {
            component: 'checkbox',
            operator: 'isEqual',
            value: 'false',
          },
        ],
      },
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
};
const form8 = {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'note',
      widget: '',
      applyMaskOn: 'change',
      autoExpand: false,
      tableView: true,
      key: 'note',
      conditional: {
        show: true,
        conjunction: 'all',
        conditions: [
          {
            component: 'container.editGrid1.editGrid2.innerSelect1',
            operator: 'isEmpty'
          }
        ]
      },
      type: 'textarea',
      validateWhenHidden: false,
      input: true
    },
    {
      label: 'container',
      tableView: false,
      key: 'container',
      type: 'container',
      input: true,
      components: [
        {
          label: 'editGrid1',
          tableView: false,
          rowDrafts: false,
          key: 'editGrid1',
          type: 'editgrid',
          displayAsTable: false,
          input: true,
          components: [
            {
              label: 'editGrid2',
              tableView: false,
              rowDrafts: false,
              key: 'editGrid2',
              type: 'editgrid',
              displayAsTable: false,
              input: true,
              components: [
                {
                  label: 'innerSelect1',
                  widget: 'choicesjs',
                  tableView: true,
                  data: {
                    values: [
                      {
                        label: '44',
                        value: '44'
                      },
                      {
                        label: '6t',
                        value: '6T'
                      }
                    ]
                  },
                  key: 'innerSelect1',
                  type: 'select',
                  input: true
                },
                {
                  label: 'innerSelect2',
                  widget: 'choicesjs',
                  tableView: true,
                  data: {
                    values: [
                      {
                        label: 'nnn',
                        value: 'nnn'
                      },
                      {
                        label: 'kkk',
                        value: 'kkk'
                      }
                    ]
                  },
                  key: 'innerSelect2',
                  type: 'select',
                  input: true
                }
              ]
            },
            {
              label: 'order',
              widget: 'choicesjs',
              tableView: true,
              data: {
                values: [
                  {
                    label: 'first',
                    value: '1'
                  },
                  {
                    label: 'second',
                    value: '2'
                  },
                  {
                    label: 'third',
                    value: '3'
                  }
                ]
              },
              key: 'order',
              type: 'select',
              validateWhenHidden: false,
              input: true
            },
            {
              label: 'lesson',
              widget: 'choicesjs',
              tableView: true,
              data: {
                values: [
                  {
                    label: 'math',
                    value: 'math'
                  },
                  {
                    label: 'lit',
                    value: 'lit'
                  }
                ]
              },
              validateWhenHidden: false,
              key: 'lesson',
              type: 'select',
              input: true
            }
          ]
        }
      ]
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

const form9 = {
  "type": "form",
  "title": "conditionally hidden component",
  "display": "form",
  "path": "conditionallyhiddencomponent",
  "components": [
    {
      "label": "Text Field",
      "applyMaskOn": "change",
      "tableView": true,
      "validateWhenHidden": false,
      "key": "textField",
      "type": "textfield",
      "input": true
    },
    {
      "label": "Text Field 1",
      "applyMaskOn": "change",
      "tableView": true,
      "validateWhenHidden": false,
      "key": "textField1",
      "conditional": {
        "show": false,
        "conjunction": "all",
        "conditions": [
          {
            "component": "textField",
            "operator": "includes",
            "value": "hide"
          }
        ]
      },
      "type": "textfield",
      "input": true
    },
    {
      "type": "button",
      "label": "Submit",
      "key": "submit",
      "disableOnInvalid": true,
      "input": true,
      "tableView": false
    }
  ],
};

export default {
  form1,
  form2,
  form3,
  form4,
  form5,
  form6,
  form7,
  form8,
  form9
};
