export = Required;
declare const Required_base: {
    new (component: any, settings: any, config: any): import("./Rule");
};
declare class Required extends Required_base {
    constructor(component: any, settings: any, config: any);
    defaultMessage: string;
}
