let VMasker = require('vanilla-masker');
let FormioUtils = require('formio-utils');
let _get = require('lodash/get');
let _each = require('lodash/each');
let _debounce = require('lodash/debounce');
let _isArray = require('lodash/isArray');
class BaseComponent {
  /**
   *   Initialize a new BaseComponent.
   *
   * @param component
   *   The JSON component.
   * @param components
   *   The components instance.
   * @param data
   *   The data to represent this "row" for the component.
   */
  constructor(component, events, data) {
    this.id = Math.random().toString(36).substring(7);
    this.events = events;
    this.data = data || {};
    this.component = component;
    this.components = [];
    this.element = null;
    this.tbody = null;
    this.label = null;
    this.errorElement = null;
    this.inputs = [];
    this.info = null;
    if (this.component) {
      this.info = this.elementInfo();
    }
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
    // Ensure we have the latest value.
    this.data[this.component.key] = this.value;
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
    this.value = this.data[this.component.key];
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
   * Checks for errors within the inputs, and then adds an input error if one occurs.
   */
  checkErrors() {
    // No need to check for errors if there is no input.
    if (!this.component.input) {
      return;
    }
    if (this.errorElement) {
      this.errorElement.innerHTML = '';
    }
    this.removeClass(this.element, 'has-error');
    _each(this.inputs, (input) => {
      if (input.validationMessage) {
        this.addInputError(input.validationMessage);
      }
    });
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
    this.events.emit('componentChange', {
      component: this.component,
      value: this.value
    });
    this.checkErrors();
  }

  /**
   * Add new input element listeners.
   *
   * @param input
   */
  addInputEventListener(input) {
    let callChange = _debounce(() => this.onChange(), 200);
    this.addAnEventListener(input, this.info.changeEvent, () => {
      this.data[this.component.key] = this.value;
      callChange();
    });
  }

  /**
   * Add a new input to this comonent.
   *
   * @param input
   * @param container
   * @param name
   */
  addInput(input, container, name) {
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

  /**
   * Get the value of this component.
   *
   * @returns {*}
   */
  get value() {
    let values = [];
    for (let i in this.inputs) {
      if (!this.component.multiple) {
        return this.getValueAt(i);
      }
      values.push(this.getValueAt(i));
    }
    return values;
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
  set value(value) {
    let isArray = _isArray(value);
    for (let i in this.inputs) {
      this.setValueAt(i, isArray ? value[i] : value);
    }
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
      name: 'data[' + this.component.key + ']',
      type: this.component.inputType || 'text',
      style: style,
      class: 'form-control'
    };
    _each({
      tabindex: 'tabindex',
      placeholder: 'placeholder',
      required: 'validate.required',
      maxLength: 'validate.maxLength'
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
