import { ThisComponentValueSource } from './ThisComponent';

export class ThisComponentRowIndexValueSource extends ThisComponentValueSource {
  static get name() {
    return 'thisComponentRowIndex';
  }

  static get title() {
    return 'This Component Row Index';
  }

  static get weight() {
    return 30;
  }

  getValue() {
    return super.getValue()?.rowIndex ?? null;
  }
}
