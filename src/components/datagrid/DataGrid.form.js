import BaseEditForm from '../base/Base.form';
export default function(...extend) {
  return BaseEditForm({
    components: [
      {
        weight: 0,
        type: 'tabs',
        key: 'tabs',
        components: [
          {
            label: 'Display',
            key: 'display',
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
          },
          {
            label: 'Data',
            key: 'data',
            components: []
          },
          {
            label: 'Validation',
            key: 'validation',
            components: []
          },
          {
            label: 'API',
            key: 'api',
            components: []
          },
          {
            label: 'Conditional',
            key: 'conditional',
            components: []
          }
        ]
      }
    ]
  }, ...extend);
};
