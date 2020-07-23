export namespace AddressComponentMode {
    export const Autocomplete: string;
    export const Manual: string;
}
export default class AddressComponent extends ContainerComponent {
    static get modeSwitcherRef(): string;
    static get removeValueIconRef(): string;
    static get searchInputRef(): string;
    static get addRowButtonRef(): string;
    static get removeRowButtonRef(): string;
    constructor(...args: any[]);
    provider: any;
    initializeProvider(provider: any, options?: {}): any;
    set mode(arg: any);
    get mode(): any;
    get autocompleteMode(): boolean;
    get manualMode(): boolean;
    get manualModeEnabled(): boolean;
    get isMultiple(): boolean;
    set address(arg: any);
    get address(): any;
    isValueInLegacyFormat(value: any): boolean;
    get modeSwitcher(): any;
    get removeValueIcon(): any;
    get searchInput(): any;
    get addRowButton(): any;
    get removeRowButton(): any;
    get searchInputAttributes(): {
        name: any;
        type: string;
        class: string;
        lang: any;
        tabindex: any;
    };
    get gridTemplateName(): string;
    get rowTemplateName(): string;
    get hasChildren(): boolean;
    get addAnother(): any;
    renderElement(value: any): any;
    renderRow(value: any, index: any): any;
    renderGrid(): any;
    addRow(): void;
    addChildComponent(component: any): void;
    clearAddress(element: any, index: any): void;
    getDisplayValue(value?: any): any;
    updateRemoveIcon(index: any): void;
}
import ContainerComponent from "../container/Container";
