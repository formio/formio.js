import EditFormUtils from '../../_classes/component/editForm/utils';

export default [
  {
    weight: 0,
    type: 'textfield',
    input: true,
    key: 'label',
    label: 'Label',
    placeholder: 'Field Label',
    tooltip: 'The label for this field that will appear next to it.',
    validate: {
      required: true
    }
  },
  {
    type: 'select',
    input: true,
    key: 'refreshOn',
    label: 'Refresh Data On',
    weight: 10,
    tooltip: 'Refresh data when another field changes.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom(context) {
        var values = [];
        values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component, path) {
          if (component.key !== context.data.key) {
            values.push({
              label: component.label || component.key,
              value: path
            });
          }
        });
        return values;
      }
    },
  },
  EditFormUtils.javaScriptValue('Custom Refresh Data On', 'customRefreshOn', 'customRefreshOn', 20,
    '<p><h4>Example:</h4><pre>refresh = data.age > 18</pre></p>',
    '<p><h4>Example:</h4><pre>{ ">" : [{"var": "data.age"}, 18] }</pre>'
  ),
];
