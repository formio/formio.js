import {TableEditOptions} from "./TableEditOptions";
import ComponentsEditForm from '../Components.form';

export default function(...extend) {
  return ComponentsEditForm({
    components: [
      {
        weight: 0,
        type: 'tabs',
        key: 'tabs',
        components: [
          {
            label: 'Display',
            key: 'display',
            components: TableEditOptions
          }
        ]
      }
    ]
  }, ...extend);
};
