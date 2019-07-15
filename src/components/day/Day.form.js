import baseEditForm from '../_classes/component/Component.form';

import DayEditDisplay from './editForm/Day.edit.display';
import DayEditValidation from './editForm/Day.edit.validation';
import DayEditDay from './editForm/Day.edit.day';
import DayEditMonth from './editForm/Day.edit.month';
import DayEditYear from './editForm/Day.edit.year';

export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: DayEditDisplay
    },
    {
      key: 'validation',
      components: DayEditValidation
    },
    {
      key: 'day',
      label: 'Day',
      weight: 3,
      components: DayEditDay
    },
    {
      key: 'month',
      label: 'Month',
      weight: 3,
      components: DayEditMonth
    },
    {
      key: 'year',
      label: 'Year',
      weight: 3,
      components: DayEditYear
    },
  ], ...extend);
}
