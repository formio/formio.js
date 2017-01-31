import _each from 'lodash/each';
import BaseComponent from '../base/Base';
class SurveyComponent extends BaseComponent {
  build() {
    this.createElement();
    this.createLabel(this.element);
    this.table = this.ce('table');
    this.table.setAttribute('class', 'table table-striped table-bordered');

    // Build header.
    let thead = this.ce('thead');
    let thr = this.ce('tr');
    thr.append(this.ce('td'));
    _each(this.component.values, (value) => {
      let th = this.ce('th');
      th.setAttribute('style', 'text-align: center;');
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
        let td = this.ce('td');
        td.setAttribute('style', 'text-align: center;');
        let input = this.ce('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'data[' + this.component.key + '][' + question.value + ']');
        input.setAttribute('value', value.value);
        input.setAttribute('id', this.id + '-' + question.value + '-' + value.value);
        this.addInput(input, td);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    this.table.appendChild(tbody);
    this.element.appendChild(this.table);
  }

  setValue(value) {
    let key = 'data[' + this.component.key + ']';
    _each(this.component.questions, (question) => {
      _each(this.inputs, (input) => {
        if (input.name === (key + '[' + question.value + ']')) {
          input.checked = (input.value === value[question.value]);
        }
      });
    });
    this.updateValue();
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
module.exports = SurveyComponent;
