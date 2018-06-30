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
      icon: 'fa fa-list',
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
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!value) {
      return;
    }
    const key = `data[${this.key}]`;
    _.each(this.component.questions, (question) => {
      _.each(this.refs.input, (input) => {
        if (input.name === (`${key}[${question.value}]`)) {
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
    const value = {};
    const key = `data[${this.key}]`;
    _.each(this.component.questions, (question) => {
      _.each(this.refs.input, (input) => {
        if (input.checked && (input.name === (`${key}[${question.value}]`))) {
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

  getView(value) {
    if (!value) {
      return '';
    }
    const table = this.ce('table', {
      class: 'table table-striped table-bordered table-condensed'
    });
    const tbody = this.ce('tbody');

    _.each(value, (value, question) => {
      const row = this.ce('tr');

      const questionCell = this.ce('th');
      const valueCell = this.ce('td');

      const questionText = _.find(this.component.questions, ['value', question]).label;
      const valueText = _.find(this.component.values, ['value', value]).label;

      questionCell.appendChild(this.text(questionText));
      valueCell.appendChild(this.text(valueText));

      row.appendChild(questionCell);
      row.appendChild(valueCell);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    return table.outerHTML;
  }
}
