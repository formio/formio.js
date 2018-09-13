import baseEditForm from '../_classes/component/Component.form';
import SurveyEditDisplay from './editForm/Survey.edit.display';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: SurveyEditDisplay
    }
  ], ...extend);
}
