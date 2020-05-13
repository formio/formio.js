export default [
  {
    key: 'overlay',
    components: [
      {
        type: 'checkbox',
        input: true,
        key: 'fixedSize',
        label: 'Fixed size',
        defaultValue: true,
        tooltip: 'This will fixed the set sizes of the component in PDF form.',
        weight: 415,
        conditional: {
          json: {
            '==': [
              { var: 'data.editor' },
              ''
            ]
          }
        }
      }
    ]
  }
];
