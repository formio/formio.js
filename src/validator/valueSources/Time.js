import moment from 'moment';

import { ValueSource } from './ValueSource';

const format = 'HH:mm';

export class TimeValueSource extends ValueSource {
  static get name() {
    return 'time';
  }

  static get title() {
    return 'Time';
  }

  static get weight() {
    return 450;
  }

  static getInputEditForm() {
    return {
      label: 'Time',
      type: 'datetime',
      input: true,
      validate: {
        required: true,
      },
      format: 'HH:mm',
      enableDate: false,
      timePicker: {
        showMeridian: false
      },
    };
  }

  getValue(input) {
    return moment(input, format);
  }
}
