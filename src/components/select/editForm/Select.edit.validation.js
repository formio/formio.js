export default [
  {
    weight: 50,
    type: 'checkbox',
    label: 'Perform server validation of remote value',
    tooltip: 'Check this if you would like for the server to perform a validation check to ensure the selected value is an available option. This requires a Search query to ensure a record is found.',
    key: 'validate.select',
    input: true,
    conditional: {
      json: { var: 'data.searchField' }
    }
  },
  {
    weight: 52,
    type: 'checkbox',
    label: 'Allow only available values',
    tooltip: 'Check this if you would like to perform a validation check to ensure the selected value is an available option.',
    key: 'validate.onlyAvailableItems',
    input: true,
    conditional: {
      json: {
        and: [
          {
            in: [
              { var: 'data.dataSrc' },
              [
                'values',
                'json',
                'custom'
              ],
            ],
          },
          { '!==': [{ var: 'data.data.async' }, true] },
        ]
      },
    },
  }
];
