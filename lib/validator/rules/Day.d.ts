export = Day;
declare const Day_base: {
    new (component: any, settings: any, config: any): import("./Rule");
};
declare class Day extends Day_base {
    constructor(component: any, settings: any, config: any);
    defaultMessage: string;
}
