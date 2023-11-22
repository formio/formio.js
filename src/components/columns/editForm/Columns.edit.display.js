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
    key: 'tooltip',
    ignore: true
  },
  {
    key: 'autofocus',
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
    weight: 150,
    type: 'datagrid',
    input: true,
    key: 'columns',
    label: 'Column Properties',
    addAnother: 'Add Column',
    tooltip: 'The size and width settings for each column. One row is equal to 12. (e.g., a row with two columns spanning the entire page should be 6 and 6)',
    reorder: true,
    components: [
      {
        type: 'hidden',
        key: 'components',
        defaultValue: []
      },
      {
        type: 'select',
        key: 'size',
        defaultValue: 'md',
        label: 'Size',
        data: {
          values: [
            { label: 'xs', value: 'xs' },
            { label: 'sm', value: 'sm' },
            { label: 'md', value: 'md' },
            { label: 'lg', value: 'lg' },
            { label: 'xl', value: 'xl' },
          ],
        },
      },
      {
        type: 'number',
        key: 'width',
        defaultValue: 6,
        label: 'Width'
      }
    ]
  },
  {
    weight: 160,
    type: 'checkbox',
    label: 'Auto adjust columns',
    tooltip: 'Will automatically adjust columns based on if nested components are hidden.',
    key: 'autoAdjust',
    input: true
  }
];
