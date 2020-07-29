export class Components {
    static get components(): any;
    static setComponents(comps: any): void;
    static addComponent(name: any, comp: any): void;
    static setComponent(name: any, comp: any): void;
    static getComponentConstructor(component: any): any;
    static create(component: any, options: any, data: any): any;
}
