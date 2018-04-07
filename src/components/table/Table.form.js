import {TableEditOptions} from "./TableEditOptions";
import ComponentsEditForm from '../Components.form';

export default function(...extend) {
  return ComponentsEditForm([
    {
      label: 'Display',
      key: 'display',
      components: TableEditOptions
    }
  ], ...extend);
};
