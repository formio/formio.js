import _ from 'lodash';
import Element from '../Element';
import NativePromise from 'native-promise-only';
export default class InputWidget extends Element {
  static get defaultSettings() {
    return {
      type: 'input'
    };
  }

  constructor(settings, component) {
    super(settings);
    this.namespace = 'formio.widget';
    this.component = component || {};
    this.settings = _.merge({}, this.defaultSettings, settings || {});
  }

  attach(input) {
    this._input = input;
    return NativePromise.resolve();
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

  getValue() {
    return this._input.value;
  }

  getValueAsString(value) {
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
    this._input.value = value;
  }
}
