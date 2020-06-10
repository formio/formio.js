export default class TextFieldComponent extends Input {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    /**
     * Returns the mask value object.
     *
     * @param value
     * @param flags
     * @return {*}
     */
    maskValue(value: any, flags?: {}): any;
}
import Input from "../_classes/input/Input";
