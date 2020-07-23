/**
 * Evaluate a method.
 *
 * @param func
 * @param args
 * @return {*}
 */
export function evaluate(func: any, args: any, ret: any, tokenize: any): any;
export function getRandomComponentId(): string;
/**
 * Get a property value of an element.
 *
 * @param style
 * @param prop
 * @return {number}
 */
export function getPropertyValue(style: any, prop: any): number;
/**
 * Get an elements bounding rectagle.
 *
 * @param element
 * @return {{x: string, y: string, width: string, height: string}}
 */
export function getElementRect(element: any): {
    x: string;
    y: string;
    width: string;
    height: string;
};
/**
 * Determines the boolean value of a setting.
 *
 * @param value
 * @return {boolean}
 */
export function boolValue(value: any): boolean;
/**
 * Check to see if an ID is a mongoID.
 * @param text
 * @return {Array|{index: number, input: string}|Boolean|*}
 */
export function isMongoId(text: any): Array | {
    index: number;
    input: string;
} | boolean | any;
/**
 * Checks the calculated value for a provided component and data.
 *
 * @param {Object} component
 *   The component to check for the calculated value.
 * @param {Object} submission
 *   A submission object.
 * @param data
 *   The full submission data.
 */
export function checkCalculated(component: any, submission: any, rowData: any): void;
/**
 * Check if a simple conditional evaluates to true.
 *
 * @param condition
 * @param condition
 * @param row
 * @param data
 * @returns {boolean}
 */
export function checkSimpleConditional(component: any, condition: any, row: any, data: any): boolean;
/**
 * Check custom javascript conditional.
 *
 * @param component
 * @param custom
 * @param row
 * @param data
 * @returns {*}
 */
export function checkCustomConditional(component: any, custom: any, row: any, data: any, form: any, variable: any, onError: any, instance: any): any;
export function checkJsonConditional(component: any, json: any, row: any, data: any, form: any, onError: any): any;
/**
 * Checks the conditions for a provided component and data.
 *
 * @param component
 *   The component to check for the condition.
 * @param row
 *   The data within a row
 * @param data
 *   The full submission data.
 *
 * @returns {boolean}
 */
export function checkCondition(component: any, row: any, data: any, form: any, instance: any): boolean;
/**
 * Test a trigger on a component.
 *
 * @param component
 * @param action
 * @param data
 * @param row
 * @returns {mixed}
 */
export function checkTrigger(component: any, trigger: any, row: any, data: any, form: any, instance: any): any;
export function setActionProperty(component: any, action: any, result: any, row: any, data: any, instance: any): any;
/**
 * Unescape HTML characters like &lt, &gt, &amp and etc.
 * @param str
 * @returns {string}
 */
export function unescapeHTML(str: any): string;
/**
 * Make HTML element from string
 * @param str
 * @param selector
 * @returns {HTMLElement}
 */
export function convertStringToHTMLElement(str: any, selector: any): HTMLElement;
/**
 * Make a filename guaranteed to be unique.
 * @param name
 * @param template
 * @param evalContext
 * @returns {string}
 */
export function uniqueName(name: any, template: any, evalContext: any): string;
export function guid(): string;
/**
 * Return a translated date setting.
 *
 * @param date
 * @return {(null|Date)}
 */
export function getDateSetting(date: any): (null | Date);
export function isValidDate(date: any): boolean;
/**
 * Get the current timezone string.
 *
 * @return {string}
 */
export function currentTimezone(): string;
/**
 * Get an offset date provided a date object and timezone object.
 *
 * @param date
 * @param timezone
 * @return {Date}
 */
export function offsetDate(date: any, timezone: any): Date;
/**
 * Returns if the zones are loaded.
 *
 * @return {boolean}
 */
export function zonesLoaded(): boolean;
/**
 * Returns if we should load the zones.
 *
 * @param timezone
 * @return {boolean}
 */
export function shouldLoadZones(timezone: any): boolean;
/**
 * Externally load the timezone data.
 *
 * @return {Promise<any> | *}
 */
export function loadZones(timezone: any): Promise<any> | any;
/**
 * Get the moment date object for translating dates with timezones.
 *
 * @param value
 * @param format
 * @param timezone
 * @return {*}
 */
export function momentDate(value: any, format: any, timezone: any): any;
/**
 * Format a date provided a value, format, and timezone object.
 *
 * @param value
 * @param format
 * @param timezone
 * @return {string}
 */
export function formatDate(value: any, format: any, timezone: any): string;
/**
 * Pass a format function to format within a timezone.
 *
 * @param formatFn
 * @param date
 * @param format
 * @param timezone
 * @return {string}
 */
export function formatOffset(formatFn: any, date: any, format: any, timezone: any): string;
export function getLocaleDateFormatInfo(locale: any): {
    dayFirst: boolean;
};
/**
 * Convert the format from the angular-datepicker module to flatpickr format.
 * @param format
 * @return {string}
 */
export function convertFormatToFlatpickr(format: any): string;
/**
 * Convert the format from the angular-datepicker module to moment format.
 * @param format
 * @return {string}
 */
export function convertFormatToMoment(format: any): string;
export function convertFormatToMask(format: any): any;
/**
 * Returns an input mask that is compatible with the input mask library.
 * @param {string} mask - The Form.io input mask.
 * @returns {Array} - The input mask for the mask library.
 */
export function getInputMask(mask: string): any[];
export function matchInputMask(value: any, inputMask: any): boolean;
export function getNumberSeparators(lang?: string): {
    delimiter: string;
    decimalSeparator: string;
};
export function getNumberDecimalLimit(component: any, defaultLimit: any): any;
export function getCurrencyAffixes({ currency, decimalLimit, decimalSeparator, lang, }: {
    currency?: string;
    decimalLimit: any;
    decimalSeparator: any;
    lang: any;
}): {
    prefix: string;
    suffix: string;
};
/**
 * Fetch the field data provided a component.
 *
 * @param data
 * @param component
 * @return {*}
 */
export function fieldData(data: any, component: any): any;
/**
 * Delays function execution with possibility to execute function synchronously or cancel it.
 *
 * @param fn Function to delay
 * @param delay Delay time
 * @return {*}
 */
export function delay(fn: any, delay?: number, ...args: any[]): any;
/**
 * Iterate the given key to make it unique.
 *
 * @param {String} key
 *   Modify the component key to be unique.
 *
 * @returns {String}
 *   The new component key.
 */
export function iterateKey(key: string): string;
/**
 * Determines a unique key within a map provided the base key.
 *
 * @param map
 * @param base
 * @return {*}
 */
export function uniqueKey(map: any, base: any): any;
/**
 * Determines the major version number of bootstrap.
 *
 * @return {number}
 */
export function bootstrapVersion(options: any): number;
/**
 * Retrun provided argument.
 * If argument is a function, returns the result of a function call.
 * @param {*} e;
 *
 * @return {*}
 */
export function unfold(e: any): any;
export function withSwitch(a: any, b: any): (() => any)[];
export function observeOverload(callback: any, options?: {}): () => any;
export function getContextComponents(context: any): any[];
/**
 * Sanitize an html string.
 *
 * @param string
 * @returns {*}
 */
export function sanitize(string: any, options: any): any;
/**
 * Fast cloneDeep for JSON objects only.
 */
export function fastCloneDeep(obj: any): any;
export function isInputComponent(componentJson: any): any;
export function getArrayFromComponentPath(pathStr: any): any;
export function getStringFromComponentPath(path: any): any;
export function round(number: any, precision: any): any;
/**
 * Check for Internet Explorer browser version
 *
 * @return {(number|null)}
 */
export function getIEBrowserVersion(): (number | null);
export * from "./formUtils";
/**
 * Map values through unfold and return first non-nil value.
 * @param {Array<T>} collection;
 *
 * @return {T}
 */
export const firstNonNil: any;
import Evaluator from "./Evaluator";
export const interpolate: (rawTemplate: any, data: any) => any;
export { jsonLogic, moment, Evaluator };
