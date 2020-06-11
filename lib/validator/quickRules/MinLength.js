import _ from 'lodash';
import { QuickRule } from './QuickRule';
export class MinLengthQuickRule extends QuickRule {
    static get name() {
        return 'minLength';
    }
    static get title() {
        return 'Min Length';
    }
    static get weight() {
        return 100;
    }
    static getEditForm() {
        return [
            {
                label: 'Min Length',
                key: 'minLength',
                type: 'number',
                input: true,
                validate: {
                    required: true,
                },
            },
        ];
    }
    addRule(helper, input) {
        const { minLength, } = input;
        const variableName = 'Length';
        const variableKey = _.camelCase(variableName);
        const conditionName = `Min Length ${minLength}`;
        const conditionKey = _.camelCase(conditionName);
        helper.addVariable({
            name: variableName,
            key: variableKey,
            valueSource: 'thisComponentValue',
            transform: {
                name: 'length',
            },
        });
        helper.addCondition({
            name: conditionName,
            key: conditionKey,
            conjunction: 'and',
            parts: [
                {
                    type: 'new',
                    operator: {
                        name: 'greaterThanOrEqual',
                        greaterThanOrEqualArguments: {
                            left: {
                                valueSource: 'variable',
                                variableInput: variableKey,
                            },
                            right: {
                                valueSource: 'number',
                                numberInput: minLength,
                            },
                        },
                    },
                },
            ],
        });
        const validation = {
            condition: conditionKey,
            group: 'minLength',
            severity: 'error',
            message: `Min length is not met (${minLength})`,
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    }
}
