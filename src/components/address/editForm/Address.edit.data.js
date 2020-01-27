export default [
  {
    key: 'multiple',
    ignore: true,
  },
  {
    type: 'address',
    label: 'Default Value',
    key: 'defaultValue',
    weight: 5,
    placeholder: 'Default Value',
    tooltip: 'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
    input: true,
    defaultValue: {
      mode: 'autocomplete',
      address: {},
    },
  },
];
