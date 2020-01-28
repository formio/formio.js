export default [
  {
    key: 'labelPosition',
    ignore: true,
  },
  {
    weight: 30,
    type: 'textfield',
    input: true,
    key: 'switchToManualModeLabel',
    label: 'Switch To Matual Mode Label',
    placeholder: 'Switch To Matual Mode Label',
    tooltip: 'The label for the checkbox used to switch to manual mode.',
    validate: {
      required: true,
    },
  },
  {
    weight: 40,
    type: 'checkbox',
    input: true,
    key: 'disableClearIcon',
    label: 'Disable Clear Icon',
    tooltip: 'Clear Icon allows easily clear component\'s value',
  },
];
