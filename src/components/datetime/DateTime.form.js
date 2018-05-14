import baseEditForm from '../base/Base.form';

import DateTimeEditData from './editForm/DateTime.edit.data';
import DateTimeEditDate from './editForm/DateTime.edit.date';
import DateTimeEditDisplay from './editForm/DateTime.edit.display';
import DateTimeEditTime from './editForm/DateTime.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: DateTimeEditDisplay
    },
    {
      label: 'Date',
      key: 'date',
      weight: 1,
      components: DateTimeEditDate
    },
    {
      label: 'Time',
      key: 'time',
      weight: 2,
      components: DateTimeEditTime
    },
    {
      key: 'data',
      components: DateTimeEditData
    }
  ]);
}
