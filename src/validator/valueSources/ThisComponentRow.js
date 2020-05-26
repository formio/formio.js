import { ThisComponentValueSource } from './ThisComponent';

export class ThisComponentRowValueSource extends ThisComponentValueSource {
  static get name() {
    return 'thisComponentRow';
  }

  static get title() {
    return 'This Component Row';
  }

  static get weight() {
    return 20;
  }

  getValue() {
    return super.getValue()?.data ?? null;
  }
}
