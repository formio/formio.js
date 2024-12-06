import Components from '../Components';
import SurveyEditData from './editForm/Survey.edit.data';
import SurveyEditDisplay from './editForm/Survey.edit.display';
import SurveyEditValidation from './editForm/Survey.edit.validation';

/**
 * The Edit Form function.
 * @param {...any} extend - The components that extend the edit form.
 * @returns {import('@formio/core').Component[]} - The edit form components.
 */
export default function (...extend) {
  return Components.baseEditForm(
    [
      {
        key: 'display',
        components: SurveyEditDisplay,
      },
      {
        key: 'data',
        components: SurveyEditData,
      },
      {
        key: 'validation',
        components: SurveyEditValidation,
      },
    ],
    ...extend,
  );
}
