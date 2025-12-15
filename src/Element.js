import _ from 'lodash';
import moment from 'moment';
import maskInput from '@formio/vanilla-text-mask';
import EventEmitter from './EventEmitter';
import { Formio } from './Formio';
import { I18n } from './utils/i18n';
import FormioUtils from './utils';

/**
 * The root component for all elements within the Form.io renderer.
 * @property {object} options - The options for this component. Subclasses should override this type with more specific options.
 */
export default class Element {
  constructor(options) {
    /**
     * The options for this component.
     * @type {object}
     */
    this.options = Object.assign(
      {
        language: 'en',
        highlightErrors: true,
        componentErrorClass: 'formio-error-wrapper',
        componentWarningClass: 'formio-warning-wrapper',
        row: '',
        namespace: 'formio',
      },
      options || {},
    );

    /**
     * The ID of this component. This value is auto-generated when the component is created, but
     * can also be provided from the component.id value passed into the constructor.
     * @type {string}
     */
    this.id = FormioUtils.getRandomComponentId();
    /**
     * An array of event handlers so that the destry command can deregister them.
     * @type {Array}
     */
    this.eventHandlers = [];

    // Use the i18next that is passed in, otherwise use the global version.
    this.options.i18n = this.options.i18n || {};
    if (this.options?.language) {
      this.options.i18n.language = this.options.language;
    }
    this.options.i18next = this.i18next = this.options.i18next || I18n.init(this.options.i18n);

    /**
     * An instance of the EventEmitter class to handle the emitting and registration of events.
     * @type {EventEmitter}
     */
    this.events = options && options.events ? options.events : new EventEmitter();

    this.defaultMask = null;
    /**
     * Conditional to show or hide helplinks in editForm
     * @type {*|boolean}
     */
    this.helplinks =
      this.options.helplinks === 'false' ? false : this.options.helplinks || 'https://help.form.io';
  }

  /**
   * Register for a new event within this component.
   * @example
   * let component = new BaseComponent({
   *   type: 'textfield',
   *   label: 'First Name',
   *   key: 'firstName'
   * });
   * component.on('componentChange', (changed) => {
   *   console.log('this element is changed.');
   * });
   * @param {string} event - The event you wish to register the handler for.
   * @param {Function} cb - The callback handler to handle this event.
   * @param {boolean} [internal] - This is an internal event handler.
   * @param {boolean} [once] - This event should only fire once.
   * @returns {EventEmitter | void} - The event emitter instance.
   */
  on(event, cb, internal, once = false) {
    if (!this.events) {
      return;
    }
    const type = `${this.options.namespace}.${event}`;

    // Store the component id in the handler so that we can determine which events are for this component.
    cb.id = this.id;
    cb.key = this.key;
    cb.internal = internal;

    // Register for this event.
    return this.events[once ? 'once' : 'on'](type, cb);
  }

  /**
   * Register for a new single-fire event within this component.
   * @param {string} event - The event you wish to register the handler for.
   * @param {Function} cb - The callback handler to handle this event.
   * @param {boolean} internal - This is an internal event handler.
   * @returns {EventEmitter} - The event emitter instance.
   */
  once(event, cb, internal) {
    return this.on(event, cb, internal, true);
  }

  /**
   * Allow catching any event.
   * @param {Function} cb - The callback handler to handle this event.
   * @returns {EventEmitter | void} - The event emitter instance.
   */
  onAny(cb) {
    if (!this.events) {
      return;
    }

    return this.events.onAny(cb);
  }

  /**
   * Removes the listener that will be fired when any event is emitted.
   * @param {Function} cb - The callback handler to handle this event.
   * @returns {EventEmitter | void} - The event emitter instance.
   */
  offAny(cb) {
    if (!this.events) {
      return;
    }

    return this.events.offAny(cb);
  }

  /**
   * Removes a listener for a certain event. Not passing the 2nd arg will remove all listeners for that event.
   * @param {string} event - The event you wish to register the handler for.
   * @param {Function | undefined} cb - The callback handler to handle this event.
   */
  off(event, cb) {
    if (!this.events) {
      return;
    }

    const type = `${this.options.namespace}.${event}`;

    this.events?.listeners(type).forEach((listener) => {
      // Ensure the listener is for this element
      if (!listener || listener.id !== this.id) {
        return;
      }

      // If there is a given callback, only deal with the match
      if (cb && cb !== listener) {
        return;
      }

      this.events?.off(type, listener);
    });
  }

  /**
   * Emit a new event.
   * @param {string} event - The event to emit.
   * @param {object} data - The data to emit with the handler.
   */
  emit(event, ...data) {
    if (this.events) {
      this.events.emit(`${this.options.namespace}.${event}`, ...data);
    }
  }

  /**
   * Check if the component has an event handler set up for the event.
   * @param {string} event - The event name.
   * @returns {boolean} - TRUE if the event is registered, FALSE otherwise.
   */
  hasEventHandler(event) {
    if (!this.events) {
      return false;
    }

    const type = `${this.options.namespace}.${event}`;

    return this.events.listeners(type).some((listener) => {
      if (!listener) {
        return false;
      }

      return listener.id === this.id || listener.key === this.key;
    });
  }

  /**
   * Wrapper method to add an event listener to an HTML element.
   * @param {HtmlElement} obj - The DOM element to add the event to.
   * @param {string} type - The event name to add.
   * @param {Function} func - The callback function to be executed when the listener is triggered.
   * @param {boolean} persistent - If this listener should persist beyond "destroy" commands.
   * @param {boolean} capture - If this listener should be executed in the capture phase.
   * @returns {void | this} - The instance of the element.
   */
  addEventListener(obj, type, func, persistent, capture) {
    if (!obj) {
      return;
    }
    if (!persistent) {
      this.eventHandlers.push({ id: this.id, obj, type, func });
    }
    if ('addEventListener' in obj) {
      obj.addEventListener(type, func, !!capture);
    } else if ('attachEvent' in obj) {
      obj.attachEvent(`on${type}`, func);
    }

    return this;
  }

  /**
   * Remove an event listener from the object.
   * @param {HTMLElement} obj - The DOM element to remove the event from.
   * @param {string} type - The event name to remove.
   * @param {Function} func - The callback function to remove.
   * @returns {this | void} - The instance of the element.
   */
  removeEventListener(obj, type, func = null) {
    const indexes = [];
    if (!obj) {
      return;
    }

    this.eventHandlers.forEach((handler, index) => {
      if (
        handler.id === this.id &&
        obj.removeEventListener &&
        handler.type === type &&
        (!func || handler.func === func)
      ) {
        obj.removeEventListener(type, handler.func);
        indexes.push(index);
      }
    });
    if (indexes.length) {
      _.pullAt(this.eventHandlers, indexes);
    }

    return this;
  }

  removeEventListeners() {
    this.eventHandlers.forEach((handler) => {
      if (
        this.id === handler.id &&
        handler.type &&
        handler.obj &&
        handler.obj.removeEventListener
      ) {
        handler.obj.removeEventListener(handler.type, handler.func);
      }
    });
    this.eventHandlers = [];
  }

  removeAllEvents(includeExternal) {
    if (this.events) {
      _.each(this.events._events, (events, type) => {
        _.each(events, (listener) => {
          if (listener && this.id === listener.id && (includeExternal || listener.internal)) {
            this.events.off(type, listener);
          }
        });
      });
    }
  }

  teardown() {
    delete this.i18next;
    delete this.events;
  }

  /**
   * Removes all event listeners attached to this component.
   * @param {boolean} all - If all events should be removed, including external events.
   */
  destroy(all = false) {
    this.removeEventListeners();
    this.removeAllEvents();
    if (all) {
      this.teardown();
    }
  }

  /**
   * Append an HTML DOM element to a container.
   * @param {HTMLElement} element - The DOM element to append.
   * @param {HTMLElement} container - The DOM element that is the container of the element getting appended.
   * @returns {this} - The instance of the element.
   */
  appendTo(element, container) {
    container?.appendChild(element);
    return this;
  }

  /**
   * Prepend an HTML DOM element to a container.
   * @param {HTMLElement} element - The DOM element to prepend.
   * @param {HTMLElement} container - The DOM element that is the container of the element getting prepended.
   * @returns {this} - The instance of the element.
   */
  prependTo(element, container) {
    if (container) {
      if (container.firstChild) {
        try {
          container.insertBefore(element, container.firstChild);
        } catch (err) {
          console.warn(err);
          container.appendChild(element);
        }
      } else {
        container.appendChild(element);
      }
    }

    return this;
  }

  /**
   * Removes an HTML DOM element from its bounding container.
   * @param {HTMLElement} element - The element to remove.
   * @param {HTMLElement} container - The DOM element that is the container of the element to remove.
   * @returns {this} - The instance of the element.
   */
  removeChildFrom(element, container) {
    if (container && container.contains(element)) {
      try {
        container.removeChild(element);
      } catch (err) {
        console.warn(err);
      }
    }

    return this;
  }

  /**
   * Alias for document.createElement.
   * @param {string} type - The type of element to create
   * @param {object} attr - The element attributes to add to the created element.
   * @param {Various} children - Child elements. Can be a DOM Element, string or array of both.
   * @returns {HTMLElement} - The created element.
   */
  ce(type, attr, children = null) {
    // console.warn('Call to deprecated this.ce(). Dom elements should be created with templates, not manually with ce.');
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
   * @param {HTMLElement} element - The element to append to.
   * @param {HTMLElement} child - The child element to append.
   * @returns {this} - The instance of the element.
   */
  appendChild(element, child) {
    if (Array.isArray(child)) {
      child.forEach((oneChild) => this.appendChild(element, oneChild));
    } else if (child instanceof HTMLElement || child instanceof Text) {
      element.appendChild(child);
    } else if (child) {
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
    return mask.map((char) => (char instanceof RegExp ? this.placeholderChar : char)).join('');
  }

  /**
   * Get the placeholder character for the input mask.
   * @returns {string} - The placeholder character.
   */
  get placeholderChar() {
    return this.component?.inputMaskPlaceholderChar || '_';
  }

  /**
   * Sets the input mask for an input.
   * @param {HTMLElement} input - The html input to apply the mask to.
   * @param {string} inputMask - The input mask to add to this input.
   * @param {boolean} usePlaceholder - Set the mask placeholder on the input.
   */
  setInputMask(input, inputMask, usePlaceholder) {
    if (input && inputMask) {
      const mask = FormioUtils.getInputMask(inputMask, this.placeholderChar);
      this.defaultMask = mask;

      try {
        //destroy previous mask
        if (input.mask) {
          input.mask.destroy();
        }

        input.mask = maskInput({
          inputElement: input,
          mask,
          placeholderChar: this.placeholderChar,
          shadowRoot: this.root?.shadowRoot || this.settings?.shadowRoot,
        });
      } catch (e) {
        // Don't pass error up, to prevent form rejection.
        // Internal bug of vanilla-text-mask on iOS (`selectionEnd`);
        console.warn(e);
      }
      if (mask.numeric) {
        input.setAttribute('pattern', '\\d*');
      }
      if (usePlaceholder) {
        input.setAttribute('placeholder', this.maskPlaceholder(mask));
      }
    }
  }

  /**
   * Translate a text using the i18n system.
   * @param {string|Array<string>} text - The i18n identifier.
   * @param {...any} args - The arguments to pass to the i18n translation.
   * @returns {string} - The translated text.
   */
  t(text, ...args) {
    return this.i18next ? this.i18next.t(text, ...args) : text;
  }

  /**
   * Alias to create a text node.
   * @param {string} text - The text to create.
   * @returns {HtmlElement} - The created text node.
   */
  text(text) {
    return document.createTextNode(this.t(text));
  }

  /**
   * Adds an object of attributes onto an element.
   * @param {HtmlElement} element - The element to add the attributes to.
   * @param {object} attr - The attributes to add to the input element.
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
        } else {
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
   * @param {HTMLElement} element - The element to check for the class.
   * @param {string} className - The class to check for.
   * @returns {boolean} - TRUE if the element has the class, FALSE otherwise.
   */
  hasClass(element, className) {
    if (!element) {
      return false;
    }
    // Allow templates to intercept.
    className = ` ${className} `;
    return ` ${element.className} `.replace(/[\n\t\r]/g, ' ').indexOf(className) > -1;
  }

  /**
   * Adds a class to a DOM element.
   * @param {HTMLElement} element - The element to add a class to.
   * @param {string} className - The name of the class to add.
   * @returns {this} - The instance of the element.
   */
  addClass(element, className) {
    if (!element || !(element instanceof HTMLElement)) {
      return this;
    }
    // Allow templates to intercept.
    const classes = element.getAttribute('class');
    if (!classes?.includes(className)) {
      element.setAttribute('class', `${classes} ${className}`);
    }

    return this;
  }

  /**
   * Remove a class from a DOM element.
   * @param {HTMLElement} element - The DOM element to remove the class from.
   * @param {string} className - The name of the class that is to be removed.
   * @returns {this} - The instance of the element.
   */
  removeClass(element, className) {
    if (!element || !className || !(element instanceof HTMLElement)) {
      return this;
    }
    // Allow templates to intercept.
    let cls = element.getAttribute('class');
    if (cls) {
      cls = cls.replace(new RegExp(` ${className}`, 'g'), '');
      element.setAttribute('class', cls);
    }

    return this;
  }

  /**
   * Empty's an HTML DOM element.
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
   * Create an evaluation context for all script executions and interpolations.
   * @param {object} additional - Additional context to apply to the evaluation context.
   * @returns {*} - The evaluation context.
   */
  evalContext(additional) {
    return Object.assign(
      {
        _,
        utils: FormioUtils,
        util: FormioUtils,
        user: Formio.getUser(),
        moment,
        instance: this,
        self: this,
        token: Formio.getToken({
          decode: true,
        }),
        options: this.options,
        config:
          this.root && this.root.form && this.root.form.config
            ? this.root.form.config
            : this.options?.formConfig
              ? this.options.formConfig
              : {},
      },
      additional,
      _.get(this.root, 'options.evalContext', {}),
    );
  }

  /**
   * Performs an interpolation using the evaluation context of this component.
   * @param {string} string - The string to interpolate.
   * @param {object} data - The data to use in the interpolation.
   * @param {object} options - The options to pass to the interpolation.
   * @returns {XML|string|*|void} - The interpolated string.
   */
  interpolate(string, data, options = {}) {
    if (
      typeof string !== 'function' &&
      (this.component.content || this.component.html) &&
      !FormioUtils.Evaluator.templateSettings.interpolate.test(string)
    ) {
      string = FormioUtils.translateHTMLTemplate(String(string), (value) => this.t(value));
    }

    if (this.component.filter === string && !this.options.building) {
      const evalContext = this.evalContext(data);
      evalContext.data = _.mapValues(evalContext.data, (val) =>
        _.isString(val) ? encodeURIComponent(val) : val,
      );
      return FormioUtils.interpolate(string, evalContext, options);
    }
    return FormioUtils.interpolate(string, this.evalContext(data), options);
  }

  /**
   * Performs an evaluation using the evaluation context of this component.
   * @param {string|Function|object} func - The function or string to evaluate.
   * @param {object} args - The arguments to pass to the evaluation.
   * @param {string} ret - The name of the variable within the evaluation context to return.
   * @param {boolean} interpolate - Determines if it should replace all {{ }} token references with actual data.
   * @param {import('@formio/core').EvaluatorOptions} options - The options to pass to the evaluation.
   * @returns {*} - The result of the evaluation.
   */
  evaluate(func, args, ret, interpolate, options = {}) {
    return FormioUtils.evaluate(func, this.evalContext(args), ret, interpolate, options);
  }

  /**
   * Allow for options to hook into the functionality of this renderer.
   * @returns {*} - The result of the hook function.
   */
  hook() {
    const name = arguments[0];
    if (this.options && this.options.hooks && this.options.hooks[name]) {
      return this.options.hooks[name].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      // If this is an async hook instead of a sync.
      const fn =
        typeof arguments[arguments.length - 1] === 'function'
          ? arguments[arguments.length - 1]
          : null;
      if (fn) {
        return fn(null, arguments[1]);
      } else {
        return arguments[1];
      }
    }
  }
}
