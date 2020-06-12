declare var _default: ({
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    weight: number;
    tooltip: string;
    valueProperty: string;
    dataSrc: string;
    data: {
        custom(): any;
    };
    validate: {
        required: boolean;
    };
    conditional?: undefined;
    defaultValue?: undefined;
    rows?: undefined;
    editor?: undefined;
    as?: undefined;
    description?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    weight: number;
    tooltip: string;
    validate: {
        required: boolean;
    };
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
        };
    };
    valueProperty?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    defaultValue?: undefined;
    rows?: undefined;
    editor?: undefined;
    as?: undefined;
    description?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    defaultValue: string;
    placeholder: string;
    weight: number;
    tooltip: string;
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
        };
    };
    valueProperty?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    validate?: undefined;
    rows?: undefined;
    editor?: undefined;
    as?: undefined;
    description?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    weight: number;
    tooltip: string;
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
        };
    };
    valueProperty?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    validate?: undefined;
    defaultValue?: undefined;
    rows?: undefined;
    editor?: undefined;
    as?: undefined;
    description?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    weight: number;
    rows: number;
    editor: string;
    as: string;
    tooltip: string;
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
        };
    };
    valueProperty?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    validate?: undefined;
    defaultValue?: undefined;
    description?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    description: string;
    weight: number;
    rows: number;
    editor: string;
    tooltip: string;
    valueProperty?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    validate?: undefined;
    conditional?: undefined;
    defaultValue?: undefined;
    as?: undefined;
})[];
export default _default;
