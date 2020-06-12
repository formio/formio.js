import _ from 'lodash';
import { QuickRule } from './QuickRule';
export class MinWordsQuickRule extends QuickRule {
    static get name() {
        return 'minWords';
    }
    static get title() {
        return 'Min Words';
    }
    static get weight() {
        return 300;
    }
    static getEditForm() {
        return [
            {
                label: 'Min Words',
                key: 'minWords',
                type: 'number',
                input: true,
                validate: {
                    required: true,
                },
            },
        ];
    }
    addRule(helper, input) {
        const { minWords, } = input;
        const wordsVariableName = 'Words';
        const wordsVariableKey = _.camelCase(wordsVariableName);
        const wordsCountVariableName = 'Words Count';
        const wordsCountVariableKey = _.camelCase(wordsCountVariableName);
        const conditionName = `Min Words ${minWords}`;
        const conditionKey = _.camelCase(conditionName);
        helper.addVariable({
            name: wordsVariableName,
            key: wordsVariableKey,
            valueSource: 'thisComponentValue',
            transform: {
                name: 'split',
                splitArguments: {
                    separator: {
                        valueSource: 'regExp',
                        regExpInput: {
                            pattern: '\\s+',
                        },
                    },
                },
            },
        });
        helper.addVariable({
            name: wordsCountVariableName,
            key: wordsCountVariableKey,
            valueSource: 'variable',
            variableInput: wordsVariableKey,
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
                                variableInput: wordsCountVariableKey,
                            },
                            right: {
                                valueSource: 'number',
                                numberInput: minWords,
                            },
                        },
                    },
                },
            ],
        });
        const validation = {
            condition: conditionKey,
            group: 'minWords',
            severity: 'error',
            message: `Min words count exceeded (${minWords})`,
        };
        helper.addValidation(validation);
        helper.execute();
        return validation;
    }
}
