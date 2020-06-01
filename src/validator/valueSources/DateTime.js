import moment from 'moment';

import { ValueSource } from './ValueSource';

const format = 'YYYY-MM-DD HH:mm';

export class DateTimeValueSource extends ValueSource {
  static get name() {
    return 'dateTime';
  }

  static get title() {
    return 'Date/Time';
  }

  static get weight() {
    return 430;
  }

  static getInputEditForm() {
    return {
      label: 'Date/Time',
      type: 'datetime',
      input: true,
      validate: {
        required: true,
      },
      format: 'yyyy-MM-dd HH:mm',
      timePicker: {
        showMeridian: false
      },
    };
  }

  getValue(input) {
    return moment(input, format);
  }
}
