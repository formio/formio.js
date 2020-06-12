import _ from 'lodash';
import { QuickRule } from './QuickRule';
export class MaxLengthQuickRule extends QuickRule {
    static get name() {
        return 'maxLength';
    }
    static get title() {
        return 'Max Length';
    }
    static get weight() {
        return 200;
    }
    static getEditForm() {
        return [
            {
                label: 'Max Length',
                key: 'maxLength',
                type: 'number',
                input: true,
                validate: {
                    required: true,
                },
            },
        ];
    }
    addRule(helper, input) {
        const { maxLength, } = input;
        const variableName = 'Length';
        const variableKey = _.camelCase(variableName);
        const conditionName = `Max Length ${maxLength}`;
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
                        name: 'lessThanOrEqual',
                        lessThanOrEqualArguments: {
                            left: {
                                valueSource: 'variable',
                                variableInput: variableKey,
                            },
                            right: {
                                valueSource: 'number',
                                numberInput: maxLength,
                            },
                        },
                    },
                },
            ],
        });
        const validation = {
            condition: conditionKey,
            group: 'maxLength',
            severity: 'error',
            message: `Max length exceeded (${maxLength})`,
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    }
}
