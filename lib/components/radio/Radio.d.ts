export default class RadioComponent extends Field {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    previousValue: any;
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
    get isRadio(): boolean;
    currentValue: any;
}
import Field from "../_classes/field/Field";
