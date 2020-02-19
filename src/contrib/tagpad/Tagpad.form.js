import baseEditForm from '../../components/_classes/component/Component.form';
import tagpadEditDisplay from './editForm/Tagpad.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: tagpadEditDisplay
    }
  ], ...extend);
}
