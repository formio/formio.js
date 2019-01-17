export default [
  {
    type: 'checkbox',
    input: true,
    weight: 70,
    key: 'delimiter',
    label: 'Use Delimiter',
    tooltip: 'Separate thousands by local delimiter.'
  },
  {
    type: 'number',
    input: true,
    weight: 80,
    key: 'decimalLimit',
    label: 'Decimal Places',
    tooltip: 'The maximum number of decimal places (up to 6).',
    defaultValue: 6,
    validate: {
      max: 6,
      min: 1
    }
  },
  {
    type: 'checkbox',
    input: true,
    weight: 90,
    key: 'requireDecimal',
    label: 'Require Decimal',
    tooltip: 'Always show decimals, even if trailing zeros.'
  }
];
