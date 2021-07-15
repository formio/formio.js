export default [
  {
    label: 'Signer Email',
    key: 'email',
    input: true,
    type: 'email',
    validate: {
      required: true
    },
    weight: 0
  },
  {
    label: 'Signer Name',
    key: 'name',
    input: true,
    type: 'textfield',
    weight: 5,
  },
  {
    label: 'Order',
    key: 'order',
    input: true,
    type: 'number',
    validate: {
      required: true
    },
    weight: 10
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
    key: 'redrawOn',
    ignore: true,
  },
  {
    key: 'clearOnHide',
    ignore: true,
  },
];
