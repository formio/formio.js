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
  },
  {
    weight: 30,
    type: 'day',
    label: 'Max date',
    tooltip: 'A maximum date that can be set',
    key: 'maxDate',
    input: true,
  },
  {
    weight: 40,
    type: 'day',
    label: 'Min date',
    tooltip: 'A minimum date that can be set',
    key: 'minDate',
    input: true,
  }
];
