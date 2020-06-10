export = Custom;
declare const Custom_base: {
    new (component: any, settings: any, config: any): import("./Rule");
};
declare class Custom extends Custom_base {
    constructor(component: any, settings: any, config: any);
    defaultMessage: string;
}
