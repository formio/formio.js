declare const instance: ValidationChecker;
export class ValidationChecker {
    constructor(config?: {});
    config: any;
    validators: any;
    checkValidator(component: any, validator: any, setting: any, value: any, data: any, index: any, row: any, async: any): any;
    validate(component: any, validatorName: any, value: any, data: any, index: any, row: any, async: any): any;
    checkComponent(component: any, data: any, row: any, includeWarnings?: boolean, async?: boolean): any;
    get check(): (component: any, data: any, row: any, includeWarnings?: boolean, async?: boolean) => any;
    get(...args: any[]): void;
    each(...args: any[]): void;
    has(...args: any[]): void;
}
export namespace ValidationChecker {
    export namespace config {
        export const db: any;
        export const token: any;
        export const form: any;
        export const submission: any;
    }
}
export { instance as default };
