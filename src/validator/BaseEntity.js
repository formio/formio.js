import _ from 'lodash';

export class BaseEntity {
  constructor(context = {}) {
    this.context = context;
  }

  static get name() {
    throw new Error('Getter #name() is abstract.');
  }

  static get title() {
    throw new Error('Getter #title() is abstract.');
  }

  get options() {
    return this.context.options ?? {};
  }

  get engineOptions() {
    return this.context.engineOptions ?? {};
  }

  get targetComponentInstance() {
    return this.getRequiredOption('targetComponentInstance');
  }

  get sourceComponentInstance() {
    return this.getRequiredOption('sourceComponentInstance');
  }

  get formInstance() {
    return this.getRequiredOption('formInstance');
  }

  getOption(name) {
    return this.options[name] ?? null;
  }

  getRequiredOption(name) {
    const {
      [name]: option,
    } = this.options;

    if (_.isNil(option)) {
      throw new Error(`'${name}' is not defined.`);
    }

    return option;
  }
}
