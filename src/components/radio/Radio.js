import _ from 'lodash';
import ListComponent from '../_classes/list/ListComponent';
import { Formio } from '../../Formio';
import { boolValue, componentValueTypes, getComponentSavedTypes } from '../../utils/utils';

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
      documentation: '/userguide/form-building/form-components#radio',
      schema: RadioComponent.schema()
    };
  }

  static get conditionOperatorsSettings() {
    return {
      ...super.conditionOperatorsSettings,
      valueComponent(classComp) {
        const isValuesSrc = !classComp.dataSrc || classComp.dataSrc === 'values';
        return isValuesSrc
          ? {
              type: 'select',
              dataSrc: 'custom',
              valueProperty: 'value',
              dataType: classComp.dataType || '',
              data: {
                custom: `values = ${classComp && classComp.values ? JSON.stringify(classComp.values) : []}`,
              }
            }
          : {
              ...classComp,
              type: 'select',
            }
      }
    };
  }

  static get serverConditionSettings() {
    return RadioComponent.conditionOperatorsSettings;
  }

  static savedValueTypes(schema) {
    const { boolean, string, number, object, array } = componentValueTypes;
    const { dataType } = schema;
    const types = getComponentSavedTypes(schema);

    if (types) {
      return types;
    }

    if (dataType === 'object') {
      return [object, array];
    }

    if (componentValueTypes[dataType]) {
      return [componentValueTypes[dataType]];
    }

    return [boolean, string, number, object, array];
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

  resetValue() {
    this.unset();
    this.setValue(this.emptyValue, {
      noUpdateEvent: true,
      noValidate: true,
      resetValue: true
    });
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

  get listData() {
    const listData = _.get(this.root, 'submission.metadata.listData', {});
    return _.get(listData, this.path);
  }

  get selectMetadata() {
    return super.selectData;
  }

  get selectData() {
    return this.selectMetadata || this.component.selectData;
  }

  init() {
    super.init();
    this.templateData = {};

    // Trigger an update.//
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
      this.itemsLoaded = new Promise((resolve) => {
        this.itemsLoadedResolve = resolve;
      });
      if (args.length) {
        updateArgs = args;
      }
      return triggerUpdate(...updateArgs);
    };
    this.itemsLoaded = new Promise((resolve) => {
      this.itemsLoadedResolve = resolve;
    });
    this.optionsLoaded = !this.component.dataSrc || this.component.dataSrc === 'values';
    this.loadedOptions = [];

    if (!this.visible) {
      this.itemsLoadedResolve();
    }

    // Get the template keys for this radio component.
    this.getTemplateKeys();
  }

  beforeSubmit() {
    return new Promise(res => {
      this.dataReady.then(() => res(true));
    });
  }

  mapThroughValues(values) {
    if (this.options.renderMode === 'html' && this.type === 'radio') {
      return values.map(x => ({ ...x, value: this.normalize(x.value) }))
    }
    return values
  }

  render() {
    if (!this.optionsLoaded) {
      return super.render(this.renderTemplate('loader'));
    }
    return super.render(this.renderTemplate('radio', {
      input: this.inputInfo,
      inline: this.component.inline,
      values: this.component.dataSrc === 'values' ? this.mapThroughValues(this.component.values) : this.loadedOptions,
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

        if (this.isSelectURL && _.isObject(this.loadedOptions[index].value)) {
          const optionValue = this.component.dataType === 'string' ? JSON.stringify(this.loadedOptions[index].value) : this.loadedOptions[index].value;
          input.checked = _.isEqual(optionValue, this.dataValue);
        }
        else {
          input.checked = (dataValue === input.value && (input.value || this.component.dataSrc !== 'url'));
        }
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
    // If the input type of the component is checkbox the value should be determined by the checkboxes checked property
    let value = this.component.inputType === 'checkbox' ? '' : this.dataValue;
    this.refs.input.forEach((input, index) => {
      if (input.checked) {
        value = (this.isSelectURL && _.isObject(this.loadedOptions[index].value)) ?
          this.loadedOptions[index].value :
          input.value;
      }
    });
    return value;
  }

  validateValueProperty() {
    if (this.component.dataSrc === 'values') {
      return true;
    }

    return !_.some(this.refs.wrapper, (wrapper, index) => this.refs.input[index].checked && this.loadedOptions[index].invalid);
  }

  validateValueAvailability(setting, value) {
    if (!boolValue(setting) || !value) {
      return true;
    }

    const values = this.component.dataSrc === 'values' ? this.component.values : this.loadedOptions;
    if (values) {
      return values.findIndex(({ value: optionValue }) => this.normalizeValue(optionValue) === value) !== -1;
    }

    return false;
  }

  getValueAsString(value, options = {}) {
    if (_.isObject(value)) {
      value = JSON.stringify(value);
    }
    else if (!_.isString(value)) {
      value = _.toString(value);
    }

    const shouldUseSelectData = (options.modalPreview || this.inDataTable)
      && this.component.dataSrc === 'url' && (this.loadedOptions.length || this.selectData);
    if (this.component.dataSrc !== 'values' && !shouldUseSelectData) {
      return value;
    }

    const values = shouldUseSelectData ? this.loadedOptions : this.component.values;
    const option = !values?.length && shouldUseSelectData ? {
      label: this.itemTemplate(this.selectData),
    } : _.find(values, (v) => v.value === value);

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

  get shouldLoad() {
    // do not load options if the value is empty in readOnly and we have options available in metadata
    if (this.options.readOnly && this.isEmpty() && this.listData) {
      return false;
    }

    return super.shouldLoad;
  }

  loadItems(url, search, headers, options, method, body) {
    if (this.optionsLoaded) {
      this.itemsLoadedResolve();
      return;
    }

    if (!this.shouldLoad && this.listData) {
      this.loadItemsFromMetadata();
      this.itemsLoadedResolve();
      this.optionsLoaded = true;
      return;
    }

    // Ensure we have a method and remove any body if method is get
    method = method || 'GET';
    if (method.toUpperCase() === 'GET') {
      body = null;
    }

    const limit = this.component.limit || 100;
    const skip = this.isScrollLoading ? this.selectOptions.length : 0;

    // Allow for url interpolation.
    url = this.sanitize(this.interpolate(url, {
      formioBase: Formio.getBaseUrl(),
      search,
      limit,
      skip,
      page: Math.abs(Math.floor(skip / limit))
    }), this.shouldSanitizeValue);

    // Set ignoreCache if it is
    options.ignoreCache = this.component.ignoreCache;
    // Make the request.
    options.header = headers;

    this.loading = true;
    Formio.makeRequest(this.options.formio, 'select', url, method, body, options)
    .then((response) => {
      this.loading = false;
      this.setItems(response);
    })
    .catch((err) => {
      this.handleLoadingError(err);
    })
    .finally(() => {
      this.optionsLoaded = true;
      this.redraw();
    });
  }

  loadItemsFromMetadata() {
    this.listData.forEach((item, i) => {
      this.loadedOptions[i] = {
        label: this.itemTemplate(item)
      };
      if (_.isEqual(item, this.selectData || _.pick(this.dataValue, _.keys(item)))) {
        this.loadedOptions[i].value = this.dataValue;
      }
    });
    this.optionsLoaded = true;
    this.redraw();
  }

  setItems(items) {
    const listData = [];
    items?.forEach((item, i) => {
      const valueAtProperty = _.get(item, this.component.valueProperty);
      this.loadedOptions[i] = {
        value: this.component.valueProperty ? valueAtProperty : item,
        label: this.component.valueProperty ? this.itemTemplate(item, valueAtProperty) : this.itemTemplate(item, item, i)
      };
      listData.push(this.templateData[this.component.valueProperty ? valueAtProperty : i]);

      const value = this.loadedOptions[i].value;
      if (!this.isRadio && (
        _.isObject(value) || _.isBoolean(value) || _.isUndefined(value)
      )) {
        this.loadedOptions[i].invalid = true;
      }
    });

    if (this.isSelectURL) {
      const submission = this.root.submission;
      if (!submission.metadata) {
        submission.metadata = {};
      }
      if (!submission.metadata.listData) {
        submission.metadata.listData = {};
      }
      _.set(submission.metadata.listData, this.path, listData);
    }

    this.itemsLoadedResolve();
  }

  setSelectedClasses() {
    if (this.refs.wrapper) {
      //add/remove selected option class
      const value = this.dataValue;
      this.refs.wrapper.forEach((wrapper, index) => {
        const input = this.refs.input[index];
        const checked  = (value === undefined || value === null) ? false : (input.type === 'checkbox') ? value[input.value] || input.checked : (input.value.toString() === value.toString());
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
   * Normalize values coming into updateValue. For example, depending on the configuration, string value `"true"` will be normalized to boolean `true`.
   * @param {*} value - The value to normalize
   * @returns {*} - Returns the normalized value
   */
  normalize(value) {
    const dataType = this.component.dataType || 'auto';
    if (value === this.emptyValue) {
      return value;
    }

    switch (dataType) {
      case 'auto':
        if (!isNaN(parseFloat(value)) && isFinite(value) && _.toString(value) === Number(value).toString()) {
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

      return value;
  }

  normalizeValue(value) {
    const valueNormalized = this.normalize(value)

    if (this.isSelectURL && this.templateData && this.templateData[valueNormalized]) {
      const submission = this.root.submission;
      if (!submission.metadata.selectData) {
        submission.metadata.selectData = {};
      }

      _.set(submission.metadata.selectData, this.path, this.templateData[valueNormalized]);
    }

    return super.normalizeValue(valueNormalized);
  }
}
