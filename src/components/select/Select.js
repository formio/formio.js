import { BaseComponent } from '../base/Base';
import Choices from 'choices.js';
import Formio from '../../formio';
import _each from 'lodash/each';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isArray from 'lodash/isArray';
export class SelectComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);

    // If they wish to refresh on a value, then add that here.
    if (this.component.refreshOn) {
      this.on('change', (event) => {
        if (this.component.refreshOn === 'data') {
          this.updateItems();
        }
        else if (event.changed.component.key === this.component.refreshOn) {
          this.updateItems();
        }
      });
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
      this.choices._addChoice(false, false, this.itemValue(item), this.itemTemplate(item));
    });

    // If a value is provided, then select it.
    if (this.value) {
      this.setValue(this.value, true);
    }
  }

  loadItems(url, input, headers, options) {
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
    if (this.component.searchField && input) {
      query[this.component.searchField] = input;
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
      .catch(() => console.warn('Unable to load resources for ' + this.component.key))
  }

  updateItems() {
    switch(this.component.dataSrc) {
      case 'values':
        this.component.valueProperty = 'value';
        this.setItems(this.component.data.values);
        break;
      case 'json':
        try {
          if (typeof this.component.data.json == 'string')
            this.setItems(JSON.parse(this.component.data.json));
          else
            this.setItems(this.component.data.json);
        }
        catch (err) {
          console.warn('Unable to parse JSON for ' + this.component.key);
        }
        break;
      case 'resource':
        try {
          this.loadItems(Formio.getAppUrl() + '/form/' + this.component.data.resource + '/submission');
        }
        catch (err) {
          console.warn('Unable to load resources for ' + this.component.key);
        }
        break;
      case 'url':
        this.loadItems(this.component.data.url, null, new Headers(), {
          noToken: true
        });
        break;
    }
  }

  addInput(input, container) {
    super.addInput(input, container, true);
    if (this.component.multiple) {
      input.setAttribute('multiple', true);
    }
    var self = this;
    this.choices = new Choices(input, {
      placeholder: !!this.component.placeholder,
      placeholderValue: this.component.placeholder,
      removeItemButton: true,
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices form-group formio-choices',
        containerInner: 'form-control'
      }
    });
    if (this.disabled) {
      this.choices.disable();
    }
    this.updateItems();
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
    return this.choices.getValue(true);
  }

  setValue(value, noUpdate, noValidate) {
    this.value = value;
    if (value && this.choices) {
      if (this.choices.store) {
        // Search for the choice.
        const choices = this.choices.store.getChoices();
        const foundChoice = choices.find((choice) => {
          return choice.value === value;
        });

        // If it is not found, then add it.
        if (!foundChoice) {
          this.choices._addChoice(false, false, value, value);
        }
      }

      // Now set the value.
      this.choices.setValueByChoice(_isArray(value) ? value : [value]);
    }
    if (!noUpdate) {
      this.updateValue(noValidate);
    }
  }

  destroy() {
    if (this.choices) {
      this.choices.destroy();
    }
  }
}
