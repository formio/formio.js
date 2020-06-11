import { ValueSource } from './ValueSource';
export class VariableValueSource extends ValueSource {
    static get name() {
        return 'variable';
    }
    static get title() {
        return 'Variable';
    }
    static get weight() {
        return 700;
    }
    static getInputEditForm({ customVariables, editFormUtils, excludeVariables, }) {
        return Object.assign(Object.assign({}, editFormUtils.variableSelector({
            customValues: customVariables,
            exclude: excludeVariables,
        })), { validate: {
                required: true,
            } });
    }
    getValue(input) {
        return this.targetComponentInstance.calculateVariable(input, this.context);
    }
}
