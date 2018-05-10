import nestedComponentForm from '../NestedComponent.form';
export default function(...extend) {
  return nestedComponentForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      weight: 0,
      components: [
        {
          weight: 10,
          type: 'textfield',
          input: true,
          placeholder: 'Panel Title',
          label: 'Title',
          key: 'title',
          tooltip: 'The title text that appears in the header of this panel.'
        },
        {
          weight: 20,
          type: 'textarea',
          input: true,
          key: 'tooltip',
          label: 'Tooltip',
          placeholder: 'To add a tooltip to this field, enter text here.',
          tooltip: 'Adds a tooltip to the side of this field.'
        },
        {
          weight: 30,
          type: 'select',
          input: true,
          label: 'Theme',
          key: 'theme',
          dataSrc: 'values',
          data: {
            values: [
              {label: 'Default', value: 'default'},
              {label: 'Primary', value: 'primary'},
              {label: 'Info', value: 'info'},
              {label: 'Success', value: 'success'},
              {label: 'Danger', value: 'danger'},
              {label: 'Warning', value: 'warning'}
            ]
          }
        },
        {
          weight: 40,
          type: 'select',
          input: true,
          label: 'Show Breadcrumb',
          key: 'breadcrumb',
          dataSrc: 'values',
          data: {
            values: [
              {label: 'Yes', value: 'default'},
              {label: 'No', value: 'none'}
            ]
          }
        }
      ]
    }
  ]);
}
