export default class CurrencyComponent extends NumberComponent {
    constructor(component: any, options: any, data: any);
    prefix: any;
    suffix: any;
    addZerosAndFormatValue(value: any): any;
    stripPrefixSuffix(value: any): any;
}
import NumberComponent from "../number/Number";
