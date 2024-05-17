import Components from '../../Components';
import ListEditData from './editForm/ListComponent.edit.data';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'data',
      components: ListEditData
    },
  ], ...extend);
}
