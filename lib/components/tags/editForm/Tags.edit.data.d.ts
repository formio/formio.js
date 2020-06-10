declare var _default: ({
    key: string;
    ignore: boolean;
    weight?: undefined;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    tooltip?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip: string;
    ignore?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    defaultValue: number;
    tooltip: string;
    ignore?: undefined;
    dataSrc?: undefined;
    data?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    dataSrc: string;
    data: {
        values: {
            label: string;
            value: string;
        }[];
    };
    ignore?: undefined;
    tooltip?: undefined;
    defaultValue?: undefined;
})[];
export default _default;
