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
    const {
      minLength,
    } = input;

    const variableKey = 'length';
    const conditionKey = `minLength${minLength}`;

    helper.addVariable({
      name: 'Length',
      key: variableKey,
      valueSource: 'thisComponentValue',
      transform: {
        name: 'length',
      },
    });

    helper.addCondition({
      name: `Min Length ${minLength}`,
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
