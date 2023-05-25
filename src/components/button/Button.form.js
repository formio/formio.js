import Components from '../Components';
import ButtonEditDisplay from './editForm/Button.edit.display';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: ButtonEditDisplay
    },
    {
      key: 'data',
      ignore: true,
    },
    {
      key: 'validation',
      ignore: true,
    },
  ], ...extend);
}
