export default class ButtonComponent extends Field {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
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
    set loading(arg: any);
    createLabel(): void;
    createInput(container: any): any;
    get clicked(): any;
    get oauthConfig(): any;
    attachButton(): void;
    hasError: boolean;
    onClick(event: any): void;
    openOauth(settings: any): void;
    triggerReCaptcha(): void;
}
import Field from "../_classes/field/Field";
