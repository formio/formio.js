import { ValueSource } from './ValueSource';
export class ParentItemsValueSource extends ValueSource {
    static get name() {
        return 'parentItems';
    }
    static get title() {
        return 'Parent Items';
    }
    static get weight() {
        return 620;
    }
    getValue() {
        return this.getOption('parentItems');
    }
}
