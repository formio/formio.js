import _ from 'lodash';
import Element from '../Element';
export default class InputWidget extends Element {
  constructor(settings, component) {
    super(settings);
    this.namespace = 'formio.widget';
    this.component = component || {};
    this.settings = _.merge({}, this.defaultSettings, settings || {});
  }

  attach(input) {
    this._input = input;
  }

  get defaultSettings() {
    return {};
  }

  set disabled(disabled) {
    if (disabled) {
      this._input.setAttribute('disabled', 'disabled');
    }
    else {
      this._input.removeAttribute('disabled');
    }
  }

  get input() {
    return this._input;
  }

  get defaultValue() {
    return '';
  }

  getValue() {
    return this._input.value;
  }

  getView(value) {
    return value;
  }

  validationValue(value) {
    return value;
  }

  addPrefix() {
    return null;
  }

  addSuffix() {
    return null;
  }

  setValue(value) {
    return null;
  }
}
