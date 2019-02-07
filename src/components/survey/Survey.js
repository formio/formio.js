import _ from 'lodash';
import Field from '../_classes/field/Field';
import { boolValue } from '../../utils/utils';

export default class SurveyComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'survey',
      label: 'Survey',
      key: 'survey',
      questions: [],
      values: []
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Survey',
      group: 'advanced',
      icon: 'list',
      weight: 170,
      documentation: 'http://help.form.io/userguide/#survey',
      schema: SurveyComponent.schema()
    };
  }

  get defaultSchema() {
    return SurveyComponent.schema();
  }

  render() {
    return super.render(this.renderTemplate('survey'));
  }

  attach(element) {
    this.loadRefs(element, { input: 'multiple' });
    super.attach(element);
    this.refs.input.forEach((input) => {
      this.addEventListener(input, 'change', () => this.updateValue());
    });
    this.setValue(this.dataValue);
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!value) {
      return;
    }

    _.each(this.component.questions, (question) => {
      _.each(this.refs.input, (input) => {
        if (input.name === this.getInputName(question)) {
          input.checked = (input.value === value[question.value]);
        }
      });
    });
    this.updateValue(flags);
  }

  get emptyValue() {
    return {};
  }

  getValue() {
    if (this.viewOnly) {
      return this.dataValue;
    }
    if (!this.refs.input) {
      return this.dataValue;
    }
    const value = {};
    _.each(this.component.questions, (question) => {
      _.each(this.refs.input, (input) => {
        if (input.checked && (input.name === this.getInputName(question))) {
          value[question.value] = input.value;
          return false;
        }
      });
    });
    return value;
  }

  validateRequired(setting, value) {
    if (!boolValue(setting)) {
      return true;
    }
    return this.component.questions.reduce((result, question) =>
      result && Boolean(value[question.value]), true);
  }

  getInputName(question) {
    return `${this.options.name}[${question.value}]`;
  }
}
