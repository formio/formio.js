export = JSON;
declare const JSON_base: {
    new (component: any, settings: any, config: any): import("./Rule");
};
declare class JSON extends JSON_base {
    constructor(component: any, settings: any, config: any);
    defaultMessage: string;
}
