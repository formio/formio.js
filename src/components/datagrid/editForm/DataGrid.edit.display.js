export default [
  {
    type: 'checkbox',
    label: 'Disable Adding / Removing Rows',
    key: 'disableAddingRemovingRows',
    tooltip: 'Check if you want to hide Add Another button and Remove Row button',
    weight: 405,
    input: true
  },
  {
    type: 'textfield',
    label: 'Add Another Text',
    key: 'addAnother',
    tooltip: 'Set the text of the Add Another button.',
    placeholder: 'Add Another',
    weight: 410,
    input: true,
    customConditional: 'show = !data.disableAddingRemovingRows'
  },
  {
    type: 'select',
    label: 'Add Another Position',
    key: 'addAnotherPosition',
    dataSrc: 'values',
    tooltip: 'Position for Add Another button with respect to Data Grid Array.',
    defaultValue: 'bottom',
    input: true,
    data: {
      values: [
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Both', value: 'both' }
      ]
    },
    weight: 420,
    customConditional: 'show = !data.disableAddingRemovingRows'
  },
  {
    type: 'checkbox',
    label: 'Default Open Rows',
    key: 'defaultOpen',
    tooltip: 'Check this if you would like for the rows of the edit grid to be defaulted to opened if values exist.',
    weight: 405,
    input: true
  }
];
