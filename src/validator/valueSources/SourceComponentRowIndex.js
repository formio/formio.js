import { SourceComponentValueSource } from './SourceComponent';

export class SourceComponentRowIndexValueSource extends SourceComponentValueSource {
  static get name() {
    return 'sourceComponentRowIndex';
  }

  static get title() {
    return 'Source Component Row Index';
  }

  static get weight() {
    return 230;
  }

  getValue() {
    return super.getValue()?.rowIndex ?? null;
  }
}
