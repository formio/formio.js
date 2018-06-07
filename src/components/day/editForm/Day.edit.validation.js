export default [
  {
    key: 'validate.required',
    ignore: true
  },
  {
    key: 'validate.unique',
    ignore: true
  },
  {
    weight: 0,
    type: 'checkbox',
    label: 'Require Day',
    tooltip: 'A required field must be filled in before the form can be submitted.',
    key: 'fields.day.required',
    input: true
  },
  {
    weight: 10,
    type: 'checkbox',
    label: 'Require Month',
    tooltip: 'A required field must be filled in before the form can be submitted.',
    key: 'fields.month.required',
    input: true
  },
  {
    weight: 20,
    type: 'checkbox',
    label: 'Require Year',
    tooltip: 'A required field must be filled in before the form can be submitted.',
    key: 'fields.year.required',
    input: true
  }
];
