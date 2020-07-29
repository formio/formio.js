var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { EventEmitter2 as EventEmitter } from 'eventemitter2';
import { Formio } from '../../../Formio';
import * as FormioUtils from '../../../utils/utils';
import i18next from 'i18next';
import _ from 'lodash';
import moment from 'moment';
import maskInput from 'vanilla-text-mask';
/**
 * The root component for all elements within the Form.io renderer.
 */
var Base = /** @class */ (function () {
    function Base(options) {
        /**
         * The options for this component.
         * @type {{}}
         */
        this.options = Object.assign({
            language: 'en',
            highlightErrors: true,
            componentErrorClass: '',
            componentWarningClass: '',
            componentInfoClass: '',
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
    Base.prototype.on = function (event, cb, internal, once) {
        if (internal === void 0) { internal = false; }
        if (once === void 0) { once = false; }
        if (!this.events) {
            return;
        }
        var type = this.options.namespace + "." + event;
        // Store the component id in the handler so that we can determine which events are for this component.
        cb.id = this.id;
        cb.internal = internal;
        // Register for this event.
        return this.events[once ? 'once' : 'on'](type, cb);
    };
    /**
     * Register for a new single-fire event within this component.
     *
     * @param {string} event - The event you wish to register the handler for.
     * @param {function} cb - The callback handler to handle this event.
     */
    Base.prototype.once = function (event, cb, internal) {
        if (internal === void 0) { internal = false; }
        return this.on(event, cb, internal, true);
    };
    /**
     * Allow catching any event.
     *
     * @param cb
     * @returns {this}
     */
    Base.prototype.onAny = function (cb) {
        if (!this.events) {
            return;
        }
        return this.events.onAny(cb);
    };
    /**
     * Removes all listeners for a certain event.
     *
     * @param event
     */
    Base.prototype.off = function (event) {
        var _this = this;
        if (!this.events) {
            return;
        }
        var type = this.options.namespace + "." + event;
        // Iterate through all the internal events.
        _.each(this.events.listeners(type), function (listener) {
            // Ensure this event is for this component.
            if (listener && (listener.id === _this.id)) {
                // Turn off this event handler.
                _this.events.off(type, listener);
            }
        });
    };
    /**
     * Emit a new event.
     *
     * @param {string} event - The event to emit.
     * @param {Object} data - The data to emit with the handler.
     */
    Base.prototype.emit = function (event) {
        var _a;
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (this.events) {
            (_a = this.events).emit.apply(_a, __spreadArrays([this.options.namespace + "." + event], data));
        }
    };
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
    Base.prototype.addEventListener = function (obj, type, func, persistent) {
        if (!obj) {
            return;
        }
        if (!persistent) {
            this.eventHandlers.push({ id: this.id, obj: obj, type: type, func: func });
        }
        if ('addEventListener' in obj) {
            obj.addEventListener(type, func, false);
        }
        else if ('attachEvent' in obj) {
            obj.attachEvent("on" + type, func);
        }
        return this;
    };
    /**
     * Remove an event listener from the object.
     *
     * @param obj
     * @param type
     */
    Base.prototype.removeEventListener = function (obj, type, func) {
        var _this = this;
        if (func === void 0) { func = null; }
        var indexes = [];
        this.eventHandlers.forEach(function (handler, index) {
            if ((handler.id === _this.id)
                && obj.removeEventListener
                && (handler.type === type)
                && (!func || handler.func === func)) {
                obj.removeEventListener(type, handler.func);
                indexes.push(index);
            }
        });
        if (indexes.length) {
            _.pullAt(this.eventHandlers, indexes);
        }
        return this;
    };
    Base.prototype.removeEventListeners = function () {
        var _this = this;
        this.eventHandlers.forEach(function (handler) {
            if ((_this.id === handler.id) && handler.type && handler.obj && handler.obj.removeEventListener) {
                handler.obj.removeEventListener(handler.type, handler.func);
            }
        });
        this.eventHandlers = [];
    };
    Base.prototype.removeAllEvents = function (includeExternal) {
        var _this = this;
        _.each(this.events._events, function (events, type) {
            _.each(events, function (listener) {
                if (listener && (_this.id === listener.id) && (includeExternal || listener.internal)) {
                    _this.events.off(type, listener);
                }
            });
        });
    };
    /**
     * Removes all event listeners attached to this component.
     */
    Base.prototype.destroy = function () {
        this.removeEventListeners();
        this.removeAllEvents();
    };
    /**
     * Append an HTML DOM element to a container.
     *
     * @param element
     * @param container
     */
    Base.prototype.appendTo = function (element, container) {
        container === null || container === void 0 ? void 0 : container.appendChild(element);
        return this;
    };
    /**
     * Prepend an HTML DOM element to a container.
     *
     * @param {HTMLElement} element - The DOM element to prepend.
     * @param {HTMLElement} container - The DOM element that is the container of the element getting prepended.
     */
    Base.prototype.prependTo = function (element, container) {
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
    };
    /**
     * Removes an HTML DOM element from its bounding container.
     *
     * @param {HTMLElement} element - The element to remove.
     * @param {HTMLElement} container - The DOM element that is the container of the element to remove.
     */
    Base.prototype.removeChildFrom = function (element, container) {
        if (container && container.contains(element)) {
            try {
                container.removeChild(element);
            }
            catch (err) {
                console.warn(err);
            }
        }
        return this;
    };
    /**
     * Alias for document.createElement.
     *
     * @param {string} type - The type of element to create
     * @param {Object} attr - The element attributes to add to the created element.
     * @param {Various} children - Child elements. Can be a DOM Element, string or array of both.
     *
     * @return {HTMLElement} - The created element.
     */
    Base.prototype.ce = function (type, attr, children) {
        if (children === void 0) { children = null; }
        // console.warn('Call to deprecated this.ce(). Dom elements should be created with templates, not manually with ce.');
        // Create the element.
        var element = document.createElement(type);
        // Add attributes.
        if (attr) {
            this.attr(element, attr);
        }
        // Append the children.
        this.appendChild(element, children);
        return element;
    };
    /**
     * Append different types of children.
     *
     * @param child
     */
    Base.prototype.appendChild = function (element, child) {
        var _this = this;
        if (Array.isArray(child)) {
            child.forEach(function (oneChild) { return _this.appendChild(element, oneChild); });
        }
        else if (child instanceof HTMLElement || child instanceof Text) {
            element.appendChild(child);
        }
        else if (child) {
            element.appendChild(this.text(child.toString()));
        }
        return this;
    };
    /**
     * Creates a new input mask placeholder.
     * @param {HTMLElement} mask - The input mask.
     * @returns {string} - The placeholder that will exist within the input as they type.
     */
    Base.prototype.maskPlaceholder = function (mask) {
        return mask.map(function (char) { return (char instanceof RegExp) ? '_' : char; }).join('');
    };
    /**
     * Sets the input mask for an input.
     *
     * @param {HTMLElement} input - The html input to apply the mask to.
     * @param {String} inputMask - The input mask to add to this input.
     * @param {Boolean} placeholder - Set the mask placeholder on the input.
     */
    Base.prototype.setInputMask = function (input, inputMask, placeholder) {
        if (input && inputMask) {
            var mask = FormioUtils.getInputMask(inputMask);
            this.defaultMask = mask;
            try {
                //destroy previous mask
                if (input.mask) {
                    input.mask.destroy();
                }
                input.mask = maskInput({
                    inputElement: input,
                    mask: mask
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
        }
    };
    /**
     * Translate a text using the i18n system.
     *
     * @param {string|Array<string>} text - The i18n identifier.
     * @param {Object} params - The i18n parameters to use for translation.
     */
    Base.prototype.t = function (text) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.i18next).t.apply(_a, __spreadArrays([text], args));
    };
    /**
     * Alias to create a text node.
     * @param text
     * @returns {Text}
     */
    Base.prototype.text = function (text) {
        return document.createTextNode(this.t(text));
    };
    /**
     * Adds an object of attributes onto an element.
     * @param {HtmlElement} element - The element to add the attributes to.
     * @param {Object} attr - The attributes to add to the input element.
     */
    Base.prototype.attr = function (element, attr) {
        var _this = this;
        if (!element) {
            return;
        }
        _.each(attr, function (value, key) {
            if (typeof value !== 'undefined') {
                if (key.indexOf('on') === 0) {
                    // If this is an event, add a listener.
                    _this.addEventListener(element, key.substr(2).toLowerCase(), value);
                }
                else {
                    // Otherwise it is just an attribute.
                    element.setAttribute(key, value);
                }
            }
        });
    };
    /**
     * Determines if an element has a class.
     *
     * Taken from jQuery https://j11y.io/jquery/#v=1.5.0&fn=jQuery.fn.hasClass
     */
    Base.prototype.hasClass = function (element, className) {
        if (!element) {
            return false;
        }
        // Allow templates to intercept.
        className = " " + className + " ";
        return ((" " + element.className + " ").replace(/[\n\t\r]/g, ' ').indexOf(className) > -1);
    };
    /**
     * Adds a class to a DOM element.
     *
     * @param element
     *   The element to add a class to.
     * @param className
     *   The name of the class to add.
     */
    Base.prototype.addClass = function (element, className) {
        if (!element || !(element instanceof HTMLElement)) {
            return this;
        }
        // Allow templates to intercept.
        var classes = element.getAttribute('class');
        if (!(classes === null || classes === void 0 ? void 0 : classes.includes(className))) {
            element.setAttribute('class', classes + " " + className);
        }
        return this;
    };
    /**
     * Remove a class from a DOM element.
     *
     * @param element
     *   The DOM element to remove the class from.
     * @param className
     *   The name of the class that is to be removed.
     */
    Base.prototype.removeClass = function (element, className) {
        if (!element || !className || !(element instanceof HTMLElement)) {
            return this;
        }
        // Allow templates to intercept.
        var cls = element.getAttribute('class');
        if (cls) {
            cls = cls.replace(new RegExp(" " + className, 'g'), '');
            element.setAttribute('class', cls);
        }
        return this;
    };
    /**
     * Empty's an HTML DOM element.
     *
     * @param {HTMLElement} element - The element you wish to empty.
     */
    Base.prototype.empty = function (element) {
        if (element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
    };
    /**
     * Create an evaluation context for all script executions and interpolations.
     *
     * @param additional
     * @return {*}
     */
    Base.prototype.evalContext = function (additional) {
        return Object.assign({
            _: _,
            utils: FormioUtils,
            util: FormioUtils,
            user: Formio.getUser(),
            moment: moment,
            instance: this,
            self: this,
            token: Formio.getToken({
                decode: true
            }),
            config: this.root && this.root.form && this.root.form.config ? this.root.form.config : {},
        }, additional, _.get(this.root, 'options.evalContext', {}));
    };
    /**
     * Performs an interpolation using the evaluation context of this component.
     *
     * @param string
     * @param data
     * @return {XML|string|*|void}
     */
    Base.prototype.interpolate = function (string, data) {
        return FormioUtils.interpolate(string, this.evalContext(data));
    };
    /**
     * Performs an evaluation using the evaluation context of this component.
     *
     * @param func
     * @param args
     * @param ret
     * @param tokenize
     * @return {*}
     */
    Base.prototype.evaluate = function (func, args, ret, tokenize) {
        return FormioUtils.evaluate(func, this.evalContext(args), ret, tokenize);
    };
    /**
     * Allow for options to hook into the functionality of this renderer.
     * @return {*}
     */
    Base.prototype.hook = function () {
        var name = arguments[0];
        if (this.options &&
            this.options.hooks &&
            this.options.hooks[name]) {
            return this.options.hooks[name].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else {
            // If this is an async hook instead of a sync.
            var fn = (typeof arguments[arguments.length - 1] === 'function') ? arguments[arguments.length - 1] : null;
            if (fn) {
                return fn(null, arguments[1]);
            }
            else {
                return arguments[1];
            }
        }
    };
    return Base;
}());
export default Base;
