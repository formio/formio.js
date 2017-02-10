import VMasker from 'vanilla-masker';
import FormioUtils from 'formio-utils';
import _get from 'lodash/get';
import _each from 'lodash/each';
import _debounce from 'lodash/debounce';
import _isArray from 'lodash/isArray';
import _clone from 'lodash/clone';
import i18next from 'i18next';
import Validator from '../Validator';

i18next.initialized = false;
class BaseComponent {
  /**
   *   Initialize a new BaseComponent.
   */
  constructor(component, options, data) {
    this.id = Math.random().toString(36).substring(7);
    this.options = _clone(options) || {};
    this.options.i18n = this.options.i18n || require('../../locals/en');
    this.events = this.options.events;
    this.data = data || {};
    this.component = component;
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

  createElement() {
    this.element = this.ce('div');
    this.element.setAttribute('class', this.className);
  }

  createWrapper() {
    if (!this.component.multiple) {
      return false;
    }
    else {
      let table = this.ce('table');
      table.setAttribute('class', 'table table-bordered');
      this.tbody = this.ce('tbody');
      table.appendChild(this.tbody);

      // Add a default value.
      this.addValue();

      // Add the table to the element.
      this.element.appendChild(table);
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
      let tr = this.ce('tr');
      let td = this.ce('td');
      this.createInput(td);
      tr.appendChild(td);
      let tdAdd = this.ce('td');
      tdAdd.appendChild(this.removeButton(index));
      tr.appendChild(tdAdd);
      this.tbody.appendChild(tr);
    });

    let tr = this.ce('tr');
    let td = this.ce('td');
    td.setAttribute('colspan', '2');
    td.appendChild(this.addButton());
    tr.appendChild(td);
    this.tbody.appendChild(tr);

    // Reset the values of the inputs.
    if (this.data.hasOwnProperty(this.component.key)) {
      this.setValue(this.data[this.component.key]);
    }
  }

  addButton() {
    let addButton = this.ce('a');
    addButton.setAttribute('class', 'btn btn-primary');
    this.addAnEventListener(addButton, 'click', (event) => {
      event.preventDefault();
      this.addValue();
    });

    let addIcon = this.ce('span');
    addIcon.setAttribute('class', 'glyphicon glyphicon-plus');
    addButton.appendChild(addIcon);
    addButton.appendChild(this.text(this.component.addAnother || ' Add Another'));
    return addButton;
  }

  get name() {
    return this.component.label || this.component.placeholder || this.component.key;
  }

  removeButton(index) {
    let removeButton = this.ce('button');
    removeButton.setAttribute('class', 'btn btn-default');
    removeButton.setAttribute('type', 'button');

    // Ensure this button cannot be tabbed to.
    removeButton.setAttribute('tabindex', '-1');
    this.addAnEventListener(removeButton, 'click', (event) => {
      event.preventDefault();
      this.removeValue(index);
    });

    let removeIcon = this.ce('span');
    removeIcon.setAttribute('class', 'glyphicon glyphicon-remove-circle');
    removeButton.appendChild(removeIcon);
    return removeButton;
  }

  createLabel(container) {
    if (!this.component.label) {
      return;
    }
    this.label = this.ce('label');
    this.label.setAttribute('class', 'control-label');
    if (this.info.attr.id) {
      this.label.setAttribute('for', this.info.attr.id);
    }
    this.label.appendChild(this.text(this.component.label));
    container.appendChild(this.label);
  }

  createErrorElement(container) {
    this.errorElement = this.ce('div');
    this.errorElement.setAttribute('class', 'formio-errors');
    container.appendChild(this.errorElement);
  }

  addPrefix(input, inputGroup) {
    let prefix = null;
    if (this.component.prefix) {
      prefix = this.ce('div');
      prefix.setAttribute('class', 'input-group-addon');
      prefix.appendChild(this.text(this.component.prefix));
      inputGroup.appendChild(prefix);
    }
    return prefix;
  }

  addSuffix(input, inputGroup) {
    let suffix = null;
    if (this.component.suffix) {
      suffix = this.ce('div');
      suffix.setAttribute('class', 'input-group-addon');
      suffix.appendChild(this.text(this.component.suffix));
      inputGroup.appendChild(suffix);
    }
    return suffix;
  }

  addInputGroup(input, container) {
    let inputGroup = null;
    if (this.component.prefix || this.component.suffix) {
      inputGroup = this.ce('div');
      inputGroup.setAttribute('class', 'input-group');
      container.appendChild(inputGroup);
    }
    return inputGroup;
  }

  createInput(container) {
    let input = this.ce(this.info.type, this.info.attr);
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
  addAnEventListener(obj, evt, func) {
    if ('addEventListener' in obj){
      obj.addEventListener(evt, func, false);
    } else if ('attachEvent' in obj) {
      obj.attachEvent('on'+evt, func);
    }
  }

  /**
   * Alias for document.createElement.
   *
   * @param type
   * @returns {*}
   */
  ce(type, attr) {
    let element = document.createElement(type);
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
      let errorMessage = this.ce('p');
      errorMessage.setAttribute('class', 'help-block');
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
    this.addAnEventListener(input, this.info.changeEvent, () => this.updateValue());
  }

  /**
   * Add a new input to this comonent.
   *
   * @param input
   * @param container
   * @param name
   */
  addInput(input, container) {
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
      this.data[this.component.key],
      this.data,
      this.t.bind(this))
    );
  }

  getErrors() {
    return this.error;
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

  /**
   * Get the element information.
   *
   * @returns {{type: string, component: *, changeEvent: string, attr: {id: (string|*), name: string, type: (*|string), style: string, class: string}}}
   */
  elementInfo() {
    let style = '';
    if (this.component.overlay) {
      if (this.component.overlay.style) {
        style = this.component.overlay.style;
      }
      if (this.component.overlay.top) {
        style += 'top:' + this.component.overlay.top + 'px;';
      }
      if (this.component.overlay.left) {
        style += 'left:' + this.component.overlay.left + 'px;';
      }
      if (this.component.overlay.width) {
        style += 'width:' + this.component.overlay.width + 'px;';
      }
      if (this.component.overlay.height) {
        style += 'height:' + this.component.overlay.height + 'px;';
      }
    }
    this.inputId = this.component.overlay ? this.component.overlay.id : this.id;
    let attributes = {
      id: this.inputId,
      name: this.options.name,
      type: this.component.inputType || 'text',
      style: style,
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
