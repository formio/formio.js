export = MinWords;
declare const MinWords_base: {
    new (component: any, settings: any, config: any): import("./Rule");
};
declare class MinWords extends MinWords_base {
    constructor(component: any, settings: any, config: any);
    defaultMessage: string;
}
