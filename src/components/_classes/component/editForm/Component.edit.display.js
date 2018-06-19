/* eslint-disable max-len */
export default [
  {
    weight: 0,
    type: 'textfield',
    input: true,
    key: 'label',
    label: 'Label',
    placeholder: 'Field Label',
    tooltip: 'The label for this field that will appear next to it.',
    validate: {
      required: true
    }
  },
  {
    weight: 10,
    type: 'checkbox',
    label: 'Hide Label',
    tooltip: 'Hide the label of this component. This allows you to show the label in the form builder, but not when it is rendered.',
    key: 'hideLabel',
    input: true
  },
  {
    type: 'select',
    input: true,
    key: 'labelPosition',
    label: 'Label Position',
    tooltip: 'Position for the label for this field.',
    weight: 20,
    defaultValue: 'top',
    dataSrc: 'values',
    data: {
      values: [
        {label: 'Top', value: 'top'},
        {label: 'Left (Left-aligned)', value: 'left-left'},
        {label: 'Left (Right-aligned)', value: 'left-right'},
        {label: 'Right (Left-aligned)', value: 'right-left'},
        {label: 'Right (Right-aligned)', value: 'right-right'},
        {label: 'Bottom', value: 'bottom'}
      ]
    }
  },
  {
    type: 'number',
    input: true,
    key: 'labelWidth',
    label: 'Label Width',
    tooltip: 'The width of label on line in percentages.',
    clearOnHide: false,
    weight: 30,
    placeholder: '30',
    suffix: '%',
    validate: {
      min: 0,
      max: 100
    },
    conditional: {
      json: {
        and: [
          {'!==': [{var: 'data.labelPosition'}, 'top']},
          {'!==': [{var: 'data.labelPosition'}, 'bottom']},
        ]
      }
    }
  },
  {
    type: 'number',
    input: true,
    key: 'labelMargin',
    label: 'Label Margin',
    tooltip: 'The width of label margin on line in percentages.',
    clearOnHide: false,
    weight: 30,
    placeholder: '3',
    suffix: '%',
    validate: {
      min: 0,
      max: 100
    },
    conditional: {
      json: {
        and: [
          {'!==': [{var: 'data.labelPosition'}, 'top']},
          {'!==': [{var: 'data.labelPosition'}, 'bottom']},
        ]
      }
    }
  },
  {
    weight: 100,
    type: 'textfield',
    input: true,
    key: 'placeholder',
    label: 'Placeholder',
    placeholder: 'Placeholder',
    tooltip: 'The placeholder text that will appear when this field is empty.'
  },
  {
    weight: 200,
    type: 'textfield',
    input: true,
    key: 'description',
    label: 'Description',
    placeholder: 'Description for this field.',
    tooltip: 'The description is text that will appear below the input field.'
  },
  {
    weight: 300,
    type: 'textarea',
    input: true,
    key: 'tooltip',
    label: 'Tooltip',
    placeholder: 'To add a tooltip to this field, enter text here.',
    tooltip: 'Adds a tooltip to the side of this field.'
  },
  {
    weight: 400,
    type: 'textfield',
    input: true,
    key: 'errorLabel',
    label: 'Error Label',
    placeholder: 'Error Label',
    tooltip: 'The label for this field when an error occurs.'
  },
  {
    weight: 500,
    type: 'textfield',
    input: true,
    key: 'customClass',
    label: 'Custom CSS Class',
    placeholder: 'Custom CSS Class',
    tooltip: 'Custom CSS class to add to this component.'
  },
  {
    weight: 600,
    type: 'textfield',
    input: true,
    key: 'tabindex',
    label: 'Tab Index',
    placeholder: 'Tab Index',
    tooltip: 'Sets the tabindex attribute of this component to override the tab order of the form. See the <a href=\\\'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex\\\'>MDN documentation</a> on tabindex for more information.'
  },
  {
    weight: 700,
    type: 'checkbox',
    label: 'Multiple Values',
    tooltip: 'Allows multiple values to be entered for this field.',
    key: 'multiple',
    input: true
  },
  {
    weight: 800,
    type: 'checkbox',
    label: 'Clear Value When Hidden',
    key: 'clearOnHide',
    tooltip: 'When a field is hidden, clear the value.',
    input: true
  },
  {
    weight: 900,
    type: 'checkbox',
    label: 'Protected',
    tooltip: 'A protected field will not be returned when queried via API.',
    key: 'protected',
    input: true
  },
  {
    weight: 1000,
    type: 'checkbox',
    label: 'Persistent',
    tooltip: 'A persistent field will be stored in database when the form is submitted.',
    key: 'persistent',
    input: true
  },
  {
    weight: 1100,
    type: 'checkbox',
    label: 'Hidden',
    tooltip: 'A hidden field is still a part of the form, but is hidden from view.',
    key: 'hidden',
    input: true
  },
  {
    weight: 1300,
    type: 'checkbox',
    label: 'Hide Input',
    tooltip: 'Hide the input in the browser. This does not encrypt on the server. Do not use for passwords.',
    key: 'mask',
    input: true
  },
  {
    weight: 1400,
    type: 'checkbox',
    label: 'Disabled',
    tooltip: 'Disable the form input.',
    key: 'disabled',
    input: true
  },
  {
    weight: 1450,
    type: 'checkbox',
    label: 'Initial Focus',
    tooltip: 'Make this field the initially focused element on this form.',
    key: 'autofocus',
    input: true
  },
  {
    weight: 1500,
    type: 'checkbox',
    label: 'Table View',
    tooltip: 'Shows this value within the table view of the submissions.',
    key: 'tableView',
    input: true
  }
];
/* eslint-enable max-len */
