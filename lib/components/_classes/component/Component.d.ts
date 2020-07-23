/**
 * This is the Component class
 which all elements within the FormioForm derive from.
 */
declare class Component extends Base {
    static schema(...sources: any[]): any;
    /**
     * Provides a table view for this component. Override if you wish to do something different than using getView
     * method of your instance.
     *
     * @param value
     * @param options
     */
    static tableView(value: any, options: any): void;
    /**
     * Initialize a new Component.
     *
     * @param {Object} component - The component JSON you wish to initialize.
     * @param {Object} options - The options for this component.
     * @param {Object} data - The global data submission object this component will belong.
     */
    constructor(component: any, options: any, data: any);
    /**
     * Determines if this component has a condition assigned to it.
     * @type {null}
     * @private
     */
    private _hasCondition;
    /**
     * References to dom elements
     */
    refs: {};
    /**
     * Set the validator instance.
     */
    validator: import("../../../validator/Validator").ValidationChecker;
    /**
     * The data path to this specific component instance.
     *
     * @type {string}
     */
    path: string;
    /**
     * The Form.io component JSON schema.
     * @type {*}
     */
    component: any;
    originalComponent: any;
    /**
     * If the component has been attached
     */
    attached: boolean;
    /**
     * If the component has been rendered
     */
    rendered: boolean;
    /**
     * The data object in which this component resides.
     * @type {*}
     */
    _data: any;
    /**
     * The existing error that this component has.
     * @type {string}
     */
    error: string;
    /**
     * Tool tip text after processing
     * @type {string}
     */
    tooltip: string;
    /**
     * The row path of this component.
     * @type {number}
     */
    row: number;
    /**
     * Determines if this component is disabled, or not.
     *
     * @type {boolean}
     */
    _disabled: boolean;
    /**
     * Points to the root component, usually the FormComponent.
     *
     * @type {Component}
     */
    root: Component;
    /**
     * If this input has been input and provided value.
     *
     * @type {boolean}
     */
    pristine: boolean;
    /**
     * Points to the parent component.
     *
     * @type {Component}
     */
    parent: Component;
    /**
     * The validators that are assigned to this component.
     * @type {[string]}
     */
    validators: [string];
    _path: string;
    _parentPath: any;
    /**
     * Determines if this component is visible, or not.
     */
    _parentVisible: any;
    _visible: any;
    _parentDisabled: any;
    triggerChange: (...args: any[]) => any;
    /**
     * Used to trigger a redraw event within this component.
     *
     * @type {Function}
     */
    triggerRedraw: Function;
    /**
     * list of attached tooltips
     * @type {Array}
     */
    tooltips: any[];
    invalid: boolean;
    type: any;
    /**
     * Sets the static value of this component.
     *
     * @param value
     */
    set dataValue(arg: any);
    /**
     * Get the static value of this component.
     * @return {*}
     */
    get dataValue(): any;
    /**
     * The element information for creating the input element.
     * @type {*}
     */
    info: any;
    set data(arg: any);
    get data(): any;
    mergeSchema(component?: {}): any;
    get ready(): any;
    get labelInfo(): {
        hidden: any;
        className: string;
        labelPosition: any;
        tooltipClass: string;
        for: any;
    };
    init(): void;
    /**
     * Disable this component.
     *
     * @param {boolean} disabled
     */
    set disabled(arg: boolean);
    /**
     * Return if the component is disabled.
     * @return {boolean}
     */
    get disabled(): boolean;
    get shouldDisabled(): any;
    get isInputComponent(): any;
    get allowData(): any;
    get hasInput(): any;
    get defaultSchema(): any;
    get key(): any;
    set parentVisible(arg: any);
    get parentVisible(): any;
    set parentDisabled(arg: any);
    get parentDisabled(): any;
    /**
     *
     * @param value {boolean}
     */
    set visible(arg: boolean);
    /**
     *
     * @returns {boolean}
     */
    get visible(): boolean;
    set currentForm(arg: any);
    get currentForm(): any;
    _currentForm: any;
    get fullMode(): boolean;
    get builderMode(): boolean;
    get previewMode(): boolean;
    get calculatedPath(): string;
    get labelPosition(): any;
    get labelWidth(): any;
    get labelMargin(): any;
    get isAdvancedLabel(): any;
    get labelPositions(): any;
    get skipInEmail(): boolean;
    rightDirection(direction: any): boolean;
    getLabelInfo(): {
        isRightPosition: boolean;
        isRightAlign: boolean;
        labelStyles: string;
        contentStyles: string;
    };
    /**
     * Returns only the schema that is different from the default.
     *
     * @param schema
     * @param defaultSchema
     */
    getModifiedSchema(schema: any, defaultSchema: any, recursion: any): any;
    /**
     * Returns the JSON schema for this component.
     */
    get schema(): any;
    labelIsHidden(): any;
    get transform(): any;
    getTemplate(names: any, modes: any): any;
    checkTemplate(templates: any, names: any, modes: any): any;
    checkTemplateMode(templatesByName: any, modes: any): any;
    renderTemplate(name: any, data: {}, modeOption: any): any;
    /**
     * Sanitize an html string.
     *
     * @param string
     * @returns {*}
     */
    sanitize(dirty: any): any;
    /**
     * Render a template string into html.
     *
     * @param template
     * @param data
     * @param actions
     *
     * @return {HTMLElement} - The created element.
     */
    renderString(template: any, data: any): HTMLElement;
    performInputMapping(input: any): any;
    getBrowserLanguage(): any;
    /**
     * Called before a next and previous page is triggered allowing the components
     * to perform special functions.
     *
     * @return {*}
     */
    beforePage(): any;
    beforeNext(): any;
    /**
     * Called before a submission is triggered allowing the components
     * to perform special async functions.
     *
     * @return {*}
     */
    beforeSubmit(): any;
    /**
     * Return the submission timezone.
     *
     * @return {*}
     */
    get submissionTimezone(): any;
    loadRefs(element: any, refs: any): void;
    setOpenModalElement(): void;
    getModalPreviewTemplate(): any;
    build(element: any): any;
    get hasModalSaveButton(): boolean;
    render(children?: string, topLevel?: boolean): any;
    attach(element: any): any;
    componentModal: any;
    element: any;
    addFocusBlurEvents(element: any): void;
    addShortcut(element: any, shortcut: any): void;
    removeShortcut(element: any, shortcut: any): void;
    /**
     * Remove all event handlers.
     */
    detach(): void;
    checkRefresh(refreshData: any, changed: any, flags: any): void;
    checkRefreshOn(changes: any, flags: any): void;
    /**
     * Refreshes the component with a new value.
     *
     * @param value
     */
    refresh(value: any): void;
    refreshOnChanged: boolean;
    refreshOnValue: any;
    /**
     * Checks to see if a separate component is in the "context" of this component. This is determined by first checking
     * if they share the same "data" object. It will then walk up the parent tree and compare its parents data objects
     * with the components data and returns true if they are in the same context.
     *
     * Different rows of the same EditGrid, for example, are in different contexts.
     *
     * @param component
     */
    inContext(component: any): boolean;
    get viewOnly(): any;
    createViewOnlyElement(): any;
    get defaultViewOnlyValue(): string;
    /**
     * Uses the widget to determine the output string.
     *
     * @param value
     * @return {*}
     */
    getWidgetValueAsString(value: any, options: any): any;
    getValueAsString(value: any, options: any): any;
    getView(value: any, options: any): any;
    updateItems(...args: any[]): void;
    /**
     * @param {*} data
     * @param {boolean} [forceUseValue=false] - if true, return 'value' property of the data
     * @return {*}
     */
    itemValue(data: any, forceUseValue?: boolean): any;
    itemValueForHTMLMode(value: any): any;
    createModal(element: any, attr: any, confirm: any): HTMLElement;
    /**
     * Retrieves the CSS class name of this component.
     * @returns {string} - The class name of this component.
     */
    get className(): string;
    /**
     * Build the custom style from the layout values
     * @return {string} - The custom style
     */
    get customStyle(): string;
    get isMobile(): import("ismobilejs/types").isMobileResult;
    /**
     * Returns the outside wrapping element of this component.
     * @returns {HTMLElement}
     */
    getElement(): HTMLElement;
    /**
     * Sets the pristine flag for this component.
     *
     * @param pristine {boolean} - TRUE to make pristine, FALSE not pristine.
     */
    setPristine(pristine: boolean): void;
    /**
     * Removes a value out of the data array and rebuild the rows.
     * @param {number} index - The index of the data element to remove.
     */
    removeValue(index: number): void;
    iconClass(name: any, spinning: any): any;
    size(size: any): any;
    /**
     * The readible name for this component.
     * @returns {string} - The name of the component.
     */
    get name(): string;
    /**
     * Returns the error label for this component.
     * @return {*}
     */
    get errorLabel(): any;
    /**
     * Get the error message provided a certain type of error.
     * @param type
     * @return {*}
     */
    errorMessage(type: any): any;
    setContent(element: any, content: any): boolean;
    redraw(): any;
    rebuild(): any;
    /**
     * Determines if this component has a condition defined.
     *
     * @return {null}
     */
    hasCondition(): null;
    /**
     * Check if this component is conditionally visible.
     *
     * @param data
     * @return {boolean}
     */
    conditionallyVisible(data: any, row: any): boolean;
    /**
     * Checks the condition of this component.
     *
     * TODO: Switch row and data parameters to be consistent with other methods.
     *
     * @param row - The row contextual data.
     * @param data - The global data object.
     * @return {boolean} - True if the condition applies to this component.
     */
    checkCondition(row: any, data: any): boolean;
    /**
     * Check for conditionals and hide/show the element based on those conditions.
     */
    checkComponentConditions(data: any, flags: any, row: any): boolean;
    /**
     * Checks conditions for this component and any sub components.
     * @param args
     * @return {boolean}
     */
    checkConditions(data: any, flags: any, row: any): boolean;
    get logic(): any;
    /**
     * Check all triggers and apply necessary actions.
     *
     * @param data
     */
    fieldLogic(data: any, row: any): any;
    isIE(): number | false;
    applyActions(newComponent: any, actions: any, result: any, row: any, data: any): any;
    /**
     * Add a new input error to this element.
     *
     * @param message
     * @param dirty
     */
    addMessages(messages: any): void;
    getMessageClass(level: any): any;
    setErrorClasses(elements: any, dirty: any, { hasErrors, hasWarnings, hasInfos, hasMessages, }: {
        hasErrors: any;
        hasWarnings: any;
        hasInfos: any;
        hasMessages: any;
    }): void;
    clearOnHide(): void;
    triggerRootChange(...args: any[]): void;
    onChange(flags: any, fromRoot: any): {
        instance: Component;
        component: any;
        value: any;
        flags: any;
    };
    get wysiwygDefault(): {
        quill: {
            theme: string;
            placeholder: any;
            modules: {
                toolbar: ({
                    size: (string | boolean)[];
                }[] | {
                    header: (number | boolean)[];
                }[] | {
                    font: any[];
                }[] | (string | {
                    script: string;
                })[] | ({
                    color: any[];
                    background?: undefined;
                } | {
                    background: any[];
                    color?: undefined;
                })[] | ({
                    list: string;
                    indent?: undefined;
                    align?: undefined;
                } | {
                    indent: string;
                    list?: undefined;
                    align?: undefined;
                } | {
                    align: any[];
                    list?: undefined;
                    indent?: undefined;
                })[])[];
            };
        };
        ace: {
            theme: string;
            maxLines: number;
            minLines: number;
            tabSize: number;
            mode: string;
            placeholder: any;
        };
        ckeditor: {
            image: {
                toolbar: string[];
                styles: string[];
            };
        };
        default: {};
    };
    addCKE(element: any, settings: any, onChange: any): any;
    addQuill(element: any, settings: any, onChange: any): any;
    quill: any;
    addAce(element: any, settings: any, onChange: any): any;
    get tree(): any;
    /**
     * The empty value for this component.
     *
     * @return {null}
     */
    get emptyValue(): null;
    /**
     * Returns if this component has a value set.
     *
     */
    hasValue(data: any): any;
    /**
     * Get the data value at the root level.
     *
     * @return {*}
     */
    get rootValue(): any;
    get rootPristine(): any;
    /**
     * Splice a value from the dataValue.
     *
     * @param index
     */
    splice(index: any): void;
    unset(): void;
    /**
     * Deletes the value of the component.
     */
    deleteValue(): void;
    get defaultValue(): any;
    /**
     * Get the input value of this component.
     *
     * @return {*}
     */
    getValue(): any;
    /**
     * Get the value at a specific index.
     *
     * @param index
     * @returns {*}
     */
    getValueAt(index: any): any;
    /**
     * Set the value of this component.
     *
     * @param value
     * @param flags
     *
     * @return {boolean} - If the value changed.
     */
    setValue(value: any, flags?: {}): boolean;
    /**
     * Set the value at a specific index.
     *
     * @param index
     * @param value
     */
    setValueAt(index: any, value: any, flags?: {}): void;
    get hasSetValue(): boolean;
    setDefaultValue(): void;
    /**
     * Restore the value of a control.
     */
    restoreValue(): void;
    /**
     * Normalize values coming into updateValue.
     *
     * @param value
     * @return {*}
     */
    normalizeValue(value: any): any;
    /**
     * Update a value of this component.
     *
     * @param flags
     */
    updateComponentValue(value: any, flags?: {}): boolean;
    /**
     * Updates the value of this component plus all sub-components.
     *
     * @param args
     * @return {boolean}
     */
    updateValue(...args: any[]): boolean;
    getIcon(name: any, content: any, styles: any, ref?: string): any;
    /**
     * Resets the value of this component.
     */
    resetValue(): void;
    /**
     * Determine if the value of this component has changed.
     *
     * @param newValue
     * @param oldValue
     * @return {boolean}
     */
    hasChanged(newValue: any, oldValue: any): boolean;
    /**
     * Update the value on change.
     *
     * @param flags
     */
    updateOnChange(flags?: {}, changed?: boolean): boolean;
    /**
     * Perform a calculated value operation.
     *
     * @param data - The global data object.
     *
     * @return {boolean} - If the value changed during calculation.
     */
    convertNumberOrBoolToString(value: any): boolean;
    calculateComponentValue(data: any, flags: any, row: any): boolean;
    calculatedValue: any;
    /**
     * Performs calculations in this component plus any child components.
     *
     * @param args
     * @return {boolean}
     */
    calculateValue(data: any, flags: any, row: any): boolean;
    get logicOptions(): {
        targetComponentInstance: Component;
        sourceComponentInstance: Component;
        formInstance: Component;
    };
    get engineOptions(): {};
    get logicContext(): {
        options: {
            targetComponentInstance: Component;
            sourceComponentInstance: Component;
            formInstance: Component;
        };
        engineOptions: {};
    };
    get conditions(): any;
    get variables(): any;
    updateLogicContext(context: any): any;
    calculateCondition(name: any, context?: {
        options: {
            targetComponentInstance: Component;
            sourceComponentInstance: Component;
            formInstance: Component;
        };
        engineOptions: {};
    }): any;
    calculateConditionPart(conditionPart: any, context?: {
        options: {
            targetComponentInstance: Component;
            sourceComponentInstance: Component;
            formInstance: Component;
        };
        engineOptions: {};
    }): any;
    calculateOperator(operator: any, context?: {
        options: {
            targetComponentInstance: Component;
            sourceComponentInstance: Component;
            formInstance: Component;
        };
        engineOptions: {};
    }): any;
    calculateValueDefinition(valueSource: any, input: any, context?: {
        options: {
            targetComponentInstance: Component;
            sourceComponentInstance: Component;
            formInstance: Component;
        };
        engineOptions: {};
    }): any;
    calculateVariable(name: any, context?: {
        options: {
            targetComponentInstance: Component;
            sourceComponentInstance: Component;
            formInstance: Component;
        };
        engineOptions: {};
    }): any;
    applyTransform(valueEvaluator: any, transform: any, context?: {
        options: {
            targetComponentInstance: Component;
            sourceComponentInstance: Component;
            formInstance: Component;
        };
        engineOptions: {};
    }): any;
    getRowIndexes(): {};
    /**
     * Set this component's label text and render it.
     *
     * @param value - The new label text.
     */
    set label(arg: any);
    /**
     * Get this component's label text.
     *
     */
    get label(): any;
    /**
     * Get FormioForm element at the root of this component tree.
     *
     */
    getRoot(): Component;
    /**
     * Returns the invalid message, or empty string if the component is valid.
     *
     * @param data
     * @param dirty
     * @return {*}
     */
    invalidMessage(data: any, dirty: any, ignoreCondition: any, row: any): any;
    /**
     * Returns if the component is valid or not.
     *
     * @param data
     * @param dirty
     * @return {boolean}
     */
    isValid(data: any, dirty: any): boolean;
    setComponentValidity(messages: any, dirty: any, silentCheck: any): boolean;
    /**
     * Checks the validity of this component and sets the error message if it is invalid.
     *
     * @param data
     * @param dirty
     * @param row
     * @return {boolean}
     */
    checkComponentValidity(data: any, dirty: any, row: any, options?: {}): boolean;
    checkValidity(data: any, dirty: any, row: any, silentCheck: any): boolean;
    checkAsyncValidity(data: any, dirty: any, row: any, silentCheck: any): any;
    resetCaches(): void;
    conditionsCache: {};
    variablesCache: {};
    lockedConditions: Set<any>;
    lockedVariables: Set<any>;
    /**
     * Check the conditions, calculations, and validity of a single component and triggers an update if
     * something changed.
     *
     * @param data - The root data of the change event.
     * @param flags - The flags from this change event.
     *
     * @return boolean - If component is valid or not.
     */
    checkData(data: any, flags: any, row: any): boolean;
    get validationValue(): any;
    isEmpty(value?: any): any;
    isEqual(valueA: any, valueB?: any): any;
    /**
     * Check if a component is eligible for multiple validation
     *
     * @return {boolean}
     */
    validateMultiple(): boolean;
    get errors(): string[];
    clearErrorClasses(): void;
    setCustomValidity(messages: any, dirty: any, external: any): void;
    /**
     * Determines if the value of this component is hidden from the user as if it is coming from the server, but is
     * protected.
     *
     * @return {boolean|*}
     */
    isValueHidden(): boolean | any;
    shouldSkipValidation(data: any, dirty: any, row: any): boolean;
    whenReady(): any;
    get dataReady(): any;
    /**
     * Prints out the value of this component as a string value.
     */
    asString(value: any): string;
    setDisabled(element: any, disabled: any): void;
    setLoading(element: any, loading: any): void;
    selectOptions(select: any, tag: any, options: any, defaultValue: any): void;
    setSelectValue(select: any, value: any): void;
    getRelativePath(path: any): any;
    clear(): void;
    append(element: any): void;
    prepend(element: any): void;
    removeChild(element: any): void;
    detachLogic(): void;
    attachLogic(): void;
    /**
     * Get the element information.
     */
    elementInfo(): {
        type: string;
        component: any;
        changeEvent: string;
        attr: {
            name: any;
            type: any;
            class: string;
            lang: any;
        };
    };
    autofocus(): void;
    focus(): void;
    /**
     * Get `Formio` instance for working with files
     */
    get fileService(): any;
}
declare namespace Component {
    export const externalLibraries: {};
    export function requireLibrary(name: any, property: any, src: any, polling: any): any;
    export function libraryReady(name: any): any;
}
export default Component;
import Base from "../base/Base";
