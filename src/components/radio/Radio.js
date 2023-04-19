import _ from 'lodash';
import ListComponent from '../_classes/list/ListComponent';
import NativePromise from 'native-promise-only';
import { Formio } from '../../Formio';
import { boolValue } from '../../utils/utils';

export default class RadioComponent extends ListComponent {
  static schema(...extend) {
    return ListComponent.schema({
      type: 'radio',
      inputType: 'radio',
      label: 'Radio',
      key: 'radio',
      values: [{ label: '', value: '' }],
      data: {
        url: '',
      },
      fieldSet: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Radio',
      group: 'basic',
      icon: 'dot-circle-o',
      weight: 80,
      documentation: '/userguide/forms/form-components#radio',
      schema: RadioComponent.schema()
    };
  }

  static get conditionOperatorsSettings() {
    return {
      ...super.conditionOperatorsSettings,
      valueComponent(classComp) {
        return {
          type: 'select',
          dataSrc: 'custom',
          valueProperty: 'value',
          dataType: classComp.dataType || '',
          data: {
            custom() {
              return classComp.values;
            }
          },
        };
      }
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.previousValue = this.dataValue || null;
  }

  get defaultSchema() {
    return RadioComponent.schema();
  }

  get defaultValue() {
    let defaultValue = super.defaultValue;
    if (!defaultValue && this.component.defaultValue === false) {
      defaultValue = this.component.defaultValue;
    }
    return defaultValue;
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.class = 'form-check-input';
    info.attr.name = info.attr.name += `[${this.root?.id}-${this.id}]`;
    return info;
  }

  get emptyValue() {
    return '';
  }

  get isRadio() {
    return this.component.inputType === 'radio';
  }

  get optionSelectedClass() {
    return 'radio-selected';
  }

  init() {
    super.init();
    this.templateData = {};
    this.validators = this.validators.concat(['select', 'onlyAvailableItems']);

    // Trigger an update.
    let updateArgs = [];
    const triggerUpdate = _.debounce((...args) => {
      updateArgs = [];
      return this.updateItems.apply(this, args);
    }, 100);
    this.triggerUpdate = (...args) => {
      // Make sure we always resolve the previous promise before reassign it
      if (typeof this.itemsLoadedResolve === 'function') {
        this.itemsLoadedResolve();
      }
      this.itemsLoaded = new NativePromise((resolve) => {
        this.itemsLoadedResolve = resolve;
      });
      if (args.length) {
        updateArgs = args;
      }
      return triggerUpdate(...updateArgs);
    };

    this.itemsLoaded = new NativePromise((resolve) => {
      this.itemsLoadedResolve = resolve;
    });
    this.shouldLoad = true;
    this.loadedOptions = [];
  }

  render() {
    return super.render(this.renderTemplate('radio', {
      input: this.inputInfo,
      inline: this.component.inline,
      values: this.component.dataSrc === 'values' ? this.component.values : this.loadedOptions,
      value: this.dataValue,
      row: this.row,
    }));
  }

  attach(element) {
    this.loadRefs(element, { input: 'multiple', wrapper: 'multiple' });
    this.refs.input.forEach((input, index) => {
      this.addEventListener(input, this.inputInfo.changeEvent, () => {
        this.updateValue(null, {
          modified: true,
        });
      });
      if (this.component.values[index]) {
        this.addShortcut(input, this.component.values[index].shortcut);
      }

      if (this.isRadio) {
        let dataValue = this.dataValue;

        if (!_.isString(this.dataValue)) {
          dataValue = _.toString(this.dataValue);
        }

        input.checked = (dataValue === input.value);
        this.addEventListener(input, 'keyup', (event) => {
          if (event.key === ' ' && dataValue === input.value) {
            event.preventDefault();

            this.updateValue(null, {
              modified: true,
            });
          }
        });
      }
    });
    this.triggerUpdate();
    this.setSelectedClasses();
    return super.attach(element);
  }

  detach(element) {
    if (element && this.refs.input) {
      this.refs.input.forEach((input, index) => {
        if (this.component.values[index]) {
          this.removeShortcut(input, this.component.values[index].shortcut);
        }
      });
    }
    super.detach();
  }

  getValue() {
    if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
      return this.dataValue;
    }
    let value = this.dataValue;
    this.refs.input.forEach((input) => {
      if (input.checked) {
        value = input.value;
      }
    });
    return value;
  }

  validateValueAvailability(setting, value) {
    if (!boolValue(setting) || !value) {
      return true;
    }

    const values = this.component.values;
    if (values) {
      return values.findIndex(({ value: optionValue }) => this.normalizeValue(optionValue) === value) !== -1;
    }

    return false;
  }

  getValueAsString(value) {
    if (!_.isString(value)) {
      value = _.toString(value);
    }
    if (this.component.dataSrc !== 'values') {
      return value;
    }

    const option = _.find(this.component.values, (v) => v.value === value);

    if (!value) {
      return _.get(option, 'label', '');
    }

    return _.get(option, 'label', '');
  }

  setValueAt(index, value) {
    if (this.refs.input && this.refs.input[index] && value !== null && value !== undefined) {
      const inputValue = this.refs.input[index].value;
      this.refs.input[index].checked = (inputValue === value.toString());
    }
  }

  loadItems(url, search, headers, options, method, body) {
    // Ensure we have a method and remove any body if method is get
    method = method || 'GET';
    if (method.toUpperCase() === 'GET') {
      body = null;
    }

    // Set ignoreCache if it is
    options.ignoreCache = this.component.ignoreCache;
    // Make the request.
    options.header = headers;
    if (this.shouldLoad) {
      this.loading = true;
      Formio.makeRequest(this.options.formio, 'select', url, method, body, options)
      .then((response) => {
        this.loading = false;
        this.error = null;
        this.setItems(response);
        this.shouldLoad = false;
        this.redraw();
      })
      .catch((err) => {
        this.handleLoadingError(err);
      });
    }
  }

  setItems(items) {
    items?.forEach((item, i) => {
      this.loadedOptions[i] = { value: item[this.component.valueProperty], label: this.itemTemplate(item, item[this.component.valueProperty]) };
    });
  }

  setSelectedClasses() {
    if (this.refs.wrapper) {
      //add/remove selected option class
      const value = this.dataValue;
      this.refs.wrapper.forEach((wrapper, index) => {
        const input = this.refs.input[index];
        const checked  = (input.type === 'checkbox') ? value[input.value] : (input.value.toString() === value.toString());
        if (checked) {
          //add class to container when selected
          this.addClass(wrapper, this.optionSelectedClass);
          //change "checked" attribute
          input.setAttribute('checked', 'true');
        }
        else {
          this.removeClass(wrapper, this.optionSelectedClass);
          input.removeAttribute('checked');
        }
      });
    }
  }

  updateValue(value, flags) {
    const changed = super.updateValue(value, flags);
    if (changed) {
      this.setSelectedClasses();
    }

    if (!flags || !flags.modified || !this.isRadio) {
      if (changed) {
        this.previousValue = this.dataValue;
      }

      return changed;
    }

    // If they clicked on the radio that is currently selected, it needs to reset the value.
    this.currentValue = this.dataValue;
    const shouldResetValue = flags && flags.modified && !flags.noUpdateEvent && this.previousValue === this.currentValue;
    if (shouldResetValue) {
      this.resetValue();
      this.triggerChange(flags);
      this.setSelectedClasses();
    }
    this.previousValue = this.dataValue;
    return changed;
  }

  /**
   * Normalize values coming into updateValue.
   *
   * @param value
   * @return {*}
   */
  normalizeValue(value) {
    const dataType = this.component.dataType || 'auto';

    if (value === this.emptyValue) {
      return value;
    }

    switch (dataType) {
      case 'auto':
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
          value = +value;
        }
        if (value === 'true') {
          value = true;
        }
        if (value === 'false') {
          value = false;
        }
        break;
      case 'number':
        value = +value;
        break;
      case 'string':
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        else {
          value = String(value);
        }
        break;
      case 'boolean':
        value = !(!value || value.toString() === 'false');
        break;
    }
    return super.normalizeValue(value);
  }
}
