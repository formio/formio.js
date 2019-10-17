import componentEditForm from '../_classes/component/Component.form';
import DataSourceEditData from './editForm/DataSource.edit.data';

export default function(...extend) {
  return componentEditForm([
    {
      key: 'display',
      ignore: true,
    },
    {
      key: 'data',
      components: DataSourceEditData
    },
    {
      key: 'validation',
      ignore: true,
    },
    {
      key: 'conditional',
      ignore: true,
    },
    {
      key: 'layout',
      ignore: true,
    },
  ], ...extend);
}
