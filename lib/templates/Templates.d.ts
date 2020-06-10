export default class Templates {
    static get templates(): any;
    static addTemplate(name: any, template: any): void;
    static extendTemplate(name: any, template: any): void;
    static setTemplate(name: any, template: any): void;
    static set current(arg: any);
    static get current(): any;
    static get defaultTemplates(): any;
    static set framework(arg: any);
    static get framework(): any;
}
