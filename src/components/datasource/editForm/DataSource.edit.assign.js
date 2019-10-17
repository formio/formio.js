export default [
  {
    type: 'datagrid',
    label: 'Assign Fields',
    key: 'assign',
    weight: 10,
    components: [
      {
        type: 'textfield',
        input: true,
        key: 'path',
        weight: 10,
        label: 'Data source path',
        placeholder: 'data.myfield',
        tooltip: 'The property within the source data where the value can be found. For example: mydata.firstName or mydata.children[0].name.',
        clearOnHide: true,
      },
      {
        type: 'select',
        input: true,
        key: 'component',
        label: 'Component',
        weight: 10,
        tooltip: 'The component to assign the value in.',
        dataSrc: 'custom',
        valueProperty: 'value',
        data: {
          custom(context) {
            var values = [];
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
      }
    ]
  },
];
