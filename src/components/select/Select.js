import { BaseComponent } from '../base/Base';
import Choices from 'choices.js';
import Formio from '../../formio';
import _each from 'lodash/each';
import _remove from 'lodash/remove';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash/isArray';
import _isEqual from 'lodash/isEqual';
import _cloneDeep from 'lodash/cloneDeep';

// Fix performance issues in Choices by adding a debounce around render method.
Choices.prototype._render = Choices.prototype.render;
Choices.prototype.render = function() {
  if (this.renderDebounce) {
    clearTimeout(this.renderDebounce);
  }

  this.renderDebounce = setTimeout(() => this._render(), 100);
};

export class SelectComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);

    // Trigger an update.
    this.triggerUpdate = _debounce(this.updateItems.bind(this), 100);

    // Keep track of the select options.
    this.selectOptions = [];

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
    let info = super.elementInfo();
    info.type = 'select';
    info.changeEvent = 'change';
    return info;
  }

  createWrapper() {
    return false;
  }

  itemTemplate(data) {
    let template = this.component.template ? this.interpolate(this.component.template, {item: data}) : data.label;
    var label = template.replace(/<\/?[^>]+(>|$)/g, "");
    return template.replace(label, this.t(label));
  }

  itemValue(data) {
    return this.component.valueProperty ? _get(data, this.component.valueProperty) : data;
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
    let option = {
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
      _each(attr, (value, key) => {
        option.element.setAttribute(key, value);
      });
    }
    this.selectInput.appendChild(option.element);
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

    if (!this.choices && this.selectInput) {
      // Detach from DOM and clear input.
      this.selectContainer.removeChild(this.selectInput);
      this.selectInput.innerHTML = '';
    }

    this.selectOptions = [];

    // If they provided select values, then we need to get them instead.
    if (this.component.selectValues) {
      items = _get(items, this.component.selectValues);
    }

    if (this.choices) {
      // Add the currently selected choices if they don't already exist.
      let currentChoices = _isArray(this.value) ? this.value : [this.value];
      _each(currentChoices, (choice) => {
        this.addCurrentChoices(choice, items);
      });
    }
    else if (!this.component.multiple) {
      this.addPlaceholder(this.selectInput);
    }

    // Iterate through each of the items.
    _each(items, (item, index) => {
      this.addOption(this.itemValue(item), this.itemTemplate(item));
    });

    if (this.choices) {
      this.choices.setChoices(this.selectOptions, 'value', 'label', true);
    }
    else {
      // Re-attach select input.
      this.selectContainer.appendChild(this.selectInput);
    }

    // If a value is provided, then select it.
    if (this.value) {
      this.setValue(this.value, true);
    }
    else {
      // If a default value is provided then select it.
      let defaultValue = this.defaultValue;
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

    let query = (this.component.dataSrc === 'url') ? {} : {
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
      query[this.component.searchField] = search;
    }

    // Add filter capability
    if (this.component.filter) {
      let filter = this.interpolate(this.component.filter, {data: this.data});
      url += (!url.includes('?') ? '?' : '&') + filter;
    }

    // If they wish to return only some fields.
    if (this.component.selectFields) {
      query.select = this.component.selectFields;
    }

    if (!_isEmpty(query)) {
      // Add the query string.
      url += '?' + Formio.serialize(query);
    }

    // Make the request.
    options.header = headers;
    Formio.makeRequest(this.options.formio, 'select', url, method, body, options)
      .then((response) => this.setItems(response))
      .catch((err) => {
        this.events.emit('formio.error', err);
        console.warn(`Unable to load resources for ${this.component.key}`);
      });
  }

  /**
   * Get the request headers for this select dropdown.
   */
  get requestHeaders() {
    // Create the headers object.
    let headers = new Headers();

    // Add custom headers to the url.
    if (this.component.data && this.component.data.headers) {
      try {
        _each(this.component.data.headers, (header) => {
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
    const data = _cloneDeep(this.data);
    const row = _cloneDeep(this.row);
    try {
      this.setItems(eval(`(function(data, row) { var values = [];${this.component.data.custom.toString()}; return values; })(data, row)`));
    }
    catch (error) {
      this.setItems([]);
    }
  }

  updateItems(searchInput) {
    if (!this.component.data) {
      console.warn(`Select component ${this.component.key} does not have data configuration.`);
      return;
    }

    switch(this.component.dataSrc) {
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
      case 'resource':
        let resourceUrl = this.options.formio ? this.options.formio.formsUrl : Formio.getProjectUrl() + '/form';
        resourceUrl += (`/${this.component.data.resource}/submission`);

        try {
          this.loadItems(resourceUrl, searchInput, this.requestHeaders);
        }
        catch (err) {
          console.warn(`Unable to load resources for ${this.component.key}`);
        }
        break;
      case 'url':
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
            body = null
          }
        }
        this.loadItems(url, searchInput, this.requestHeaders, {noToken: true}, method, body);
        break;
    }
  }

  addPlaceholder(input) {
    if (!this.component.placeholder) {
      return;
    }
    let placeholder = document.createElement('option');
    placeholder.setAttribute('placeholder', true);
    placeholder.appendChild(this.text(this.component.placeholder));
    input.appendChild(placeholder);
  }

  addInput(input, container) {
    super.addInput(input, container);
    if (this.component.multiple) {
      input.setAttribute('multiple', true);
    }

    if (this.component.widget === 'html5') {
      this.triggerUpdate();
      return;
    }

    let placeholderValue = this.t(this.component.placeholder);
    let choicesOptions = {
      removeItemButton: true,
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices form-group formio-choices',
        containerInner: 'form-control'
      },
      placeholder: !!this.component.placeholder,
      placeholderValue: placeholderValue,
      searchPlaceholderValue: placeholderValue,
      shouldSort: false,
      position: (this.component.dropdown || 'auto')
    };

    this.addPlaceholder(input);
    this.choices = new Choices(input, choicesOptions);
    this.choices.itemList.tabIndex = input.tabIndex;
    this.setInputStyles(this.choices.containerOuter);

    // If a search field is provided, then add an event listener to update items on search.
    if (this.component.searchField) {
      input.addEventListener('search', (event) => this.triggerUpdate(event.detail.value));
    }

    input.addEventListener('showDropdown', () => {
      if (this.component.dataSrc === 'custom') {
        this.updateCustomItems();
      }
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

  addCurrentChoices(value, items) {
    if (value && items.length) {
      let found = false;

      // Iterate through all elements and remove the ones that are found.
      _remove(items, (choice) => {
        // For resources we may have two different instances of the same resource
        // Unify them so we don't have two copies of the same thing in the dropdown
        // and so the correct resource gets selected in the first place
        if (choice._id && value._id && choice._id === value._id) {
          return true;
        }
        found = _isEqual(choice, value);
        return found;
      });

      // If it is not found, then add it.
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
    if (this.choices) {
      this.value = this.choices.getValue(true);
    }
    else {
      let values = [];
      _each(this.selectOptions, (selectOption) => {
        if (selectOption.element.selected) {
          values.push(selectOption.value);
        }
      });
      this.value = this.component.multiple ? values : values.shift();
    }
    return this.value;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    let hasPreviousValue = _isArray(this.value) ? this.value.length : this.value;
    let hasValue = _isArray(value) ? value.length : value;
    this.value = value;
    if (this.choices) {
      // Now set the value.
      if (hasValue) {
        this.choices.setValueByChoice(_isArray(value) ? value : [value])
      }
      else if (hasPreviousValue) {
        this.choices.removeActiveItems();
      }
    }
    else {
      if (hasValue) {
        let values = _isArray(value) ? value : [value];
        _each(this.selectOptions, (selectOption) => {
          if (values.indexOf(selectOption.value) !== -1) {
            selectOption.element.selected = true;
            selectOption.element.setAttribute('selected', 'selected');
          }
        });
      }
      else {
        _each(this.selectOptions, (selectOption) => {
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
  validateMultiple(value) {
    // Select component will contain one input when flagged as multiple.
    return false;
  }

  /**
   * Ouput this select dropdown as a string value.
   * @return {*}
   */
  asString(value) {
    value = value || this.getValue();
    value = (typeof value !== 'object') ? {label: value} : value;
    return this.itemTemplate(value);
  }

  destroy() {
    if (this.choices) {
      this.choices.destroy();
    }
  }
}
