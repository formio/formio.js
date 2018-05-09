import {TableEditOptions} from "./TableEditOptions";
import NestedComponentForm from '../NestedComponent.form';

export default function(...extend) {
  return NestedComponentForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      components: TableEditOptions
    }
  ]);
};
