import { ValueSource } from './ValueSource';
export class ParentItemIndexesValueSource extends ValueSource {
    static get name() {
        return 'parentItemIndexes';
    }
    static get title() {
        return 'Parent Item Indexes';
    }
    static get weight() {
        return 630;
    }
    getValue() {
        return this.getOption('parentItemIndexes');
    }
}
