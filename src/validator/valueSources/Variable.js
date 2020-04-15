import { ValueSource } from './ValueSource';

export class VariableValueSource extends ValueSource {
  static get name() {
    return 'variable';
  }

  static get title() {
    return 'Variable';
  }

  static get weight() {
    return 1000;
  }

  static getInputEditForm({
    customVariables,
    editFormUtils,
    excludeVariables,
  }) {
    return {
      ...editFormUtils.variableSelector({
        customValues: customVariables,
        exclude: excludeVariables,
      }),
      validate: {
        required: true,
      },
    };
  }

  getValue(input) {
    const { componentInstance } = this.options;

    if (!componentInstance) {
      throw new Error('`componentInstance` is not defined.');
    }

    return componentInstance.calculateVariable(input);
  }
}
