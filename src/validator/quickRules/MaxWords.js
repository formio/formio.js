import _ from 'lodash';

import { QuickRule } from './QuickRule';

export class MaxWordsQuickRule extends QuickRule {
  static get name() {
    return 'maxWords';
  }

  static get title() {
    return 'Max Words';
  }

  static get weight() {
    return 400;
  }

  static getEditForm() {
    return [
      {
        label: 'Max Words',
        key: 'maxWords',
        type: 'number',
        input: true,
        validate: {
          required: true,
        },
      },
    ];
  }

  addRule(helper, input) {
    const {
      maxWords,
    } = input;

    const wordsVariableName = 'Words';
    const wordsVariableKey = _.camelCase(wordsVariableName);
    const wordsCountVariableName = 'Words Count';
    const wordsCountVariableKey = _.camelCase(wordsCountVariableName);
    const conditionName = `Max Words ${maxWords}`;
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
            name: 'lessThanOrEqual',
            lessThanOrEqualArguments: {
              left: {
                valueSource: 'variable',
                variableInput: wordsCountVariableKey,
              },
              right: {
                valueSource: 'number',
                numberInput: maxWords,
              },
            },
          },
        },
      ],
    });

    const validation = {
      condition: conditionKey,
      group: 'maxWords',
      severity: 'error',
      message: `Max words count exceeded (${maxWords})`,
    };

    helper.addValidation(validation);
    helper.execute();

    return validation;
  }
}
