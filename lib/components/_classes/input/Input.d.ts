export default class Input extends Multivalue {
    constructor(component: any, options: any, data: any);
    triggerUpdateValueAt: any;
    get inputInfo(): {
        id: any;
        type: string;
        changeEvent: string;
        content: string;
        attr: {
            name: any;
            type: any;
            class: string;
            lang: any;
        };
    };
    get maskOptions(): any;
    get isMultipleMasksField(): boolean;
    getMaskByName(maskName: any): any;
    getMaskOptions(): any;
    getWordCount(value: any): any;
    get remainingWords(): number;
    getValueAttribute(value: any): any;
    setCounter(type: any, element: any, count: any, max: any): void;
    updateValueAt(value: any, flags: any, index: any): void;
    parseValue(value: any): any;
    formatValue(value: any): any;
    getWidget(index: any): any;
    /**
     * Creates an instance of a widget for this component.
     *
     * @return {null}
     */
    createWidget(index: any): null;
}
import Multivalue from "../multivalue/Multivalue";
