declare var _default: ({
    key: string;
    ignore: boolean;
    hidden?: undefined;
    calculateValue?: undefined;
    weight?: undefined;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    placeholder?: undefined;
    tooltip?: undefined;
} | {
    key: string;
    hidden: boolean;
    calculateValue(context: any): any;
    ignore?: undefined;
    weight?: undefined;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    placeholder?: undefined;
    tooltip?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    tooltip: string;
    ignore?: undefined;
    hidden?: undefined;
    calculateValue?: undefined;
})[];
export default _default;
