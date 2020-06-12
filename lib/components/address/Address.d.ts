export namespace AddressComponentMode {
    export const Autocomplete: string;
    export const Manual: string;
}
export default class AddressComponent extends ContainerComponent {
    static get modeSwitcherRef(): string;
    static get removeValueIconRef(): string;
    static get searchInputRef(): string;
    constructor(...args: any[]);
    provider: any;
    initializeProvider(provider: any, options?: {}): any;
    set mode(arg: any);
    get mode(): any;
    get autocompleteMode(): boolean;
    get manualMode(): boolean;
    get manualModeEnabled(): boolean;
    set address(arg: any);
    get address(): any;
    isValueInLegacyFormat(value: any): boolean;
    get modeSwitcher(): any;
    get removeValueIcon(): any;
    get searchInput(): any;
    get searchInputAttributes(): {
        name: any;
        type: string;
        class: string;
        lang: any;
        tabindex: any;
    };
    addChildComponent(component: any): void;
    clearAddress(): void;
    getDisplayValue(value?: any): any;
    updateRemoveIcon(): void;
}
import ContainerComponent from "../container/Container";
