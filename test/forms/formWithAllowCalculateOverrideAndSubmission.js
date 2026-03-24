export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Price',
      key: 'price',
      type: 'number',
      input: true,
      defaultValue: 10,
    },
    {
      label: 'Quantity',
      key: 'quantity',
      type: 'number',
      input: true,
      defaultValue: 5,
    },
    {
      label: 'Total (with override)',
      key: 'total',
      type: 'textfield',
      input: true,
      calculateValue: 'value = data.price * data.quantity',
      allowCalculateOverride: true,
    },
  ],
};
