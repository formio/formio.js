export default [
  {
    key: 'validateOn',
    ignore: true
  },
  {
    key: 'unique',
    ignore: true
  },
  {
    weight: 52,
    type: 'checkbox',
    label: 'Allow only available values',
    tooltip: 'Check this if you would like to perform a validation check to ensure the selected value is an available option.',
    key: 'validate.onlyAvailableItems',
    input: true,
  },
];
