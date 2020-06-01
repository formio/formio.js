import moment from 'moment';

import { ValueSource } from './ValueSource';

export class CurrentDateTimeValueSource extends ValueSource {
  static get name() {
    return 'currentDateTime';
  }

  static get title() {
    return 'Current Date/Time';
  }

  static get weight() {
    return 500;
  }

  getValue() {
    return moment();
  }
}
