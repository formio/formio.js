import { BaseEntity } from '../BaseEntity';
export class ValueSource extends BaseEntity {
    static get weight() {
        return 0;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getInputEditForm(options) {
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getValue(input) {
        throw new Error('Method #getValue() is abstract.');
    }
}
