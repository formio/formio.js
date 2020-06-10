export = MinLength;
declare const MinLength_base: {
    new (component: any, settings: any, config: any): import("./Rule");
};
declare class MinLength extends MinLength_base {
    constructor(component: any, settings: any, config: any);
    defaultMessage: string;
}
