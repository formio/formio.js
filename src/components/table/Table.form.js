import TableEditOptions from './TableEditOptions';
import nestedComponentForm from '../nested/NestedComponent.form';

export default function(...extend) {
  return nestedComponentForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      components: TableEditOptions
    }
  ]);
}
