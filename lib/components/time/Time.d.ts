export default class TimeComponent extends TextFieldComponent {
    constructor(component: any, options: any, data: any);
    rawData: string | any[];
    get dataFormat(): any;
    get skipMaskValidation(): boolean;
    isNotCompleteInput(value: any): any;
    resetRawData(index: any): void;
    setRawValue(value: any, index: any): void;
    getRawValue(index: any): any;
    getStringAsValue(view: any): any;
    getInputMaskFromFormat(format: any): any;
}
import TextFieldComponent from "../textfield/TextField";
