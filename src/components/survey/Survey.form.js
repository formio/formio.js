import Components from '../Components';
import SurveyEditData from './editForm/Survey.edit.data';
import SurveyEditDisplay from './editForm/Survey.edit.display';
import SurveyEditValidation from './editForm/Survey.edit.validation';

export default function(...extend) {
  return Components.baseEditForm([
    {
      key: 'display',
      components: SurveyEditDisplay
    },
    {
      key: 'data',
      components: SurveyEditData
    },
    {
      key: 'validation',
      components: SurveyEditValidation
    },
  ], ...extend);
}
