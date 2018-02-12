const BaseEditForm = require('../base/Base.form');
module.exports = function(...extend) {
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
                type: 'select',
                input: true,
                label: 'Label Position',
                key: 'labelPosition',
                tooltip: 'Position for the label for this field.',
                defaultValue: 'right',
                dataSrc: 'values',
                weight: 10,
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
                type: 'select',
                input: true,
                key: 'inputType',
                label: 'Input Type',
                tooltip: 'This is the input type used for this checkbox.',
                dataSrc: 'values',
                weight: 410,
                data: {
                  values: [
                    {label: 'Checkbox', value: 'checkbox'},
                    {label: 'Radio', value: 'radio'}
                  ]
                }
              },
              {
                type: 'textfield',
                input: true,
                key: 'name',
                label: 'Radio Key',
                tooltip: 'The key used to trigger the radio button toggle.',
                weight: 420,
                conditional: {
                  json: {'===': [{var: 'data.inputType'}, 'radio']}
                }
              },
              {
                type: 'textfield',
                input: true,
                label: 'Radio Value',
                key: 'value',
                tooltip: 'The value used with this radio button.',
                weight: 430,
                conditional: {
                  json: {'===': [{var: 'data.inputType'}, 'radio']}
                }
              },
              {
                type: 'checkbox',
                input: true,
                weight: 440,
                label: 'Datagrid Label',
                key: 'datagridLabel',
                tooltip: 'Show the label when in a datagrid.'
              }
            ]
          }
        ]
      }
    ]
  }, ...extend);
};
