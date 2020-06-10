export default class DayComponent extends Field {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    constructor(component: any, options: any, data: any);
    get valueMask(): RegExp;
    get dayRequired(): any;
    get showDay(): boolean;
    get monthRequired(): any;
    get showMonth(): boolean;
    get yearRequired(): any;
    get showYear(): boolean;
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
    inputDefinition(name: any): {
        type: string;
        ref: any;
        attr: {
            id: string;
            class: string;
            type: string;
            placeholder: any;
            step: number;
            min: any;
            max: any;
        };
    };
    selectDefinition(name: any): {
        multiple: boolean;
        ref: any;
        widget: string;
        attr: {
            id: string;
            class: string;
            name: any;
            lang: any;
        };
    };
    get days(): {
        value: string;
        label: any;
    }[];
    _days: {
        value: string;
        label: any;
    }[];
    get months(): ({
        value: string;
        label: any;
    } | {
        value: number;
        label: string;
    })[];
    _months: ({
        value: string;
        label: any;
    } | {
        value: number;
        label: string;
    })[];
    get years(): {
        value: string;
        label: any;
    }[];
    _years: {
        value: string;
        label: any;
    }[];
    dayFirst: any;
    renderField(name: any): any;
    validateRequired(setting: any, value: any): boolean;
    getFieldValue(name: any): number;
    get parts(): {
        day: number;
        month: number;
        year: number;
    };
    /**
     * Get the format for the value string.
     * @returns {string}
     */
    get format(): string;
    /**
     * Return the date for this component.
     *
     * @param value
     * @return {*}
     */
    getDate(value: any): any;
    /**
     * Return the date object for this component.
     * @returns {Date}
     */
    get date(): Date;
    normalizeMinMaxDates(): any[];
    isPartialDay(value: any): boolean;
}
import Field from "../_classes/field/Field";
