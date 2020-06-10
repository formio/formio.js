export = Email;
declare const Email_base: {
    new (component: any, settings: any, config: any): import("./Rule");
};
declare class Email extends Email_base {
    constructor(component: any, settings: any, config: any);
    defaultMessage: string;
}
