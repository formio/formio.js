declare var _default: ({
    key: string;
    ignore: boolean;
    weight?: undefined;
    type?: undefined;
    label?: undefined;
    tooltip?: undefined;
    input?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
} | {
    weight: number;
    type: string;
    label: string;
    tooltip: string;
    key: string;
    input: boolean;
    ignore?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip: string;
    weight: number;
    defaultValue: string;
    dataSrc: string;
    data: {
        values: {
            label: string;
            value: string;
        }[];
    };
    ignore?: undefined;
})[];
export default _default;
