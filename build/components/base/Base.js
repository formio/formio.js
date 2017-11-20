'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vanilla = require('text-mask-all/vanilla');

var _vanilla2 = _interopRequireDefault(_vanilla);

var _nativePromiseOnly = require('native-promise-only');

var _nativePromiseOnly2 = _interopRequireDefault(_nativePromiseOnly);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _debounce2 = require('lodash/debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

var _defaults2 = require('lodash/defaults');

var _defaults3 = _interopRequireDefault(_defaults2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _Validator = require('../Validator');

var _tooltip = require('tooltip.js');

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_i18next2.default.initialized = false;

/**
 * This is the BaseComponent class which all elements within the FormioForm derive from.
 */

var BaseComponent = function () {
  /**
   * Initialize a new BaseComponent.
   *
   * @param {Object} component - The component JSON you wish to initialize.
   * @param {Object} options - The options for this component.
   * @param {Object} data - The global data submission object this component will belong.
   */
  function BaseComponent(component, options, data) {
    _classCallCheck(this, BaseComponent);

    /**
     * The ID of this component. This value is auto-generated when the component is created, but
     * can also be provided from the component.id value passed into the constructor.
     * @type {string}
     */
    this.id = component && component.id ? component.id : Math.random().toString(36).substring(7);

    /**
     * The options for this component.
     * @type {{}}
     */
    this.options = (0, _defaults3.default)((0, _clone3.default)(options), {
      highlightErrors: true
    });

    /**
     * The i18n configuration for this component.
     */
    var i18n = require('../../i18n');
    if (options && options.i18n && !options.i18nReady) {
      // Support legacy way of doing translations.
      if (options.i18n.resources) {
        i18n = options.i18n;
      } else {
        (0, _each3.default)(options.i18n, function (lang, code) {
          if (!i18n.resources[code]) {
            i18n.resources[code] = { translation: lang };
          } else {
            (0, _assign3.default)(i18n.resources[code].translation, lang);
          }
        });
      }

      options.i18n = i18n;
      options.i18nReady = true;
    }

    if (options && options.i18n) {
      this.options.i18n = options.i18n;
    } else {
      this.options.i18n = i18n;
    }

    /**
     * Determines if this component has a condition assigned to it.
     * @type {null}
     * @private
     */
    this._hasCondition = null;

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
    this.labelElement = null;

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
     * The row path of this component.
     * @type {number}
     */
    this.row = component ? component.row : '';
    this.row = this.row || '';

    /**
     * Determines if this component is disabled, or not.
     *
     * @type {boolean}
     */
    this._disabled = false;

    /**
     * Determines if this component is visible, or not.
     */
    this._visible = true;

    /**
     * If this input has been input and provided value.
     *
     * @type {boolean}
     */
    this.pristine = true;

    /**
     * Points to the parent component.
     *
     * @type {BaseComponent}
     */
    this.parent = null;

    /**
     * Points to the root component, usually the FormComponent.
     *
     * @type {BaseComponent}
     */
    this.root = this;

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
    this.triggerChange = (0, _debounce3.default)(this.onChange.bind(this), 100);

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


  _createClass(BaseComponent, [{
    key: 't',
    value: function t(text, params) {
      params = params || {};
      params.component = this.component;
      params.nsSeparator = '::';
      params.keySeparator = '.|.';
      params.pluralSeparator = '._.';
      params.contextSeparator = '._.';
      return _i18next2.default.t(text, params);
    }

    /**
     * Sets the language for this form.
     *
     * @param lang
     * @return {*}
     */

  }, {
    key: 'on',


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
    value: function on(event, cb, internal) {
      if (!this.events) {
        return;
      }
      var type = 'formio.' + event;
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

  }, {
    key: 'emit',
    value: function emit(event, data) {
      this.events.emit('formio.' + event, data);
    }

    /**
     * Returns an HTMLElement icon element.
     *
     * @param {string} name - The name of the icon to retrieve.
     * @returns {HTMLElement} - The icon element.
     */

  }, {
    key: 'getIcon',
    value: function getIcon(name) {
      return this.ce('i', {
        class: 'glyphicon glyphicon-' + name
      });
    }
  }, {
    key: 'getBrowserLanguage',
    value: function getBrowserLanguage() {
      var nav = window.navigator,
          browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
          i,
          language;

      // support for HTML 5.1 "navigator.languages"
      if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
          language = nav.languages[i];
          if (language && language.length) {
            return language;
          }
        }
      }

      // support for other well known properties in browsers
      for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
          return language;
        }
      }

      return null;
    }

    /**
     * Perform the localization initialization.
     * @returns {*}
     */

  }, {
    key: 'localize',
    value: function localize() {
      var _this = this;

      if (_i18next2.default.initialized) {
        return _nativePromiseOnly2.default.resolve(_i18next2.default);
      }
      _i18next2.default.initialized = true;
      return new _nativePromiseOnly2.default(function (resolve, reject) {
        _i18next2.default.init(_this.options.i18n, function (err, t) {
          if (err) {
            return reject(err);
          }
          resolve(_i18next2.default);
        });
      });
    }

    /**
     * Called before a next page is triggered allowing the components
     * to perform special functions.
     *
     * @return {*}
     */

  }, {
    key: 'beforeNext',
    value: function beforeNext() {
      return _nativePromiseOnly2.default.resolve(true);
    }

    /**
     * Called before a submission is triggered allowing the components
     * to perform special async functions.
     *
     * @return {*}
     */

  }, {
    key: 'beforeSubmit',
    value: function beforeSubmit() {
      return _nativePromiseOnly2.default.resolve(true);
    }
  }, {
    key: 'build',


    /**
     * Builds the component.
     */
    value: function build() {
      this.createElement();
      this.createLabel(this.element);
      if (!this.createWrapper()) {
        this.createInput(this.element);
      }
      this.createDescription(this.element);

      // Disable if needed.
      if (this.shouldDisable) {
        this.disabled = true;
      }

      // Restore the value.
      this.restoreValue();
    }

    /**
     * Retrieves the CSS class name of this component.
     * @returns {string} - The class name of this component.
     */

  }, {
    key: 'getElement',


    /**
     * Returns the outside wrapping element of this component.
     * @returns {HTMLElement}
     */
    value: function getElement() {
      return this.element;
    }

    /**
     * Create the outside wrapping element for this component.
     * @returns {HTMLElement}
     */

  }, {
    key: 'createElement',
    value: function createElement() {
      this.element = this.ce('div', {
        id: this.id,
        class: this.className,
        style: this.customStyle
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

  }, {
    key: 'createWrapper',
    value: function createWrapper() {
      if (!this.component.multiple) {
        return false;
      } else {
        var table = this.ce('table', {
          class: 'table table-bordered'
        });
        this.tbody = this.ce('tbody');
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
  }, {
    key: 'setPristine',


    /**
     * Sets the pristine flag for this component.
     *
     * @param pristine {boolean} - TRUE to make pristine, FALSE not pristine.
     */
    value: function setPristine(pristine) {
      this.pristine = pristine;
    }

    /**
     * Adds a new empty value to the data array.
     */

  }, {
    key: 'addNewValue',
    value: function addNewValue() {
      if (!this.data[this.component.key]) {
        this.data[this.component.key] = [];
      }
      if (!(0, _isArray3.default)(this.data[this.component.key])) {
        this.data[this.component.key] = [this.data[this.component.key]];
      }
      this.data[this.component.key].push(this.defaultValue);
    }

    /**
     * Adds a new empty value to the data array, and add a new row to contain it.
     */

  }, {
    key: 'addValue',
    value: function addValue() {
      this.addNewValue();
      this.buildRows();
      this.restoreValue();
    }

    /**
     * Removes a value out of the data array and rebuild the rows.
     * @param {number} index - The index of the data element to remove.
     */

  }, {
    key: 'removeValue',
    value: function removeValue(index) {
      if (this.data.hasOwnProperty(this.component.key)) {
        this.data[this.component.key].splice(index, 1);
      }
      this.buildRows();
    }

    /**
     * Rebuild the rows to contain the values of this component.
     */

  }, {
    key: 'buildRows',
    value: function buildRows() {
      var _this2 = this;

      if (!this.tbody) {
        return;
      }
      this.inputs = [];
      this.tbody.innerHTML = '';
      (0, _each3.default)(this.data[this.component.key], function (value, index) {
        var tr = _this2.ce('tr');
        var td = _this2.ce('td');
        _this2.createInput(td);
        tr.appendChild(td);

        if (!_this2.shouldDisable) {
          var tdAdd = _this2.ce('td');
          tdAdd.appendChild(_this2.removeButton(index));
          tr.appendChild(tdAdd);
        }

        _this2.tbody.appendChild(tr);
      });

      if (!this.shouldDisable) {
        var tr = this.ce('tr');
        var td = this.ce('td', {
          colspan: '2'
        });
        td.appendChild(this.addButton());
        tr.appendChild(td);
        this.tbody.appendChild(tr);
      }

      if (this.shouldDisable) {
        this.disabled = true;
      }
    }

    /**
     * Adds a new button to add new rows to the multiple input elements.
     * @returns {HTMLElement} - The "Add New" button html element.
     */

  }, {
    key: 'addButton',
    value: function addButton() {
      var _this3 = this;

      var addButton = this.ce('a', {
        class: 'btn btn-primary'
      });
      this.addEventListener(addButton, 'click', function (event) {
        event.preventDefault();
        _this3.addValue();
      });

      var addIcon = this.ce('span', {
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

  }, {
    key: 'errorMessage',


    /**
     * Get the error message provided a certain type of error.
     * @param type
     * @return {*}
     */
    value: function errorMessage(type) {
      return this.component.errors && this.component.errors[type] ? this.component.errors[type] : type;
    }

    /**
     * Creates a new "remove" row button and returns the html element of that button.
     * @param {number} index - The index of the row that should be removed.
     * @returns {HTMLElement} - The html element of the remove button.
     */

  }, {
    key: 'removeButton',
    value: function removeButton(index) {
      var _this4 = this;

      var removeButton = this.ce('button', {
        type: 'button',
        class: 'btn btn-default',
        tabindex: '-1'
      });

      this.addEventListener(removeButton, 'click', function (event) {
        event.preventDefault();
        _this4.removeValue(index);
      });

      var removeIcon = this.ce('span', {
        class: 'glyphicon glyphicon-remove-circle'
      });
      removeButton.appendChild(removeIcon);
      return removeButton;
    }

    /**
     * Create the HTML element for the label of this component.
     * @param {HTMLElement} container - The containing element that will contain this label.
     */

  }, {
    key: 'createLabel',
    value: function createLabel(container) {
      if (!this.component.label || this.component.hideLabel || this.options.inputsOnly) {
        return;
      }
      var className = 'control-label';
      if (this.component.input && this.component.validate && this.component.validate.required) {
        className += ' field-required';
      }
      this.labelElement = this.ce('label', {
        class: className
      });
      if (this.info.attr.id) {
        this.labelElement.setAttribute('for', this.info.attr.id);
      }
      this.labelElement.appendChild(this.text(this.component.label));
      this.createTooltip(this.labelElement);
      container.appendChild(this.labelElement);
    }

    /**
     * Create the HTML element for the tooltip of this component.
     * @param {HTMLElement} container - The containing element that will contain this tooltip.
     */

  }, {
    key: 'createTooltip',
    value: function createTooltip(container, component, classes) {
      component = component || this.component;
      classes = classes || 'glyphicon glyphicon-question-sign text-muted';
      if (!component.tooltip) {
        return;
      }
      this.tooltip = this.ce('i', {
        class: classes
      });
      container.appendChild(this.text(' '));
      container.appendChild(this.tooltip);
      new _tooltip2.default(this.tooltip, {
        delay: {
          hide: 100
        },
        placement: 'right',
        html: true,
        title: component.tooltip.replace(/(?:\r\n|\r|\n)/g, '<br />')
      });
    }

    /**
     * Creates the description block for this input field.
     * @param container
     */

  }, {
    key: 'createDescription',
    value: function createDescription(container) {
      if (!this.component.description) {
        return;
      }
      this.description = this.ce('div', {
        class: 'help-block'
      });
      this.description.appendChild(this.text(this.component.description));
      container.appendChild(this.description);
    }

    /**
     * Creates a new error element to hold the errors of this element.
     */

  }, {
    key: 'createErrorElement',
    value: function createErrorElement() {
      if (!this.errorContainer) {
        return;
      }
      this.errorElement = this.ce('div', {
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

  }, {
    key: 'addPrefix',
    value: function addPrefix(input, inputGroup) {
      var prefix = null;
      if (this.component.prefix) {
        prefix = this.ce('div', {
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

  }, {
    key: 'addSuffix',
    value: function addSuffix(input, inputGroup) {
      var suffix = null;
      if (this.component.suffix) {
        suffix = this.ce('div', {
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

  }, {
    key: 'addInputGroup',
    value: function addInputGroup(input, container) {
      var inputGroup = null;
      if (this.component.prefix || this.component.suffix) {
        inputGroup = this.ce('div', {
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

  }, {
    key: 'getInputMask',
    value: function getInputMask(mask) {
      if (mask instanceof Array) {
        return mask;
      }
      var maskArray = [];
      maskArray.numeric = true;
      for (var i = 0; i < mask.length; i++) {
        switch (mask[i]) {
          case '9':
            maskArray.push(/\d/);
            break;
          case 'A':
            maskArray.numeric = false;
            maskArray.push(/[a-zA-Z]/);
            break;
          case '*':
            maskArray.numeric = false;
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

  }, {
    key: 'maskPlaceholder',
    value: function maskPlaceholder(mask) {
      return mask.map(function (char) {
        return char instanceof RegExp ? '_' : char;
      }).join('');
    }

    /**
     * Sets the input mask for an input.
     * @param {HTMLElement} input - The html input to apply the mask to.
     */

  }, {
    key: 'setInputMask',
    value: function setInputMask(input) {
      if (input && this.component.inputMask) {
        var mask = this.getInputMask(this.component.inputMask);
        this.inputMask = (0, _vanilla2.default)({
          inputElement: input,
          mask: mask
        });
        if (mask.numeric) {
          input.setAttribute('pattern', "\\d*");
        }
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

  }, {
    key: 'createInput',
    value: function createInput(container) {
      var input = this.ce(this.info.type, this.info.attr);
      this.setInputMask(input);
      var inputGroup = this.addInputGroup(input, container);
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

  }, {
    key: 'addEventListener',
    value: function addEventListener(obj, evt, func) {
      this.eventHandlers.push({ type: evt, func: func });
      if ('addEventListener' in obj) {
        obj.addEventListener(evt, func, false);
      } else if ('attachEvent' in obj) {
        obj.attachEvent('on' + evt, func);
      }
    }
  }, {
    key: 'redraw',
    value: function redraw() {
      this.clear();
      this.build();
    }

    /**
     * Remove all event handlers.
     */

  }, {
    key: 'destroy',
    value: function destroy(all) {
      var _this5 = this;

      if (this.inputMask) {
        this.inputMask.destroy();
      }
      (0, _each3.default)(this.eventListeners, function (listener) {
        if (all || listener.internal) {
          _this5.events.off(listener.type, listener.listener);
        }
      });
      (0, _each3.default)(this.eventHandlers, function (handler) {
        window.removeEventListener(handler.event, handler.func);
      });
    }

    /**
     * Append different types of children.
     *
     * @param child
     */

  }, {
    key: 'appendChild',
    value: function appendChild(element, child) {
      var _this6 = this;

      if (Array.isArray(child)) {
        child.forEach(function (oneChild) {
          _this6.appendChild(element, oneChild);
        });
      } else if (child instanceof HTMLElement || child instanceof Text) {
        element.appendChild(child);
      } else if (child) {
        element.appendChild(this.text(child.toString()));
      }
    }

    /**
     * Alias for document.createElement.
     *
     * @param {string} type - The type of element to create
     * @param {Object} attr - The element attributes to add to the created element.
     * @param {Various} children - Child elements. Can be a DOM Element, string or array of both.
     * @param {Object} events
     *
     * @return {HTMLElement} - The created element.
     */

  }, {
    key: 'ce',
    value: function ce(type, attr) {
      var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var events = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      // Create the element.
      var element = document.createElement(type);

      // Add attributes.
      if (attr) {
        this.attr(element, attr);
      }

      // Append the children.
      this.appendChild(element, children);
      return element;
    }

    /**
     * Alias to create a text node.
     * @param text
     * @returns {Text}
     */

  }, {
    key: 'text',
    value: function text(_text) {
      return document.createTextNode(this.t(_text));
    }

    /**
     * Adds an object of attributes onto an element.
     * @param {HtmlElement} element - The element to add the attributes to.
     * @param {Object} attr - The attributes to add to the input element.
     */

  }, {
    key: 'attr',
    value: function attr(element, _attr) {
      var _this7 = this;

      (0, _each3.default)(_attr, function (value, key) {
        if (typeof value !== 'undefined') {
          if (key.indexOf('on') === 0) {
            // If this is an event, add a listener.
            _this7.addEventListener(element, key.substr(2).toLowerCase(), value);
          } else {
            // Otherwise it is just an attribute.
            element.setAttribute(key, value);
          }
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

  }, {
    key: 'addClass',
    value: function addClass(element, className) {
      var cls = element.getAttribute('class');
      cls += ' ' + className;
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

  }, {
    key: 'removeClass',
    value: function removeClass(element, className) {
      var cls = element.getAttribute('class');
      if (cls) {
        cls = cls.replace(className, '');
        element.setAttribute('class', cls);
      }
    }

    /**
     * Determines if this component has a condition defined.
     *
     * @return {null}
     */

  }, {
    key: 'hasCondition',
    value: function hasCondition() {
      if (this._hasCondition !== null) {
        return this._hasCondition;
      }

      this._hasCondition = _utils2.default.hasCondition(this.component);
      return this._hasCondition;
    }

    /**
     * Check for conditionals and hide/show the element based on those conditions.
     */

  }, {
    key: 'checkConditions',
    value: function checkConditions(data) {
      if (!this.hasCondition()) {
        return this.show(true);
      }

      return this.show(_utils2.default.checkCondition(this.component, this.data, data));
    }

    /**
     * Add a new input error to this element.
     *
     * @param message
     * @param dirty
     */

  }, {
    key: 'addInputError',
    value: function addInputError(message, dirty) {
      if (!message) {
        return;
      }

      if (this.errorElement) {
        var errorMessage = this.ce('p', {
          class: 'help-block'
        });
        errorMessage.appendChild(this.text(message));
        this.errorElement.appendChild(errorMessage);
      }

      // Add error classes
      this.addClass(this.element, 'has-error');
      if (dirty && this.options.highlightErrors) {
        this.addClass(this.element, 'alert alert-danger');
      }
    }

    /**
     * Hide or Show an element.
     *
     * @param show
     */

  }, {
    key: 'show',
    value: function show(_show) {
      var _this8 = this;

      // Ensure we stop any pending data clears.
      if (this.clearPending) {
        clearTimeout(this.clearPending);
        this.clearPending = null;
      }

      // Execute only if visibility changes.
      if (!_show === !this._visible) {
        return _show;
      }

      this._visible = _show;
      var element = this.getElement();
      if (element) {
        if (_show && !this.component.hidden) {
          element.removeAttribute('hidden');
          element.style.visibility = 'visible';
          element.style.position = 'relative';
        } else if (!_show || this.component.hidden) {
          element.setAttribute('hidden', true);
          element.style.visibility = 'hidden';
          element.style.position = 'absolute';
        }
      }

      if (!_show && this.component.clearOnHide) {
        this.clearPending = setTimeout(function () {
          return _this8.setValue(null, {
            noValidate: true
          });
        }, 200);
      }

      return _show;
    }
  }, {
    key: 'onResize',
    value: function onResize() {}

    /**
     * Allow for options to hook into the functionality of this renderer.
     * @return {*}
     */

  }, {
    key: 'hook',
    value: function hook() {
      var name = arguments[0];
      var fn = typeof arguments[arguments.length - 1] === 'function' ? arguments[arguments.length - 1] : null;
      if (this.options && this.options.hooks && this.options.hooks[name]) {
        return this.options.hooks[name].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        // If this is an async hook instead of a sync.
        if (fn) {
          return fn(null, arguments[1]);
        } else {
          return arguments[1];
        }
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(flags, fromRoot) {
      flags = flags || {};
      if (!flags.noValidate) {
        this.pristine = false;
      }

      // Set the changed variable.
      var changed = {
        component: this.component,
        value: this.value,
        flags: flags
      };

      // Emit the change.
      this.emit('componentChange', changed);

      // Bubble this change up to the top.
      if (this.root && !fromRoot) {
        this.root.triggerChange(flags, changed);
      }
    }
  }, {
    key: 'addInputSubmitListener',
    value: function addInputSubmitListener(input) {
      var _this9 = this;

      this.addEventListener(input, 'keypress', function (event) {
        var key = event.keyCode || event.which;
        if (key == 13) {
          event.preventDefault();
          event.stopPropagation();
          _this9.emit('submitButton');
        }
      });
    }

    /**
     * Add new input element listeners.
     *
     * @param input
     */

  }, {
    key: 'addInputEventListener',
    value: function addInputEventListener(input) {
      var _this10 = this;

      this.addEventListener(input, this.info.changeEvent, function () {
        return _this10.updateValue({ changed: true });
      });
    }

    /**
     * Add a new input to this comonent.
     *
     * @param input
     * @param container
     * @param noSet
     */

  }, {
    key: 'addInput',
    value: function addInput(input, container) {
      if (input && container) {
        this.inputs.push(input);
        input = container.appendChild(input);
      }
      this.hook('input', input, container);
      this.addInputEventListener(input);
      this.addInputSubmitListener(input);
    }

    /**
     * Get the value at a specific index.
     *
     * @param index
     * @returns {*}
     */

  }, {
    key: 'getValueAt',
    value: function getValueAt(index) {
      return this.inputs[index].value;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      if (!this.component.input) {
        return;
      }
      var values = [];
      for (var i in this.inputs) {
        if (this.inputs.hasOwnProperty(i)) {
          if (!this.component.multiple) {
            this.value = this.getValueAt(i);
            return this.value;
          }
          values.push(this.getValueAt(i));
        }
      }
      this.value = values;
      return values;
    }

    /**
     * Determine if the value of this component has changed.
     *
     * @param before
     * @param after
     * @return {boolean}
     */

  }, {
    key: 'hasChanged',
    value: function hasChanged(before, after) {
      return !(0, _isEqual3.default)(before, after);
    }

    /**
     * Update a value of this component.
     *
     * @param flags
     */

  }, {
    key: 'updateValue',
    value: function updateValue(flags) {
      flags = flags || {};
      var value = this.data[this.component.key];
      this.data[this.component.key] = this.getValue(flags);
      var changed = flags.changed || this.hasChanged(value, this.data[this.component.key]);
      delete flags.changed;
      if (!flags.noUpdateEvent && changed) {
        this.triggerChange(flags);
      }
      return changed;
    }

    /**
     * Restore the value of a control.
     */

  }, {
    key: 'restoreValue',
    value: function restoreValue() {
      if (this.data && this.data.hasOwnProperty(this.component.key)) {
        this.setValue(this.data[this.component.key], {
          noUpdateEvent: true
        });
      } else {
        var defaultValue = this.defaultValue;
        if (!this.data.hasOwnProperty(this.component.key) && defaultValue) {
          this.setValue(defaultValue, {
            noUpdateEvent: true
          });
        }
      }
    }

    /**
     * Perform a calculated value operation.
     *
     * @param data - The global data object.
     *
     * @return {boolean} - If the value changed during calculation.
     */

  }, {
    key: 'calculateValue',
    value: function calculateValue(data, flags) {
      if (!this.component.calculateValue) {
        return false;
      }

      flags = flags || {};
      flags.noCheck = true;
      var changed = false;

      // If this is a string, then use eval to evalulate it.
      if (typeof this.component.calculateValue === 'string') {
        try {
          var value = [];
          var row = this.data;
          var component = this;
          eval(this.component.calculateValue.toString());
          changed = this.setValue(value, flags);
        } catch (e) {
          /* eslint-disable no-console */
          console.warn('An error occurred calculating a value for ' + this.component.key, e);
          changed = false;
          /* eslint-enable no-console */
        }
      } else {
        try {
          var val = _utils2.default.jsonLogic.apply(this.component.calculateValue, {
            data: data,
            row: this.data
          });
          changed = this.setValue(val, flags);
        } catch (err) {
          /* eslint-disable no-console */
          console.warn('An error occurred calculating a value for ' + this.component.key, e);
          changed = false;
          /* eslint-enable no-console */
        }
      }

      return changed;
    }

    /**
     * Get this component's label text.
     *
     */

  }, {
    key: 'getRoot',


    /**
     * Get FormioForm element at the root of this component tree.
     *
     */
    value: function getRoot() {
      return this.root;
    }

    /**
     * Returns the invalid message, or empty string if the component is valid.
     *
     * @param data
     * @param dirty
     * @return {*}
     */

  }, {
    key: 'invalidMessage',
    value: function invalidMessage(data, dirty) {
      // No need to check for errors if there is no input or if it is pristine.
      if (!this.component.input || !dirty && this.pristine) {
        return '';
      }

      return _Validator.Validator.check(this, data);
    }

    /**
     * Returns if the component is valid or not.
     *
     * @param data
     * @param dirty
     * @return {boolean}
     */

  }, {
    key: 'isValid',
    value: function isValid(data, dirty) {
      return !this.invalidMessage(data, dirty);
    }
  }, {
    key: 'checkValidity',
    value: function checkValidity(data, dirty) {
      var message = this.invalidMessage(data, dirty);
      this.setCustomValidity(message, dirty);
      return message ? false : true;
    }
  }, {
    key: 'getRawValue',
    value: function getRawValue() {
      return this.data[this.component.key];
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(value) {
      return value == null || value.length === 0;
    }

    /**
     * Check if a component is eligible for multiple validation
     *
     * @return {boolean}
     */

  }, {
    key: 'validateMultiple',
    value: function validateMultiple(value) {
      return this.component.multiple && (0, _isArray3.default)(value);
    }
  }, {
    key: 'interpolate',
    value: function interpolate(string, data) {
      return _utils2.default.interpolate(string, data);
    }
  }, {
    key: 'setCustomValidity',
    value: function setCustomValidity(message, dirty) {
      if (this.errorElement && this.errorContainer) {
        this.errorElement.innerHTML = '';
        try {
          this.errorContainer.removeChild(this.errorElement);
        } catch (err) {}
      }
      this.removeClass(this.element, 'has-error');
      if (this.options.highlightErrors) {
        this.removeClass(this.element, 'alert alert-danger');
      }
      if (message) {
        this.error = {
          component: this.component,
          message: message
        };
        this.emit('componentError', this.error);
        this.createErrorElement();
        this.addInputError(message, dirty);
      } else {
        this.error = null;
      }
      (0, _each3.default)(this.inputs, function (input) {
        if (typeof input.setCustomValidity === 'function') {
          input.setCustomValidity(message, dirty);
        }
      });
    }

    /**
     * Set the value at a specific index.
     *
     * @param index
     * @param value
     */

  }, {
    key: 'setValueAt',
    value: function setValueAt(index, value) {
      if (value === null || value === undefined) {
        value = this.defaultValue;
      }
      this.inputs[index].value = value;
    }
  }, {
    key: 'getFlags',
    value: function getFlags() {
      return typeof arguments[1] === 'boolean' ? {
        noUpdateEvent: arguments[1],
        noValidate: arguments[2]
      } : arguments[1] || {};
    }
  }, {
    key: 'whenReady',
    value: function whenReady() {
      return _nativePromiseOnly2.default.resolve();
    }

    /**
     * Set the value of this component.
     *
     * @param value
     * @param flags
     *
     * @return {boolean} - If the value changed.
     */

  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);
      if (!this.component.input) {
        return false;
      }
      this.value = value;
      var isArray = (0, _isArray3.default)(value);
      for (var i in this.inputs) {
        if (this.inputs.hasOwnProperty(i)) {
          this.setValueAt(i, isArray ? value[i] : value);
        }
      }
      return this.updateValue(flags);
    }

    /**
     * Prints out the value of this component as a string value.
     */

  }, {
    key: 'asString',
    value: function asString(value) {
      value = value || this.getValue();
      return (0, _isArray3.default)(value) ? value.join(', ') : value.toString();
    }

    /**
     * Return if the component is disabled.
     * @return {boolean}
     */

  }, {
    key: 'selectOptions',
    value: function selectOptions(select, tag, options, defaultValue) {
      var _this11 = this;

      (0, _each3.default)(options, function (option) {
        var attrs = {
          value: option.value
        };
        if (defaultValue !== undefined && option.value === defaultValue) {
          attrs.selected = 'selected';
        }
        var optionElement = _this11.ce('option', attrs);
        optionElement.appendChild(_this11.text(option.label));
        select.appendChild(optionElement);
      });
    }
  }, {
    key: 'setSelectValue',
    value: function setSelectValue(select, value) {
      var options = select.querySelectorAll('option');
      (0, _each3.default)(options, function (option) {
        if (option.value === value) {
          option.setAttribute('selected', 'selected');
        } else {
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
  }, {
    key: 'clear',
    value: function clear() {
      this.destroy();
      var element = this.getElement();
      if (element) {
        element.innerHTML = '';
      }
    }
  }, {
    key: 'append',
    value: function append(element) {
      if (this.element) {
        this.element.appendChild(element);
      }
    }
  }, {
    key: 'prepend',
    value: function prepend(element) {
      if (this.element) {
        if (this.element.firstChild) {
          this.element.insertBefore(element, this.element.firstChild);
        } else {
          this.element.appendChild(element);
        }
      }
    }
  }, {
    key: 'removeChild',
    value: function removeChild(element) {
      if (this.element) {
        this.element.removeChild(element);
      }
    }

    /**
     * Get the element information.
     */

  }, {
    key: 'elementInfo',
    value: function elementInfo() {
      var attributes = {
        name: this.options.name,
        type: this.component.inputType || 'text',
        class: 'form-control',
        lang: this.options.i18n.lng
      };

      if (this.component.placeholder) {
        attributes.placeholder = this.t(this.component.placeholder);
      }

      if (this.component.tabindex) {
        attributes.tabindex = this.component.tabindex;
      }

      return {
        type: 'input',
        component: this.component,
        changeEvent: 'change',
        attr: attributes
      };
    }
  }, {
    key: 'language',
    set: function set(lang) {
      var _this12 = this;

      return new _nativePromiseOnly2.default(function (resolve, reject) {
        _i18next2.default.changeLanguage(lang, function (err) {
          if (err) {
            return reject(err);
          }
          _this12.redraw();
          resolve();
        });
      });
    }
  }, {
    key: 'shouldDisable',
    get: function get() {
      return this.options.readOnly || this.component.disabled;
    }
  }, {
    key: 'className',
    get: function get() {
      var className = this.component.input ? 'form-group has-feedback ' : '';
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
     * Build the custom style from the layout values
     * @return {string} - The custom style
     */

  }, {
    key: 'customStyle',
    get: function get() {
      var customCSS = '';
      (0, _each3.default)(this.component.style, function (value, key) {
        if (value !== '') {
          customCSS += key + ':' + value + ';';
        }
      });
      return customCSS;
    }
  }, {
    key: 'defaultValue',
    get: function get() {
      var defaultValue = '';
      if (this.component.defaultValue) {
        defaultValue = this.component.defaultValue;
      } else if (this.component.customDefaultValue) {
        if (typeof this.component.customDefaultValue === 'string') {
          try {
            var row = this.data;
            var data = this.data;
            var value = '';
            var component = this;
            eval(this.component.customDefaultValue.toString());
            defaultValue = value;
          } catch (e) {
            defaultValue = null;
            /* eslint-disable no-console */
            console.warn('An error occurred getting default value for ' + this.component.key, e);
            /* eslint-enable no-console */
          }
        } else {
          try {
            defaultValue = _utils2.default.jsonLogic.apply(this.component.customDefaultValue, {
              data: this.data,
              row: this.data
            });
          } catch (err) {
            defaultValue = null;
            /* eslint-disable no-console */
            console.warn('An error occurred calculating a value for ' + this.component.key, e);
            /* eslint-enable no-console */
          }
        }
      }
      return defaultValue;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.t(this.component.label || this.component.placeholder || this.component.key);
    }

    /**
     * Returns the error label for this component.
     * @return {*}
     */

  }, {
    key: 'errorLabel',
    get: function get() {
      return this.t(this.component.errorLabel || this.component.label || this.component.placeholder || this.component.key);
    }
  }, {
    key: 'visible',
    set: function set(visible) {
      this.show(visible);
    },
    get: function get() {
      return this._visible;
    }
  }, {
    key: 'label',
    get: function get() {
      return this.component.label;
    }

    /**
     * Set this component's label text and render it.
     *
     * @param value - The new label text.
     */
    ,
    set: function set(value) {
      this.component.label = value;
      if (this.labelElement) {
        this.labelElement.innerText = value;
      }
    }
  }, {
    key: 'errors',
    get: function get() {
      return this.error ? [this.error] : [];
    }
  }, {
    key: 'disabled',
    get: function get() {
      return this._disabled;
    }

    /**
     * Disable this component.
     *
     * @param {boolean} disabled
     */
    ,
    set: function set(disabled) {
      // Do not allow a component to be disabled if it should be always...
      if (!disabled && this.shouldDisable) {
        return;
      }

      this._disabled = disabled;
      // Disable all input.
      (0, _each3.default)(this.inputs, function (input) {
        input.disabled = disabled;
        if (disabled) {
          input.setAttribute('disabled', 'disabled');
        } else {
          input.removeAttribute('disabled');
        }
      });
    }
  }]);

  return BaseComponent;
}();

exports.BaseComponent = BaseComponent;


BaseComponent.externalLibraries = {};
BaseComponent.requireLibrary = function (name, property, src, polling) {
  if (!BaseComponent.externalLibraries.hasOwnProperty(name)) {
    BaseComponent.externalLibraries[name] = {};
    BaseComponent.externalLibraries[name].ready = new _nativePromiseOnly2.default(function (resolve, reject) {
      BaseComponent.externalLibraries[name].resolve = resolve;
      BaseComponent.externalLibraries[name].reject = reject;
    });

    if (!polling && !window[name + 'Callback']) {
      window[name + 'Callback'] = function () {
        this.resolve();
      }.bind(BaseComponent.externalLibraries[name]);
    }

    // See if the plugin already exists.
    var plugin = (0, _get3.default)(window, property);
    if (plugin) {
      BaseComponent.externalLibraries[name].resolve(plugin);
    } else {
      src = (0, _isArray3.default)(src) ? src : [src];
      src.forEach(function (lib) {
        var attrs = {};
        var elementType = '';
        if (typeof lib === 'string') {
          lib = {
            type: 'script',
            src: lib
          };
        }
        switch (lib.type) {
          case 'script':
            elementType = 'script';
            attrs = {
              src: lib.src,
              type: 'text/javascript',
              defer: true,
              async: true
            };
            break;
          case 'styles':
            elementType = 'link';
            attrs = {
              href: lib.src,
              rel: 'stylesheet'
            };
            break;
        }

        // Add the script to the top page.
        var script = document.createElement(elementType);
        for (var attr in attrs) {
          script.setAttribute(attr, attrs[attr]);
        }
        document.getElementsByTagName('head')[0].appendChild(script);
      });

      // if no callback is provided, then check periodically for the script.
      if (polling) {
        setTimeout(function checkLibrary() {
          var plugin = (0, _get3.default)(window, property);
          if (plugin) {
            BaseComponent.externalLibraries[name].resolve(plugin);
          } else {
            // check again after 200 ms.
            setTimeout(checkLibrary, 200);
          }
        }, 200);
      }
    }
  }
  return BaseComponent.externalLibraries[name].ready;
};

BaseComponent.libraryReady = function (name) {
  if (BaseComponent.externalLibraries.hasOwnProperty(name) && BaseComponent.externalLibraries[name].ready) {
    return BaseComponent.externalLibraries[name].ready;
  }

  return _nativePromiseOnly2.default.reject(name + ' library was not required.');
};