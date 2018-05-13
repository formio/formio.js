import baseEditForm from '../base/Base.form';
export default function(...extend) {
  return baseEditForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      weight: 0,
      components: [
        {
          type: 'textfield',
          label: 'Add Another Text',
          key: 'addAnother',
          tooltip: 'Set the text of the Add Another button.',
          placeholder: 'Add Another',
          weight: 410,
          input: true
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
              {label: 'Top', value: 'top'},
              {label: 'Bottom', value: 'bottom'},
              {label: 'Both', value: 'both'}
            ]
          },
          weight: 420
        }
      ]
    }
  ]);
}
