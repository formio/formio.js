import _each from 'lodash/each';
import {BaseComponent} from '../base/Base';
export class SurveyComponent extends BaseComponent {
  build() {
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
    _each(this.component.values, (value) => {
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
    _each(this.component.questions, (question) => {
      const tr = this.ce('tr');
      const td = this.ce('td');
      td.appendChild(this.text(question.label));
      tr.appendChild(td);
      _each(this.component.values, (value) => {
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
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!value) {
      return;
    }
    const key = `data[${this.component.key}]`;
    _each(this.component.questions, (question) => {
      _each(this.inputs, (input) => {
        if (input.name === (`${key}[${question.value}]`)) {
          input.checked = (input.value === value[question.value]);
        }
      });
    });
    this.updateValue(flags);
  }

  getValue() {
    if (this.viewOnly) {
      return this.value;
    }
    const value = {};
    const key = `data[${this.component.key}]`;
    _each(this.component.questions, (question) => {
      _each(this.inputs, (input) => {
        if (input.checked && (input.name === (`${key}[${question.value}]`))) {
          value[question.value] = input.value;
          return false;
        }
      });
    });
    return value;
  }
}
