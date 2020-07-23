export default class CheckBoxComponent extends Field {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    get labelClass(): string;
    get inputInfo(): {
        type: string;
        component: any;
        changeEvent: string;
        attr: {
            name: any;
            type: any;
            class: string;
            lang: any;
        };
    };
    input: any;
    get checked(): boolean;
    setCheckedState(value: any): any;
}
import Field from "../_classes/field/Field";
