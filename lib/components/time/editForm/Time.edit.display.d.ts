declare var _default: ({
    type: string;
    input: boolean;
    weight: number;
    tooltip: string;
    key: string;
    defaultValue: string;
    label: string;
    dataSrc: string;
    data: {
        values: {
            label: string;
            value: string;
        }[];
    };
    placeholder?: undefined;
    conditional?: undefined;
    ignore?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    tooltip: string;
    weight: number;
    defaultValue: string;
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
        };
    };
    dataSrc?: undefined;
    data?: undefined;
    ignore?: undefined;
} | {
    key: string;
    ignore: boolean;
    type?: undefined;
    input?: undefined;
    weight?: undefined;
    tooltip?: undefined;
    defaultValue?: undefined;
    label?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    placeholder?: undefined;
    conditional?: undefined;
})[];
export default _default;
