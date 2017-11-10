import _each from 'lodash/each';
import { BaseComponent } from '../base/Base';
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
    let thead = this.ce('thead');
    let thr = this.ce('tr');
    thr.appendChild(this.ce('td'));
    _each(this.component.values, (value) => {
      let th = this.ce('th', {
        style: 'text-align: center;'
      });
      th.appendChild(this.text(value.label));
      thr.appendChild(th);
    });
    thead.appendChild(thr);
    this.table.appendChild(thead);
    // Build the body.
    let tbody = this.ce('tbody');
    _each(this.component.questions, (question) => {
      let tr = this.ce('tr');
      let td = this.ce('td');
      td.appendChild(this.text(question.label));
      tr.appendChild(td);
      _each(this.component.values, (value) => {
        let td = this.ce('td', {
          style: 'text-align: center;'
        });
        let input = this.ce('input', {
          type: 'radio',
          name: 'data[' + this.component.key + '][' + question.value + ']',
          value: value.value,
          id: this.id + '-' + question.value + '-' + value.value
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
    this.value = value;
    let key = 'data[' + this.component.key + ']';
    _each(this.component.questions, (question) => {
      _each(this.inputs, (input) => {
        if (input.name === (key + '[' + question.value + ']')) {
          input.checked = (input.value === value[question.value]);
        }
      });
    });
    this.updateValue(flags);
  }

  getValue() {
    let value = {};
    let key = 'data[' + this.component.key + ']';
    _each(this.component.questions, (question) => {
      _each(this.inputs, (input) => {
        if (input.checked && (input.name === (key + '[' + question.value + ']'))) {
          value[question.value] = input.value;
          return false;
        }
      });
    });
    return value;
  }
}
