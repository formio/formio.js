import { ValueSource } from './ValueSource';
export class SourceComponentValueSource extends ValueSource {
    static get name() {
        return 'sourceComponent';
    }
    static get title() {
        return 'Source Component';
    }
    static get weight() {
        return 200;
    }
    getValue() {
        return this.sourceComponentInstance;
    }
}
