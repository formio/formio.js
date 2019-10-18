import componentEditForm from '../_classes/component/Component.form';
import DataSourceEditData from './editForm/DataSource.edit.data';
import DataSourceEditTrigger from './editForm/DataSource.edit.trigger';
import DataSourceEditFetch from './editForm/DataSource.edit.fetch';
import DataSourceEditAssign from './editForm/DataSource.edit.assign';

export default function(...extend) {
  return componentEditForm([
    {
      key: 'data',
      components: DataSourceEditData
    },
    {
      label: 'Trigger',
      key: 'trigger',
      weight: 10,
      components: DataSourceEditTrigger
    },
    {
      label: 'Fetch',
      key: 'fetch',
      weight: 20,
      components: DataSourceEditFetch
    },
    {
      key: 'display',
      ignore: true,
    },
    {
      key: 'validation',
      ignore: true,
    },
    {
      key: 'layout',
      ignore: true,
    },
  ], ...extend);
}
