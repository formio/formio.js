export default class NumberComponent extends Input {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(...args: any[]);
    decimalSeparator: any;
    delimiter: any;
    decimalLimit: any;
    numberMask: any;
    /**
     * Creates the number mask for normal numbers.
     *
     * @return {*}
     */
    createNumberMask(): any;
    isDecimalAllowed(): any;
    parseNumber(value: any): number;
    getMaskedValue(value: any): any;
}
import Input from "../_classes/input/Input";
