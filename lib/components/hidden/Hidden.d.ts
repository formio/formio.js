export default class HiddenComponent extends Input {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
}
import Input from "../_classes/input/Input";
