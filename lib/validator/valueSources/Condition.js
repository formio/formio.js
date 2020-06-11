import { ValueSource } from './ValueSource';
export class ConditionValueSource extends ValueSource {
    static get name() {
        return 'condition';
    }
    static get title() {
        return 'Condition';
    }
    static get weight() {
        return 710;
    }
    static getInputEditForm({ customConditions, editFormUtils, excludeConditions, }) {
        return Object.assign(Object.assign({}, editFormUtils.conditionSelector({
            customValues: customConditions,
            exclude: excludeConditions,
        })), { validate: {
                required: true,
            } });
    }
    getValue(input) {
        return this.targetComponentInstance.calculateCondition(input, this.context);
    }
}
