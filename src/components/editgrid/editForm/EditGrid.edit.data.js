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
    weight: 106,
    key: 'rowDrafts',
    label: 'Enable Row Drafts',
    tooltip: 'Allow save rows even if their data is invalid. Errors will occur when try to submit with invalid rows.',
  },
  {
    key: 'defaultValue',
    ignore: true,
  },
  {
    key: 'multiple',
    ignore: true,
  },
  {
    weight: 710,
    type: 'checkbox',
    label: 'Lozy Load',
    key: 'lazyLoad',
    tooltip: 'Nested components will be instantiated only when row opened.',
    input: true,
  },
];
