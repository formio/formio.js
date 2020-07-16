"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _EventEmitter = _interopRequireDefault(require("./EventEmitter"));

var _Formio = _interopRequireDefault(require("./Formio"));

var FormioUtils = _interopRequireWildcard(require("./utils/utils"));

var _i18next = _interopRequireDefault(require("i18next"));

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

var _vanillaTextMask = _interopRequireDefault(require("vanilla-text-mask"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The root component for all elements within the Form.io renderer.
 */
var Element = /*#__PURE__*/function () {
  function Element(options) {
    _classCallCheck(this, Element);

    /**
     * The options for this component.
     * @type {{}}
     */
    this.options = Object.assign({
      language: 'en',
      highlightErrors: true,
      componentErrorClass: 'formio-error-wrapper',
      componentWarningClass: 'formio-warning-wrapper',
      row: '',
      namespace: 'formio'
    }, options || {});
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

    this.eventHandlers = []; // Use the i18next that is passed in, otherwise use the global version.

    this.i18next = this.options.i18next || _i18next.default;
    /**
     * An instance of the EventEmitter class to handle the emitting and registration of events.
     *
     * @type {EventEmitter}
     */

    this.events = options && options.events ? options.events : new _EventEmitter.default({
      wildcard: false,
      maxListeners: 0
    });
    this.defaultMask = null;
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
   */


  _createClass(Element, [{
    key: "on",
    value: function on(event, cb, internal) {
      var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (!this.events) {
        return;
      }

      var type = "".concat(this.options.namespace, ".").concat(event); // Store the component id in the handler so that we can determine which events are for this component.

      cb.id = this.id;
      cb.internal = internal; // Register for this event.

      return this.events[once ? 'once' : 'on'](type, cb);
    }
    /**
     * Register for a new single-fire event within this component.
     *
     * @param {string} event - The event you wish to register the handler for.
     * @param {function} cb - The callback handler to handle this event.
     */

  }, {
    key: "once",
    value: function once(event, cb, internal) {
      return this.on(event, cb, internal, true);
    }
    /**
     * Allow catching any event.
     *
     * @param cb
     * @returns {this}
     */

  }, {
    key: "onAny",
    value: function onAny(cb) {
      if (!this.events) {
        return;
      }

      return this.events.onAny(cb);
    }
    /**
     * Removes all listeners for a certain event.
     *
     * @param event
     */

  }, {
    key: "off",
    value: function off(event) {
      var _this = this;

      if (!this.events) {
        return;
      }

      var type = "".concat(this.options.namespace, ".").concat(event); // Iterate through all the internal events.

      _lodash.default.each(this.events.listeners(type), function (listener) {
        // Ensure this event is for this component.
        if (listener && listener.id === _this.id) {
          // Turn off this event handler.
          _this.events.off(type, listener);
        }
      });
    }
    /**
     * Emit a new event.
     *
     * @param {string} event - The event to emit.
     * @param {Object} data - The data to emit with the handler.
     */

  }, {
    key: "emit",
    value: function emit(event) {
      if (this.events) {
        var _this$events;

        for (var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          data[_key - 1] = arguments[_key];
        }

        (_this$events = this.events).emit.apply(_this$events, ["".concat(this.options.namespace, ".").concat(event)].concat(data));
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

  }, {
    key: "addEventListener",
    value: function addEventListener(obj, type, func, persistent) {
      if (!obj) {
        return;
      }

      if (!persistent) {
        this.eventHandlers.push({
          id: this.id,
          obj: obj,
          type: type,
          func: func
        });
      }

      if ('addEventListener' in obj) {
        obj.addEventListener(type, func, false);
      } else if ('attachEvent' in obj) {
        obj.attachEvent("on".concat(type), func);
      }

      return this;
    }
    /**
     * Remove an event listener from the object.
     *
     * @param obj
     * @param type
     */

  }, {
    key: "removeEventListener",
    value: function removeEventListener(obj, type) {
      var _this2 = this;

      var func = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var indexes = [];
      this.eventHandlers.forEach(function (handler, index) {
        if (handler.id === _this2.id && obj.removeEventListener && handler.type === type && (!func || handler.func === func)) {
          obj.removeEventListener(type, handler.func);
          indexes.push(index);
        }
      });

      if (indexes.length) {
        _lodash.default.pullAt(this.eventHandlers, indexes);
      }

      return this;
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      var _this3 = this;

      this.eventHandlers.forEach(function (handler) {
        if (_this3.id === handler.id && handler.type && handler.obj && handler.obj.removeEventListener) {
          handler.obj.removeEventListener(handler.type, handler.func);
        }
      });
      this.eventHandlers = [];
    }
  }, {
    key: "removeAllEvents",
    value: function removeAllEvents(includeExternal) {
      var _this4 = this;

      _lodash.default.each(this.events._events, function (events, type) {
        _lodash.default.each(events, function (listener) {
          if (listener && _this4.id === listener.id && (includeExternal || listener.internal)) {
            _this4.events.off(type, listener);
          }
        });
      });
    }
    /**
     * Removes all event listeners attached to this component.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.removeEventListeners();
      this.removeAllEvents();
    }
    /**
     * Append an HTML DOM element to a container.
     *
     * @param element
     * @param container
     */

  }, {
    key: "appendTo",
    value: function appendTo(element, container) {
      container === null || container === void 0 ? void 0 : container.appendChild(element);
      return this;
    }
    /**
     * Prepend an HTML DOM element to a container.
     *
     * @param {HTMLElement} element - The DOM element to prepend.
     * @param {HTMLElement} container - The DOM element that is the container of the element getting prepended.
     */

  }, {
    key: "prependTo",
    value: function prependTo(element, container) {
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
     *
     * @param {HTMLElement} element - The element to remove.
     * @param {HTMLElement} container - The DOM element that is the container of the element to remove.
     */

  }, {
    key: "removeChildFrom",
    value: function removeChildFrom(element, container) {
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
     *
     * @param {string} type - The type of element to create
     * @param {Object} attr - The element attributes to add to the created element.
     * @param {Various} children - Child elements. Can be a DOM Element, string or array of both.
     *
     * @return {HTMLElement} - The created element.
     */

  }, {
    key: "ce",
    value: function ce(type, attr) {
      var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      // console.warn('Call to deprecated this.ce(). Dom elements should be created with templates, not manually with ce.');
      // Create the element.
      var element = document.createElement(type); // Add attributes.

      if (attr) {
        this.attr(element, attr);
      } // Append the children.


      this.appendChild(element, children);
      return element;
    }
    /**
     * Append different types of children.
     *
     * @param child
     */

  }, {
    key: "appendChild",
    value: function appendChild(element, child) {
      var _this5 = this;

      if (Array.isArray(child)) {
        child.forEach(function (oneChild) {
          return _this5.appendChild(element, oneChild);
        });
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

  }, {
    key: "maskPlaceholder",
    value: function maskPlaceholder(mask) {
      return mask.map(function (char) {
        return char instanceof RegExp ? '_' : char;
      }).join('');
    }
    /**
     * Sets the input mask for an input.
     *
     * @param {HTMLElement} input - The html input to apply the mask to.
     * @param {String} inputMask - The input mask to add to this input.
     * @param {Boolean} placeholder - Set the mask placeholder on the input.
     */

  }, {
    key: "setInputMask",
    value: function setInputMask(input, inputMask, placeholder) {
      if (input && inputMask) {
        var mask = FormioUtils.getInputMask(inputMask);
        this.defaultMask = mask;

        try {
          //destroy previous mask
          if (input.mask) {
            input.mask.destroy();
          }

          input.mask = (0, _vanillaTextMask.default)({
            inputElement: input,
            mask: mask
          });
        } catch (e) {
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
      }
    }
    /**
     * Translate a text using the i18n system.
     *
     * @param {string|Array<string>} text - The i18n identifier.
     * @param {Object} params - The i18n parameters to use for translation.
     */

  }, {
    key: "t",
    value: function t(text) {
      var _this$i18next;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return (_this$i18next = this.i18next).t.apply(_this$i18next, [text].concat(args));
    }
    /**
     * Alias to create a text node.
     * @param text
     * @returns {Text}
     */

  }, {
    key: "text",
    value: function text(_text) {
      return document.createTextNode(this.t(_text));
    }
    /**
     * Adds an object of attributes onto an element.
     * @param {HtmlElement} element - The element to add the attributes to.
     * @param {Object} attr - The attributes to add to the input element.
     */

  }, {
    key: "attr",
    value: function attr(element, _attr) {
      var _this6 = this;

      if (!element) {
        return;
      }

      _lodash.default.each(_attr, function (value, key) {
        if (typeof value !== 'undefined') {
          if (key.indexOf('on') === 0) {
            // If this is an event, add a listener.
            _this6.addEventListener(element, key.substr(2).toLowerCase(), value);
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
     */

  }, {
    key: "hasClass",
    value: function hasClass(element, className) {
      if (!element) {
        return false;
      } // Allow templates to intercept.


      className = " ".concat(className, " ");
      return " ".concat(element.className, " ").replace(/[\n\t\r]/g, ' ').indexOf(className) > -1;
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
    key: "addClass",
    value: function addClass(element, className) {
      if (!element || !(element instanceof HTMLElement)) {
        return this;
      } // Allow templates to intercept.


      var classes = element.getAttribute('class');

      if (!(classes === null || classes === void 0 ? void 0 : classes.includes(className))) {
        element.setAttribute('class', "".concat(classes, " ").concat(className));
      }

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

  }, {
    key: "removeClass",
    value: function removeClass(element, className) {
      if (!element || !className || !(element instanceof HTMLElement)) {
        return this;
      } // Allow templates to intercept.


      var cls = element.getAttribute('class');

      if (cls) {
        cls = cls.replace(new RegExp(" ".concat(className), 'g'), '');
        element.setAttribute('class', cls);
      }

      return this;
    }
    /**
     * Empty's an HTML DOM element.
     *
     * @param {HTMLElement} element - The element you wish to empty.
     */

  }, {
    key: "empty",
    value: function empty(element) {
      if (element) {
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }
      }
    }
    /**
     * Create an evaluation context for all script executions and interpolations.
     *
     * @param additional
     * @return {*}
     */

  }, {
    key: "evalContext",
    value: function evalContext(additional) {
      return Object.assign({
        _: _lodash.default,
        utils: FormioUtils,
        util: FormioUtils,
        user: _Formio.default.getUser(),
        moment: _moment.default,
        instance: this,
        self: this,
        token: _Formio.default.getToken({
          decode: true
        }),
        config: this.root && this.root.form && this.root.form.config ? this.root.form.config : {}
      }, additional, _lodash.default.get(this.root, 'options.evalContext', {}));
    }
    /**
     * Performs an interpolation using the evaluation context of this component.
     *
     * @param string
     * @param data
     * @return {XML|string|*|void}
     */

  }, {
    key: "interpolate",
    value: function interpolate(string, data) {
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

  }, {
    key: "evaluate",
    value: function evaluate(func, args, ret, tokenize) {
      return FormioUtils.evaluate(func, this.evalContext(args), ret, tokenize);
    }
    /**
     * Allow for options to hook into the functionality of this renderer.
     * @return {*}
     */

  }, {
    key: "hook",
    value: function hook() {
      var name = arguments[0];

      if (this.options && this.options.hooks && this.options.hooks[name]) {
        return this.options.hooks[name].apply(this, Array.prototype.slice.call(arguments, 1));
      } else {
        // If this is an async hook instead of a sync.
        var fn = typeof arguments[arguments.length - 1] === 'function' ? arguments[arguments.length - 1] : null;

        if (fn) {
          return fn(null, arguments[1]);
        } else {
          return arguments[1];
        }
      }
    }
  }]);

  return Element;
}();

exports.default = Element;