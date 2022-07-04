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
        dataSrc: 'custom',
        data: {
          custom: function({ instance }) {
            const componentType = instance?.root?.data?.type;
            const availableAddons = Object.keys(Addons).filter((key) => {
              if (Addons[key]?.info?.supportedComponents?.includes(componentType)) {
                return true;
              }
              return false;
            });
            return availableAddons.map((addonKey) => ({
              value: addonKey,
              label: Addons[addonKey].info.label || addonKey,
            }));
          },
        },
        input: true
      },
      ...editForms,
    ]
  }
];
