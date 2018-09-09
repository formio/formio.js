export default [
  {
    key: 'label',
    hidden: true,
    calculateValue: 'value = data.legend'
  },
  {
    weight: 1,
    type: 'textfield',
    input: true,
    key: 'legend',
    label: 'Legend',
    placeholder: 'Legend',
    tooltip: 'The legend for this Fieldset.'
  },
];
