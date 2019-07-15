export default [
  {
    type: 'number',
    input: true,
    key: 'validate.minSelectedCount',
    label: 'Minimum checked number',
    tooltip: 'Minimum checkboxes required before form can be submitted.',
    weight: 250
  },
  {
    type: 'number',
    input: true,
    key: 'validate.maxSelectedCount',
    label: 'Maximum checked number',
    tooltip: 'Maximum checkboxes possible before form can be submitted.',
    weight: 250
  },
  {
    type: 'textfield',
    input: true,
    key: 'minSelectedCountMessage',
    label: 'Minimum checked error message',
    tooltip: 'Error message displayed if minimum number of items not checked.',
    weight: 250
  },
  {
    type: 'textfield',
    input: true,
    key: 'maxSelectedCountMessage',
    label: 'Maximum checked error message',
    tooltip: 'Error message displayed if maximum number of items checked.',
    weight: 250
  }
];
