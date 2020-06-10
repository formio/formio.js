declare var _default: ({
    key: string;
    label: string;
    tooltip: string;
    type: string;
    values: {
        label: string;
        value: string;
    }[];
    weight: number;
    ignore?: undefined;
} | {
    key: string;
    label: string;
    tooltip: string;
    type: string;
    customConditional(context: any): boolean;
    weight: number;
    values?: undefined;
    ignore?: undefined;
} | {
    key: string;
    ignore: boolean;
    label?: undefined;
    tooltip?: undefined;
    type?: undefined;
    values?: undefined;
    weight?: undefined;
})[];
export default _default;
