import _ from 'lodash';

import { QuickRule } from './QuickRule';

export class PatternRule extends QuickRule {
  static get name() {
    return 'pattern';
  }

  static get title() {
    return 'Pattern';
  }

  static get weight() {
    return 500;
  }

  static getEditForm() {
    return [
      {
        label: 'Pattern',
        key: 'pattern',
        type: 'textfield',
        input: true,
        validate: {
          required: true,
        },
      },
    ];
  }

  addRule(helper, input) {
    const {
      pattern,
    } = input;

    const conditionName = `Match Pattern ${pattern}`;
    const conditionKey = _.camelCase(conditionName);

    helper.addCondition({
      name: conditionName,
      key: conditionKey,
      conjunction: 'and',
      parts: [
        {
          type: 'new',
          operator: {
            name: 'matchPattern',
            matchPatternArguments: {
              value: {
                valueSource: 'thisComponentValue',
              },
              pattern: {
                valueSource: 'string',
                stringInput: `^${pattern}$`,
              },
            },
          },
        },
      ],
    });

    const validation = {
      condition: conditionKey,
      group: 'pattern',
      severity: 'error',
      message: `Pattern is not met (${pattern})`,
    };

    helper.addValidation(validation);
    helper.execute();

    return validation;
  }
}
