import _ from 'lodash';
import { QuickRule } from './QuickRule';
export class MinQuickRule extends QuickRule {
    static get name() {
        return 'min';
    }
    static get title() {
        return 'Min';
    }
    static get weight() {
        return 100;
    }
    static getEditForm() {
        return [
            {
                label: 'Min',
                key: 'min',
                type: 'number',
                input: true,
                validate: {
                    required: true,
                },
            },
        ];
    }
    addRule(helper, input) {
        const { min, } = input;
        const conditionName = `Min ${min}`;
        const conditionKey = _.camelCase(conditionName);
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
                                valueSource: 'thisComponentValue',
                            },
                            right: {
                                valueSource: 'number',
                                numberInput: min,
                            },
                        },
                    },
                },
            ],
        });
        const validation = {
            condition: conditionKey,
            group: 'min',
            severity: 'error',
            message: `Min is not met (${min})`,
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    }
}
