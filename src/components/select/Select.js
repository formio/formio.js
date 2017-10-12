import { BaseComponent } from '../base/Base';
import Choices from 'choices.js';
import Formio from '../../formio';
import _each from 'lodash/each';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash/isArray';
export class SelectComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);

    // Trigger an update.
    this.triggerUpdate = _debounce(this.updateItems.bind(this), 100);

    // If they wish to refresh on a value, then add that here.
    if (this.component.refreshOn) {
      this.on('change', (event) => {
        if (this.component.refreshOn === 'data') {
          this.refreshItems();
        }
        else if (event.changed.component.key === this.component.refreshOn) {
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
    if (info.attr.placeholder) {
      delete info.attr.placeholder;
    }
    return info;
  }

  createWrapper() {
    return false;
  }

  itemTemplate(data) {
    return this.component.template ? this.interpolate(this.component.template, {item: data}) : data.label;
  }

  itemValue(data) {
    return this.component.valueProperty ? _get(data, this.component.valueProperty) : data;
  }

  setItems(items) {
    if (!this.choices) {
      return;
    }
    this.choices._clearChoices();

    // If they provided select values, then we need to get them instead.
    if (this.component.selectValues) {
      items = _get(items, this.component.selectValues);
    }

    // Iterate through each of the items.
    _each(items, (item) => {

      // Add the choice to the select list.
      this.choices._addChoice(this.itemValue(item), this.itemTemplate(item));
    });

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

  loadItems(url, search, headers, options) {
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
      url += ((url.indexOf('?') === -1) ? '?' : '&') + filter;
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
    Formio.request(url, null, null, headers, options)
      .then((response) => this.setItems(response))
      .catch((err) => {
        this.events.emit('formio.error', err);
        console.warn('Unable to load resources for ' + this.component.key);
      })
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
            headers.set(header.key, header.value);
          }
        });
      }
      catch (err) {
        console.warn(err.message);
      }
    }

    return headers;
  }

  updateItems(searchInput) {
    if (!this.component.data) {
      console.warn('Select component ' + this.component.key + ' does not have data configuration.');
      return;
    }

    switch(this.component.dataSrc) {
      case 'values':
        this.component.valueProperty = 'value';
        this.setItems(this.component.data.values);
        break;
      case 'json':
        try {
          if (typeof this.component.data.json == 'string') {
            this.setItems(JSON.parse(this.component.data.json));
          }
          else {
            this.setItems(this.component.data.json);
          }
        }
        catch (err) {
          console.warn('Unable to parse JSON for ' + this.component.key);
        }
        break;
      case 'resource':
        let resourceUrl = this.options.formio ? this.options.formio.formsUrl : Formio.getProjectUrl() + '/form';
        resourceUrl += ('/' + this.component.data.resource + '/submission');

        try {
          this.loadItems(resourceUrl, searchInput, this.requestHeaders);
        }
        catch (err) {
          console.warn('Unable to load resources for ' + this.component.key);
        }
        break;
      case 'url':
        let url = this.component.data.url;
        if (url.substr(0, 1) === '/') {
          url = Formio.getBaseUrl() + this.component.data.url;
        }

        this.loadItems(url, searchInput, this.requestHeaders, {
          noToken: true
        });
        break;
    }
  }

  addInput(input, container) {
    super.addInput(input, container);
    if (this.component.multiple) {
      input.setAttribute('multiple', true);
    }
    var tabIndex = input.tabIndex;
    this.choices = new Choices(input, {
      removeItemButton: true,
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices form-group formio-choices',
        containerInner: 'form-control'
      },
      shouldSort: false
    });
    this.choices.itemList.tabIndex = tabIndex;

    // If a search field is provided, then add an event listener to update items on search.
    if (this.component.searchField) {
      input.addEventListener('search', (event) => this.triggerUpdate(event.detail.value));
    }

    // Create a pseudo-placeholder.
    if (
      this.component.placeholder &&
      !this.choices.placeholderElement
    ) {
      this.placeholder = this.ce('span', {
        class: 'formio-placeholder'
      }, [
        this.text(this.component.placeholder)
      ]);

      // Prepend the placeholder.
      this.choices.containerInner.insertBefore(this.placeholder, this.choices.containerInner.firstChild);
      input.addEventListener('addItem', () => {
        this.placeholder.style.visibility = 'hidden';
      }, false);
      input.addEventListener('removeItem', () => {
        let value = this.getValue();
        if (!value || !value.length) {
          this.placeholder.style.visibility = 'visible';
        }
      }, false);
    }

    if (this.disabled) {
      this.choices.disable();
    }
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

  getValue() {
    if (this.value) {
      return this.value;
    }
    if (!this.choices) {
      return;
    }
    return this.choices.getValue(true);
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    this.value = value;
    if (this.choices) {
      if (value && this.choices.store) {
        // Search for the choice.
        const choices = this.choices.store.getChoices();
        const foundChoice = choices.find((choice) => {
          // For resources we may have two different instances of the same resource
          // Unify them so we don't have two copies of the same thing in the dropdown
          // and so the correct resource gets selected in the first place
          if (choice.value._id && value._id && choice.value._id === value._id) {
            value = choice.value;
          }
          return choice.value === value;
        });

        // If it is not found, then add it.
        if (!foundChoice) {
          this.choices._addChoice(this.itemValue(value), this.itemTemplate(value));
        }
      }

      // Now set the value.
      if (value) {
        this.choices.setValueByChoice(_isArray(value) ? value : [value])
      }
      else {
        this.choices.removeActiveItems();
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
