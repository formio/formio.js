export class Rules {
    static rules: {
        custom: {
            new (component: any, settings: any, config: any): import("./Custom");
        };
        date: {
            new (component: any, settings: any, config: any): import("./Date");
        };
        day: {
            new (component: any, settings: any, config: any): import("./Day");
        };
        email: {
            new (component: any, settings: any, config: any): import("./Email");
        };
        json: {
            new (component: any, settings: any, config: any): import("./JSON");
        };
        mask: typeof import("./Mask");
        max: typeof import("./Max");
        maxDate: typeof import("./MaxDate");
        maxLength: {
            new (component: any, settings: any, config: any): import("./MaxLength");
        };
        maxWords: {
            new (component: any, settings: any, config: any): import("./MaxWords");
        };
        maxYear: {
            new (component: any, settings: any, config: any): import("./MaxYear");
        };
        min: typeof import("./Min");
        minDate: typeof import("./MinDate");
        minLength: {
            new (component: any, settings: any, config: any): import("./MinLength");
        };
        minWords: {
            new (component: any, settings: any, config: any): import("./MinWords");
        };
        minYear: {
            new (component: any, settings: any, config: any): import("./MinYear");
        };
        pattern: {
            new (component: any, settings: any, config: any): import("./Pattern");
        };
        required: {
            new (component: any, settings: any, config: any): import("./Required");
        };
        select: typeof import("./Select");
        unique: typeof import("./Unique");
        url: {
            new (component: any, settings: any, config: any): import("./Url");
        };
    };
    static addRule(name: any, rule: any): void;
    static addRules(rules: any): void;
    static getRule(name: any): any;
    static getRules(): {
        custom: {
            new (component: any, settings: any, config: any): import("./Custom");
        };
        date: {
            new (component: any, settings: any, config: any): import("./Date");
        };
        day: {
            new (component: any, settings: any, config: any): import("./Day");
        };
        email: {
            new (component: any, settings: any, config: any): import("./Email");
        };
        json: {
            new (component: any, settings: any, config: any): import("./JSON");
        };
        mask: typeof import("./Mask");
        max: typeof import("./Max");
        maxDate: typeof import("./MaxDate");
        maxLength: {
            new (component: any, settings: any, config: any): import("./MaxLength");
        };
        maxWords: {
            new (component: any, settings: any, config: any): import("./MaxWords");
        };
        maxYear: {
            new (component: any, settings: any, config: any): import("./MaxYear");
        };
        min: typeof import("./Min");
        minDate: typeof import("./MinDate");
        minLength: {
            new (component: any, settings: any, config: any): import("./MinLength");
        };
        minWords: {
            new (component: any, settings: any, config: any): import("./MinWords");
        };
        minYear: {
            new (component: any, settings: any, config: any): import("./MinYear");
        };
        pattern: {
            new (component: any, settings: any, config: any): import("./Pattern");
        };
        required: {
            new (component: any, settings: any, config: any): import("./Required");
        };
        select: typeof import("./Select");
        unique: typeof import("./Unique");
        url: {
            new (component: any, settings: any, config: any): import("./Url");
        };
    };
}
