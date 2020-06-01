export default [
  {
    type: 'checkbox',
    input: true,
    weight: 105,
    key: 'inlineEdit',
    label: 'Inline Editing',
    tooltip: 'Check this if you would like your changes within "edit" mode to be committed directly to the submission object as that row is being changed',
  },
  {
    type: 'checkbox',
    input: true,
    weight: 105,
    key: 'draft',
    label: 'Draft',
    tooltip: 'Allow save rows even if it\'s data is invalid. Errors will occur when try to submit with invalid rows.',
  },
  {
    key: 'defaultValue',
    ignore: true,
  },
  {
    key: 'multiple',
    ignore: true
  },
];
