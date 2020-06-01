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

    const wordsVariableKey = 'words';
    const wordsCountVariableKey = 'wordsCount';
    const conditionKey = `maxWords${maxWords}`;

    helper.addVariable({
      name: 'Words',
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
      name: 'Words Count',
      key: wordsCountVariableKey,
      valueSource: 'variable',
      variableInput: wordsVariableKey,
      transform: {
        name: 'length',
      },
    });

    helper.addCondition({
      name: `Max Words ${maxWords}`,
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
