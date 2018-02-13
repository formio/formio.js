import Choices from 'choices.js';
import _ from 'lodash';
import {BaseComponent} from '../base/Base';
import Formio from '../../formio';
import FormioUtils from '../../utils';

// Duck-punch the setValueByChoice to ensure we compare using _.isEqual.
Choices.prototype.setValueByChoice = function(value) {
  if (!this.isTextElement) {
    const choices = this.store.getChoices();
    // If only one value has been passed, convert to array
    const choiceValue = Array.isArray(value) ? value : [value];

    // Loop through each value and
    choiceValue.forEach((val) => {
      const foundChoice = choices.find((choice) => {
        // Check 'value' property exists and the choice isn't already selected
        return _.isEqual(choice.value, val);
      });

      if (foundChoice) {
        if (!foundChoice.selected) {
          this._addItem(
            foundChoice.value,
            foundChoice.label,
            foundChoice.id,
            foundChoice.groupId,
            foundChoice.customProperties,
            foundChoice.placeholder,
            foundChoice.keyCode
          );
        }
        else if (!this.config.silent) {
          console.warn('Attempting to select choice already selected');
        }
      }
      else if (!this.config.silent) {
        console.warn('Attempting to select choice that does not exist');
      }
    });
  }
  return this;
};

export class SelectComponent extends BaseComponent {
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
      refreshOn: '',
      filter: '',
      authenticate: false,
      template: '<span>{{ item.label }}</span>',
      selectFields: ''
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

    // See if this should use the template.
    this.useTemplate = (this.component.dataSrc !== 'values') && this.component.template;

    // If this component has been activated.
    this.activated = false;

    // If they wish to refresh on a value, then add that here.
    if (this.component.refreshOn) {
      this.on('change', (event) => {
        if (this.component.refreshOn === 'data') {
          this.refreshItems();
        }
        else if (event.changed && (event.changed.component.key === this.component.refreshOn)) {
          this.refreshItems();
        }
      });
    }
  }

  refreshItems() {
    this.triggerUpdate();
    if (this.component.clearOnRefresh) {
      this.setValue(null);
    }
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
    // Perform a fast interpretation if we should not use the template.
    if (data && !this.useTemplate) {
      let itemLabel = data.label || data;
      return (typeof itemLabel === 'string') ? this.t(itemLabel) : itemLabel;
    }
    if (typeof data === 'string') {
      return this.t(data);
    }
    const template = this.component.template ? this.interpolate(this.component.template, {item: data}) : data.label;
    const label = template.replace(/<\/?[^>]+(>|$)/g, '');
    return template.replace(label, this.t(label));
  }

  itemValue(data) {
    return (this.component.valueProperty && _.isObject(data)) ? _.get(data, this.component.valueProperty) : data;
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
    if (this.value === option.value) {
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
        const currentChoices = Array.isArray(this.value) ? this.value : [this.value];
        _.each(currentChoices, (choice) => {
          this.addCurrentChoices(choice, items);
        });
      }
      else if (!this.component.multiple) {
        this.addPlaceholder(this.selectInput);
      }
    }
  }

  setItems(items) {
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
      let newItems = this.component.onSetItems(this, items);
      if (newItems) {
        items = newItems;
      }
    }

    if (!this.choices && this.selectInput) {
      // Detach from DOM and clear input.
      this.selectContainer.removeChild(this.selectInput);
      this.selectInput.innerHTML = '';
    }

    this.selectOptions = [];

    // If they provided select values, then we need to get them instead.
    if (this.component.selectValues) {
      items = _.get(items, this.component.selectValues);
    }

    // Add the value options.
    this.addValueOptions(items);

    // Iterate through each of the items.
    _.each(items, (item) => {
      this.addOption(this.itemValue(item), this.itemTemplate(item));
    });

    if (this.choices) {
      this.choices.setChoices(this.selectOptions, 'value', 'label', true);
    }
    else {
      // Re-attach select input.
      this.selectContainer.appendChild(this.selectInput);
    }

    // We are no longer loading.
    this.loading = false;

    // If a value is provided, then select it.
    if (this.value) {
      this.setValue(this.value, true);
    }
    else {
      // If a default value is provided then select it.
      const defaultValue = this.defaultValue;
      if (defaultValue) {
        this.setValue(defaultValue);
      }
    }
  }

  loadItems(url, search, headers, options, method, body) {
    options = options || {};

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
      data: this.data,
      formioBase: Formio.getBaseUrl()
    });

    // Add search capability.
    if (this.component.searchField && search) {
      if (Array.isArray(search)) {
        query[`${this.component.searchField}__in`] = search.join(',');
      }
      else {
        query[this.component.searchField] = search;
      }
    }

    // Add filter capability
    if (this.component.filter) {
      const filter = this.interpolate(this.component.filter, {data: this.data});
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
      .then((response) => this.setItems(response))
      .catch((err) => {
        this.loading = false;
        this.emit('error', err);
        console.warn(`Unable to load resources for ${this.component.key}`);
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
            headers.set(header.key, this.interpolate(header.value, {
              data: this.data
            }));
          }
        });
      }
      catch (err) {
        console.warn(err.message);
      }
    }

    return headers;
  }

  updateCustomItems() {
    const utils = FormioUtils;
    const data = _.cloneDeep(this.root ? this.root.data : this.data);
    const row = _.cloneDeep(this.data);
    try {
      if (typeof this.component.data.custom === 'function') {
        this.setItems(this.component.data.custom(this, data, row, utils));
      }
      else {
        this.setItems((new Function(
          'data',
          'row',
          'utils',
          `var values = []; ${this.component.data.custom.toString()}; return values;`
        ))(data, row, utils));
      }
    }
    catch (error) {
      console.warn(error);
      this.setItems([]);
    }
  }

  updateItems(searchInput, forceUpdate) {
    if (!this.component.data) {
      console.warn(`Select component ${this.component.key} does not have data configuration.`);
      return;
    }

    // Only load the data if it is visible.
    if (!this.checkConditions()) {
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
        if (!forceUpdate && !this.active) {
          // If we are lazyLoading, wait until activated.
          return;
        }
        let resourceUrl = this.options.formio ? this.options.formio.formsUrl : `${Formio.getProjectUrl()}/form`;
        resourceUrl += (`/${this.component.data.resource}/submission`);

        try {
          this.loadItems(resourceUrl, searchInput, this.requestHeaders);
        }
        catch (err) {
          console.warn(`Unable to load resources for ${this.component.key}`);
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
          url = Formio.getBaseUrl() + this.component.data.url;
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
        this.loadItems(url, searchInput, this.requestHeaders, {noToken: true}, method, body);
        break;
      }
    }
  }

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
    this.refreshItems();
  }

  get active() {
    return !this.component.lazyLoad || this.activated;
  }

  addInput(input, container) {
    super.addInput(input, container);
    if (this.component.multiple) {
      input.setAttribute('multiple', true);
    }

    if (this.component.widget === 'html5') {
      this.triggerUpdate();
      this.addEventListener(input, 'focus', () => this.activate());
      return;
    }

    const placeholderValue = this.t(this.component.placeholder);
    const choicesOptions = {
      removeItemButton: this.component.removeItemButton || (this.component.multiple || false),
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices form-group formio-choices',
        containerInner: 'form-control'
      },
      placeholder: !!this.component.placeholder,
      placeholderValue: placeholderValue,
      searchPlaceholderValue: placeholderValue,
      shouldSort: false,
      position: (this.component.dropdown || 'auto'),
      searchEnabled: this.component.searchEnabled || false
    };

    const tabIndex = input.tabIndex;
    this.addPlaceholder(input);
    this.choices = new Choices(input, choicesOptions);
    this.choices.itemList.tabIndex = tabIndex;
    this.setInputStyles(this.choices.containerOuter);

    // If a search field is provided, then add an event listener to update items on search.
    if (this.component.searchField) {
      this.addEventListener(input, 'search', (event) => this.triggerUpdate(event.detail.value));
      this.addEventListener(input, 'stopSearch', () => this.triggerUpdate());
    }

    this.addEventListener(input, 'showDropdown', () => {
      if (this.component.dataSrc === 'custom') {
        this.updateCustomItems();
      }

      // Activate the control.
      this.activate();
    });

    // Force the disabled state with getters and setters.
    this.disabled = this.disabled;
    this.triggerUpdate();
  }

  set disabled(disabled) {
    super.disabled = disabled;
    if (!this.choices) {
      return;
    }
    if (disabled) {
      this.choices.disable();
    }
    else {
      this.choices.enable();
    }
  }

  show(show) {
    // If we go from hidden to visible, trigger a refresh.
    if (show && (this._visible !== show)) {
      this.triggerUpdate();
    }
    return super.show(show);
  }

  addCurrentChoices(value, items) {
    if (value) {
      let found = false;
      if (items && items.length) {
        _.each(items, (choice) => {
          if (choice._id && value._id && (choice._id === value._id)) {
            found = true;
            return false;
          }
          found |= _.isEqual(this.itemValue(choice), value);
          return found ? false : true;
        });
      }

      // Add the default option if no item is found.
      if (!found) {
        this.addOption(this.itemValue(value), this.itemTemplate(value));
      }
    }
  }

  getValue(flags) {
    flags = flags || {};
    if (!flags.changed && this.value) {
      return this.value;
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
        if (selectOption.element.selected) {
          values.push(selectOption.value);
        }
      });
      value = this.component.multiple ? values : values.shift();
    }
    return value;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    const hasPreviousValue = Array.isArray(this.value) ? this.value.length : this.value;
    const hasValue = Array.isArray(value) ? value.length : value;
    _.set(this.data, this.component.key, value);

    // Do not set the value if we are loading... that will happen after it is done.
    if (this.loading) {
      return;
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
      this.triggerUpdate(this.value, true);
      return;
    }

    // Add the value options.
    this.addValueOptions();

    if (this.choices) {
      // Now set the value.
      if (hasValue) {
        this.choices
          .removeActiveItems()
          .setChoices(this.selectOptions, 'value', 'label', true)
          .setValueByChoice(Array.isArray(value) ? value : [value]);
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
    this.updateValue(flags);
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

    if (this.component.dataSrc === 'values') {
      value = _.find(this.component.data.values, ['value', value]);
    }

    if (_.isString(value)) {
      return value;
    }

    return _.isObject(value)
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
}
