import _ from 'lodash';
import Element from '../Element';
import NativePromise from 'native-promise-only';
export default class InputWidget extends Element {
  static get defaultSettings() {
    return {
      type: 'input'
    };
  }

  constructor(settings, component, instance, index) {
    super(settings);
    this.valueIndex = index || 0;
    this.componentInstance = instance;
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

  evalContext(additional) {
    return super.evalContext(Object.assign({
      component: this.component,
      row: this.componentInstance.data,
      rowIndex: this.componentInstance.rowIndex,
      data: this.componentInstance.rootValue,
      value: this.componentInstance.dataValue,
      t: this.t.bind(this),
      submission: (this.componentInstance.root ? this.componentInstance.root._submission : {
        data: this.componentInstance.rootValue
      }),
      form: this.componentInstance.root ? this.componentInstance.root._form : {},
      options: this.options,
    }, additional));
  }
}
