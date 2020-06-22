export default class SelectComponent extends Field {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    triggerUpdate: (...args: any[]) => any;
    isFromSearch: boolean;
    searchServerCount: any;
    defaultServerCount: any;
    isScrollLoading: boolean;
    searchDownloadedResources: any;
    defaultDownloadedResources: any;
    activated: boolean;
    itemsLoaded: any;
    itemsLoadedResolve: any;
    get valueProperty(): any;
    get inputInfo(): {
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
    get isSelectResource(): boolean;
    get isSelectURL(): boolean;
    get isInfiniteScrollProvided(): boolean;
    isEntireObjectDisplay(): boolean;
    groupOptions(options: any): any;
    get groupedSelectOptions(): any;
    itemTemplate(data: any): any;
    itemGroup(data: any): any;
    itemDisabled(data: any): any;
    /**
     * Adds an option to the select dropdown.
     *
     * @param value
     * @param label
     */
    addOption(value: any, label: any, attrs: {}, id: any, disabled: any, group: any): void;
    addValueOptions(items: any): boolean;
    disableInfiniteScroll(): void;
    set serverCount(arg: any);
    get serverCount(): any;
    setItems(items: any, fromSearch: any): void;
    set downloadedResources(arg: any);
    get downloadedResources(): any;
    loading: boolean;
    loadItems(url: any, search: any, headers: any, options: any, method: any, body: any): void;
    /**
     * Get the request headers for this select dropdown.
     */
    get requestHeaders(): Headers;
    getCustomItems(): any;
    getVariableItems(): any;
    updateCustomItems(): void;
    updateVariableItems(): void;
    get additionalResourcesAvailable(): any;
    addPlaceholder(): void;
    /**
     * Activate this select control.
     */
    activate(): void;
    get active(): any;
    wrapElement(element: any): any;
    choicesOptions(): any;
    focusableElement: any;
    choices: Choices;
    scrollList: any;
    onScroll: () => void;
    addPlaceholderItem(placeholderValue: any): void;
    update(): void;
    /**
     * @param {*} value
     * @param {Array} items
     */
    addCurrentChoices(values: any, items: any[], keyValue: any): any;
    normalizeSingleValue(value: any): any;
    lazyLoadInit: boolean;
    isInitApiCallNeeded(hasValue: any): any;
    setChoicesValue(value: any, hasPreviousValue: any): void;
    /**
     * Output this select dropdown as a string value.
     * @return {*}
     */
    isBooleanOrNumber(value: any): any;
    getNormalizedValues(): any;
}
import Field from "../_classes/field/Field";
import Choices from "../../utils/ChoicesWrapper";
