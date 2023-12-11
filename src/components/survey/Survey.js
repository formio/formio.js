import _ from 'lodash';
import Field from '../_classes/field/Field';
import { boolValue, componentValueTypes, getComponentSavedTypes } from '../../utils/utils';

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
      weight: 110,
      documentation: '/userguide/form-building/advanced-components#survey',
      schema: SurveyComponent.schema()
    };
  }

  static get serverConditionSettings() {
    return SurveyComponent.conditionOperatorsSettings;
  }

  static get conditionOperatorsSettings() {
    return {
      ...super.conditionOperatorsSettings,
      operators: ['isEmpty', 'isNotEmpty'],
    };
  }

  static savedValueTypes(schema) {
    return getComponentSavedTypes(schema) || [componentValueTypes.object];
  }

  get defaultSchema() {
    return SurveyComponent.schema();
  }

  render() {
    return super.render(this.renderTemplate('survey'));
  }

  attach(element) {
    this.loadRefs(element, { input: 'multiple' });
    const superAttach = super.attach(element);
    this.refs.input.forEach((input) => {
      if (this.disabled) {
        input.setAttribute('disabled', 'disabled');
      }
      else {
        this.addEventListener(input, 'change', () => this.updateValue(null, {
          modified: true
        }));
      }
    });
    this.setValue(this.dataValue);
    return superAttach;
  }

  setValue(value, flags = {}) {
    if (!value) {
      return false;
    }

    _.each(this.component.questions, (question) => {
      _.each(this.refs.input, (input) => {
        if (input.name === this.getInputName(question)) {
          input.checked = (input.value === value[question.value]);
        }
      });
    });

    const changed = this.updateValue(value, flags);

    if (changed && this.isHtmlRenderMode()) {
      this.redraw();
    }

    return changed;
  }

  get emptyValue() {
    return {};
  }

  get defaultValue() {
    const defaultValue = super.defaultValue;
    //support for default values created in old formio.js versions
    if (defaultValue && !_.isObject(defaultValue) && this.component.values.some(value => value.value === defaultValue)) {
      const adoptedDefaultValue = {};

      this.component.questions.forEach(question => {
        adoptedDefaultValue[question.value] = defaultValue;
      });

      return adoptedDefaultValue;
    }

    return defaultValue;
  }

  getValue() {
    if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
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

  set disabled(disabled) {
    super.disabled = disabled;
    _.each(this.refs.input, (input) => {
      input.disabled = true;
    });
  }

  get disabled() {
    return super.disabled;
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

  getValueAsString(value, options) {
    if (options?.email) {
      let result = (`
        <table border="1" style="width:100%">
          <thead>
            <tr>
              <th>Question</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
      `);

        _.forIn(value, (value, key) => {
          const question = _.find(this.component.questions, ['value', key]);
          const answer = _.find(this.component.values, ['value', value]);

          if (!question || !answer) {
            return;
          }

          result += (`
            <tr>
              <td style="text-align:center;padding: 5px 10px;">${question.label}</td>
              <td style="text-align:center;padding: 5px 10px;">${answer.label}</td>
            </tr>
          `);
        });

        result += '</tbody></table>';

        return result;
    }

    if (_.isPlainObject(value)) {
      const { values = [], questions = [] } = this.component;
      return _.isEmpty(value)
        ? ''
        : _.map(value,(v, q) => {
          const valueLabel = _.get(_.find(values, val => _.isEqual(val.value, v)), 'label', v);
          const questionLabel = _.get(_.find(questions, quest => _.isEqual(quest.value, q)), 'label', q);
          return `${questionLabel}: ${valueLabel}`;
        }).join('; ');
    }

    return super.getValueAsString(value, options);
  }
}
