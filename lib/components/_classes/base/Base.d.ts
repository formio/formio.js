/**
 * The root component for all elements within the Form.io renderer.
 */
export default class Base {
    constructor(options: any);
    /**
     * The options for this component.
     * @type {{}}
     */
    options: {};
    /**
     * The ID of this component. This value is auto-generated when the component is created, but
     * can also be provided from the component.id value passed into the constructor.
     * @type {string}
     */
    id: string;
    /**
     * An array of event handlers so that the destry command can deregister them.
     * @type {Array}
     */
    eventHandlers: any[];
    i18next: any;
    /**
     * An instance of the EventEmitter class to handle the emitting and registration of events.
     *
     * @type {EventEmitter}
     */
    events: EventEmitter;
    defaultMask: any[];
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
    on(event: string, cb: Function, internal: any, once?: boolean): EventEmitter | import("eventemitter2").Listener;
    /**
     * Register for a new single-fire event within this component.
     *
     * @param {string} event - The event you wish to register the handler for.
     * @param {function} cb - The callback handler to handle this event.
     */
    once(event: string, cb: Function, internal: any): EventEmitter | import("eventemitter2").Listener;
    /**
     * Allow catching any event.
     *
     * @param cb
     * @returns {this}
     */
    onAny(cb: any): this;
    /**
     * Removes all listeners for a certain event.
     *
     * @param event
     */
    off(event: any): void;
    /**
     * Emit a new event.
     *
     * @param {string} event - The event to emit.
     * @param {Object} data - The data to emit with the handler.
     */
    emit(event: string, ...data: any): void;
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
    addEventListener(obj: any, type: any, func: any, persistent: any): Base;
    /**
     * Remove an event listener from the object.
     *
     * @param obj
     * @param type
     */
    removeEventListener(obj: any, type: any, func?: any): Base;
    removeEventListeners(): void;
    removeAllEvents(includeExternal: any): void;
    /**
     * Removes all event listeners attached to this component.
     */
    destroy(): void;
    /**
     * Append an HTML DOM element to a container.
     *
     * @param element
     * @param container
     */
    appendTo(element: any, container: any): Base;
    /**
     * Prepend an HTML DOM element to a container.
     *
     * @param {HTMLElement} element - The DOM element to prepend.
     * @param {HTMLElement} container - The DOM element that is the container of the element getting prepended.
     */
    prependTo(element: HTMLElement, container: HTMLElement): Base;
    /**
     * Removes an HTML DOM element from its bounding container.
     *
     * @param {HTMLElement} element - The element to remove.
     * @param {HTMLElement} container - The DOM element that is the container of the element to remove.
     */
    removeChildFrom(element: HTMLElement, container: HTMLElement): Base;
    /**
     * Alias for document.createElement.
     *
     * @param {string} type - The type of element to create
     * @param {Object} attr - The element attributes to add to the created element.
     * @param {Various} children - Child elements. Can be a DOM Element, string or array of both.
     *
     * @return {HTMLElement} - The created element.
     */
    ce(type: string, attr: any, children?: any): HTMLElement;
    /**
     * Append different types of children.
     *
     * @param child
     */
    appendChild(element: any, child: any): Base;
    /**
     * Creates a new input mask placeholder.
     * @param {HTMLElement} mask - The input mask.
     * @returns {string} - The placeholder that will exist within the input as they type.
     */
    maskPlaceholder(mask: HTMLElement): string;
    /**
     * Sets the input mask for an input.
     *
     * @param {HTMLElement} input - The html input to apply the mask to.
     * @param {String} inputMask - The input mask to add to this input.
     * @param {Boolean} placeholder - Set the mask placeholder on the input.
     */
    setInputMask(input: HTMLElement, inputMask: string, placeholder: boolean): void;
    /**
     * Translate a text using the i18n system.
     *
     * @param {string} text - The i18n identifier.
     * @param {Object} params - The i18n parameters to use for translation.
     */
    t(text: string, params: any): any;
    /**
     * Alias to create a text node.
     * @param text
     * @returns {Text}
     */
    text(text: any): Text;
    /**
     * Adds an object of attributes onto an element.
     * @param {HtmlElement} element - The element to add the attributes to.
     * @param {Object} attr - The attributes to add to the input element.
     */
    attr(element: any, attr: any): void;
    /**
     * Determines if an element has a class.
     *
     * Taken from jQuery https://j11y.io/jquery/#v=1.5.0&fn=jQuery.fn.hasClass
     */
    hasClass(element: any, className: any): boolean;
    /**
     * Adds a class to a DOM element.
     *
     * @param element
     *   The element to add a class to.
     * @param className
     *   The name of the class to add.
     */
    addClass(element: any, className: any): Base;
    /**
     * Remove a class from a DOM element.
     *
     * @param element
     *   The DOM element to remove the class from.
     * @param className
     *   The name of the class that is to be removed.
     */
    removeClass(element: any, className: any): Base;
    /**
     * Empty's an HTML DOM element.
     *
     * @param {HTMLElement} element - The element you wish to empty.
     */
    empty(element: HTMLElement): void;
    /**
     * Create an evaluation context for all script executions and interpolations.
     *
     * @param additional
     * @return {*}
     */
    evalContext(additional: any): any;
    /**
     * Performs an interpolation using the evaluation context of this component.
     *
     * @param string
     * @param data
     * @return {XML|string|*|void}
     */
    interpolate(string: any, data: any): any | string | any | void;
    /**
     * Performs an evaluation using the evaluation context of this component.
     *
     * @param func
     * @param args
     * @param ret
     * @param tokenize
     * @return {*}
     */
    evaluate(func: any, args: any, ret: any, tokenize: any): any;
    /**
     * Allow for options to hook into the functionality of this renderer.
     * @return {*}
     */
    hook(...args: any[]): any;
}
import { EventEmitter2 as EventEmitter } from "eventemitter2";
