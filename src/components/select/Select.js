import Choices from '../../utils/ChoicesWrapper';
import _ from 'lodash';
import Formio from '../../Formio';
import Field from '../_classes/field/Field';
import Form from '../../Form';
import NativePromise from 'native-promise-only';
import { getRandomComponentId } from '../../utils/utils';

export default class SelectComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'select',
      label: 'Select',
      key: 'select',
      idPath: 'id',
      data: {
        values: [],
        json: '',
        url: '',
        resource: '',
        custom: ''
      },
      clearOnRefresh: false,
      limit: 100,
      dataSrc: 'values',
      valueProperty: '',
      lazyLoad: true,
      filter: '',
      searchEnabled: true,
      searchField: '',
      minSearch: 0,
      readOnlyValue: false,
      authenticate: false,
      template: '<span>{{ item.label }}</span>',
      selectFields: '',
      searchThreshold: 0.3,
      uniqueOptions: false,
      tableView: true,
      fuseOptions: {
        include: 'score',
        threshold: 0.3,
      },
      customOptions: {}
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Select',
      group: 'basic',
      icon: 'th-list',
      weight: 70,
      documentation: 'http://help.form.io/userguide/#select',
      schema: SelectComponent.schema()
    };
  }

  init() {
    super.init();
    this.validators = this.validators.concat(['select']);

    // Trigger an update.
    let updateArgs = [];
    const triggerUpdate = _.debounce((...args) => {
      updateArgs = [];
      return this.updateItems.apply(this, args);
    }, 100);
    this.triggerUpdate = (...args) => {
      if (args.length) {
        updateArgs = args;
      }
      return triggerUpdate(...updateArgs);
    };

    // Keep track of the select options.
    this.selectOptions = [];

    if (this.isInfiniteScrollProvided) {
      this.isFromSearch = false;

      this.searchServerCount = null;
      this.defaultServerCount = null;

      this.isScrollLoading = false;

      this.searchDownloadedResources = [];
      this.defaultDownloadedResources = [];
    }

    // If this component has been activated.
    this.activated = false;

    // Determine when the items have been loaded.
    this.itemsLoaded = new NativePromise((resolve) => {
      this.itemsLoadedResolve = resolve;
    });
  }

  get dataReady() {
    return this.itemsLoaded;
  }

  get defaultSchema() {
    return SelectComponent.schema();
  }

  get emptyValue() {
    if (this.component.multiple) {
      return [];
    }
    // if select has JSON data source type, we are defining if empty value would be an object or a string by checking JSON's first item
    if (this.component.dataSrc === 'json' && this.component.data.json) {
      const firstItem = this.component.data.json[0];
      let firstValue;
      if (this.valueProperty) {
        firstValue = _.get(firstItem, this.valueProperty);
      }
      else {
        firstValue = firstItem;
      }
      if (firstValue && typeof firstValue === 'string') {
        return '';
      }
      else {
        return {};
      }
    }
    if (this.valueProperty) {
      return '';
    }
    return {};
  }

  get overlayOptions() {
    return this.parent && this.parent.component && this.parent.component.type === 'table';
  }

  get valueProperty() {
    if (this.component.valueProperty) {
      return this.component.valueProperty;
    }
    // Force values datasource to use values without actually setting it on the component settings.
    if (this.component.dataSrc === 'values') {
      return 'value';
    }

    return '';
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'select';
    info.changeEvent = 'change';
    return info;
  }

  get isSelectResource() {
    return this.component.dataSrc === 'resource';
  }

  get isSelectURL() {
    return this.component.dataSrc === 'url';
  }

  get isInfiniteScrollProvided() {
    return this.isSelectResource || this.isSelectURL;
  }

  get shouldDisabled() {
    return super.shouldDisabled || this.parentDisabled;
  }

  isEntireObjectDisplay() {
    return this.component.dataSrc === 'resource' && this.valueProperty === 'data';
  }

  itemTemplate(data) {
    if (_.isEmpty(data)) {
      return '';
    }

    // If they wish to show the value in read only mode, then just return the itemValue here.
    if (this.options.readOnly && this.component.readOnlyValue) {
      return this.itemValue(data);
    }

    // Perform a fast interpretation if we should not use the template.
    if (data && !this.component.template) {
      const itemLabel = data.label || data;
      return (typeof itemLabel === 'string') ? this.t(itemLabel) : itemLabel;
    }
    if (typeof data === 'string') {
      return this.t(data);
    }

    if (data.data) {
      // checking additional fields in the template for the selected Entire Object option
      const hasNestedFields = /item\.data\.\w*/g.test(this.component.template);
      data.data = this.isEntireObjectDisplay() && _.isObject(data.data) && !hasNestedFields
        ? JSON.stringify(data.data)
        : data.data;
    }
    const template = this.component.template ? this.interpolate(this.component.template, { item: data }) : data.label;
    if (template) {
      const label = template.replace(/<\/?[^>]+(>|$)/g, '');
      if (!label || !this.t(label)) return;
      return template.replace(label, this.t(label));
    }
    else {
      return JSON.stringify(data);
    }
  }

  /**
   * Adds an option to the select dropdown.
   *
   * @param value
   * @param label
   */
  addOption(value, label, attrs = {}, id = getRandomComponentId()) {
    if (_.isNil(label)) return;
    const idPath = this.component.idPath
      ? this.component.idPath.split('.').reduceRight((obj, key) => ({ [key]: obj }), id)
      : {};
    const option = {
      value: _.isObject(value) && this.isEntireObjectDisplay()
        ? this.normalizeSingleValue(value)
        : _.isObject(value)
          ? value
          : _.isNull(value)
            ? this.emptyValue
            : String(this.normalizeSingleValue(value)),
      label: label,
      ...idPath
    };

    const skipOption = this.component.uniqueOptions
      ? !!this.selectOptions.find((selectOption) => _.isEqual(selectOption.value, option.value))
      : false;

    if (skipOption) {
      return;
    }

    if (value) {
      this.selectOptions.push(option);
    }

    if (this.refs.selectContainer && (this.component.widget === 'html5')) {
      // Add element to option so we can reference it later.
      const div = document.createElement('div');
      div.innerHTML = this.sanitize(this.renderTemplate('selectOption', {
        selected: _.isEqual(this.dataValue, option.value),
        option,
        attrs,
        id,
        useId: (this.valueProperty === '') && _.isObject(value) && id,
      })).trim();

      option.element = div.firstChild;
      this.refs.selectContainer.appendChild(option.element);
    }
  }

  addValueOptions(items) {
    items = items || [];
    let added = false;
    if (!this.selectOptions.length) {
      // Add the currently selected choices if they don't already exist.
      const currentChoices = Array.isArray(this.dataValue) ? this.dataValue : [this.dataValue];
      added = this.addCurrentChoices(currentChoices, items);
      if (!added && !this.component.multiple) {
        this.addPlaceholder();
      }
    }
    return added;
  }

  disableInfiniteScroll() {
    if (!this.downloadedResources) {
      return;
    }

    this.downloadedResources.serverCount = this.downloadedResources.length;
    this.serverCount = this.downloadedResources.length;
  }

  /* eslint-disable max-statements */
  setItems(items, fromSearch) {
    // If the items is a string, then parse as JSON.
    if (typeof items == 'string') {
      try {
        items = JSON.parse(items);
      }
      catch (err) {
        console.warn(err.message);
        items = [];
      }
    }

    // Allow js processing (needed for form builder)
    if (this.component.onSetItems && typeof this.component.onSetItems === 'function') {
      const newItems = this.component.onSetItems(this, items);
      if (newItems) {
        items = newItems;
      }
    }

    if (!this.choices && this.refs.selectContainer) {
      if (this.loading) {
        // this.removeChildFrom(this.refs.input[0], this.selectContainer);
      }

      this.empty(this.refs.selectContainer);
    }

    // If they provided select values, then we need to get them instead.
    if (this.component.selectValues) {
      items = _.get(items, this.component.selectValues, items) || [];
    }

    let areItemsEqual;

    if (this.isInfiniteScrollProvided) {
      areItemsEqual = this.isSelectURL ? _.isEqual(items, this.downloadedResources) : false;

      const areItemsEnded = this.component.limit > items.length;
      const areItemsDownloaded = areItemsEqual
        && this.downloadedResources
        && this.downloadedResources.length === items.length;

      if (areItemsEnded) {
        this.disableInfiniteScroll();
      }
      else if (areItemsDownloaded) {
        this.selectOptions = [];
      }
      else {
        this.serverCount = items.serverCount;
      }
    }

    if (this.isScrollLoading && items) {
      if (!areItemsEqual) {
        this.downloadedResources = this.downloadedResources
          ? this.downloadedResources.concat(items)
          : items;
      }

      this.downloadedResources.serverCount = items.serverCount || this.downloadedResources.serverCount;
    }
    else {
      this.downloadedResources = items || [];
      this.selectOptions = [];
      // If there is new select option with same id as already selected, set the new one
      if (!_.isEmpty(this.dataValue) && this.component.idPath) {
        const selectedOptionId = _.get(this.dataValue, this.component.idPath, null);
        const newOptionWithSameId = !_.isNil(selectedOptionId) && items.find(item => {
          const itemId = _.get(item, this.component.idPath);

          return itemId === selectedOptionId;
        });

        if (newOptionWithSameId) {
          this.setValue(newOptionWithSameId);
        }
      }
    }

    // Add the value options.
    if (!fromSearch) {
      this.addValueOptions(items);
    }

    if (this.component.widget === 'html5' && !this.component.placeholder) {
      this.addOption(null, '');
    }

    // Iterate through each of the items.
    _.each(items, (item, index) => {
      // preventing references of the components inside the form to the parent form when building forms
      if (this.root && this.root.options.editForm && this.root.options.editForm._id && this.root.options.editForm._id === item._id) return;
      this.addOption(this.itemValue(item), this.itemTemplate(item), {}, _.get(item, this.component.idPath, String(index)));
    });

    if (this.choices) {
      this.choices.setChoices(this.selectOptions, 'value', 'label', true);

      if (this.overlayOptions) {
        const { element: optionsDropdown } = this.choices.dropdown;

        optionsDropdown.style.position = 'fixed';

        const recalculatePosition = () => {
          const { top, height, width } = this.element.getBoundingClientRect();

          optionsDropdown.style.top = `${top + height}px`;
          optionsDropdown.style.width = `${width}px`;
        };

        recalculatePosition();

        ['scroll', 'resize'].forEach(
          eventType => this.addEventListener(window, eventType, recalculatePosition)
        );
      }
    }
    else if (this.loading) {
      // Re-attach select input.
      // this.appendTo(this.refs.input[0], this.selectContainer);
    }

    // We are no longer loading.
    this.isScrollLoading = false;
    this.loading = false;

    // If a value is provided, then select it.
    if (this.dataValue) {
      this.setValue(this.dataValue, {
        noUpdateEvent: true
      });
    }
    else {
      // If a default value is provided then select it.
      const defaultValue = this.multiple ? this.defaultValue || [] : this.defaultValue;
      if (defaultValue) {
        this.setValue(defaultValue);
      }
    }

    // Say we are done loading the items.
    this.itemsLoadedResolve();
  }
  /* eslint-enable max-statements */

  loadItems(url, search, headers, options, method, body) {
    options = options || {};

    // See if they have not met the minimum search requirements.
    const minSearch = parseInt(this.component.minSearch, 10);
    if (
      this.component.searchField &&
      (minSearch > 0) &&
      (!search || (search.length < minSearch))
    ) {
      // Set empty items.
      return this.setItems([]);
    }

    // Ensure we have a method and remove any body if method is get
    method = method || 'GET';
    if (method.toUpperCase() === 'GET') {
      body = null;
    }

    const limit = this.component.limit || 100;
    const skip = this.isScrollLoading ? this.selectOptions.length : 0;
    const query = (this.component.dataSrc === 'url') ? {} : {
      limit,
      skip,
    };

    // Allow for url interpolation.
    url = this.interpolate(url, {
      formioBase: Formio.getBaseUrl(),
      search,
      limit,
      skip,
      page: Math.abs(Math.floor(skip / limit))
    });

    // Add search capability.
    if (this.component.searchField && search) {
      if (Array.isArray(search)) {
        query[`${this.component.searchField}`] = search.join(',');
      }
      else {
        query[`${this.component.searchField}`] = search;
      }
    }

    // If they wish to return only some fields.
    if (this.component.selectFields) {
      query.select = this.component.selectFields;
    }

    // Add sort capability
    if (this.component.sort) {
      query.sort = this.component.sort;
    }

    if (!_.isEmpty(query)) {
      // Add the query string.
      url += (!url.includes('?') ? '?' : '&') + Formio.serialize(query, (item) => this.interpolate(item));
    }

    // Add filter capability
    if (this.component.filter) {
      url += (!url.includes('?') ? '?' : '&') + this.interpolate(this.component.filter);
    }

    // Make the request.
    options.header = headers;
    this.loading = true;

    Formio.makeRequest(this.options.formio, 'select', url, method, body, options)
      .then((response) => {
        this.loading = false;
        this.setItems(response, !!search);
      })
      .catch((err) => {
        if (this.isInfiniteScrollProvided) {
          this.setItems([]);
          this.disableInfiniteScroll();
        }

        this.isScrollLoading = false;
        this.loading = false;
        this.itemsLoadedResolve();
        this.emit('componentError', {
          component: this.component,
          message: err.toString(),
        });
        console.warn(`Unable to load resources for ${this.key}`);
      });
  }

  /**
   * Get the request headers for this select dropdown.
   */
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

  getCustomItems() {
    return this.evaluate(this.component.data.custom, {
      values: []
    }, 'values');
  }

  updateCustomItems() {
    this.setItems(this.getCustomItems() || []);
  }

  refresh(value, { instance }) {
    if (this.component.clearOnRefresh && (instance && !instance.pristine)) {
      this.setValue(this.emptyValue);
    }

    if (this.component.lazyLoad) {
      this.activated = false;
      this.loading = true;
      this.setItems([]);
    }

    this.updateItems(null, true);
  }

  get additionalResourcesAvailable() {
    return _.isNil(this.serverCount) || (this.serverCount > this.downloadedResources.length);
  }

  get serverCount() {
    if (this.isFromSearch) {
      return this.searchServerCount;
    }

    return this.defaultServerCount;
  }

  set serverCount(value) {
    if (this.isFromSearch) {
      this.searchServerCount = value;
    }
    else {
      this.defaultServerCount = value;
    }
  }

  get downloadedResources() {
    if (this.isFromSearch) {
      return this.searchDownloadedResources;
    }

    return this.defaultDownloadedResources;
  }

  set downloadedResources(value) {
    if (this.isFromSearch) {
      this.searchDownloadedResources = value;
    }
    else {
      this.defaultDownloadedResources = value;
    }
  }

  /* eslint-disable max-statements */
  updateItems(searchInput, forceUpdate) {
    this.itemsLoaded = new NativePromise((resolve) => {
      this.itemsLoadedResolve = resolve;
    });
    if (!this.component.data) {
      console.warn(`Select component ${this.key} does not have data configuration.`);
      this.itemsLoadedResolve();
      return;
    }

    // Only load the data if it is visible.
    if (!this.checkConditions()) {
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
        this.updateCustomItems();
        break;
      case 'resource': {
        // If there is no resource, or we are lazyLoading, wait until active.
        if (!this.component.data.resource || (!forceUpdate && !this.active)) {
          return;
        }

        let resourceUrl = this.options.formio ? this.options.formio.formsUrl : `${Formio.getProjectUrl()}/form`;
        resourceUrl += (`/${this.component.data.resource}/submission`);

        if (forceUpdate || this.additionalResourcesAvailable || this.dataValue.length && !this.serverCount) {
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
        if (!forceUpdate && !this.active && !this.calculatedValue) {
          // If we are lazyLoading, wait until activated.
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

  addPlaceholder() {
    if (!this.component.placeholder) {
      return;
    }

    this.addOption('', this.component.placeholder, { placeholder: true });
  }

  /**
   * Activate this select control.
   */
  activate() {
    if (this.active) {
      return;
    }
    this.activated = true;
    if (this.choices) {
      this.choices.setChoices([{
        value: '',
        label: `<i class="${this.iconClass('refresh')}" style="font-size:1.3em;"></i>`,
        disabled: true,
      }], 'value', 'label', true);
    }
    else if (this.component.dataSrc === 'url' || this.component.dataSrc === 'resource') {
      this.addOption('', this.t('loading...'));
    }
    this.triggerUpdate();
  }

  get active() {
    return !this.component.lazyLoad || this.activated || this.options.readOnly;
  }

  render() {
    const info = this.inputInfo;
    const styles = this.overlayOptions
      ? {
        position: 'fixed',
        display: 'block',
        width: '400px',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        'z-index': 2
      }
      : null;
    info.attr = info.attr || {};
    info.multiple = this.component.multiple;
    return super.render(this.wrapElement(this.renderTemplate('select', {
      input: info,
      selectOptions: '',
      styles,
      index: null,
    })));
  }

  wrapElement(element) {
    return this.component.addResource && !this.options.readOnly
      ? (
        this.renderTemplate('resourceAdd', {
          element
        })
      )
      : element;
  }

  choicesOptions() {
    const useSearch = this.component.hasOwnProperty('searchEnabled') ? this.component.searchEnabled : true;
    const placeholderValue = this.t(this.component.placeholder);
    let customOptions = this.component.customOptions || {};
    if (typeof customOptions == 'string') {
      try {
        customOptions = JSON.parse(customOptions);
      }
      catch (err) {
        console.warn(err.message);
        customOptions = {};
      }
    }

    return {
      removeItemButton: this.component.disabled ? false : _.get(this.component, 'removeItemButton', true),
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices form-group formio-choices',
        containerInner: this.transform('class', 'form-control ui fluid selection dropdown')
      },
      addItemText: false,
      placeholder: !!this.component.placeholder,
      placeholderValue: placeholderValue,
      noResultsText: this.t('No results found'),
      noChoicesText: this.t('No choices to choose from'),
      searchPlaceholderValue: this.t('Type to search'),
      shouldSort: false,
      position: (this.component.dropdown || 'auto'),
      searchEnabled: useSearch,
      searchChoices: !this.component.searchField,
      searchFields: _.get(this, 'component.searchFields', ['label']),
      fuseOptions: Object.assign(
        {},
        _.get(this, 'component.fuseOptions', {}),
        {
          include: 'score',
          threshold: _.get(this, 'component.searchThreshold', 0.3),
        }
      ),
      valueComparer: _.isEqual,
      resetScrollPosition: false,
      ...customOptions,
    };
  }

  /* eslint-disable max-statements */
  attach(element) {
    const superAttach = super.attach(element);
    this.loadRefs(element, {
      selectContainer: 'single',
      addResource: 'single',
      autocompleteInput: 'single'
    });
    //enable autocomplete for select
    const autocompleteInput = this.refs.autocompleteInput;
    if (autocompleteInput) {
      this.addEventListener(autocompleteInput, 'change', (event) => {
        this.setValue(event.target.value);
      });
    }
    const input = this.refs.selectContainer;
    if (!input) {
      return;
    }
    this.addEventListener(input, this.inputInfo.changeEvent, () => this.updateValue(null, {
      modified: true
    }));

    if (this.component.widget === 'html5') {
      this.triggerUpdate();
      this.setItems(this.selectOptions || []);
      this.focusableElement = input;
      this.addEventListener(input, 'focus', () => this.update());
      this.addEventListener(input, 'keydown', (event) => {
        const { key } = event;

        if (['Backspace', 'Delete'].includes(key)) {
          this.setValue(this.emptyValue);
        }
      });

      return;
    }

    const tabIndex = input.tabIndex;
    this.addPlaceholder();
    input.setAttribute('dir', this.i18next.dir());
    if (this.choices) {
      this.choices.destroy();
    }

    const choicesOptions = this.choicesOptions();
    this.choices = new Choices(input, choicesOptions);

    this.addEventListener(input, 'hideDropdown', () => {
      this.choices.input.element.value = '';
      this.updateItems(null, true);
    });

    if (this.selectOptions && this.selectOptions.length) {
      this.choices.setChoices(this.selectOptions, 'value', 'label', true);
    }

    if (this.component.multiple) {
      this.focusableElement = this.choices.input.element;
    }
    else {
      this.focusableElement = this.choices.containerInner.element;
      this.choices.containerOuter.element.setAttribute('tabIndex', '-1');
      if (choicesOptions.searchEnabled) {
        this.addEventListener(this.choices.containerOuter.element, 'focus', () => this.focusableElement.focus());
      }
    }

    if (this.isInfiniteScrollProvided) {
      this.scrollList = this.choices.choiceList.element;
      this.onScroll = () => {
        const isLoadingAvailable = !this.isScrollLoading
          && this.additionalResourcesAvailable
          && ((this.scrollList.scrollTop + this.scrollList.clientHeight) >= this.scrollList.scrollHeight);

        if (isLoadingAvailable) {
          this.isScrollLoading = true;
          this.choices.setChoices([{
            value: `${this.id}-loading`,
            label: 'Loading...',
            disabled: true,
          }], 'value', 'label');
          this.triggerUpdate(this.choices.input.element.value);
        }
      };
      this.addEventListener(this.scrollList, 'scroll', this.onScroll);
    }

    this.focusableElement.setAttribute('tabIndex', tabIndex);

    // If a search field is provided, then add an event listener to update items on search.
    if (this.component.searchField) {
      // Make sure to clear the search when no value is provided.
      if (this.choices && this.choices.input && this.choices.input.element) {
        this.addEventListener(this.choices.input.element, 'input', (event) => {
          this.isFromSearch = !!event.target.value;

          if (!event.target.value) {
            this.triggerUpdate();
          }
          else {
            this.serverCount = null;
            this.downloadedResources = [];
          }
        });
      }

      this.addEventListener(input, 'choice', () => {
        if (this.component.multiple && this.component.dataSrc === 'resource' && this.isFromSearch) {
          this.triggerUpdate();
        }
        this.isFromSearch = false;
      });
      this.addEventListener(input, 'search', (event) => this.triggerUpdate(event.detail.value));
      this.addEventListener(input, 'stopSearch', () => this.triggerUpdate());
    }

    this.addEventListener(input, 'showDropdown', () => {
      if (this.dataValue) {
        this.triggerUpdate();
      }
      this.update();
    });

    if (choicesOptions.placeholderValue && this.choices._isSelectOneElement) {
      this.addPlaceholderItem(choicesOptions.placeholderValue);

      this.addEventListener(input, 'removeItem', () => {
        this.addPlaceholderItem(choicesOptions.placeholderValue);
      });
    }

    // Add value options.
    this.addValueOptions();
    this.setChoicesValue(this.dataValue);

    if (this.isSelectResource && this.refs.addResource) {
      this.addEventListener(this.refs.addResource, 'click', (event) => {
        event.preventDefault();

        const formioForm = this.ce('div');
        const dialog = this.createModal(formioForm);

        const projectUrl = _.get(this.root, 'formio.projectUrl', Formio.getBaseUrl());
        const formUrl = `${projectUrl}/form/${this.component.data.resource}`;
        new Form(formioForm, formUrl, {}).ready
          .then((form) => {
            form.on('submit', (submission) => {
              // If valueProperty is set, replace the submission with the corresponding value
              let value = this.valueProperty ? _.get(submission, this.valueProperty) : submission;

              if (this.component.multiple) {
                value = [...this.dataValue, value];
              }
              this.setValue(value);
              this.triggerUpdate();
              dialog.close();
            });
          });
      });
    }

    // Force the disabled state with getters and setters.
    this.disabled = this.shouldDisabled;
    this.triggerUpdate();
    return superAttach;
  }

  addPlaceholderItem(placeholderValue) {
    const items = this.choices._store.activeItems;
    if (!items.length) {
      this.choices._addItem({
        value: placeholderValue,
        label: placeholderValue,
        choiceId: 0,
        groupId: -1,
        customProperties: null,
        placeholder: true,
        keyCode: null
      });
    }
  }

  /* eslint-enable max-statements */

  update() {
    if (this.component.dataSrc === 'custom') {
      this.updateCustomItems();
    }

    // Activate the control.
    this.activate();
  }

  set disabled(disabled) {
    super.disabled = disabled;
    if (!this.choices) {
      return;
    }
    if (disabled) {
      this.setDisabled(this.choices.containerInner.element, true);
      this.focusableElement.removeAttribute('tabIndex');
      this.choices.disable();
    }
    else {
      this.setDisabled(this.choices.containerInner.element, false);
      this.focusableElement.setAttribute('tabIndex', this.component.tabindex || 0);
      this.choices.enable();
    }
  }

  get disabled() {
    return super.disabled;
  }

  set visible(value) {
    // If we go from hidden to visible, trigger a refresh.
    if (value && (!this._visible !== !value)) {
      this.triggerUpdate();
    }
    super.visible = value;
  }

  get visible() {
    return super.visible;
  }

  /**
   * @param {*} value
   * @param {Array} items
   */
  addCurrentChoices(values, items, keyValue) {
    if (!values) {
      return false;
    }
    const notFoundValuesToAdd = [];
    const added = values.reduce((defaultAdded, value) => {
      if (!value || _.isEmpty(value)) {
        return defaultAdded;
      }
      let found = false;

      // Make sure that `items` and `this.selectOptions` points
      // to the same reference. Because `this.selectOptions` is
      // internal property and all items are populated by
      // `this.addOption` method, we assume that items has
      // 'label' and 'value' properties. This assumption allows
      // us to read correct value from the item.
      const isSelectOptions = items === this.selectOptions;
      if (items && items.length) {
        _.each(items, (choice) => {
          if (choice._id && value._id && (choice._id === value._id)) {
            found = true;
            return false;
          }
          const itemValue = keyValue ? choice.value : this.itemValue(choice, isSelectOptions);
          found |= _.isEqual(itemValue, value);
          return found ? false : true;
        });
      }

      // Add the default option if no item is found.
      if (!found) {
        notFoundValuesToAdd.push({
          value: this.itemValue(value),
          label: this.itemTemplate(value)
        });
        return true;
      }
      return found || defaultAdded;
    }, false);

    if (notFoundValuesToAdd.length) {
      if (this.choices) {
        this.choices.setChoices(notFoundValuesToAdd, 'value', 'label');
      }
      else {
        notFoundValuesToAdd.map(notFoundValue => {
          this.addOption(notFoundValue.value, notFoundValue.label);
        });
      }
    }
    return added;
  }

  getValueAsString(data) {
    return (this.component.multiple && Array.isArray(data))
      ? data.map(this.asString.bind(this)).join(', ')
      : this.asString(data);
  }

  getValue() {
    // If the widget isn't active.
    if (
      this.viewOnly || this.loading
      || (!this.component.lazyLoad && !this.selectOptions.length)
      || !this.element
    ) {
      return this.dataValue;
    }

    let value = this.emptyValue;
    if (this.choices) {
      value = this.choices.getValue(true);

      // Make sure we don't get the placeholder
      if (
        !this.component.multiple &&
        this.component.placeholder &&
        (value === this.t(this.component.placeholder))
      ) {
        value = this.emptyValue;
      }
    }
    else if (this.refs.selectContainer) {
      value = this.refs.selectContainer.value;

      if (this.valueProperty === '') {
        if (value === '') {
          return {};
        }

        const option = this.selectOptions[value];
        if (option && _.isObject(option.value)) {
          value = option.value;
        }
      }
    }
    else {
      value = this.dataValue;
    }
    // Choices will return undefined if nothing is selected. We really want '' to be empty.
    if (value === undefined || value === null) {
      value = '';
    }
    return value;
  }

  redraw() {
    const done = super.redraw();
    this.triggerUpdate();
    return done;
  }

  normalizeSingleValue(value) {
    if (_.isNil(value)) {
      return;
    }
    //check if value equals to default emptyValue
    if (_.isObject(value) && Object.keys(value).length === 0) {
      return value;
    }
    const displayEntireObject = this.isEntireObjectDisplay();
    const dataType = this.component.dataType || 'auto';
    const normalize = {
      value,

      number() {
        const numberValue = Number(this.value);
        const isEquivalent = value.toString() === numberValue.toString();

        if (!Number.isNaN(numberValue) && Number.isFinite(numberValue) && value !== '' && isEquivalent) {
          this.value = numberValue;
        }

        return this;
      },

      boolean() {
        if (
          _.isString(this.value)
          && (this.value.toLowerCase() === 'true'
            || this.value.toLowerCase() === 'false')
        ) {
          this.value = (this.value.toLowerCase() === 'true');
        }

        return this;
      },

      string() {
        this.value = String(this.value);
        return this;
      },

      object() {
        if (_.isObject(this.value) && displayEntireObject) {
          this.value = JSON.stringify(this.value);
        }

        return this;
      },

      auto() {
        if (_.isObject(this.value)) {
          this.value = this.object().value;
        }
        else {
          this.value = this.string().number().boolean().value;
        }

        return this;
      }
    };

    try {
      return normalize[dataType]().value;
    }
    catch (err) {
      console.warn('Failed to normalize value', err);
      return value;
    }
  }

  /**
   * Normalize values coming into updateValue.
   *
   * @param value
   * @return {*}
   */
  normalizeValue(value) {
    if (this.component.multiple && Array.isArray(value)) {
      return value.map((singleValue) => this.normalizeSingleValue(singleValue));
    }

    return super.normalizeValue(this.normalizeSingleValue(value));
  }

  setValue(value, flags = {}) {
    const previousValue = this.dataValue;
    const changed = this.updateValue(value, flags);
    value = this.dataValue;
    const hasPreviousValue = Array.isArray(previousValue) ? previousValue.length : previousValue;
    const hasValue = Array.isArray(value) ? value.length : value;

    // Undo typing when searching to set the value.
    if (this.component.multiple && Array.isArray(value)) {
      value = value.map(value => {
        if (typeof value === 'boolean' || typeof value === 'number') {
          return value.toString();
        }
        return value;
      });
    }
    else {
      if (typeof value === 'boolean' || typeof value === 'number') {
        value = value.toString();
      }
    }

    // Do not set the value if we are loading... that will happen after it is done.
    if (this.loading) {
      return changed;
    }

    // Determine if we need to perform an initial lazyLoad api call if searchField is provided.
    if (this.isInitApiCallNeeded(hasValue)) {
      this.loading = true;
      this.lazyLoadInit = true;
      const searchProperty = this.component.searchField || this.component.valueProperty;
      this.triggerUpdate(_.get(value.data || value, searchProperty, value), true);
      return changed;
    }

    // Add the value options.
    this.addValueOptions();
    this.setChoicesValue(value, hasPreviousValue);
    return changed;
  }

  isInitApiCallNeeded(hasValue) {
    return this.component.lazyLoad &&
      !this.lazyLoadInit &&
      !this.active &&
      !this.selectOptions.length &&
      hasValue &&
      this.visible && (this.component.searchField || this.component.valueProperty);
  }

  setChoicesValue(value, hasPreviousValue) {
    const hasValue = Array.isArray(value) ? value.length : value;
    hasPreviousValue = (hasPreviousValue === undefined) ? true : hasPreviousValue;
    if (this.choices) {
      // Now set the value.
      if (hasValue) {
        this.choices.removeActiveItems();
        // Add the currently selected choices if they don't already exist.
        const currentChoices = Array.isArray(value) ? value : [value];
        if (!this.addCurrentChoices(currentChoices, this.selectOptions, true)) {
          this.choices.setChoices(this.selectOptions, 'value', 'label', true);
        }
        this.choices.setChoiceByValue(value);
      }
      else if (hasPreviousValue) {
        this.choices.removeActiveItems();
      }
    }
    else {
      if (hasValue) {
        const values = Array.isArray(value) ? value : [value];
        _.each(this.selectOptions, (selectOption) => {
          _.each(values, (val) => {
            if (_.isEqual(val, selectOption.value) && selectOption.element) {
              selectOption.element.selected = true;
              selectOption.element.setAttribute('selected', 'selected');
              return false;
            }
          });
        });
      }
      else {
        _.each(this.selectOptions, (selectOption) => {
          if (selectOption.element) {
            selectOption.element.selected = false;
            selectOption.element.removeAttribute('selected');
          }
        });
      }
    }
  }

  /**
   * Deletes the value of the component.
   */
  deleteValue() {
    this.setValue('', {
      noUpdateEvent: true
    });
    this.unset();
  }

  /**
   * Check if a component is eligible for multiple validation
   *
   * @return {boolean}
   */
  validateMultiple() {
    // Select component will contain one input when flagged as multiple.
    return false;
  }

  /**
   * Output this select dropdown as a string value.
   * @return {*}
   */

  isBooleanOrNumber(value) {
    return typeof value === 'number' || typeof value === 'boolean';
  }

  getNormalizedValues() {
    if (!this.component || !this.component.data || !this.component.data.values) {
      return;
    }
    return this.component.data.values.map(
      value => ({ label: value.label, value: String(this.normalizeSingleValue(value.value)) })
    );
  }

  asString(value) {
    value = value || this.getValue();
    //need to convert values to strings to be able to compare values with available options that are strings
    const convertToString = (data, valueProperty) => {
      if (valueProperty) {
        if (Array.isArray(data)) {
          data.forEach((item) => item[valueProperty] = item[valueProperty].toString());
        }
        else {
          data[valueProperty] = data[valueProperty].toString();
        }
        return data;
      }

      if (this.isBooleanOrNumber(data)) {
        data = data.toString();
      }

      if (Array.isArray(data) && data.some(item => this.isBooleanOrNumber(item))) {
        data = data.map(item => {
          if (this.isBooleanOrNumber(item)) {
            item = item.toString();
          }
        });
      }

      return data;
    };

    value = convertToString(value);

    if (['values', 'custom'].includes(this.component.dataSrc)) {
      const {
        items,
        valueProperty,
      } = this.component.dataSrc === 'values'
          ? {
            items: convertToString(this.getNormalizedValues(), 'value'),
            valueProperty: 'value',
          }
          : {
            items: convertToString(this.getCustomItems(), this.valueProperty),
            valueProperty: this.valueProperty,
          };

      value = (this.component.multiple && Array.isArray(value))
        ? _.filter(items, (item) => value.includes(item.value))
        : valueProperty
          ? _.find(items, [valueProperty, value])
          : value;
    }

    if (_.isString(value)) {
      return value;
    }

    if (Array.isArray(value)) {
      const items = [];
      value.forEach(item => items.push(this.itemTemplate(item)));
      return items.length > 0 ? items.join('<br />') : '-';
    }

    return !_.isNil(value)
      ? this.itemTemplate(value)
      : '-';
  }

  detach() {
    super.detach();
    if (this.choices) {
      this.choices.destroy();
      this.choices = null;
    }
  }

  focus() {
    if (this.focusableElement) {
      super.focus.call(this);
      this.focusableElement.focus();
    }
  }

  setErrorClasses(elements, dirty, hasError) {
    super.setErrorClasses(elements, dirty, hasError);
    if (this.choices) {
      super.setErrorClasses([this.choices.containerInner.element], dirty, hasError);
    }
    else {
      super.setErrorClasses([this.refs.selectContainer], dirty, hasError);
    }
  }
}
