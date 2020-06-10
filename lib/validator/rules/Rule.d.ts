export = Rule;
declare class Rule {
    constructor(component: any, settings: any, config: any);
    component: any;
    settings: any;
    config: any;
    check(): void;
}
