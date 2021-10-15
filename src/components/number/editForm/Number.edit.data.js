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
    weight: 71,
    type: 'textfield',
    input: true,
    key: 'delimiterChar',
    label: 'Thousands Separator',
    defaultValue: ',',
    tooltip: '',
    customConditional(context) {
      return context.data.delimiter;
    },
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
    weight: 91,
    type: 'textfield',
    input: true,
    key: 'decimalChar',
    label: 'Decimal Separator',
    defaultValue: '.',
    tooltip: '',
    customConditional(context) {
      return context.data.requireDecimal;
    },
  },
  {
    key: 'case',
    ignore: true,
  },
];
