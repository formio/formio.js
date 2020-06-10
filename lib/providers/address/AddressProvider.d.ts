export class AddressProvider {
    static get name(): string;
    static get displayName(): string;
    constructor(options?: {});
    options: any;
    get defaultOptions(): {};
    get queryProperty(): string;
    get responseProperty(): any;
    get displayValueProperty(): any;
    serialize(params: any): any;
    getRequestOptions(options?: {}): any;
    getRequestUrl(options?: {}): void;
    makeRequest(options?: {}): any;
    search(query: any, options?: {}): any;
    getDisplayValue(address: any): any;
}
