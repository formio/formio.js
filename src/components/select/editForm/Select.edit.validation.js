export default [
  {
    weight: 50,
    type: 'checkbox',
    label: 'Perform server validation',
    tooltip: 'Check this if you would like for the server to perform a validation check to ensure the selected value is an available option. This requires a Search query to ensure a record is found.',
    key: 'validate.select',
    input: true,
    conditional: {
      json: { var: 'data.searchField' }
    }
  }
];
