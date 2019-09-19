import baseEditForm from '../base/Base.form';
import WidgetComponentValidation from './editForm/WidgetComponent.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'validation',
      components: WidgetComponentValidation
    }
  ], ...extend);
}
