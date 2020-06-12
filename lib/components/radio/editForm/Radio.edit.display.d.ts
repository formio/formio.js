declare var _default: ({
    key: string;
    ignore: boolean;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    tooltip?: undefined;
    dataSrc?: undefined;
    weight?: undefined;
    defaultValue?: undefined;
    data?: undefined;
} | {
    type: string;
    input: boolean;
    label: string;
    key: string;
    tooltip: string;
    dataSrc: string;
    weight: number;
    defaultValue: string;
    data: {
        values: {
            label: string;
            value: string;
        }[];
    };
    ignore?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip: string;
    weight: number;
    ignore?: undefined;
    dataSrc?: undefined;
    defaultValue?: undefined;
    data?: undefined;
})[];
export default _default;
