import Element from '../Element';
import NativePromise from 'native-promise-only';
import _ from 'lodash';

export default class FormioAddon extends Element {
  static get info() {
    return {
      supportedComponents: [],
      name: 'formioAddon',
      components: [],
      label: 'Formio Addon',
      defaultSettings: {}
    };
  }

  get defaultSettings() {
    return FormioAddon.info.defaultSettings;
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
