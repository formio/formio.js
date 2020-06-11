import _ from 'lodash';
import { QuickRule } from './QuickRule';
export class RequiredQuickRule extends QuickRule {
    static get name() {
        return 'required';
    }
    static get title() {
        return 'Required';
    }
    addRule(helper) {
        const conditionName = 'Required';
        const conditionKey = _.camelCase(conditionName);
        helper.addCondition({
            name: conditionName,
            key: conditionKey,
            conjunction: 'and',
            parts: [
                {
                    type: 'new',
                    operator: {
                        name: 'notIsEmpty',
                        notIsEmptyArguments: {
                            component: {
                                valueSource: 'thisComponent',
                            },
                        },
                    },
                },
            ],
        });
        const validation = {
            condition: conditionKey,
            severity: 'error',
            message: 'Component is required',
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    }
}
