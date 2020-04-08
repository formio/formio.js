import { QuickRule } from './QuickRule';

export class MaxQuickRule extends QuickRule {
  static get name() {
    return 'max';
  }

  static get title() {
    return 'Max';
  }

  static get weight() {
    return 200;
  }

  static getEditForm() {
    return [
      {
        label: 'Max',
        key: 'max',
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
      max,
    } = input;

    const conditionKey = `max${max}`;

    helper.addCondition({
      name: `Max ${max}`,
      key: conditionKey,
      conjunction: 'and',
      parts: [
        {
          type: 'new',
          operator: {
            name: 'lessThanOrEqual',
            lessThanOrEqualArguments: {
              left: {
                valueSource: 'thisComponentValue',
              },
              right: {
                valueSource: 'number',
                numberInput: max,
              },
            },
          },
        },
      ],
    });

    const validation = {
      condition: conditionKey,
      group: 'max',
      severity: 'error',
      message: `Max exceeded (${max})`,
    };

    helper.addValidation(validation);
    helper.execute();

    return validation;
  }
}
