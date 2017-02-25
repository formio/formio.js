import VMasker from 'vanilla-masker';
import FormioUtils from 'formio-utils';
import _get from 'lodash/get';
import _each from 'lodash/each';
import _debounce from 'lodash/debounce';
import _isArray from 'lodash/isArray';
import _assign from 'lodash/assign';
import _clone from 'lodash/clone';
import i18next from 'i18next';
import Validator from '../Validator';

i18next.initialized = false;
class BaseComponent {
  /**
   *   Initialize a new BaseComponent.
   */
  constructor(component, options, data) {
    this.id = (component && component.id) ? component.id : Math.random().toString(36).substring(7);
    this.options = _clone(options) || {};
    this.options.i18n = this.options.i18n || require('../../locals/en');
    this.events = this.options.events;
    this.data = data || {};
    this.component = component || {};
    this.components = [];
    this.element = null;
    this.tbody = null;
    this.label = null;
    this.errorElement = null;
    this.error = '';
    this.inputs = [];
    this.info = null;
    this.value = null;
    this.options.name = this.options.name || 'data';
    this.validators = ['required', 'minLength', 'maxLength', 'custom'];
    this.triggerChange = _debounce(this.onChange.bind(this), 200);
    this.eventHandlers = [];
    if (this.component) {
      this.type = this.component.type;
      if (this.component.input && this.component.key) {
        this.options.name += '[' + this.component.key + ']';
      }
      this.info = this.elementInfo();
    }
  }

  t(text, params) {
    let message = i18next.t(text, params);
    return message;
  }

  on(event, cb) {
    if (!this.events) {
      return;
    }
    return this.events.on(event, cb);
  }

  getIcon(name) {
    return this.ce(name + 'Icon', 'i', {
      class: 'glyphicon glyphicon-' + name
    });
  }

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
  }

  get className() {
    let className = this.component.input ? 'form-group has-feedback ' : '';
    className += 'formio-component formio-component-' + this.component.type + ' ';
    className += 'form-field-type-' + this.component.type + ' ';
    className += 'formio-component-' + this.component.key + ' ';
    if (this.component.customClass) {
      className += this.component.customClass;
    }
    if (this.component.input && this.component.validate && this.component.validate.required) {
      className += ' required';
    }
    return className;
  }

  getElement() {
    return this.element;
  }

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
      this.addValue();

      // Add the table to the element.
      this.append(table);
      return true;
    }
  }

  defaultValue() {
    if (this.component.defaultValue) {
      return this.component.defaultValue;
    }
    return '';
  }

  addValue() {
    this.data[this.component.key] = this.getValue();
    if (!this.data[this.component.key]) {
      this.data[this.component.key] = [];
    }
    if (!_isArray(this.data[this.component.key])) {
      this.data[this.component.key] = [this.data[this.component.key]];
    }
    this.data[this.component.key].push(this.defaultValue());
    this.buildRows();
  }

  removeValue(index) {
    if (this.data.hasOwnProperty(this.component.key)) {
      this.data[this.component.key].splice(index, 1);
    }
    this.buildRows();
  }

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

    // Reset the values of the inputs.
    if (this.data.hasOwnProperty(this.component.key)) {
      this.setValue(this.data[this.component.key]);
    }
  }

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

  get name() {
    return this.component.label || this.component.placeholder || this.component.key;
  }

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

  createErrorElement(container) {
    this.errorElement = this.ce('errors', 'div', {
      class: 'formio-errors'
    });
    container.appendChild(this.errorElement);
  }

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

  createInput(container) {
    let input = this.ce('input', this.info.type, this.info.attr);
    if (this.component.inputMask) {
      VMasker(input).maskPattern(this.component.inputMask);
    }

    let inputGroup = this.addInputGroup(input, container);
    this.addPrefix(input, inputGroup);
    this.addInput(input, inputGroup || container);
    this.addSuffix(input, inputGroup);
    this.createErrorElement(container);
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
  destroy() {
    _each(this.eventHandlers, (handler) => {
      window.removeEventListener(handler.event, handler.func);
    });
  }

  /**
   * Alias for document.createElement.
   *
   * @param type
   * @returns {*}
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
   * @param element
   * @param attr
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
    this.show(FormioUtils.checkCondition(this.component, this.value, data));
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
      }
      else {
        this.element.setAttribute('hidden', true);
      }
    }
  }

  onChange() {
    this.checkValidity();
    if (this.events) {
      this.events.emit('componentChange', {
        component: this.component,
        value: this.value
      });
    }
  }

  /**
   * Add new input element listeners.
   *
   * @param input
   */
  addInputEventListener(input) {
    this.addEventListener(input, this.info.changeEvent, this.updateValue.bind(this));
  }

  /**
   * Add a new input to this comonent.
   *
   * @param input
   * @param container
   * @param name
   */
  addInput(input, container) {
    // If the options say readOnly then disable the input.
    if (input && this.options.readOnly) {
      input.disabled = true;
      input.setAttribute('disabled', 'disabled');
    }
    if (input && container) {
      this.inputs.push(input);
      input = container.appendChild(input);
      this.addInputEventListener(input);
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
    let values = [];
    for (let i in this.inputs) {
      if (!this.component.multiple) {
        return this.getValueAt(i);
      }
      values.push(this.getValueAt(i));
    }
    return values;
  }

  updateValue() {
    this.data[this.component.key] = this.value = this.getValue();
    this.triggerChange();
  }

  checkValidity() {
    // No need to check for errors if there is no input.
    if (!this.component.input) {
      return;
    }

    this.setCustomValidity(Validator.check(
      this.validators,
      this.component,
      this.getValidateValue(),
      this.data,
      this.t.bind(this))
    );
  }

  getValidateValue() {
    return this.data[this.component.key];
  }

  get errors() {
    return this.error ? [this.error] : [];
  }

  setCustomValidity(message) {
    if (this.errorElement) {
      this.errorElement.innerHTML = '';
    }
    this.removeClass(this.element, 'has-error');
    this.error = message ? message : '';
    if (message) {
      this.addInputError(message);
      if (this.events) {
        this.events.emit('componentError', {
          component: this.component,
          error: message
        });
      }
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
    this.inputs[index].value = value;
  }

  /**
   * Set the value of this component.
   * @param value
   */
  setValue(value) {
    let isArray = _isArray(value);
    for (let i in this.inputs) {
      this.setValueAt(i, isArray ? value[i] : value);
    }
    this.updateValue();
  }

  /**
   * Disable this component.
   */
  set disable(disable) {
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
    if (this.element) {
      this.element.innerHTML = '';
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
module.exports = BaseComponent;
