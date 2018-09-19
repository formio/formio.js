export default [
  {
    weight: 10,
    type: 'textarea',
    editor: 'ckeditor',
    label: 'Content',
    input: true,
    key: 'html',
    as: 'html',
    rows: 3,
    tooltip: 'The HTML template for the result data items.'
  },
  {
    type: 'textfield',
    input: true,
    key: 'className',
    weight: 60,
    label: 'CSS Class',
    placeholder: 'CSS Class',
    tooltip: 'The CSS class for this HTML element.'
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
