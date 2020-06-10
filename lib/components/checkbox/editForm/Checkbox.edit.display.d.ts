declare var _default: ({
    key: string;
    ignore: boolean;
    type?: undefined;
    input?: undefined;
    weight?: undefined;
    label?: undefined;
    tooltip?: undefined;
    dataSrc?: undefined;
    valueProperty?: undefined;
    customDefaultValue?: undefined;
    template?: undefined;
    data?: undefined;
    conditional?: undefined;
} | {
    type: string;
    input: boolean;
    weight: number;
    label: string;
    key: string;
    tooltip: string;
    dataSrc: string;
    valueProperty: string;
    customDefaultValue: () => string;
    template: string;
    data: {
        custom(context: any): {
            label: string;
            value: string;
        }[];
        values?: undefined;
    };
    ignore?: undefined;
    conditional?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip: string;
    dataSrc: string;
    weight: number;
    data: {
        values: {
            label: string;
            value: string;
        }[];
    };
    ignore?: undefined;
    valueProperty?: undefined;
    customDefaultValue?: undefined;
    template?: undefined;
    conditional?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip: string;
    weight: number;
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
        };
    };
    ignore?: undefined;
    dataSrc?: undefined;
    valueProperty?: undefined;
    customDefaultValue?: undefined;
    template?: undefined;
    data?: undefined;
})[];
export default _default;
