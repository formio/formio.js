import _each from 'lodash/each';
import { BaseComponent } from '../base/Base';
export class SurveyComponent extends BaseComponent {
  build() {
    this.createElement();
    this.createLabel(this.element);
    this.table = this.ce('table', 'table', {
      class: 'table table-striped table-bordered'
    });

    // Build header.
    let thead = this.ce('header', 'thead');
    let thr = this.ce('headerRow', 'tr');
    thr.appendChild(this.ce('headerColumn', 'td'));
    _each(this.component.values, (value) => {
      let th = this.ce('headerColumn', 'th', {
        style: 'text-align: center;'
      });
      th.appendChild(this.text(value.label));
      thr.appendChild(th);
    });
    thead.appendChild(thr);
    this.table.appendChild(thead);
    // Build the body.
    let tbody = this.ce('table', 'tbody');
    _each(this.component.questions, (question) => {
      let tr = this.ce('tableRow', 'tr');
      let td = this.ce('questionColumn', 'td');
      td.appendChild(this.text(question.label));
      tr.appendChild(td);
      _each(this.component.values, (value) => {
        let td = this.ce('valueColumn', 'td', {
          style: 'text-align: center;'
        });
        let input = this.ce('input', 'input', {
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
  }

  setValue(value, noUpdate, noValidate) {
    if (!value) {
      return;
    }
    let key = 'data[' + this.component.key + ']';
    _each(this.component.questions, (question) => {
      _each(this.inputs, (input) => {
        if (input.name === (key + '[' + question.value + ']')) {
          input.checked = (input.value === value[question.value]);
        }
      });
    });
    if (!noUpdate) {
      this.updateValue(noValidate);
    }
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
