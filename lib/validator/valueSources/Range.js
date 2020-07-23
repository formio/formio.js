import _ from 'lodash';
import { ConditionalAssignmentValueSource } from './ConditionalAssignment';
import { ListValueSource } from './List';
import { ValueSource } from './ValueSource';
export class RangeValueSource extends ValueSource {
    static get name() {
        return 'range';
    }
    static get title() {
        return 'Range';
    }
    static get weight() {
        return 480;
    }
    static getInputEditForm({ customConditions, customVariables, editFormUtils, excludeConditions, excludeValueSources, excludeVariables, }) {
        const getParam = (label, key, required = true) => ({
            label,
            key,
            type: 'container',
            input: true,
            hideLabel: false,
            components: editFormUtils.valueDeclaration({
                customConditions,
                customVariables,
                excludeConditions,
                excludeValueSources: [
                    ...excludeValueSources,
                    ConditionalAssignmentValueSource.name,
                    ListValueSource.name,
                    RangeValueSource.name,
                ],
                excludeVariables,
                required,
            }),
        });
        return {
            label: 'Range',
            type: 'container',
            input: true,
            hideLabel: false,
            components: [
                getParam('From', 'from', false),
                getParam('To', 'to'),
                getParam('Step', 'step', false),
            ],
        };
    }
    getValue(input) {
        var _a, _b;
        const { from, to, step, } = input;
        const fromValue = (_a = this.targetComponentInstance.calculateValueDefinition(from.valueSource, from[`${from.valueSource}Input`], this.context)) !== null && _a !== void 0 ? _a : 0;
        const toValue = this.targetComponentInstance.calculateValueDefinition(to.valueSource, to[`${to.valueSource}Input`], this.context);
        const stepValue = (_b = this.targetComponentInstance.calculateValueDefinition(step.valueSource, step[`${step.valueSource}Input`], this.context)) !== null && _b !== void 0 ? _b : 1;
        const ascending = (fromValue < toValue);
        return _.range(fromValue, toValue + (ascending ? 1 : -1), ascending ? stepValue : -stepValue);
    }
}
