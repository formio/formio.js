import Element from '../Element';
import NativePromise from 'native-promise-only';
import _ from 'lodash';

export default class FormioAddon extends Element {
  static get info() {
    return {};
  }

  get defaultSettings() {
    return {};
  }

  get element() {
    return this._element;
  }

  constructor(settings, componentInstance) {
    super(settings);
    this.namespace = 'formio.plugin';
    this.component = componentInstance || {};
    this.settings = _.merge({}, this.defaultSettings, settings || {});
  }

  attach(element) {
    this._element = element;
    return NativePromise.resolve();
  }

  destroy() {}
}
