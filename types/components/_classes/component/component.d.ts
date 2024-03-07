import { Element } from '../../../element';
import {
    ComponentSchema,
    ElementInfo,
    ExtendedComponentSchema,
    ValidateOptions,
} from './../../schema.d';

export class Component extends Element {
    static schema(sources: ExtendedComponentSchema): ExtendedComponentSchema;
    static tableView(value: any, options: any): void;
    constructor(component: any, options: Object, data: Object);
    public originalComponent: any | Component;
    public refs: Object;
    public attached: boolean;
    public rendered: boolean;
    public data: Object;
    public component: any;
    public error: string;
    public tooltip: string;
    public row: any;
    public pristine: boolean;
    public parent: any;
    public root: any;
    public lastChanged: any;
    public triggerRedraw: Function;
    public tooltips: any[];
    public invalid: boolean;
    public isBuilt: boolean;
    readonly ready: any;
    readonly labelInfo: any;
    init(): void;
    destroy(): void;
    readonly shouldDisabled: any | boolean;
    readonly isInputComponent: boolean;
    readonly defaultSchema: ComponentSchema;
    readonly hasInput: boolean;
    readonly key: any;
    public parentVisible: any | boolean;
    public parentDisabled: any | boolean;
    public visible: any | boolean;
    public currentForm: any;
    readonly fullMode: boolean;
    readonly builderMode: boolean;
    getModifiedSchema(
        schema: ExtendedComponentSchema,
        defaultSchema: ComponentSchema,
        recursion: boolean
    ): ExtendedComponentSchema;
    readonly schema: ExtendedComponentSchema;
    t(text: string, params?: Object): any;
    labelIsHidden(): boolean;
    readonly transform: any;
    getTemplate(names: any, modes: any): any;
    checkTemplate(templates: any, names: any, modes: any): any;
    checkTemplateMode(templatesByName: any, modes: any): any;
    renderTemplate(name: any, data: any, modeOption?: any[]): any;
    sanitize(dirty: string): any;
    renderString(template: any, data: any): HTMLElement;
    performInputMapping(input: any): any;
    getBrowserLanguage(): string | null;
    beforeNext(): any;
    beforePage(): any;
    beforeSubmit(): any;
    readonly submissionTimezone: string | any;
    readonly canDisable: boolean;
    loadRefs(element: any, refs: any): any;
    build(element: any): any;
    render(children: any, topLevel?: boolean): any;
    attach(element: any): any;
    addShortcut(element: any, shortcut: any): void;
    removeShortcut(element: any, shortcut: any): void;
    detach(): void;
    attachRefreshEvent(refreshData: any): void;
    attachRefreshOn(): void;
    refresh(value: any): void;
    inContext(component: any): boolean;
    readonly viewOnly: boolean | any;
    createViewOnlyElement(): HTMLElement;
    readonly defaultViewOnlyValue: '-';
    getValueAsString(value: any): string;
    getView(value: any): string;
    updateItems(...args: any[]): void;
    createModal(): HTMLElement;
    readonly className: string;
    readonly customStyle: string;
    getElement(): HTMLElement;
    evalContext(additional: any): any;
    setPristine(pristine: boolean): void;
    removeValue(index: number): void;
    iconClass(name: any, spinning: any): any;
    readonly name: string;
    readonly errorLabel: string;
    errorMessage(type: any): any;
    setContent(element: any, content: any): boolean;
    redraw(): any;
    rebuild(): any;
    removeEventListeners(): void;
    hasClass(element: any, className: string): any;
    addClass(element: any, className: string): any;
    removeClass(element: any, className: string): any;
    hasCondition(): boolean;
    conditionallyVisible(data: any): boolean;
    checkCondition(row: any, data: Object): boolean;
    checkConditions(data: any): any;
    readonly logic: any[];
    fieldLogic(data: any): any;
    applyActions(
        actions: any[],
        result: any,
        data: any,
        newComponent: any
    ): boolean;
    addInputError(message: any, dirty: boolean): void;
    clearOnHide(show: boolean): void;
    onChange(flags: Object, fromRoot: boolean): void;
    readonly wysiwygDefault: {
        theme: string;
        placeholder: any | string;
        modules: {
            clipboard: {
                matchVisual: boolean;
            };
            toolbar: any[];
        };
    };
    addCKE(
        element: HTMLElement | any,
        settings: Object,
        onChange: (input: any) => any
    ): any;
    addQuill(
        element: HTMLElement | any,
        settings: Object,
        onChange: (input: any) => any
    ): any;
    addAce(
        element: HTMLElement | any,
        settings: Object,
        onChange: (input: any) => any
    ): any;
    readonly emptyValue: null;
    hasValue(data: Object): boolean;
    readonly rootValue: any;
    readonly rootPristine: any;
    public dataValue: any;
    splice(index: number | string): void;
    deleteValue(): void;
    readonly defaultValue: any;
    getValue(): any;
    getValueAt(index: number): any;
    setValue(value: any, flags: any): boolean;
    setValueAt(index: number, value: any, flags: any): void;
    readonly hasSetValue: boolean;
    restoreValue(): void;
    normalizeValue(value: any): any;
    getIcon(
        name: any | string,
        content: any,
        styles: any,
        ref?: string
    ): any | HTMLElement;
    resetValue(): void;
    hasChanged(before: any, after: any): boolean;
    updateOnChange(flags: any, changed: boolean | any): boolean;
    calculateValue(data: Object, flags: any): boolean;
    public label: any | string;
    getRoot(): Component;
    invalidMessage(data: any, dirty: boolean, ignoreCondition?: boolean): any;
    isValid(data: any, dirty: boolean): boolean;
    checkValidity(data: any, dirty: any | boolean, rowData: any): boolean;
    readonly validationValue: any;
    isEmpty(value: any): boolean;
    validateMultiple(): boolean;
    readonly errors: any[];
    setCustomValidity(message: any, dirty: any): void;
    shouldSkipValidation(data: any, dirty: any, rowData: any): boolean;
    whenReady(): any | Promise<any>;
    readonly dataReady: any | Promise<any>;
    asString(value: any): string;
    public disabled: boolean;
    setDisabled(element: any, disabled: any | boolean): void;
    setLoading(element: any, loading: any | boolean): void;
    selectOptions(select: any, tag: any, options: any, defaultValue: any): void;
    setSelectValue(select: any, value: any): void;
    clear(): any;
    append(element: HTMLElement): void;
    prepend(element: HTMLElement): void;
    removeChild(element: HTMLElement): void;
    attachLogic(): void;
    elementInfo(): ElementInfo;
    autofocus(): void;
    focus(): void;
    readonly shouldDisable: boolean;
    readonly info: ElementInfo;
    public element: any;
    public validators: (keyof ValidateOptions)[];
    public calculatedValue: any;
    public options: any;
    public labelElement: any;
}
