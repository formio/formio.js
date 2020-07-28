export default class NestedComponent extends Field {
    constructor(component: any, options: any, data: any);
    _collapsed: any;
    set collapsed(arg: any);
    get collapsed(): any;
    set rowIndex(arg: any);
    get rowIndex(): any;
    _rowIndex: any;
    componentContext(): any;
    getComponents(): any;
    /**
     * Perform a deep iteration over every component, including those
     * within other container based components.
     *
     * @param {function} fn - Called for every component.
     */
    everyComponent(fn: Function, options: any): void;
    hasComponent(component: any): boolean;
    flattenComponents(): {};
    everyExportComponent(fn: any): void;
    flattenExportComponents(): {};
    /**
     * Perform an iteration over each component within this container component.
     *
     * @param {function} fn - Called for each component
     */
    eachComponent(fn: Function): void;
    /**
     * Returns a component provided a key. This performs a deep search within the
     * component tree.
     *
     * @param {string} key - The key of the component to retrieve.
     * @param {function} fn - Called with the component once found.
     * @return {Object} - The component that is located.
     */
    getComponent(path: any, fn: Function, originalPath: any): any;
    /**
     * Return a component provided the Id of the component.
     *
     * @param {string} id - The Id of the component.
     * @param {function} fn - Called with the component once it is retrieved.
     * @return {Object} - The component retrieved.
     */
    getComponentById(id: string, fn: Function): any;
    /**
     * Return a path of component's value.
     *
     * @param {Object} component - The component instance.
     * @return {string} - The component's value path.
     */
    calculateComponentPath(component: any): string;
    /**
     * Create a new component and add it to the components array.
     *
     * @param component
     * @param data
     */
    createComponent(component: any, options: any, data: any, before: any): any;
    getContainer(): any;
    get componentComponents(): any;
    get nestedKey(): string;
    get templateName(): string;
    get lazyLoad(): any;
    components: any;
    /**
     *
     * @param element
     * @param data
     */
    addComponents(data: any, options: any): void;
    /**
     * Add a new component to the components array.
     *
     * @param {Object} component - The component JSON schema to add.
     * @param {Object} data - The submission data object to house the data for this component.
     * @param {HTMLElement} before - A DOM element to insert this element before.
     * @return {Component} - The created component instance.
     */
    addComponent(component: any, data: any, before: HTMLElement, noAdd: any): any;
    renderComponents(components: any): any;
    attachComponents(element: any, components: any, container: any): any;
    /**
     * Remove a component from the components array.
     *
     * @param {Component} component - The component to remove from the components.
     * @param {Array<Component>} components - An array of components to remove this component from.
     */
    removeComponent(component: any, components: Array<any>): void;
    /**
     * Removes a component provided the API key of that component.
     *
     * @param {string} key - The API key of the component to remove.
     * @param {function} fn - Called once the component is removed.
     * @return {null}
     */
    removeComponentByKey(key: string, fn: Function): null;
    /**
     * Removes a component provided the Id of the component.
     *
     * @param {string} id - The Id of the component to remove.
     * @param {function} fn - Called when the component is removed.
     * @return {null}
     */
    removeComponentById(id: string, fn: Function): null;
    restoreComponentsContext(): void;
    isLastPage(): boolean;
    destroyComponents(): void;
    setNestedValue(component: any, value: any, flags?: {}): any;
}
import Field from "../field/Field";
