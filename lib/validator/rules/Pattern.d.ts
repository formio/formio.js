export = Pattern;
declare const Pattern_base: {
    new (component: any, settings: any, config: any): import("./Rule");
};
declare class Pattern extends Pattern_base {
    constructor(component: any, settings: any, config: any);
    defaultMessage: string;
}
