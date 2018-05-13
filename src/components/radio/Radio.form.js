import baseEditForm from '../base/Base.form';
import BuilderUtils from '../../utils/builder';
/* eslint-disable max-len */
export default function(...extend) {
  return baseEditForm(...extend, [
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
                custom: (values, component, data, row, utils, instance, form) => {
                  return BuilderUtils.getAvailableShortcuts(form, component);
                }
              }
            }
          ]
        },
        {
          type: 'checkbox',
          input: true,
          key: 'inline',
          label: 'Inline Layout',
          tooltip: 'Displays the checkboxes/radios horizontally.',
          weight: 650
        }
      ]
    }
  ]);
}
/* eslint-enable max-len */
