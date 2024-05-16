import Components from '../Components';
import HiddenEditDisplay from './editForm/Hidden.edit.display';
import HiddenEditData from './editForm/Hidden.edit.data';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: HiddenEditDisplay
    },
    {
      key: 'data',
      components: HiddenEditData
    },
    {
      key: 'validation',
      ignore: true
    },
    {
      key: 'conditional',
      ignore: true
    },
  ], ...extend);
}
