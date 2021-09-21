export default [
  {
    key: 'placeholder',
    ignore: true
  },
  {
    type: 'selectF',  //select is a custom component , in order to differentiate between form.io 's select component we have used 'selectF'
    input: true,
    label: 'Options Label Position',
    key: 'optionsLabelPosition',
    tooltip: 'Position for the label for options for this field.',
    dataSrc: 'values',
    weight: 32,
    defaultValue: 'right',
    data: {
      values: [
        { label: 'Top', value: 'top' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
        { label: 'Bottom', value: 'bottom' }
      ]
    }
  },
  {
    type: 'checkbox',
    input: true,
    key: 'inline',
    label: 'Inline Layout',
    tooltip: 'Displays the checkboxes/radios horizontally.',
    weight: 650
  }
];
