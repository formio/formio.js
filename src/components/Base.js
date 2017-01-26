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
    this._events = events;
    this._data = data || {};
    this._component = component;
    this._components = [];
    this._element = null;
    this._tbody = null;
    this._label = null;
    this._errorElement = null;
    this._inputs = [];
    this._info = null;
    if (this._component) {
      this._info = this.elementInfo();
    }
  }

  /**
   * Builds the component.
   */
  build() {
    this.createElement();
    this.createLabel(this._element);
    if (!this.createWrapper()) {
      this.createInput(this._element);
    }
  }

  get className() {
    let className = this._component.input ? 'form-group has-feedback ' : '';
    className += 'formio-component formio-component-' + this._component.type + ' ';
    className += 'form-field-type-' + this._component.type + ' ';
    className += 'formio-component-' + this._component.key + ' ';
    if (this._component.customClass) {
      className += this._component.customClass;
    }
    if (this._component.input && this._component.validate && this._component.validate.required) {
      className += ' required';
    }
    return className;
  }

  createElement() {
    this._element = this.ce('div');
    this._element.setAttribute('class', this.className);
  }

  createWrapper() {
    if (!this._component.multiple) {
      return false;
    }
    else {
      let table = this.ce('table');
      table.setAttribute('class', 'table table-bordered');
      this._tbody = this.ce('tbody');
      table.appendChild(this._tbody);

      // Add a default value.
      this.addValue();

      // Add the table to the element.
      this._element.appendChild(table);
      return true;
    }
  }

  defaultValue() {
    if (this._component.defaultValue) {
      return this._component.defaultValue;
    }
    return '';
  }

  addValue() {
    // Ensure we have the latest value.
    this._data[this._component.key] = this.value;
    if (!this._data[this._component.key]) {
      this._data[this._component.key] = [];
    }
    if (!_isArray(this._data[this._component.key])) {
      this._data[this._component.key] = [this._data[this._component.key]];
    }
    this._data[this._component.key].push(this.defaultValue());
    this.buildRows();
  }

  removeValue(index) {
    if (this._data.hasOwnProperty(this._component.key)) {
      this._data[this._component.key].splice(index, 1);
    }
    this.buildRows();
  }

  buildRows() {
    if (!this._tbody) {
      return;
    }
    this._inputs = [];
    this._tbody.innerHTML = '';
    _each(this._data[this._component.key], (value, index) => {
      let tr = this.ce('tr');
      let td = this.ce('td');
      this.createInput(td);
      tr.appendChild(td);
      let tdAdd = this.ce('td');
      tdAdd.appendChild(this.removeButton(index));
      tr.appendChild(tdAdd);
      this._tbody.appendChild(tr);
    });

    let tr = this.ce('tr');
    let td = this.ce('td');
    td.setAttribute('colspan', '2');
    td.appendChild(this.addButton());
    tr.appendChild(td);
    this._tbody.appendChild(tr);

    // Reset the values of the inputs.
    this.value = this._data[this._component.key];
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
    addButton.appendChild(this.text(this._component.addAnother || ' Add Another'));
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
    if (!this._component.label) {
      return;
    }
    this._label = this.ce('label');
    this._label.setAttribute('class', 'control-label');
    if (this._info.attr.id) {
      this._label.setAttribute('for', this._info.attr.id);
    }
    this._label.appendChild(this.text(this._component.label));
    container.appendChild(this._label);
  }

  createErrorElement(container) {
    this._errorElement = this.ce('div');
    this._errorElement.setAttribute('class', 'formio-errors');
    container.appendChild(this._errorElement);
  }

  addPrefix(input, inputGroup) {
    let prefix = null;
    if (this._component.prefix) {
      prefix = this.ce('div');
      prefix.setAttribute('class', 'input-group-addon');
      prefix.appendChild(this.text(this._component.prefix));
      inputGroup.appendChild(prefix);
    }
    return prefix;
  }

  addSuffix(input, inputGroup) {
    let suffix = null;
    if (this._component.suffix) {
      suffix = this.ce('div');
      suffix.setAttribute('class', 'input-group-addon');
      suffix.appendChild(this.text(this._component.suffix));
      inputGroup.appendChild(suffix);
    }
    return suffix;
  }

  addInputGroup(input, container) {
    let inputGroup = null;
    if (this._component.prefix || this._component.suffix) {
      inputGroup = this.ce('div');
      inputGroup.setAttribute('class', 'input-group');
      container.appendChild(inputGroup);
    }
    return inputGroup;
  }

  createInput(container) {
    let input = this.ce(this._info.type, this._info.attr);
    if (this._component.inputMask) {
      VMasker(input).maskPattern(this._component.inputMask);
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
    this.show(FormioUtils.checkCondition(this._component, this.value, data));
  }

  /**
   * Checks for errors within the inputs, and then adds an input error if one occurs.
   */
  checkErrors() {
    // No need to check for errors if there is no input.
    if (!this._component.input) {
      return;
    }
    if (this._errorElement) {
      this._errorElement.innerHTML = '';
    }
    this.removeClass(this._element, 'has-error');
    _each(this._inputs, (input) => {
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
    if (this._errorElement) {
      let errorMessage = this.ce('p');
      errorMessage.setAttribute('class', 'help-block');
      errorMessage.appendChild(this.text(message));
      this._errorElement.appendChild(errorMessage);
      this.addClass(this._element, 'has-error');
    }
  }

  /**
   * Hide or Show an element.
   *
   * @param show
   */
  show(show) {
    if (this._element) {
      if (show) {
        this._element.removeAttribute('hidden');
      }
      else {
        this._element.setAttribute('hidden', true);
      }
    }
  }

  onChange() {
    this._events.emit('componentChange', {
      component: this._component,
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
    this.addAnEventListener(input, this._info.changeEvent, () => {
      this._data[this._component.key] = this.value;
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
      this._inputs.push(input);
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
    return this._inputs[index].value;
  }

  /**
   * Get the value of this component.
   *
   * @returns {*}
   */
  get value() {
    let values = [];
    for (let i in this._inputs) {
      if (!this._component.multiple) {
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
    this._inputs[index].value = value;
  }

  /**
   * Set the value of this component.
   * @param value
   */
  set value(value) {
    let isArray = _isArray(value);
    for (let i in this._inputs) {
      this.setValueAt(i, isArray ? value[i] : value);
    }
  }

  /**
   * Disable this component.
   */
  set disable(disable) {
    // Disable all input.
    _each(this._inputs, (input) => {
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
    if (this._component.overlay) {
      if (this._component.overlay.style) {
        style = this._component.overlay.style;
      }
      if (this._component.overlay.top) {
        style += 'top:' + this._component.overlay.top + 'px;';
      }
      if (this._component.overlay.left) {
        style += 'left:' + this._component.overlay.left + 'px;';
      }
      if (this._component.overlay.width) {
        style += 'width:' + this._component.overlay.width + 'px;';
      }
      if (this._component.overlay.height) {
        style += 'height:' + this._component.overlay.height + 'px;';
      }
    }
    this.inputId = this._component.overlay ? this._component.overlay.id : this.id;
    let attributes = {
      id: this.inputId,
      name: 'data[' + this._component.key + ']',
      type: this._component.inputType || 'text',
      style: style,
      class: 'form-control'
    };
    _each({
      tabindex: 'tabindex',
      placeholder: 'placeholder',
      required: 'validate.required',
      maxLength: 'validate.maxLength'
    }, (path, prop) => {
      let attrValue = _get(this._component, path);
      if (attrValue) {
        attributes[prop] = attrValue;
      }
    });
    return {
      type: 'input',
      component: this._component,
      changeEvent: 'change',
      attr: attributes
    };
  }
}
module.exports = BaseComponent;
