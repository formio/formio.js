import _ from 'lodash';
import { ValueSource } from './ValueSource';
export class SameIndexValueSource extends ValueSource {
    static get name() {
        return 'same';
    }
    static get title() {
        return 'Same As For This Component';
    }
    static get weight() {
        return 0;
    }
    getValue() {
        const { pathForRowIndex, } = this.options;
        const indexes = this.targetComponentInstance.getRowIndexes();
        return _.get(indexes, pathForRowIndex, -1);
    }
}
