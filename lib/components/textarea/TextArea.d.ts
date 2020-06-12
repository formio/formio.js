export default class TextAreaComponent extends TextFieldComponent {
    constructor(component: any, options: any, data: any);
    editors: any[];
    editorsReady: any[];
    updateSizes: any[];
    get autoExpand(): any;
    /**
     * Updates the editor value.
     *
     * @param newValue
     */
    updateEditorValue(index: any, newValue: any): void;
    autoModified: boolean;
    imageHandler(quillInstance: any): void;
    get isPlain(): boolean;
    get htmlView(): any;
    setReadOnlyValue(value: any, index: any): void;
    get isJsonValue(): boolean;
    setConvertedValue(value: any, index: any): any;
    setAsyncConvertedValue(value: any): any;
    setImagesUrl(images: any): any;
    addAutoExpanding(textarea: any, index: any): void;
    removeBlanks(value: any): any;
    getConvertedValue(value: any): any;
}
import TextFieldComponent from "../textfield/TextField";
