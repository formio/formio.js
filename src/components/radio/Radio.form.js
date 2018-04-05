import BaseEditForm from '../base/Base.form';
export default function(...extend) {
  return BaseEditForm([
    {
      type: 'tabs',
      key: 'tabs',
      components: [
        {
          label: 'Display',
          key: 'display',
          weight: 0,
          components: [
            {
              type: 'select',
              input: true,
              label: 'Options Label Position',
              key: 'optionsLabelPosition',
              tooltip: 'Position for the label for options for this field.',
              dataSrc: 'values',
              weight: 32,
              defaultValue: 'right',
              data: {
                values: [
                  {label: 'Top', value: 'top'},
                  {label: 'Left', value: 'left'},
                  {label: 'Right', value: 'right'},
                  {label: 'Bottom', value: 'bottom'}
                ]
              }
            },
            {
              type: 'datagrid',
              input: true,
              label: 'Values',
              key: 'values',
              tooltip: 'The radio button values that can be picked for this field. Values are text submitted with the form data. Labels are text that appears next to the radio buttons on the form.',
              weight: 33,
              defaultValue: [{label: '', value: ''}],
              components: [
                {
                  label: 'Label',
                  key: 'label',
                  input: true,
                  type: 'textfield'
                },
                {
                  label: 'Value',
                  key: 'value',
                  input: true,
                  type: 'textfield',
                  calculateValue: {_camelCase: [{var: 'row.label'}]}
                },
                {
                  type: 'select',
                  input: true,
                  weight: 180,
                  label: 'Shortcut',
                  key: 'shortcut',
                  tooltip: 'The shortcut key for this option.',
                  dataSrc: 'custom',
                  data: {
                    custom: (component, data) => {
                      return BuilderUtils.getAvailableShortcuts(data.__form, component.component);
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ], ...extend);
};
