import _ from 'lodash';
import BaseComponent from '../base/Base';

export default class SurveyComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
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

  build() {
    if (this.viewOnly) {
      this.viewOnlyBuild();
    }
    else {
      this.createElement();
      const labelAtTheBottom = this.component.labelPosition === 'bottom';
      if (!labelAtTheBottom) {
        this.createLabel(this.element);
      }
      this.table = this.ce('table', {
        class: 'table table-striped table-bordered'
      });
      this.setInputStyles(this.table);

      // Build header.
      const thead = this.ce('thead');
      const thr = this.ce('tr');
      thr.appendChild(this.ce('td'));
      _.each(this.component.values, (value) => {
        const th = this.ce('th', {
          style: 'text-align: center;'
        });
        th.appendChild(this.text(value.label));
        thr.appendChild(th);
      });
      thead.appendChild(thr);
      this.table.appendChild(thead);
      // Build the body.
      const tbody = this.ce('tbody');
      _.each(this.component.questions, (question) => {
        const tr = this.ce('tr');
        const td = this.ce('td');
        td.appendChild(this.text(question.label));
        tr.appendChild(td);
        _.each(this.component.values, (value) => {
          const td = this.ce('td', {
            style: 'text-align: center;'
          });
          const input = this.ce('input', {
            type: 'radio',
            name: `data[${this.component.key}][${question.value}]`,
            value: value.value,
            id: `${this.id}-${question.value}-${value.value}`
          });
          this.addInput(input, td);
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      this.table.appendChild(tbody);
      this.element.appendChild(this.table);
      if (labelAtTheBottom) {
        this.createLabel(this.element);
      }
      this.createDescription(this.element);
      this.restoreValue();
      if (this.shouldDisable) {
        this.disabled = true;
      }
      this.autofocus();
    }
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!value) {
      return;
    }
    const key = `data[${this.component.key}]`;
    _.each(this.component.questions, (question) => {
      _.each(this.inputs, (input) => {
        if (input.name === (`${key}[${question.value}]`)) {
          input.checked = (input.value === value[question.value]);
        }
      });
    });
    this.updateValue(flags);
  }

  getValue() {
    if (this.viewOnly) {
      return this.dataValue;
    }
    const value = {};
    const key = `data[${this.component.key}]`;
    _.each(this.component.questions, (question) => {
      _.each(this.inputs, (input) => {
        if (input.checked && (input.name === (`${key}[${question.value}]`))) {
          value[question.value] = input.value;
          return false;
        }
      });
    });
    return value;
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
