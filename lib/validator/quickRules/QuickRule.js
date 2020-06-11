import { BaseEntity } from '../BaseEntity';
export class QuickRule extends BaseEntity {
    static get weight() {
        return 0;
    }
    // eslint-disable-next-line no-unused-vars
    static getEditForm(options) {
        return null;
    }
    // eslint-disable-next-line no-unused-vars
    addRule(input) {
        throw new Error('Method #addRule() is abstract.');
    }
}
