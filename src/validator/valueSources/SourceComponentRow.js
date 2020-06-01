import { SourceComponentValueSource } from './SourceComponent';

export class SourceComponentRowValueSource extends SourceComponentValueSource {
  static get name() {
    return 'sourceComponentRow';
  }

  static get title() {
    return 'Source Component Row';
  }

  static get weight() {
    return 220;
  }

  getValue() {
    return super.getValue()?.data ?? null;
  }
}
