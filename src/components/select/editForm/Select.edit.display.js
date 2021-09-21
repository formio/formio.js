export default [
  //select is a custom component , in order to differentiate between form.io 's select component we have used 'selectF'
// tabs and functinalities are removed
  // {
  //   type: 'select',
  //   input: true,
  //   weight: 20,
  //   tooltip: 'Select the type of widget you\'d like to use.',
  //   key: 'widget',
  //   defaultValue: 'choicesjs',
  //   label: 'Widget Type',
  //   dataSrc: 'values',
  //   data: {
  //     values: [
  //       { label: 'ChoicesJS', value: 'choicesjs' },
  //       { label: 'HTML 5', value: 'html5' },
  //     ],
  //   },
  // },
  {
    weight: 1230,
    type: 'checkbox',
    label: 'Unique Options',
    tooltip: 'Display only unique dropdown options.',
    key: 'uniqueOptions',
    input: true
  },
];
