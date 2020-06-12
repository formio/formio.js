/**
 * Determine if a component is a layout component or not.
 *
 * @param {Object} component
 *   The component to check.
 *
 * @returns {Boolean}
 *   Whether or not the component is a layout component.
 */
export function isLayoutComponent(component: any): boolean;
/**
 * Iterate through each component within a form.
 *
 * @param {Object} components
 *   The components to iterate.
 * @param {Function} fn
 *   The iteration function to invoke for each component.
 * @param {Boolean} includeAll
 *   Whether or not to include layout components.
 * @param {String} path
 *   The current data path of the element. Example: data.user.firstName
 * @param {Object} parent
 *   The parent object.
 */
export function eachComponent(components: any, fn: Function, includeAll: boolean, path: string, parent: any): void;
/**
 * Matches if a component matches the query.
 *
 * @param component
 * @param query
 * @return {boolean}
 */
export function matchComponent(component: any, query: any): boolean;
/**
 * Get a component by its key
 *
 * @param {Object} components
 *   The components to iterate.
 * @param {String|Object} key
 *   The key of the component to get, or a query of the component to search.
 *
 * @returns {Object}
 *   The component that matches the given key, or undefined if not found.
 */
export function getComponent(components: any, key: string | any, includeAll: any): any;
/**
 * Finds a component provided a query of properties of that component.
 *
 * @param components
 * @param query
 * @return {*}
 */
export function searchComponents(components: any, query: any): any;
/**
 * Deprecated version of findComponents. Renamed to searchComponents.
 *
 * @param components
 * @param query
 * @returns {*}
 */
export function findComponents(components: any, query: any): any;
/**
 * This function will find a component in a form and return the component AND THE PATH to the component in the form.
 * Path to the component is stored as an array of nested components and their indexes.The Path is being filled recursively
 * when you iterating through the nested structure.
 * If the component is not found the callback won't be called and function won't return anything.
 *
 * @param components
 * @param key
 * @param fn
 * @param path
 * @returns {*}
 */
export function findComponent(components: any, key: any, path: any, fn: any): any;
/**
 * Remove a component by path.
 *
 * @param components
 * @param path
 */
export function removeComponent(components: any, path: any): void;
export function generateFormChange(type: any, data: any): {
    op: string;
    key: any;
    container: any;
    path: any;
    index: any;
    component: any;
    patches?: undefined;
} | {
    op: string;
    key: any;
    patches: import("fast-json-patch").Operation[];
    container?: undefined;
    path?: undefined;
    index?: undefined;
    component?: undefined;
} | {
    op: string;
    key: any;
    container?: undefined;
    path?: undefined;
    index?: undefined;
    component?: undefined;
    patches?: undefined;
};
export function applyFormChanges(form: any, changes: any): {
    form: any;
    failed: any[];
};
/**
 * Flatten the form components for data manipulation.
 *
 * @param {Object} components
 *   The components to iterate.
 * @param {Boolean} includeAll
 *   Whether or not to include layout components.
 *
 * @returns {Object}
 *   The flattened components map.
 */
export function flattenComponents(components: any, includeAll: boolean): any;
/**
 * Returns if this component has a conditional statement.
 *
 * @param component - The component JSON schema.
 *
 * @returns {boolean} - TRUE - This component has a conditional, FALSE - No conditional provided.
 */
export function hasCondition(component: any): boolean;
/**
 * Extension of standard #parseFloat(value) function, that also clears input string.
 *
 * @param {any} value
 *   The value to parse.
 *
 * @returns {Number}
 *   Parsed value.
 */
export function parseFloatExt(value: any): number;
/**
 * Formats provided value in way how Currency component uses it.
 *
 * @param {any} value
 *   The value to format.
 *
 * @returns {String}
 *   Value formatted for Currency component.
 */
export function formatAsCurrency(value: any): string;
/**
 * Escapes RegEx characters in provided String value.
 *
 * @param {String} value
 *   String for escaping RegEx characters.
 * @returns {string}
 *   String with escaped RegEx characters.
 */
export function escapeRegExCharacters(value: string): string;
/**
 * Get the value for a component key, in the given submission.
 *
 * @param {Object} submission
 *   A submission object to search.
 * @param {String} key
 *   A for components API key to search for.
 */
export function getValue(submission: any, key: string): any;
/**
 * Iterate over all components in a form and get string values for translation.
 * @param form
 */
export function getStrings(form: any): any[];
