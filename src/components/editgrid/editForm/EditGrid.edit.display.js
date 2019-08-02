export default [
  {
    key: 'placeholder',
    ignore: true,
  },
  {
    type: 'checkbox',
    label: 'Disable Adding / Removing Rows',
    key: 'disableAddingRemovingRows',
    tooltip: 'Check if you want to hide Add Another button and Remove Row button',
    weight: 405,
    input: true,
    clearOnHide: false,
    calculateValue: 'value = data.disableAddingRemovingRows;',
  },
];
