import BaseComponent from '../base/Base';
import Formio from '../../formio';
import _each from 'lodash/each';
class SelectComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'select';
    info.changeEvent = '';
    return info;
  }
  createInput(container) {
    let input = super.createInput(container);
    this.selectItems = [];
    let template = this.component.template ? this.component.template.split('.')[1].split(' ')[0] : '';
    let valueProperty = this.component.valueProperty;
    switch(this.component.dataSrc) {
      case 'values':
        this.selectItems = this.component.data.values;
        this.updateOptions(input);
        break;
      case 'json':
        _each(this.component.data.json, (item) => {
          this.selectItems.push({
            value: item[valueProperty],
            label: item[template]
          });
        });
        this.updateOptions(input);
        break;
      case 'resource':
        let baseUrl = Formio.getAppUrl() + '/' + this.component.data.resource;
        let value = valueProperty.split('.')[1];
        (new FormioService(baseUrl)).loadSubmissions().then((submissions) => {
          _each(submissions, (submission) => {
            this.selectItems.push({
              value: submission.data[value],
              label: submission.data[value]
            });
          });
          this.updateOptions(input);
        });
        break;
      case 'url':
        Formio.request(this.component.data.url).then((response) => {
          _each(response, (item) => {
            this.selectItems.push({
              value: item[valueProperty],
              label: item[template]
            });
          });
          this.updateOptions(input);
        });
        break;

    }
  }
  updateOptions(input) {
    input.innerHTML = '';
    _each(this.selectItems, (value) => {
      let option = this.ce('option');
      option.setAttribute('value', value.value);
      option.appendChild(document.createTextNode(value.label));
      input.appendChild(option);
    });
  }
}
module.exports = SelectComponent;
