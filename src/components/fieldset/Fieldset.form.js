import nestedComponentForm from '../nested/NestedComponent.form';
import FieldSetEditDisplay from './editForm/Fieldset.edit.display';
export default function(...extend) {
  return nestedComponentForm([
    {
      key: 'display',
      components: FieldSetEditDisplay
    }
  ], ...extend);
}
