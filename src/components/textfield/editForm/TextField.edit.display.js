export const TextFieldEditDisplay = [
  {
    weight: 50,
    type: 'select',
    input: true,
    key: 'labelPosition',
    label: 'Label Position',
    tooltip: 'Position for the label for this field.',
    dataSrc: 'values',
    widget: 'html5',
    data: {
      values: [
        {label: 'Top', value: 'top'},
        {label: 'Left (left-aligned)', value: 'left-left'},
        {label: 'Left (right-aligned)', value: 'left-right'},
        {label: 'Right (left-aligned)', value: 'right-left'},
        {label: 'Right (right-aligned)', value: 'right-right'},
        {label: 'Bottom', value: 'bottom'}
      ]
    }
  },
  {
    weight: 410,
    type: 'textfield',
    input: true,
    key: 'inputMask',
    label: 'Input Mask',
    tooltip: 'An input mask helps the user with input by ensuring a predefined format.<br><br>9: numeric<br>a: alphabetical<br>*: alphanumeric<br><br>Example telephone mask: (999) 999-9999<br><br>See the <a target=\'_blank\' href=\'https://github.com/RobinHerbots/jquery.inputmask\'>jquery.inputmask documentation</a> for more information.</a>'
  },
  {
    weight: 420,
    type: 'textfield',
    input: true,
    key: 'prefix',
    label: 'Prefix'
  },
  {
    weight: 430,
    type: 'textfield',
    input: true,
    key: 'suffix',
    label: 'Suffix'
  }
];
