import EventEmitter from './EventEmitter';
import Formio from './Formio';
import * as FormioUtils from './utils/utils';
import i18next from 'i18next';
import _ from 'lodash';
import moment from 'moment';
import maskInput from 'vanilla-text-mask';

/**
 * Root component for all elements within the renderer.
 */
export default class Component {
  constructor(options, id) {
    /**
     * The options for this component.
     * @type {{}}
     */
    this.options = _.assign({
      language: 'en',
      highlightErrors: true,
      row: '',
      namespace: 'formio'
    }, options || {});

    /**
     * The ID of this component. This value is auto-generated when the component is created, but
     * can also be provided from the component.id value passed into the constructor.
     * @type {string}
     */
    this.id = id || FormioUtils.getRandomComponentId();

    /**
     * An array of event handlers so that the destry command can deregister them.
     * @type {Array}
     */
    this.eventHandlers = [];

    // Use the i18next that is passed in, otherwise use the global version.
    this.i18next = this.options.i18next || i18next;

    /**
     * An instance of the EventEmitter class to handle the emitting and registration of events.
     *
     * @type {EventEmitter}
     */
    this.events = (options && options.events) ? options.events : new EventEmitter({
      wildcard: false,
      maxListeners: 0
    });

    /**
     * All of the input masks associated with this component.
     * @type {Array}
     */
    this.inputMasks = [];
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
   * @param {boolean} internal - If this event is an "internal" event and should get removed when destroyed.
   *   This parameter is necessary because any external "on" bindings should be persistent even through internal
   *   redraw events which will call the "destroy" methods.
   */
  on(event, cb, internal) {
    if (!this.events) {
      return;
    }
    const type = `${this.options.namespace}.${event}`;

    // Store the component id in the handler so that we can determine which events are for this component.
    cb.id = this.id;
    cb.internal = internal;

    // Register for this event.
    return this.events.on(type, cb);
  }

  /**
   * Removes all listeners for a certain event.
   *
   * @param event
   */
  off(event) {
    if (!this.events) {
      return;
    }
    const type = `${this.options.namespace}.${event}`;

    // Iterate through all the internal events.
    _.each(this.events.listeners(type), (listener) => {
      // Ensure this event is for this component.
      if (listener && (listener.id === this.id)) {
        // Turn off this event handler.
        this.events.off(type, listener);
      }
    });
  }

  /**
   * Emit a new event.
   *
   * @param {string} event - The event to emit.
   * @param {Object} data - The data to emit with the handler.
   */
  emit(event, ...data) {
    if (this.events) {
      this.events.emit(`${this.options.namespace}.${event}`, ...data);
    }
  }

  /**
   * Wrapper method to add an event listener to an HTML element.
   *
   * @param obj
   *   The DOM element to add the event to.
   * @param type
   *   The event name to add.
   * @param func
   *   The callback function to be executed when the listener is triggered.
   * @param persistent
   *   If this listener should persist beyond "destroy" commands.
   */
  addEventListener(obj, type, func, persistent) {
    if (!persistent) {
      this.eventHandlers.push({ id: this.id, obj, type, func });
    }
    if ('addEventListener' in obj) {
      obj.addEventListener(type, func, false);
    }
    else if ('attachEvent' in obj) {
      obj.attachEvent(`on${type}`, func);
    }

    return this;
  }

  /**
   * Remove an event listener from the object.
   *
   * @param obj
   * @param type
   */
  removeEventListener(obj, type) {
    const indexes = [];
    _.each(this.eventHandlers, (handler, index) => {
      if ((handler.id === this.id) && obj.removeEventListener && (handler.type === type)) {
        obj.removeEventListener(type, handler.func);
        indexes.push(index);
      }
    });
    if (indexes.length) {
      _.pullAt(this.eventHandlers, indexes);
    }

    return this;
  }

  /**
   * Removes all event listeners attached to this component.
   */
  destroy(full = false) {
    _.each(this.events._events, (events, type) => {
      _.each(_.castArray(events), (listener) => {
        if (listener && (this.id === listener.id) && listener.internal) {
          this.events.off(type, listener);
        }
      });
    });

    _.each(this.eventHandlers, (handler) => {
      if ((this.id === handler.id) && handler.type && handler.obj && handler.obj.removeEventListener) {
        handler.obj.removeEventListener(handler.type, handler.func);
      }
    });

    // Destroy the input masks.
    this.inputMasks.forEach(mask => mask.destroy());
    this.inputMasks = [];

    if (full) {
      this.events.removeAllListeners();
    }
  }

  /**
   * Append an HTML DOM element to a container.
   *
   * @param element
   * @param container
   */
  appendTo(element, container) {
    container?.appendChild(element);
    return this;
  }

  /**
   * Prepend an HTML DOM element to a container.
   *
   * @param {HTMLElement} element - The DOM element to prepend.
   * @param {HTMLElement} container - The DOM element that is the container of the element getting prepended.
   */
  prependTo(element, container) {
    if (container) {
      if (container.firstChild) {
        try {
          container.insertBefore(element, container.firstChild);
        }
        catch (err) {
          console.warn(err);
          container.appendChild(element);
        }
      }
      else {
        container.appendChild(element);
      }
    }

    return this;
  }

  /**
   * Removes an HTML DOM element from its bounding container.
   *
   * @param {HTMLElement} element - The element to remove.
   * @param {HTMLElement} container - The DOM element that is the container of the element to remove.
   */
  removeChildFrom(element, container) {
    if (container && container.contains(element)) {
      try {
        container.removeChild(element);
      }
      catch (err) {
        console.warn(err);
      }
    }

    return this;
  }

  /**
   * Alias for document.createElement.
   *
   * @param {string} type - The type of element to create
   * @param {Object} attr - The element attributes to add to the created element.
   * @param {Various} children - Child elements. Can be a DOM Element, string or array of both.
   *
   * @return {HTMLElement} - The created element.
   */
  ce(type, attr, children = null) {
    // Create the element.
    const element = document.createElement(type);

    // Add attributes.
    if (attr) {
      this.attr(element, attr);
    }

    // Append the children.
    this.appendChild(element, children);
    return element;
  }

  /**
   * Append different types of children.
   *
   * @param child
   */
  appendChild(element, child) {
    if (Array.isArray(child)) {
      child.forEach((oneChild) => this.appendChild(element, oneChild));
    }
    else if (child instanceof HTMLElement || child instanceof Text) {
      element.appendChild(child);
    }
    else if (child) {
      element.appendChild(this.text(child.toString()));
    }

    return this;
  }

  /**
   * Creates a new input mask placeholder.
   * @param {HTMLElement} mask - The input mask.
   * @returns {string} - The placeholder that will exist within the input as they type.
   */
  maskPlaceholder(mask) {
    return mask.map((char) => (char instanceof RegExp) ? '_' : char).join('');
  }

  /**
   * Sets the input mask for an input.
   *
   * @param {HTMLElement} input - The html input to apply the mask to.
   * @param {String} inputMask - The input mask to add to this input.
   * @param {Boolean} placeholder - Set the mask placeholder on the input.
   */
  setInputMask(input, inputMask, placeholder) {
    if (input && inputMask) {
      const mask = FormioUtils.getInputMask(inputMask);
      this._inputMask = mask;
      try {
        input.mask = maskInput({
          inputElement: input,
          mask
        });
      }
      catch (e) {
        // Don't pass error up, to prevent form rejection.
        // Internal bug of vanilla-text-mask on iOS (`selectionEnd`);
        console.warn(e);
      }
      if (mask.numeric) {
        input.setAttribute('pattern', '\\d*');
      }
      if (placeholder) {
        input.setAttribute('placeholder', this.maskPlaceholder(mask));
      }
      // prevent pushing undefined value to array in case of vanilla-text-mask error catched above
      if (input.mask) {
        this.inputMasks.push(input.mask);
      }
    }
  }

  /**
   * Translate a text using the i18n system.
   *
   * @param {string} text - The i18n identifier.
   * @param {Object} params - The i18n parameters to use for translation.
   */
  t(text, params) {
    params = params || {};
    params.nsSeparator = '::';
    params.keySeparator = '.|.';
    params.pluralSeparator = '._.';
    params.contextSeparator = '._.';
    const translated = this.i18next.t(text, params);
    return translated || text;
  }

  /**
   * Alias to create a text node.
   * @param text
   * @returns {Text}
   */
  text(text) {
    return document.createTextNode(this.t(text));
  }

  /**
   * Adds an object of attributes onto an element.
   * @param {HtmlElement} element - The element to add the attributes to.
   * @param {Object} attr - The attributes to add to the input element.
   */
  attr(element, attr) {
    if (!element) {
      return;
    }
    _.each(attr, (value, key) => {
      if (typeof value !== 'undefined') {
        if (key.indexOf('on') === 0) {
          // If this is an event, add a listener.
          this.addEventListener(element, key.substr(2).toLowerCase(), value);
        }
        else if (key) {
          // Otherwise it is just an attribute.
          element.setAttribute(key, value);
        }
      }
    });
  }

  /**
   * Determines if an element has a class.
   *
   * Taken from jQuery https://j11y.io/jquery/#v=1.5.0&fn=jQuery.fn.hasClass
   */
  hasClass(element, className) {
    if (!element) {
      return;
    }
    className = ` ${className} `;
    return ((` ${element.className} `).replace(/[\n\t\r\f]/g, ' ').indexOf(className) > -1);
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
    if (!element || this.hasClass(element, className)) {
      return this;
    }

    const classes = element.getAttribute('class');
    const classesNew = classes ? `${classes} ${className}` : className;
    element.setAttribute('class', classesNew);

    return this;
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
    if (!element || !this.hasClass(element, className)) {
      return this;
    }

    // $1: preceding whitespace or start, $2: class name, $3: trailing whitespace or end
    const pattern = `([ \\t\\n\\f\\r]+|^)(${className})([ \\t\\n\\f\\r]+|$)`;
    const classes = element.getAttribute('class');

    // this removes the class including its preceding white space, but leaves the trailing whitespace as is
    element.setAttribute('class', classes.replace(new RegExp(pattern, 'gm'), '$3').trim());

    return this;
  }

  /**
   * Empty's an HTML DOM element.
   *
   * @param {HTMLElement} element - The element you wish to empty.
   */
  empty(element) {
    if (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  }

  /**
   * Gets the classname for either Fontawesome or Bootstrap depending on their settings.
   *
   * @param name
   * @param spinning
   * @return {string}
   */
  iconClass(name, spinning) {
    if (!this.options.icons || this.options.icons === 'glyphicon') {
      return spinning ? `glyphicon glyphicon-${name} glyphicon-spin` : `glyphicon glyphicon-${name}`;
    }
    switch (name) {
      case 'save':
        return 'fa fa-download';
      case 'zoom-in':
        return 'fa fa-search-plus';
      case 'zoom-out':
        return 'fa fa-search-minus';
      case 'question-sign':
        return 'fa fa-question-circle';
      case 'remove-circle':
        return 'fa fa-times-circle-o';
      case 'new-window':
        return 'fa fa-window-restore';
      case 'menu-hamburger':
        return 'fa fa-bars';
      default:
        return spinning ? `fa fa-${name} fa-spin` : `fa fa-${name}`;
    }
  }

  /**
   * Returns an HTMLElement icon element.
   *
   * @param {string} name - The name of the icon to retrieve.
   * @returns {HTMLElement} - The icon element.
   */
  getIcon(name) {
    return this.ce('i', {
      class: this.iconClass(name)
    });
  }

  /**
   * Create an evaluation context for all script executions and interpolations.
   *
   * @param additional
   * @return {*}
   */
  evalContext(additional) {
    return Object.assign({
      _,
      utils: FormioUtils,
      util: FormioUtils,
      user: Formio.getUser(),
      moment,
      instance: this
    }, additional);
  }

  /**
   * Performs an interpolation using the evaluation context of this component.
   *
   * @param string
   * @param data
   * @return {XML|string|*|void}
   */
  interpolate(string, data) {
    return FormioUtils.interpolate(string, this.evalContext(data));
  }

  /**
   * Performs an evaluation using the evaluation context of this component.
   *
   * @param func
   * @param args
   * @param ret
   * @param tokenize
   * @return {*}
   */
  evaluate(func, args, ret, tokenize) {
    return FormioUtils.evaluate(func, this.evalContext(args), ret, tokenize);
  }

  /**
   * Allow for options to hook into the functionality of this renderer.
   * @return {*}
   */
  hook() {
    const name = arguments[0];
    if (
      this.options &&
      this.options.hooks &&
      this.options.hooks[name]
    ) {
      return this.options.hooks[name].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    else {
      // If this is an async hook instead of a sync.
      const fn = (typeof arguments[arguments.length - 1] === 'function') ? arguments[arguments.length - 1] : null;
      if (fn) {
        return fn(null, arguments[1]);
      }
      else {
        return arguments[1];
      }
    }
  }
}
