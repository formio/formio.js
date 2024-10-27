export default [
  {
    type: 'checkbox',
    input: true,
    weight: 70,
    key: 'delimiter',
    label: 'Use Thousands Separator',
    tooltip: 'Separate thousands by local delimiter.'
  },
  {
    type: 'number',
    input: true,
    weight: 80,
    key: 'decimalLimit',
    label: 'Decimal Places',
    tooltip: 'The maximum number of decimal places.'
  },
  {
    type: 'checkbox',
    input: true,
    weight: 90,
    key: 'requireDecimal',
    label: 'Require Decimal',
    tooltip: 'Always show decimals, even if trailing zeros.'
  },
  {
    key: 'case',
    ignore: true,
  },
];
