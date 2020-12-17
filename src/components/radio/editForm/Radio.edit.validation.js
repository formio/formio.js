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
    label: 'Perform server validation',
    tooltip: 'Check this if you would like for the server to perform a validation check to ensure the selected value is an available option. ',
    key: 'validate.onlyAvailableItems',
    input: true,
  },
];
