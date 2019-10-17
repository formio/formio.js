import Component from '../_classes/component/Component';
import fetchPonyfill from 'fetch-ponyfill';
import NativePromise from 'native-promise-only';
import Formio from '../../Formio';
import _ from 'lodash';
const { fetch } = fetchPonyfill({
  Promise: NativePromise
});

export default class DataSourceComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      label: 'Data Source',
      key: 'dataSource',
      type: 'datasource',
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Data Source',
      icon: 'cloud',
      group: 'data',
      documentation: 'http://help.form.io/userguide/#datasource',
      weight: 30,
      schema: DataSourceComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
  }

  init() {
    // TODO: Implement custom trigger.
    return super.init();
  }

  render() {
    if (this.builderMode) {
      return super.render(this.component.label || 'Data Source');
    }
    // Is there a better way to be hidden on the page?
    return super.render(' ');
  }

  attach(element) {
    return super.attach(element);
  }

  refresh() {
    switch (this.component.dataSrc) {
      case 'url':
        fetch(this.interpolate(this.component.fetch.url), {
          method: (this.component.fetch.method || 'get').toUpperCase(),
          headers: this.requestHeaders,
        })
          .then((result) => {
            return result.json().then((data) => this.assign(data));
          });
        break;
      case 'custom':
        // TODO: Implement custom async code?
        break;
    }
  }

  /**
   * Get the request headers for this select dropdown.
   */
  get requestHeaders() {
    // Create the headers object.
    const headers = new Formio.Headers();

    // Add custom headers to the url.
    if (this.component.fetch && this.component.fetch.headers) {
      try {
        _.each(this.component.fetch.headers, (header) => {
          if (header.key) {
            headers.set(header.key, this.interpolate(header.value));
          }
        });
      }
      catch (err) {
        console.warn(err.message);
      }
    }

    return headers;
  }

  assign(data) {
    (this.component.assign || []).forEach((assign) => {
      const instance = this.parent.getComponent(assign.component) || this.root.getComponent(assign.component);
      if (instance) {
        instance.setValue(_.get(data, assign.path, instance.defaultValue));
      }
    });
    // TODO: Implement custom assign.
  }
}
