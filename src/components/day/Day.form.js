import baseEditForm from '../base/Base.form';

import DayEditDisplay from './editForm/Day.edit.display';
import DayEditValidation from './editForm/Day.edit.validation';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: DayEditDisplay
    },
    {
      key: 'validation',
      components: DayEditValidation
    }
  ], ...extend);
}
