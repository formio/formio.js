import { ThisComponentValueSource } from './ThisComponent';

export class ThisComponentValueValueSource extends ThisComponentValueSource {
  static get name() {
    return 'thisComponentValue';
  }

  static get title() {
    return 'This Component Value';
  }

  static get weight() {
    return 10;
  }

  getValue() {
    return super.getValue()?.dataValue ?? null;
  }
}
