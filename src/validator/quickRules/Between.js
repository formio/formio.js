import _ from 'lodash';

import { QuickRule } from './QuickRule';

export class BetweenQuickRule extends QuickRule {
  static get name() {
    return 'between';
  }

  static get title() {
    return 'Between';
  }

  static get weight() {
    return 100;
  }

  static getEditForm() {
    return [
      {
        label: 'From',
        key: 'from',
        type: 'number',
        input: true,
        validate: {
          required: true,
        },
      },
      {
        label: 'To',
        key: 'to',
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
      from,
      to,
    } = input;

    const conditionName = `Between ${from} And ${to}`;
    const conditionKey = _.camelCase(conditionName);

    helper.addCondition({
      name: conditionName,
      key: conditionKey,
      conjunction: 'and',
      parts: [
        {
          type: 'new',
          operator: {
            name: 'between',
            betweenArguments: {
              left: {
                valueSource: 'thisComponentValue',
              },
              from: {
                valueSource: 'number',
                numberInput: from,
              },
              to: {
                valueSource: 'number',
                numberInput: to,
              },
            },
          },
        },
      ],
    });

    const validation = {
      condition: conditionKey,
      group: 'between',
      severity: 'error',
      message: `Value should be between ${from} and ${to}`,
    };

    helper.addValidation(validation);
    helper.execute();

    return validation;
  }
}
