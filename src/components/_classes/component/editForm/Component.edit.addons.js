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
    templates: {
      // eslint-disable-next-line quotes
      header: `<div class="row">
                <div class="col-6">{{ t(components[0].label) }}</div>
                <div class="col-4">Settings</div>
              </div>`,
      // eslint-disable-next-line quotes
      row: `<div class="row">
              <div class="col-6">
                {{ row.name.label }}
              </div>
              <div class="col-4 text-muted">
                Click Edit to see addon's settings
              </div>

              {% if (!instance.options.readOnly && !instance.disabled) { %}
                <div class="col-2">
                  <div class="btn-group pull-right">
                    <button class="btn btn-default btn-light btn-sm editRow"><i class="{{ iconClass('edit') }}"></i></button>
                    {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}
                      <button class="btn btn-danger btn-sm removeRow"><i class="{{ iconClass('trash') }}"></i></button>
                    {% } %}
                  </div>
                </div>
              {% } %}
            </div>`,
    },
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
        input: true,
        validate: {
          required: true,
        },
      },
      ...editForms,
    ]
  }
];
