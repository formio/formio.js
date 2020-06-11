import { ValueSource } from './ValueSource';
export class ItemIndexValueSource extends ValueSource {
    static get name() {
        return 'itemIndex';
    }
    static get title() {
        return 'Item Index';
    }
    static get weight() {
        return 610;
    }
    getValue() {
        return this.getOption('itemIndex');
    }
}
