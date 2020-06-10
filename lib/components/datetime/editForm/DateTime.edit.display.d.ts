declare var _default: ({
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
        url?: undefined;
    };
    lazyLoad?: undefined;
    valueProperty?: undefined;
    template?: undefined;
    conditional?: undefined;
    placeholder?: undefined;
    description?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip: string;
    weight: number;
    lazyLoad: boolean;
    defaultValue: string;
    valueProperty: string;
    dataSrc: string;
    data: {
        url: string;
        values?: undefined;
    };
    template: string;
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
        };
    };
    placeholder?: undefined;
    description?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip: string;
    weight: number;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    lazyLoad?: undefined;
    valueProperty?: undefined;
    template?: undefined;
    conditional?: undefined;
    placeholder?: undefined;
    description?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    description: string;
    tooltip: string;
    weight: number;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    lazyLoad?: undefined;
    valueProperty?: undefined;
    template?: undefined;
    conditional?: undefined;
})[];
export default _default;
