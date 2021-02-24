import { editForms } from '../../../../addons';
import Addons from '../../../../addons';

export default [
  {
    type: 'editgrid',
    addAnother: 'Add Addon',
    saveRow: 'Save Addon',
    weight: 28,
    input: true,
    key: 'addons',
    label: 'Addons',
    components: [
      {
        label: 'Name',
        tableView: true,
        key: 'name',
        type: 'select',
        data: {
          values: Object.keys(Addons).map((key) => ({
            value: key,
            label: Addons[key].info.label || key
          })),
        },
        input: true
      },
      ...editForms
    ]
  }
];
