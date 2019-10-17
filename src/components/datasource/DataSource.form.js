import componentEditForm from '../_classes/component/Component.form';
import DataSourceEditTrigger from './editForm/DataSource.edit.trigger';
import DataSourceEditFetch from './editForm/DataSource.edit.fetch';
import DataSourceEditAssign from './editForm/DataSource.edit.assign';

export default function(...extend) {
  return componentEditForm([
    {
      label: 'Trigger',
      key: 'trigger',
      weight: 0,
      components: DataSourceEditTrigger
    },
    {
      label: 'Fetch',
      key: 'fetch',
      weight: 1,
      components: DataSourceEditFetch
    },
    {
      label: 'Assign',
      key: 'assign',
      weight: 2,
      components: DataSourceEditAssign
    },
    {
      key: 'display',
      ignore: true,
    },
    {
      key: 'data',
      ignore: true,
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
    {
      key: 'logic',
      ignore: true,
    },
  ], ...extend);
}
