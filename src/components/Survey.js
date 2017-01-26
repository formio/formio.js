let _each = require('lodash/each');
let BaseComponent = require('./Base');
class SurveyComponent extends BaseComponent {
  build() {
    this.createElement();
    this.createLabel(this._element);
    this.table = this.ce('table');
    this.table.setAttribute('class', 'table table-striped table-bordered');

    // Build header.
    let thead = this.ce('thead');
    let thr = this.ce('tr');
    thr.append(this.ce('td'));
    _each(this._component.values, (value) => {
      let th = this.ce('th');
      th.setAttribute('style', 'text-align: center;');
      th.appendChild(this.text(value.label));
      thr.appendChild(th);
    });
    thead.appendChild(thr);
    this.table.appendChild(thead);

    // Build the body.
    let tbody = this.ce('tbody');
    _each(this._component.questions, (question) => {
      let tr = this.ce('tr');
      let td = this.ce('td');
      td.appendChild(this.text(question.label));
      tr.appendChild(td);
      _each(this._component.values, (value) => {
        let td = this.ce('td');
        td.setAttribute('style', 'text-align: center;');
        let input = this.ce('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'data[' + this._component.key + '][' + question.value + ']');
        input.setAttribute('id', this.id + '-' + question.value);
        this.addInput(input);
        td.appendChild(input);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    this.table.appendChild(tbody);
    this._element.appendChild(this.table);
  }
}
module.exports = SurveyComponent;
