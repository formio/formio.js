export default [
  {
    weight: 0,
    type: 'textfield',
    input: true,
    key: 'label',
    label: 'Label',
    placeholder: 'Field Label',
    tooltip: 'The label for this field.',
    validate: {
      required: true
    }
  },
  {
    key: 'multiple',
    ignore: true,
  },
  {
    key: 'defaultValue',
    ignore: true,
  },
  {
    key: 'dbIndex',
    ignore: true,
  },
  {
    key: 'allowCalculateOverride',
    ignore: true,
  },
  {
    key: 'customDefaultValuePanel',
    ignore: true,
  },
  {
    key: 'calculateValuePanel',
    ignore: true,
  },
];
