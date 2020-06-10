export default class SurveyComponent extends Field {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    validateRequired(setting: any, value: any): any;
    getInputName(question: any): string;
}
import Field from "../_classes/field/Field";
