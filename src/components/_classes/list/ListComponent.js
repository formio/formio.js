import Field from '../field/Field';
import { GlobalFormio as Formio } from '../../../Formio';
import _ from 'lodash';
import NativePromise from 'native-promise-only';

export default class ListComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      dataSrc: 'values',
      authenticate: false,
      ignoreCache: false,
      template: '<span>{{ item.label }}</span>',
      validate: {
        onlyAvailableItems: false
      },
    }, ...extend);
  }

  get isSelectURL() {
    return this.component.dataSrc === 'url';
  }

  get requestHeaders() {
    // Create the headers object.
    const headers = new Formio.Headers();
    // Add custom headers to the url.
    if (this.component.data && this.component.data.headers) {
      try {
        _.each(this.component.data.headers, (header) => {
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

  getOptionTemplate(data, value) {
    if (!this.component.template) {
      return data.label;
    }
    const options = {
      noeval: true,
      data: {}
    };
    const template = this.interpolate(this.component.template, { item: data }, options);
    const templateValue = this.component.reference && value?._id ? value._id.toString() : value;
    if (templateValue && !_.isObject(templateValue) && options.data.item) {
      // If the value is not an object, then we need to save the template data off for when it is selected.
      this.templateData[templateValue] = options.data.item;
    }
    return template;
  }

  itemTemplate(data, value) {
    if (_.isEmpty(data)) {
      return '';
    }

    const template = this.sanitize(this.getOptionTemplate(data, value), this.shouldSanitizeValue);
    if (template) {
      const label = template.replace(/<\/?[^>]+(>|$)/g, '');
      const hasTranslator = this.i18next?.translator;
      if (!label || (hasTranslator && !this.t(label, { _userInput: true }))) return;
      return hasTranslator ? template.replace(label, this.t(label, { _userInput: true })) : label;
    }
    else {
      return this.sanitize(JSON.stringify(data), this.shouldSanitizeValue);
    }
  }

  handleLoadingError(err) {
    this.loading = false;
    if (err.networkError) {
      this.networkError = true;
    }
    this.itemsLoadedResolve();
    this.emit('componentError', {
      component: this.component,
      message: err.toString(),
    });
    console.warn(`Unable to load resources for ${this.key}`);
  }

  /* eslint-disable max-statements */
  updateItems(searchInput, forceUpdate) {
    if (!this.component.data) {
      console.warn(`Select component ${this.key} does not have data configuration.`);
      this.itemsLoadedResolve();
      return;
    }

    // Only load the data if it is visible.
    if (!this.visible) {
      this.itemsLoadedResolve();
      return;
    }

    switch (this.component.dataSrc) {
      case 'values':
        this.setItems(this.component.data.values);
        break;
      case 'json':
        this.setItems(this.component.data.json);
        break;
      case 'custom':
        this.updateCustomItems(forceUpdate);
        break;
      case 'resource': {
        // If there is no resource, or we are lazyLoading, wait until active.
        if (!this.component.data.resource || (!forceUpdate && !this.active)) {
          this.itemsLoadedResolve();
          return;
        }

        let resourceUrl = this.options.formio ? this.options.formio.formsUrl : `${Formio.getProjectUrl()}/form`;
        resourceUrl += (`/${this.component.data.resource}/submission`);

        if (forceUpdate || this.additionalResourcesAvailable || !this.serverCount) {
          try {
            this.loadItems(resourceUrl, searchInput, this.requestHeaders);
          }
          catch (err) {
            console.warn(`Unable to load resources for ${this.key}`);
          }
        }
        else {
          this.setItems(this.downloadedResources);
        }
        break;
      }
      case 'url': {
        if (!forceUpdate && !this.active && !this.calculatedValue && this.component.type === 'select') {
          // If we are lazyLoading, wait until activated.
          this.itemsLoadedResolve();
          return;
        }
        let { url } = this.component.data;
        let method;
        let body;
        if (url.startsWith('/')) {
          // if URL starts with '/project', we should use base URL to avoid issues with URL formed like <base_url>/<project_name>/project/<project_id>/...
          const baseUrl = url.startsWith('/project') ? Formio.getBaseUrl() : Formio.getProjectUrl() || Formio.getBaseUrl();
          url = baseUrl + url;
        }

        if (!this.component.data.method) {
          method = 'GET';
        }
        else {
          method = this.component.data.method;
          if (method.toUpperCase() === 'POST') {
            body = this.component.data.body;
          }
          else {
            body = null;
          }
        }

        const options = this.component.authenticate ? {} : { noToken: true };
        this.loadItems(url, searchInput, this.requestHeaders, options, method, body);
        break;
      }
      case 'indexeddb': {
        if (typeof window === 'undefined') {
          return;
        }

        if (!window.indexedDB) {
          window.alert("Your browser doesn't support current version of indexedDB");
        }

        if (this.component.indexeddb && this.component.indexeddb.database && this.component.indexeddb.table) {
          const request = window.indexedDB.open(this.component.indexeddb.database);

          request.onupgradeneeded = (event) => {
            if (this.component.customOptions) {
              const db = event.target.result;
              const objectStore = db.createObjectStore(this.component.indexeddb.table, { keyPath: 'myKey', autoIncrement: true });
              objectStore.transaction.oncomplete = () => {
                const transaction = db.transaction(this.component.indexeddb.table, 'readwrite');
                this.component.customOptions.forEach((item) => {
                  transaction.objectStore(this.component.indexeddb.table).put(item);
                });
              };
            }
          };

          request.onerror = () => {
            window.alert(request.errorCode);
          };

          request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(this.component.indexeddb.table, 'readwrite');
            const objectStore = transaction.objectStore(this.component.indexeddb.table);
            new NativePromise((resolve) => {
              const responseItems = [];
              objectStore.getAll().onsuccess = (event) => {
                event.target.result.forEach((item) => {
                  responseItems.push(item);
                });
                resolve(responseItems);
              };
            }).then((items) => {
              if (!_.isEmpty(this.component.indexeddb.filter)) {
                items = _.filter(items, this.component.indexeddb.filter);
              }
              this.setItems(items);
            });
          };
        }
      }
    }
  }
  /* eslint-enable max-statements */
}
