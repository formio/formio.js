import TableEditOptions from './TableEditOptions';
import nestedComponentForm from '../NestedComponent.form';

export default function(...extend) {
  return nestedComponentForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      components: TableEditOptions
    }
  ]);
}
