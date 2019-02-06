import Choices from 'choices.js/assets/scripts/dist/choices.js';
import _ from 'lodash';
import BaseComponent from '../base/Base';
import Formio from '../../Formio';

export default class SelectComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'select',
      label: 'Select',
      key: 'select',
      data: {
        values: [],
        json: '',
        url: '',
        resource: '',
        custom: ''
      },
      dataSrc: 'values',
      valueProperty: '',
      filter: '',
      searchEnabled: true,
      searchField: '',
      minSearch: 0,
      readOnlyValue: false,
      authenticate: false,
      template: '<span>{{ item.label }}</span>',
      selectFields: '',
      searchThreshold: 0.3,
      customOptions: {}
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Select',
      group: 'basic',
      icon: 'fa fa-th-list',
      weight: 70,
      documentation: 'http://help.form.io/userguide/#select',
      schema: SelectComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);

    // Trigger an update.
    this.triggerUpdate = _.debounce(this.updateItems.bind(this), 100);

    // Keep track of the select options.
    this.selectOptions = [];

    // If this component has been activated.
    this.activated = false;

    // Determine when the items have been loaded.
    this.itemsLoaded = new Promise((resolve) => {
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
    return '';
  }

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'select';
    info.changeEvent = 'change';
    return info;
  }

  createWrapper() {
    return false;
  }

  itemTemplate(data) {
    if (!data) {
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

    const template = this.component.template ? this.interpolate(this.component.template, { item: data }) : data.label;
    if (template) {
      const label = template.replace(/<\/?[^>]+(>|$)/g, '');
      return template.replace(label, this.t(label));
    }
    else {
      return JSON.stringify(data);
    }
  }

  /**
   * @param {*} data
   * @param {boolean} [forceUseValue=false] - if true, return 'value' property of the data
   * @return {*}
   */
  itemValue(data, forceUseValue = false) {
    if (_.isObject(data)) {
      if (this.component.valueProperty) {
        return _.get(data, this.component.valueProperty);
      }

      if (forceUseValue) {
        return data.value;
      }
    }

    return data;
  }

  createInput(container) {
    this.selectContainer = container;
    this.selectInput = super.createInput(container);
  }

  /**
   * Adds an option to the select dropdown.
   *
   * @param value
   * @param label
   */
  addOption(value, label, attr) {
    const option = {
      value: value,
      label: label
    };

    this.selectOptions.push(option);
    if (this.choices) {
      return;
    }

    option.element = document.createElement('option');
    if (this.dataValue === option.value) {
      option.element.setAttribute('selected', 'selected');
      option.element.selected = 'selected';
    }
    option.element.innerHTML = label;
    if (attr) {
      _.each(attr, (value, key) => {
        option.element.setAttribute(key, value);
      });
    }
    this.selectInput.appendChild(option.element);
  }

  addValueOptions(items) {
    items = items || [];
    if (!this.selectOptions.length) {
      if (this.choices) {
        // Add the currently selected choices if they don't already exist.
        const currentChoices = Array.isArray(this.dataValue) ? this.dataValue : [this.dataValue];
        _.each(currentChoices, (choice) => {
          this.addCurrentChoices(choice, items);
        });
      }
      else if (!this.component.multiple) {
        this.addPlaceholder(this.selectInput);
      }
    }
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

    if (!this.choices && this.selectInput) {
      if (this.loading) {
        this.removeChildFrom(this.selectInput, this.selectContainer);
      }

      this.selectInput.innerHTML = '';
    }

    this.selectOptions = [];

    // If they provided select values, then we need to get them instead.
    if (this.component.selectValues) {
      items = _.get(items, this.component.selectValues);
    }

    // Add the value options.
    if (!fromSearch) {
      this.addValueOptions(items);
    }

    if (this.component.widget === 'html5' && !this.component.placeholder) {
      this.addOption(null, '');
    }

    // Iterate through each of the items.
    _.each(items, (item) => {
      this.addOption(this.itemValue(item), this.itemTemplate(item));
    });

    if (this.choices) {
      this.choices.setChoices(this.selectOptions, 'value', 'label', true);
    }
    else if (this.loading) {
      // Re-attach select input.
      this.appendTo(this.selectInput, this.selectContainer);
    }

    // We are no longer loading.
    this.loading = false;

    // If a value is provided, then select it.
    if (this.dataValue) {
      this.setValue(this.dataValue, true);
    }
    else {
      // If a default value is provided then select it.
      const defaultValue = this.defaultValue;
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

    const query = (this.component.dataSrc === 'url') ? {} : {
      limit: 100,
      skip: 0
    };

    // Allow for url interpolation.
    url = this.interpolate(url, {
      formioBase: Formio.getBaseUrl()
    });

    // Add search capability.
    if (this.component.searchField && search) {
      if (Array.isArray(search)) {
        query[`${this.component.searchField}__in`] = search.join(',');
      }
      else {
        query[`${this.component.searchField}__regex`] = search;
      }
    }

    // Add filter capability
    if (this.component.filter) {
      const filter = this.interpolate(this.component.filter);
      url += (!url.includes('?') ? '?' : '&') + filter;
    }

    // If they wish to return only some fields.
    if (this.component.selectFields) {
      query.select = this.component.selectFields;
    }

    if (!_.isEmpty(query)) {
      // Add the query string.
      url += (!(url.indexOf('?') !== -1) ? '?' : '&') + Formio.serialize(query);
    }

    // Make the request.
    options.header = headers;
    this.loading = true;
    Formio.makeRequest(this.options.formio, 'select', url, method, body, options)
      .then((response) => this.setItems(response, !!search))
      .catch((err) => {
        this.loading = false;
        this.itemsLoadedResolve();
        this.emit('componentError', {
          component: this.component,
          message: err.toString()
        });
        console.warn(`Unable to load resources for ${this.key}`);
      });
  }

  /**
   * Get the request headers for this select dropdown.
   */
  get requestHeaders() {
    // Create the headers object.
    const headers = new Headers();

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

  /* eslint-disable max-statements */
  updateItems(searchInput, forceUpdate) {
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
        this.component.valueProperty = 'value';
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

        try {
          this.loadItems(resourceUrl, searchInput, this.requestHeaders);
        }
        catch (err) {
          console.warn(`Unable to load resources for ${this.key}`);
        }
        break;
      }
      case 'url': {
        if (!forceUpdate && !this.active) {
          // If we are lazyLoading, wait until activated.
          return;
        }
        let url = this.component.data.url;
        let method;
        let body;

        if (url.substr(0, 1) === '/') {
          let baseUrl = Formio.getProjectUrl();
          if (!baseUrl) {
            baseUrl = Formio.getBaseUrl();
          }
          url = baseUrl + this.component.data.url;
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
        const query = this.component.authenticate ? {} : { noToken: true };
        this.loadItems(url, searchInput, this.requestHeaders, query, method, body);
        break;
      }
    }
  }
  /* eslint-enable max-statements */

  addPlaceholder(input) {
    if (!this.component.placeholder || !input) {
      return;
    }
    const placeholder = document.createElement('option');
    placeholder.setAttribute('placeholder', true);
    placeholder.appendChild(this.text(this.component.placeholder));
    input.appendChild(placeholder);
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
        label: `<i class="${this.iconClass('refresh')}" style="font-size:1.3em;"></i>`
      }], 'value', 'label', true);
    }
    else {
      this.addOption('', this.t('loading...'));
    }
    this.triggerUpdate();
  }

  get active() {
    return !this.component.lazyLoad || this.activated;
  }

  /* eslint-disable max-statements */
  addInput(input, container) {
    super.addInput(input, container);
    if (this.component.multiple) {
      input.setAttribute('multiple', true);
    }

    if (this.component.widget === 'html5') {
      this.triggerUpdate();
      this.focusableElement = input;
      this.addEventListener(input, 'focus', () => this.update());
      this.addEventListener(input, 'keydown', (event) => {
        const { keyCode } = event;

        if ([8, 46].includes(keyCode)) {
          this.setValue(null);
        }
      });
      return;
    }

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

    const choicesOptions = {
      ...customOptions,
      removeItemButton: this.component.disabled ? false : _.get(this.component, 'removeItemButton', true),
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices form-group formio-choices',
        containerInner: 'form-control'
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
      searchFields: ['label'],
      fuseOptions: {
        include: 'score',
        threshold: _.get(this, 'component.searchThreshold', 0.3),
      },
      itemComparer: _.isEqual
    };

    const tabIndex = input.tabIndex;
    this.addPlaceholder(input);
    input.setAttribute('dir', this.i18next.dir());
    this.choices = new Choices(input, choicesOptions);

    if (this.component.multiple) {
      this.focusableElement = this.choices.input;
    }
    else {
      this.focusableElement = this.choices.containerInner;
      this.choices.containerOuter.setAttribute('tabIndex', '-1');
      if (useSearch) {
        this.addEventListener(this.choices.containerOuter, 'focus', () => this.focusableElement.focus());
      }
    }
    this.addFocusBlurEvents(this.focusableElement);
    this.focusableElement.setAttribute('tabIndex', tabIndex);

    this.setInputStyles(this.choices.containerOuter);

    // If a search field is provided, then add an event listener to update items on search.
    if (this.component.searchField) {
      // Make sure to clear the search when no value is provided.
      if (this.choices && this.choices.input) {
        this.addEventListener(this.choices.input, 'input', (event) => {
          if (!event.target.value) {
            this.triggerUpdate();
          }
        });
      }
      this.addEventListener(input, 'search', (event) => this.triggerUpdate(event.detail.value));
      this.addEventListener(input, 'stopSearch', () => this.triggerUpdate());
    }

    this.addEventListener(input, 'showDropdown', () => this.update());
    if (placeholderValue && this.choices.isSelectOneElement) {
      this.addEventListener(input, 'removeItem', () => {
        const items = this.choices.store.getItemsFilteredByActive();
        if (!items.length) {
          this.choices._addItem(placeholderValue, placeholderValue, 0, -1, null, true, null);
        }
      });
    }

    // Force the disabled state with getters and setters.
    this.disabled = this.disabled;
    this.triggerUpdate();
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
      this.setDisabled(this.choices.containerInner, true);
      this.focusableElement.removeAttribute('tabIndex');
      this.choices.disable();
    }
    else {
      this.setDisabled(this.choices.containerInner, false);
      this.focusableElement.setAttribute('tabIndex', this.component.tabindex || 0);
      this.choices.enable();
    }
  }

  show(show) {
    // If we go from hidden to visible, trigger a refresh.
    const triggerUpdate = show && (this._visible !== show);
    show = super.show(show);
    if (triggerUpdate) {
      this.triggerUpdate();
    }
    return show;
  }

  /**
   * @param {*} value
   * @param {Array} items
   */
  addCurrentChoices(value, items) {
    if (value) {
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
          found |= _.isEqual(this.itemValue(choice, isSelectOptions), value);
          return found ? false : true;
        });
      }

      // Add the default option if no item is found.
      if (!found) {
        this.addOption(this.itemValue(value), this.itemTemplate(value));
      }
    }
  }

  getView(data) {
    return (this.component.multiple && Array.isArray(data))
      ? data.map(this.asString.bind(this)).join(', ')
      : this.asString(data);
  }

  getValue() {
    if (this.viewOnly || this.loading || !this.selectOptions.length) {
      return this.dataValue;
    }
    let value = '';
    if (this.choices) {
      value = this.choices.getValue(true);

      // Make sure we don't get the placeholder
      if (
        !this.component.multiple &&
        this.component.placeholder &&
        (value === this.t(this.component.placeholder))
      ) {
        value = '';
      }
    }
    else {
      const values = [];
      _.each(this.selectOptions, (selectOption) => {
        if (selectOption.element && selectOption.element.selected) {
          values.push(selectOption.value);
        }
      });
      value = this.component.multiple ? values : values.shift();
    }
    // Choices will return undefined if nothing is selected. We really want '' to be empty.
    if (value === undefined || value === null) {
      value = '';
    }
    return value;
  }

  redraw() {
    super.redraw();
    this.triggerUpdate();
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    const previousValue = this.dataValue;
    if (this.component.multiple && !Array.isArray(value)) {
      value = value ? [value] : [];
    }
    const hasPreviousValue = Array.isArray(previousValue) ? previousValue.length : previousValue;
    const hasValue = Array.isArray(value) ? value.length : value;
    const changed = this.hasChanged(value, previousValue);
    this.dataValue = value;

    // Do not set the value if we are loading... that will happen after it is done.
    if (this.loading) {
      return changed;
    }

    // Determine if we need to perform an initial lazyLoad api call if searchField is provided.
    if (
      this.component.searchField &&
      this.component.lazyLoad &&
      !this.lazyLoadInit &&
      !this.active &&
      !this.selectOptions.length &&
      hasValue
    ) {
      this.loading = true;
      this.lazyLoadInit = true;
      this.triggerUpdate(this.dataValue, true);
      return changed;
    }

    // Add the value options.
    this.addValueOptions();

    if (this.choices) {
      // Now set the value.
      if (hasValue) {
        this.choices.removeActiveItems();
        // Add the currently selected choices if they don't already exist.
        const currentChoices = Array.isArray(this.dataValue) ? this.dataValue : [this.dataValue];
        _.each(currentChoices, (choice) => {
          this.addCurrentChoices(choice, this.selectOptions);
        });
        this.choices.setChoices(this.selectOptions, 'value', 'label', true)
          .setValueByChoice(value);
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
            if (_.isEqual(val, selectOption.value)) {
              selectOption.element.selected = true;
              selectOption.element.setAttribute('selected', 'selected');
              return false;
            }
          });
        });
      }
      else {
        _.each(this.selectOptions, (selectOption) => {
          selectOption.element.selected = false;
          selectOption.element.removeAttribute('selected');
        });
      }
    }

    this.updateOnChange(flags, changed);
    return changed;
  }

  /**
   * Deletes the value of the component.
   */
  deleteValue() {
    this.setValue('', {
      noUpdateEvent: true
    });
    _.unset(this.data, this.key);
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
   * Ouput this select dropdown as a string value.
   * @return {*}
   */
  asString(value) {
    value = value || this.getValue();

    if (['values', 'custom'].includes(this.component.dataSrc)) {
      const {
        items,
        valueProperty,
      } = this.component.dataSrc === 'values'
        ? {
          items: this.component.data.values,
          valueProperty: 'value',
        }
        : {
          items: this.getCustomItems(),
          valueProperty: this.component.valueProperty,
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

  setupValueElement(element) {
    element.innerHTML = this.asString();
  }

  destroy() {
    super.destroy();
    if (this.choices) {
      this.choices.destroyed = true;
      this.choices.destroy();
      this.choices = null;
    }
  }

  focus() {
    this.focusableElement.focus();
  }
}
