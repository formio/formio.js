import TextFieldEditData from './editForm/TextField.edit.data';
import TextFieldEditDisplay from './editForm/TextField.edit.display';
import TextFieldEditValidation from './editForm/TextField.edit.validation';
import widgetComponentForm from '../_classes/widgetcomponent/WidgetComponent.form';

export default function(...extend) {
  return widgetComponentForm([
    {
      key: 'display',
      components: TextFieldEditDisplay
    },
    {
      key: 'data',
      components: TextFieldEditData
    },
    {
      key: 'validation',
      components: TextFieldEditValidation
    }
  ], ...extend);
}
