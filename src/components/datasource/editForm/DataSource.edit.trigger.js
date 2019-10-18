export default [
  {
    type: 'checkbox',
    input: true,
    key: 'trigger.init',
    label: 'Trigger on form init',
    tooltip: 'When enabled the request will be made when the form is initialized.',
    weight: 15,
  },
  {
    type: 'checkbox',
    input: true,
    key: 'trigger.server',
    label: 'Trigger on server',
    tooltip: 'When enabled the request will be made on the server during validation.',
    description: 'Async requests on the server can slow down processing since the server must wait for a response before proceeding. Do not add too many server side requests or performance will suffer.',
    weight: 15,
  },
  {
    type: 'select',
    input: true,
    key: 'refreshOn',
    label: 'Trigger on Data change',
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
  {
    type: 'textfield',
    label: 'Fire Event',
    key: 'event',
    input: true,
    weight: 120,
    tooltip: 'The event to fire when triggered.',
    description: 'When in a datagrid or editgrid, { { rowIndex } } is available for interpolation to target a specific row.'
  },

];
