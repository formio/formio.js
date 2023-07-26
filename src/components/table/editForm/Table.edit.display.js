export default [
  {
    key: 'labelPosition',
    ignore: true
  },
  {
    key: 'placeholder',
    ignore: true
  },
  {
    key: 'description',
    ignore: true
  },
  {
    key: 'autofocus',
    ignore: true
  },
  {
    key: 'tooltip',
    ignore: true
  },
  {
    key: 'tabindex',
    ignore: true
  },
  {
    key: 'disabled',
    ignore: true
  },
  {
    key: 'tableView',
    ignore: true
  },
  {
    type: 'number',
    label: 'Number of Rows',
    key: 'numRows',
    input: true,
    weight: 1,
    placeholder: 'Number of Rows',
    tooltip: 'Enter the number or rows that should be displayed by this table.'
  },
  {
    type: 'number',
    label: 'Number of Columns',
    key: 'numCols',
    input: true,
    weight: 2,
    placeholder: 'Number of Columns',
    tooltip: 'Enter the number or columns that should be displayed by this table.'
  },
  {
    type: 'checkbox',
    label: 'Clone Row Components',
    key: 'cloneRows',
    input: true,
    weight: 3,
    tooltip: 'Check this if you would like to \'clone\' the first row of components to all additional empty rows of the table.'
  },
  {
    type: 'select',
    label: 'Cell Alignment',
    key: 'cellAlignment',
    input: true,
    tooltip: 'Horizontal alignment for cells of the table.',
    dataSrc: 'values',
    data: {
      values: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' }
      ]
    },
    defaultValue: 'left',
    weight: 3
  },
  {
    type: 'checkbox',
    label: 'Striped',
    key: 'striped',
    tooltip: 'This will stripe the table if checked.',
    input: true,
    weight: 701
  },
  {
    type: 'checkbox',
    label: 'Bordered',
    key: 'bordered',
    input: true,
    tooltip: 'This will border the table if checked.',
    weight: 702
  },
  {
    type: 'checkbox',
    label: 'Hover',
    key: 'hover',
    input: true,
    tooltip: 'Highlight a row on hover.',
    weight: 703
  },
  {
    type: 'checkbox',
    label: 'Condensed',
    key: 'condensed',
    input: true,
    tooltip: 'Condense the size of the table.',
    weight: 704
  },
];
