export default [
  {
    weight: 10,
    type: 'textarea',
    editor: 'ace',
    label: 'Content',
    input: true,
    key: 'html',
    as: 'html',
    rows: 3,
    tooltip: 'The HTML template for the result data items.'
  },
  {
    weight: 700,
    type: 'checkbox',
    label: 'Refresh On Change',
    tooltip: 'Rerender the field whenever a value on the form changes.',
    key: 'refreshOnChange',
    input: true
  },
];
