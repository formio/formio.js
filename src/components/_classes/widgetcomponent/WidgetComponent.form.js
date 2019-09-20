import baseEditForm from '../component/Component.form';
import WidgetComponentEditValidation from './editForm/WidgetComponent.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'validation',
      components: WidgetComponentEditValidation
    }
  ], ...extend);
}
