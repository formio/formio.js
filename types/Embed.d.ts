export declare class Formio {
    static config: any;
    static icons: string;
    static setBaseUrl(url: string): void;
    static setApiUrl(url: string): void;
    static setAppUrl(url: string): void;
    static setProjectUrl(url: string): void;
    static clearCache(): void;
    static setPathType(type: string): void;
    static createForm(element: HTMLElement, form: any, options: any): any;
    static builder(element: HTMLElement, form: any, options: any): any;
    static use(module: any): void;
}
