declare var _default: ({
    key: string;
    ignore: boolean;
    type?: undefined;
    label?: undefined;
    input?: undefined;
    weight?: undefined;
    placeholder?: undefined;
    tooltip?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    defaultValue?: undefined;
} | {
    type: string;
    label: string;
    key: string;
    input: boolean;
    weight: number;
    placeholder: string;
    tooltip: string;
    ignore?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    defaultValue?: undefined;
} | {
    type: string;
    label: string;
    key: string;
    input: boolean;
    weight: number;
    tooltip: string;
    ignore?: undefined;
    placeholder?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    defaultValue?: undefined;
} | {
    type: string;
    label: string;
    key: string;
    input: boolean;
    tooltip: string;
    dataSrc: string;
    data: {
        values: {
            label: string;
            value: string;
        }[];
    };
    defaultValue: string;
    weight: number;
    ignore?: undefined;
    placeholder?: undefined;
})[];
export default _default;
