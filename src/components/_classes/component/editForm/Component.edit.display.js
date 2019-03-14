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
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' }
      ]
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
    weight: 1100,
    type: 'checkbox',
    label: 'Hidden',
    tooltip: 'A hidden field is still a part of the form, but is hidden from view.',
    key: 'hidden',
    input: true
  },
  {
    weight: 1200,
    type: 'checkbox',
    label: 'Hide Label',
    tooltip: 'Hide the label of this component. This allows you to show the label in the form builder, but not when it is rendered.',
    key: 'hideLabel',
    input: true
  },
  {
    weight: 1350,
    type: 'checkbox',
    label: 'Initial Focus',
    tooltip: 'Make this field the initially focused element on this form.',
    key: 'autofocus',
    input: true
  },
  {
    weight: 1370,
    type: 'checkbox',
    label: 'Show Label in DataGrid',
    tooltip: 'Show the label when in a Datagrid.',
    key: 'dataGridLabel',
    input: true,
    customConditional: 'show = instance.root.editComponent.inDataGrid'
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
    label: 'Always enabled',
    tooltip: 'Make this field always enabled, even if the form is disabled',
    key: 'alwaysEnabled',
    input: true
  },
  {
    weight: 1500,
    type: 'checkbox',
    label: 'Table View',
    tooltip: 'Shows this value within the table view of the submissions.',
    key: 'tableView',
    input: true
  },
];
/* eslint-enable max-len */
