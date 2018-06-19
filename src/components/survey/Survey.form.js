import componentEditForm from '../_classes/component/Component.form';

import SurveyEditDisplay from './editForm/Survey.edit.display';

export default function(...extend) {
  return componentEditForm(...extend, [
    {
      key: 'display',
      components: SurveyEditDisplay
    }
  ]);
}
