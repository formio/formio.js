import maskInput from 'text-mask-all/vanilla';
import Promise from "native-promise-only";
import _get from 'lodash/get';
import _each from 'lodash/each';
import _debounce from 'lodash/debounce';
import _isArray from 'lodash/isArray';
import _assign from 'lodash/assign';
import _clone from 'lodash/clone';
import i18next from 'i18next';
import jsonLogic from 'json-logic-js';
import FormioUtils from '../../utils';
import { Validator } from '../Validator';

i18next.initialized = false;

/**
 * This is the BaseComponent class which all elements within the FormioForm derive from.
 */
export class BaseComponent {
  /**
   * Initialize a new BaseComponent.
   *
   * @param {Object} component - The component JSON you wish to initialize.
   * @param {Object} options - The options for this component.
   * @param {Object} data - The global data submission object this component will belong.
   */
  constructor(component, options, data) {
    /**
     * The ID of this component. This value is auto-generated when the component is created, but
     * can also be provided from the component.id value passed into the constructor.
     * @type {string}
     */
    this.id = (component && component.id) ? component.id : Math.random().toString(36).substring(7);

    /**
     * The options for this component.
     * @type {{}}
     */
    this.options = _clone(options) || {};

    /**
     * The i18n configuration for this component.
     */
    this.options.i18n = this.options.i18n || require('../../locals/en');

    /**
     * The events that are triggered for the whole FormioForm object.
     */
    this.events = this.options.events;

    /**
     * The data object in which this component resides.
     * @type {*}
     */
    this.data = data || {};

    /**
     * The Form.io component JSON schema.
     * @type {*}
     */
    this.component = component || {};

    /**
     * The bounding HTML Element which this component is rendered.
     * @type {null}
     */
    this.element = null;

    /**
     * The HTML Element for the table body. This is relevant for the "multiple" flag on inputs.
     * @type {null}
     */
    this.tbody = null;

    /**
     * The HTMLElement that is assigned to the label of this component.
     * @type {null}
     */
    this.label = null;

    /**
     * The HTMLElement for which the errors are rendered for this component (usually underneath the component).
     * @type {null}
     */
    this.errorElement = null;

    /**
     * The existing error that this component has.
     * @type {string}
     */
    this.error = '';

    /**
     * An array of all of the input HTML Elements that have been added to this component.
     * @type {Array}
     */
    this.inputs = [];

    /**
     * The basic component information which tells the BaseComponent how to render the input element of the components that derive from this class.
     * @type {null}
     */
    this.info = null;

    /**
     * The value of this component
     * @type {*}
     */
    this.value = null;

    /**
     * Determines if this component is disabled, or not.
     *
     * @type {boolean}
     */
    this._disabled = false;

    /**
     * If this input has been input and provided value.
     *
     * @type {boolean}
     */
    this.pristine = true;

    /**
     * The Input mask instance for this component.
     * @type {InputMask}
     */
    this.inputMask = null;

    this.options.name = this.options.name || 'data';

    /**
     * The validators that are assigned to this component.
     * @type {[string]}
     */
    this.validators = ['required', 'minLength', 'maxLength', 'custom', 'pattern', 'json'];

    /**
     * Used to trigger a new change in this component.
     * @type {function} - Call to trigger a change in this component.
     */
    this.triggerChange = _debounce(this.onChange.bind(this), 200);

    /**
     * An array of event handlers so that the destry command can deregister them.
     * @type {Array}
     */
    this.eventHandlers = [];

    /**
     * An array of the event listeners so that the destroy command can deregister them.
     * @type {Array}
     */
    this.eventListeners = [];

    if (this.component) {
      this.type = this.component.type;
      if (this.component.input && this.component.key) {
        this.options.name += '[' + this.component.key + ']';
      }

      /**
       * The element information for creating the input element.
       * @type {*}
       */
      this.info = this.elementInfo();
    }
  }

  /**
   * Translate a text using the i18n system.
   *
   * @param {string} text - The i18n identifier.
   * @param {Object} params - The i18n parameters to use for translation.
   */
  t(text, params) {
    let message = i18next.t(text, params);
    return message;
  }

  /**
   * Register for a new event within this component.
   *
   * @example
   * let component = new BaseComponent({
   *   type: 'textfield',
   *   label: 'First Name',
   *   key: 'firstName'
   * });
   * component.on('componentChange', (changed) => {
   *   console.log('this element is changed.');
   * });
   *
   *
   * @param {string} event - The event you wish to register the handler for.
   * @param {function} cb - The callback handler to handle this event.
   * @param {boolean} internal - This is an internal event handler.
   */
  on(event, cb, internal) {
    if (!this.events) {
      return;
    }
    let type = 'formio.' + event;
    this.eventListeners.push({
      type: type,
      listener: cb,
      internal: internal
    });
    return this.events.on(type, cb);
  }

  /**
   * Emit a new event.
   *
   * @param {string} event - The event to emit.
   * @param {Object} data - The data to emit with the handler.
   */
  emit(event, data) {
    this.events.emit('formio.' + event, data);
  }

  /**
   * Returns an HTMLElement icon element.
   *
   * @param {string} name - The name of the icon to retrieve.
   * @returns {HTMLElement} - The icon element.
   */
  getIcon(name) {
    return this.ce(name + 'Icon', 'i', {
      class: 'glyphicon glyphicon-' + name
    });
  }

  /**
   * Perform the localization initialization.
   * @returns {*}
   */
  localize() {
    if (i18next.initialized) {
      return Promise.resolve(i18next);
    }
    i18next.initialized = true;
    return new Promise((resolve, reject) => {
      i18next.init(this.options.i18n, (err, t) => {
        if (err) {
          return reject(err);
        }
        resolve(i18next);
      });
    });
  }

  /**
   * Builds the component.
   */
  build() {
    this.createElement();
    this.createLabel(this.element);
    if (!this.createWrapper()) {
      this.createInput(this.element);
    }

    // Disable if needed.
    if (this.options.readOnly || this.component.disabled) {
      this.disable = true;
    }

    // Set default values.
    let defaultValue = this.defaultValue;
    if (defaultValue) {
      this.setValue(defaultValue);
    }
  }

  /**
   * Retrieves the CSS class name of this component.
   * @returns {string} - The class name of this component.
   */
  get className() {
    let className = this.component.input ? 'form-group has-feedback ' : '';
    className += 'formio-component formio-component-' + this.component.type + ' ';
    if (this.component.key) {
      className += 'formio-component-' + this.component.key + ' ';
    }
    if (this.component.customClass) {
      className += this.component.customClass;
    }
    if (this.component.input && this.component.validate && this.component.validate.required) {
      className += ' required';
    }
    return className;
  }

  /**
   * Returns the outside wrapping element of this component.
   * @returns {HTMLElement}
   */
  getElement() {
    return this.element;
  }

  /**
   * Create the outside wrapping element for this component.
   * @returns {HTMLElement}
   */
  createElement() {
    this.element = this.ce('element', 'div', {
      id: this.id,
      class: this.className
    });

    if (this.element) {
      // Ensure you can get the component info from the element.
      this.element.component = this.component;
    }

    return this.element;
  }

  /**
   * Create the input wrapping element. For multiple, this may be the table wrapper for the elements.
   * @returns {boolean}
   */
  createWrapper() {
    if (!this.component.multiple) {
      return false;
    }
    else {
      let table = this.ce('wrapper', 'table', {
        class: 'table table-bordered'
      });
      this.tbody = this.ce('wrapperBody', 'tbody');
      table.appendChild(this.tbody);

      // Add a default value.
      if (!this.data[this.component.key] || !this.data[this.component.key].length) {
        this.addNewValue();
      }

      // Build the rows.
      this.buildRows();

      // Add the table to the element.
      this.append(table);
      return true;
    }
  }

  get defaultValue() {
    let defaultValue = '';
    if (this.component.defaultValue) {
      defaultValue = this.component.defaultValue;
    }
    else if (this.component.customDefaultValue) {
      if (typeof this.component.customDefaultValue === 'string') {
        try {
          let row = this.data;
          defaultValue = eval('var value = 0;' + this.component.customDefaultValue.toString() + '; return value;');
        }
        catch (e) {
          defaultValue = null;
          /* eslint-disable no-console */
          console.warn('An error occurred getting default value for ' + this.component.key, e);
          /* eslint-enable no-console */
        }
      }
      else {
        try {
          defaultValue = jsonLogic.apply(this.component.customDefaultValue, {
            data: this.data
          });
        }
        catch (err) {
          defaultValue = null;
          /* eslint-disable no-console */
          console.warn('An error occurred calculating a value for ' + this.component.key, e);
          /* eslint-enable no-console */
        }
      }
    }
    return defaultValue;
  }

  /**
   * Adds a new empty value to the data array.
   */
  addNewValue() {
    if (!this.data[this.component.key]) {
      this.data[this.component.key] = [];
    }
    if (!_isArray(this.data[this.component.key])) {
      this.data[this.component.key] = [this.data[this.component.key]];
    }
    this.data[this.component.key].push(this.defaultValue);
  }

  /**
   * Adds a new empty value to the data array, and add a new row to contain it.
   */
  addValue() {
    this.addNewValue();
    this.buildRows();
  }

  /**
   * Removes a value out of the data array and rebuild the rows.
   * @param {number} index - The index of the data element to remove.
   */
  removeValue(index) {
    if (this.data.hasOwnProperty(this.component.key)) {
      this.data[this.component.key].splice(index, 1);
    }
    this.buildRows();
  }

  /**
   * Rebuild the rows to contain the values of this component.
   */
  buildRows() {
    if (!this.tbody) {
      return;
    }
    this.inputs = [];
    this.tbody.innerHTML = '';
    _each(this.data[this.component.key], (value, index) => {
      let tr = this.ce('row', 'tr');
      let td = this.ce('column', 'td');
      this.createInput(td);
      tr.appendChild(td);
      let tdAdd = this.ce('columnAdd', 'td');
      tdAdd.appendChild(this.removeButton(index));
      tr.appendChild(tdAdd);
      this.tbody.appendChild(tr);
    });

    let tr = this.ce('rowAdd', 'tr');
    let td = this.ce('addRowColumn', 'td', {
      colspan: '2'
    });
    td.appendChild(this.addButton());
    tr.appendChild(td);
    this.tbody.appendChild(tr);
    if (this.options.readOnly) {
      this.disable = true;
    }
  }

  /**
   * Adds a new button to add new rows to the multiple input elements.
   * @returns {HTMLElement} - The "Add New" button html element.
   */
  addButton() {
    let addButton = this.ce('addButton', 'a', {
      class: 'btn btn-primary'
    });
    this.addEventListener(addButton, 'click', (event) => {
      event.preventDefault();
      this.addValue();
    });

    let addIcon = this.ce('addIcon', 'span', {
      class: 'glyphicon glyphicon-plus'
    });
    addButton.appendChild(addIcon);
    addButton.appendChild(this.text(this.component.addAnother || ' Add Another'));
    return addButton;
  }

  /**
   * The readible name for this component.
   * @returns {string} - The name of the component.
   */
  get name() {
    return this.component.label || this.component.placeholder || this.component.key;
  }

  /**
   * Creates a new "remove" row button and returns the html element of that button.
   * @param {number} index - The index of the row that should be removed.
   * @returns {HTMLElement} - The html element of the remove button.
   */
  removeButton(index) {
    let removeButton = this.ce('removeButton', 'button', {
      type: 'button',
      class: 'btn btn-default',
      tabindex: '-1'
    });

    this.addEventListener(removeButton, 'click', (event) => {
      event.preventDefault();
      this.removeValue(index);
    });

    let removeIcon = this.ce('removeIcon', 'span', {
      class: 'glyphicon glyphicon-remove-circle'
    });
    removeButton.appendChild(removeIcon);
    return removeButton;
  }

  /**
   * Create the HTML element for the label of this comonent.
   * @param {HTMLElement} container - The containing element that will comtain this label.
   */
  createLabel(container) {
    if (!this.component.label || this.options.inputsOnly) {
      return;
    }
    this.label = this.ce('label', 'label', {
      class: 'control-label'
    });
    if (this.info.attr.id) {
      this.label.setAttribute('for', this.info.attr.id);
    }
    this.label.appendChild(this.text(this.component.label));
    container.appendChild(this.label);
  }

  /**
   * Creates a new error element to hold the errors of this element.
   */
  createErrorElement() {
    if (!this.errorContainer) {
      return;
    }
    this.errorElement = this.ce('errors', 'div', {
      class: 'formio-errors'
    });
    this.errorContainer.appendChild(this.errorElement);
  }

  /**
   * Adds a prefix html element.
   *
   * @param {HTMLElement} input - The input element.
   * @param {HTMLElement} inputGroup - The group that will hold this prefix.
   * @returns {HTMLElement} - The html element for this prefix.
   */
  addPrefix(input, inputGroup) {
    let prefix = null;
    if (this.component.prefix) {
      prefix = this.ce('prefix', 'div', {
        class: 'input-group-addon'
      });
      prefix.appendChild(this.text(this.component.prefix));
      inputGroup.appendChild(prefix);
    }
    return prefix;
  }

  /**
   * Adds a suffix html element.
   *
   * @param {HTMLElement} input - The input element.
   * @param {HTMLElement} inputGroup - The group that will hold this suffix.
   * @returns {HTMLElement} - The html element for this suffix.
   */
  addSuffix(input, inputGroup) {
    let suffix = null;
    if (this.component.suffix) {
      suffix = this.ce('suffix', 'div', {
        class: 'input-group-addon'
      });
      suffix.appendChild(this.text(this.component.suffix));
      inputGroup.appendChild(suffix);
    }
    return suffix;
  }

  /**
   * Adds a new input group to hold the input html elements.
   *
   * @param {HTMLElement} input - The input html element.
   * @param {HTMLElement} container - The containing html element for this group.
   * @returns {HTMLElement} - The input group element.
   */
  addInputGroup(input, container) {
    let inputGroup = null;
    if (this.component.prefix || this.component.suffix) {
      inputGroup = this.ce('inputGroup', 'div', {
        class: 'input-group'
      });
      container.appendChild(inputGroup);
    }
    return inputGroup;
  }

  /**
   * Returns an input mask that is compatible with the input mask library.
   * @param {string} mask - The Form.io input mask.
   * @returns {Array} - The input mask for the mask library.
   */
  getInputMask(mask) {
    if (mask instanceof Array) {
      return mask;
    }
    let maskArray = [];
    for (let i=0; i < mask.length; i++) {
      switch (mask[i]) {
        case '9':
          maskArray.push(/\d/);
          break;
        case 'A':
          maskArray.push(/[a-zA-Z]/);
          break;
        case '*':
          maskArray.push(/[a-zA-Z0-9]/);
          break;
        default:
          maskArray.push(mask[i]);
          break;
      }
    }
    return maskArray;
  }

  /**
   * Creates a new input mask placeholder.
   * @param {HTMLElement} mask - The input mask.
   * @returns {string} - The placeholder that will exist within the input as they type.
   */
  maskPlaceholder(mask) {
    return mask.map((char) => {
      return (char instanceof RegExp) ? '_' : char
    }).join('')
  }

  /**
   * Sets the input mask for an input.
   * @param {HTMLElement} input - The html input to apply the mask to.
   */
  setInputMask(input) {
    if (input && this.component.inputMask) {
      let mask = this.getInputMask(this.component.inputMask);
      this.inputMask = maskInput({
        inputElement: input,
        mask: mask
      });
      if (!this.component.placeholder) {
        input.setAttribute('placeholder', this.maskPlaceholder(mask));
      }
    }
  }

  /**
   * Creates a new input element.
   * @param {HTMLElement} container - The container which should hold this new input element.
   * @returns {HTMLElement} - Either the input or the group that contains the input.
   */
  createInput(container) {
    let input = this.ce('input', this.info.type, this.info.attr);
    this.setInputMask(input);
    let inputGroup = this.addInputGroup(input, container);
    this.addPrefix(input, inputGroup);
    this.addInput(input, inputGroup || container);
    this.addSuffix(input, inputGroup);
    this.errorContainer = container;
    return inputGroup || input;
  }

  /**
   * Wrapper method to add an event listener to an HTML element.
   *
   * @param obj
   *   The DOM element to add the event to.
   * @param evt
   *   The event name to add.
   * @param func
   *   The callback function to be executed when the listener is triggered.
   */
  addEventListener(obj, evt, func) {
    this.eventHandlers.push({type: evt, func: func});
    if ('addEventListener' in obj){
      obj.addEventListener(evt, func, false);
    } else if ('attachEvent' in obj) {
      obj.attachEvent('on'+evt, func);
    }
  }

  /**
   * Remove all event handlers.
   */
  destroy(all) {
    if (this.inputMask) {
      this.inputMask.destroy();
    }
    _each(this.eventListeners, (listener) => {
      if (all || listener.internal) {
        this.events.off(listener.type, listener.listener);
      }
    });
    _each(this.eventHandlers, (handler) => {
      window.removeEventListener(handler.event, handler.func);
    });
  }

  /**
   * Alias for document.createElement.
   *
   * @param {string} name - The name of the element to create, for templating purposes.
   * @param {string} type - The type of element to create
   * @param {Object} attr - The element attributes to add to the created element.
   *
   * @return {HTMLElement} - The created element.
   */
  ce(name, type, attr) {
    // Allow for template overrides.
    let element = document.createElement(type);
    let compType = this.component.type || this.type;
    if (
      this.options &&
      this.options.template &&
      (
        (this.options.template[compType] && this.options.template[compType][name]) ||
        (this.options.template.global && this.options.template.global[name])
      )
    ) {
      let template = _get(this.options, 'template.' + compType + '.' + name) || _get(this.options, 'template.global.' + name);
      if (typeof template === 'function') {
        let returnElement = template(this, type, attr, element);
        if (returnElement) {
          return returnElement;
        }
      }
      else {
        // Assign the attributes.
        _assign(attr, template);
      }
    }
    if (attr) {
      this.attr(element, attr);
    }
    return element;
  }

  /**
   * Alias to create a text node.
   * @param text
   * @returns {Text}
   */
  text(text) {
    return document.createTextNode(text);
  }

  /**
   * Adds an object of attributes onto an element.
   * @param {HtmlElement} element - The element to add the attributes to.
   * @param {Object} attr - The attributes to add to the input element.
   */
  attr(element, attr) {
    _each(attr, function (value, key) {
      if (typeof value !== 'undefined') {
        element.setAttribute(key, value);
      }
    });
  }

  /**
   * Adds a class to a DOM element.
   *
   * @param element
   *   The element to add a class to.
   * @param className
   *   The name of the class to add.
   */
  addClass(element, className) {
    var cls = element.getAttribute('class');
    cls += (' ' + className);
    element.setAttribute('class', cls);
  }

  /**
   * Remove a class from a DOM element.
   *
   * @param element
   *   The DOM element to remove the class from.
   * @param className
   *   The name of the class that is to be removed.
   */
  removeClass(element, className) {
    var cls = element.getAttribute('class');
    cls = cls.replace(className, '');
    element.setAttribute('class', cls);
  }

  /**
   * Check for conditionals and hide/show the element based on those conditions.
   */
  checkConditions(data) {
    this.show(FormioUtils.checkCondition(this.component, this.data, data));
  }

  /**
   * Add a new input error to this element.
   * @param message
   */
  addInputError(message) {
    if (this.errorElement) {
      let errorMessage = this.ce('errorMessage', 'p', {
        class: 'help-block'
      });
      errorMessage.appendChild(this.text(message));
      this.errorElement.appendChild(errorMessage);
      this.addClass(this.element, 'has-error');
    }
  }

  /**
   * Hide or Show an element.
   *
   * @param show
   */
  show(show) {
    if (this.element) {
      if (show) {
        this.element.removeAttribute('hidden');
        this.element.style.visibility = "visible";
      }
      else {
        this.element.setAttribute('hidden', true);
        this.element.style.visibility = "hidden";
      }
    }
  }

  onChange(noValidate) {
    if (!noValidate) {
      this.pristine = false;
    }
    if (this.events) {
      this.emit('componentChange', {
        component: this.component,
        value: this.value,
        validate: !noValidate
      });
    }
  }

  /**
   * Add new input element listeners.
   *
   * @param input
   */
  addInputEventListener(input) {
    this.addEventListener(input, this.info.changeEvent, () => this.updateValue());
  }

  /**
   * Add a new input to this comonent.
   *
   * @param input
   * @param container
   * @param name
   */
  addInput(input, container, noSet) {
    if (input && container) {
      this.inputs.push(input);
      input = container.appendChild(input);
    }
    this.addInputEventListener(input);

    // Reset the values of the inputs.
    if (!noSet && this.data && this.data.hasOwnProperty(this.component.key)) {
      this.setValue(this.data[this.component.key], true);
    }
  }

  /**
   * Get the value at a specific index.
   *
   * @param index
   * @returns {*}
   */
  getValueAt(index) {
    return this.inputs[index].value;
  }

  getValue() {
    if (!this.component.input) {
      return;
    }
    let values = [];
    for (let i in this.inputs) {
      if (!this.component.multiple) {
        this.value = this.getValueAt(i);
        return this.value;
      }
      values.push(this.getValueAt(i));
    }
    this.value = values;
    return values;
  }

  updateValue(noValidate) {
    let value = this.data[this.component.key];
    let falsey = !value && (value !== null) && (value !== undefined);
    this.data[this.component.key] = this.getValue();
    if (falsey) {
      if (!!this.data[this.component.key]) {
        this.triggerChange(noValidate);
      }
    }
    else {
      this.triggerChange(noValidate);
    }
  }

  /**
   * Perform a calculated value operation.
   *
   * @param data - The global data object.
   */
  calculateValue(data) {
    if (!this.component.calculateValue) {
      return;
    }

    // If this is a string, then use eval to evalulate it.
    if (typeof this.component.calculateValue === 'string') {
      try {
        let row = this.data;
        let val = eval('var value = [];' + this.component.calculateValue.toString() + '; return value;');
        this.setValue(val);
      }
      catch (e) {
        /* eslint-disable no-console */
        console.warn('An error occurred calculating a value for ' + this.component.key, e);
        /* eslint-enable no-console */
      }
    }
    else {
      try {
        let val = jsonLogic.apply(this.component.calculateValue, {
          data: data,
          row: this.data
        });
        this.setValue(val);
      }
      catch (err) {
        /* eslint-disable no-console */
        console.warn('An error occurred calculating a value for ' + this.component.key, e);
        /* eslint-enable no-console */
      }
    }
  }

  checkValidity(data, dirty) {
    // No need to check for errors if there is no input or if it is pristine.
    if (!this.component.input || (!dirty && this.pristine)) {
      return true;
    }

    let message = Validator.check(
      this.validators,
      this.component,
      this.getValidateValue(),
      data || this.data,
      this.data,
      this.t.bind(this)
    );
    this.setCustomValidity(message);

    // No message, returns true
    return message ? false : true;
  }

  getValidateValue() {
    return this.data[this.component.key];
  }

  get errors() {
    return this.error ? [this.error] : [];
  }

  interpolate(string, data) {
    return FormioUtils.interpolate(string, data);
  }

  setCustomValidity(message) {
    if (this.errorElement && this.errorContainer) {
      this.errorElement.innerHTML = '';
      try {
        this.errorContainer.removeChild(this.errorElement);
      }
      catch (err) {}
    }
    this.removeClass(this.element, 'has-error');
    if (message) {
      this.error = {
        component: this.component,
        message: message
      };
      this.emit('componentError', this.error);
      this.createErrorElement();
      this.addInputError(message);
    }
    else {
      this.error = null;
    }
    _each(this.inputs, (input) => {
      if (typeof input.setCustomValidity === 'function') {
        input.setCustomValidity(message);
      }
    });
  }

  /**
   * Set the value at a specific index.
   *
   * @param index
   * @param value
   */
  setValueAt(index, value) {
    if (value === null || value === undefined) {
      value = this.defaultValue;
    }
    this.inputs[index].value = value;
  }

  /**
   * Set the value of this component.
   * @param value
   */
  setValue(value, noUpdate, noValidate) {
    if (!this.component.input) {
      return;
    }
    this.value = value;
    let isArray = _isArray(value);
    for (let i in this.inputs) {
      this.setValueAt(i, isArray ? value[i] : value);
    }
    if (!noUpdate) {
      this.updateValue(noValidate);
    }
  }

  set visible(visible) {
    let element = this.getElement();
    if (element) {
      if (visible && this.styles) {
        element.style.visibility = this.styles.visibility;
        element.style.position = this.styles.position;
      }
      else if (!visible) {
        this.styles = {
          visibility: element.style.visibility,
          position: element.style.position
        };
        element.style.visibility = 'hidden';
        element.style.position = 'absolute';
      }
    }
  }

  /**
   * Return if the component is disabled.
   * @return {boolean|*}
   */
  get disabled() {
    return this._disabled;
  }

  /**
   * Disable this component.
   */
  set disable(disable) {
    this._disabled = disable;
    // Disable all input.
    _each(this.inputs, (input) => {
      input.disabled = disable;
      input.setAttribute('disabled', 'disabled');
    });
  }

  selectOptions(select, tag, options, defaultValue) {
    _each(options, (option) => {
      let attrs = {
        value: option.value
      };
      if (defaultValue !== undefined && (option.value === defaultValue)) {
        attrs.selected = 'selected';
      }
      let optionElement = this.ce(tag, 'option', attrs);
      optionElement.appendChild(this.text(option.label));
      select.appendChild(optionElement);
    });
  }

  setSelectValue(select, value) {
    let options = select.querySelectorAll('option');
    _each(options, (option) => {
      if (option.value === value) {
        option.setAttribute('selected', 'selected');
      }
      else {
        option.removeAttribute('selected');
      }
    });
    if (select.onchange) {
      select.onchange();
    }
    if (select.onselect) {
      select.onchange();
    }
  }

  clear() {
    this.destroy();
    let element = this.getElement();
    if (element) {
      element.innerHTML = '';
    }
  }

  append(element) {
    if (this.element) {
      this.element.appendChild(element);
    }
  }

  prepend(element) {
    if (this.element) {
      this.element.insertBefore(element, this.element.firstChild);
    }
  }

  before(element) {
    if (this.element) {
      this.element.parentNode.insertBefore(element, this.element);
    }
  }

  remove(element) {
    if (this.element) {
      this.element.parentNode.removeChild(element);
    }
  }

  removeChild(element) {
    if (this.element) {
      this.element.removeChild(element);
    }
  }

  /**
   * Get the element information.
   */
  elementInfo() {
    let attributes = {
      name: this.options.name,
      type: this.component.inputType || 'text',
      class: 'form-control'
    };
    _each({
      tabindex: 'tabindex',
      placeholder: 'placeholder'
    }, (path, prop) => {
      let attrValue = _get(this.component, path);
      if (attrValue) {
        attributes[prop] = attrValue;
      }
    });
    return {
      type: 'input',
      component: this.component,
      changeEvent: 'change',
      attr: attributes
    };
  }
}

BaseComponent.externalLibraries = {};
BaseComponent.requireLibrary = function(name, property, src, polling) {
  if (!BaseComponent.externalLibraries.hasOwnProperty(name)) {
    BaseComponent.externalLibraries[name] = {};
    BaseComponent.externalLibraries[name].ready = new Promise((resolve, reject) => {
      BaseComponent.externalLibraries[name].resolve = resolve;
      BaseComponent.externalLibraries[name].reject = reject;
    });

    if (!polling && !window[name + 'Callback']) {
      window[name + 'Callback'] = function() {
        this.resolve();
      }.bind(BaseComponent.externalLibraries[name]);
    }

    // See if the plugin already exists.
    let plugin = _get(window, property);
    if (plugin) {
      BaseComponent.externalLibraries[name].resolve(plugin);
    }
    else {
      // Add the script to the top page.
      let script = document.createElement('script');
      script.setAttribute('src', src);
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('defer', true);
      script.setAttribute('async', true);
      document.getElementsByTagName('head')[0].appendChild(script);

      // if no callback is provided, then check periodically for the script.
      if (polling) {
        setTimeout(function checkLibrary() {
          let plugin = _get(window, property);
          if (plugin) {
            BaseComponent.externalLibraries[name].resolve(plugin);
          }
          else {
            // check again after 200 ms.
            setTimeout(checkLibrary, 200);
          }
        }, 200)
      }
    }
  }
  return BaseComponent.externalLibraries[name].ready;
};

BaseComponent.libraryReady = function(name) {
  if (
    BaseComponent.externalLibraries.hasOwnProperty(name) &&
    BaseComponent.externalLibraries[name].ready
  ) {
    return BaseComponent.externalLibraries[name].ready;
  }

  return Promise.reject(name + ' library was not required.');
};
