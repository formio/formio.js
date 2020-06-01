import { SourceComponentValueSource } from './SourceComponent';

export class SourceComponentValueValueSource extends SourceComponentValueSource {
  static get name() {
    return 'sourceComponentValue';
  }

  static get title() {
    return 'Source Component Value';
  }

  static get weight() {
    return 210;
  }

  getValue() {
    return super.getValue()?.dataValue ?? null;
  }
}
