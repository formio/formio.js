import baseEditForm from '../component/Component.form';
import WidgetComponentEditValidation from './editForm/WidgetComponent.edit.validation';
import WidgetComponentEditDisplay from './editForm/WidgetComponent.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: WidgetComponentEditDisplay
    },
    {
      key: 'validation',
      components: WidgetComponentEditValidation
    }
  ], ...extend);
}
