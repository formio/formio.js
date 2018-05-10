import nestedComponentForm from '../NestedComponent.form';
export default function(...extend) {
  return nestedComponentForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      components: [
        {
          weight: 150,
          type: 'datagrid',
          input: true,
          key: 'columns',
          label: 'Column Properties',
          addAnother: 'Add Column',
          tooltip: 'The width, offset, push, and pull settings for each column.',
          components: [
            {
              type: 'number',
              key: 'width',
              defaultValue: 6,
              label: 'Width'
            },
            {
              type: 'number',
              key: 'offset',
              defaultValue: 0,
              label: 'Offset'
            },
            {
              type: 'number',
              key: 'push',
              defaultValue: 0,
              label: 'Push'
            },
            {
              type: 'number',
              key: 'pull',
              defaultValue: 0,
              label: 'Pull'
            }
          ]
        }
      ]
    }
  ]);
}
