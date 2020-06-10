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
    conditional?: undefined;
    rows?: undefined;
    editor?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    weight: number;
    placeholder: string;
    tooltip: string;
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
            in?: undefined;
            '=='?: undefined;
        };
    };
    valueProperty?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    rows?: undefined;
    editor?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    weight: number;
    placeholder: string;
    conditional: {
        json: {
            in: (string[] | {
                var: string;
            })[];
            '==='?: undefined;
            '=='?: undefined;
        };
    };
    tooltip?: undefined;
    valueProperty?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    rows?: undefined;
    editor?: undefined;
    components?: undefined;
} | {
    type: string;
    key: string;
    label: string;
    tooltip: string;
    rows: number;
    editor: string;
    input: boolean;
    weight: number;
    placeholder: string;
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
            in?: undefined;
            '=='?: undefined;
        };
    };
    valueProperty?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    tooltip: string;
    weight: number;
    valueProperty?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    conditional?: undefined;
    rows?: undefined;
    editor?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip: string;
    weight: number;
    placeholder?: undefined;
    valueProperty?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    conditional?: undefined;
    rows?: undefined;
    editor?: undefined;
    components?: undefined;
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
            in?: undefined;
            '=='?: undefined;
        };
    };
    placeholder?: undefined;
    valueProperty?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    rows?: undefined;
    editor?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    tooltip: string;
    weight: number;
    conditional: {
        json: {
            '==': (boolean | {
                var: string;
            })[];
            '==='?: undefined;
            in?: undefined;
        };
    };
    valueProperty?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    rows?: undefined;
    editor?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    label: string;
    key: string;
    tooltip: string;
    weight: number;
    components: {
        label: string;
        key: string;
        input: boolean;
        type: string;
    }[];
    placeholder?: undefined;
    valueProperty?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    conditional?: undefined;
    rows?: undefined;
    editor?: undefined;
})[];
export default _default;
