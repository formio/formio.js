export default class InputWidget extends Element {
    static get defaultSettings(): {
        type: string;
    };
    constructor(settings: any, component: any);
    namespace: string;
    component: any;
    settings: any;
    attach(input: any): any;
    _input: any;
    get defaultSettings(): {};
    set disabled(arg: any);
    get input(): any;
    getValue(): any;
    getValueAsString(value: any): any;
    validationValue(value: any): any;
    addPrefix(): any;
    addSuffix(): any;
    setValue(value: any): void;
}
import Element from "../Element";
