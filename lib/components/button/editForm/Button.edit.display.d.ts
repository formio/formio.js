declare var _default: ({
    key: string;
    ignore: boolean;
    type?: undefined;
    label?: undefined;
    input?: undefined;
    dataSrc?: undefined;
    weight?: undefined;
    tooltip?: undefined;
    data?: undefined;
    placeholder?: undefined;
    conditional?: undefined;
    inputType?: undefined;
    addAnother?: undefined;
    components?: undefined;
    rows?: undefined;
    editor?: undefined;
    valueProperty?: undefined;
    template?: undefined;
} | {
    type: string;
    key: string;
    label: string;
    input: boolean;
    dataSrc: string;
    weight: number;
    tooltip: string;
    data: {
        values: {
            label: string;
            value: string;
        }[];
    };
    ignore?: undefined;
    placeholder?: undefined;
    conditional?: undefined;
    inputType?: undefined;
    addAnother?: undefined;
    components?: undefined;
    rows?: undefined;
    editor?: undefined;
    valueProperty?: undefined;
    template?: undefined;
} | {
    type: string;
    label: string;
    key: string;
    weight: number;
    tooltip: string;
    placeholder: string;
    input: boolean;
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
            '!=='?: undefined;
        };
    };
    ignore?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    inputType?: undefined;
    addAnother?: undefined;
    components?: undefined;
    rows?: undefined;
    editor?: undefined;
    valueProperty?: undefined;
    template?: undefined;
} | {
    type: string;
    input: boolean;
    inputType: string;
    key: string;
    label: string;
    weight: number;
    tooltip: string;
    conditional: {
        json: {
            '!==': (string | {
                var: string;
            })[];
            '==='?: undefined;
        };
    };
    ignore?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    placeholder?: undefined;
    addAnother?: undefined;
    components?: undefined;
    rows?: undefined;
    editor?: undefined;
    valueProperty?: undefined;
    template?: undefined;
} | {
    type: string;
    label: string;
    key: string;
    input: boolean;
    weight: number;
    tooltip: string;
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
            '!=='?: undefined;
        };
    };
    ignore?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    placeholder?: undefined;
    inputType?: undefined;
    addAnother?: undefined;
    components?: undefined;
    rows?: undefined;
    editor?: undefined;
    valueProperty?: undefined;
    template?: undefined;
} | {
    type: string;
    inputType: string;
    key: string;
    input: boolean;
    weight: number;
    label: string;
    tooltip: string;
    placeholder: string;
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
            '!=='?: undefined;
        };
    };
    ignore?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    addAnother?: undefined;
    components?: undefined;
    rows?: undefined;
    editor?: undefined;
    valueProperty?: undefined;
    template?: undefined;
} | {
    type: string;
    key: string;
    input: boolean;
    weight: number;
    label: string;
    addAnother: string;
    tooltip: string;
    components: {
        key: string;
        label: string;
        input: boolean;
        type: string;
    }[];
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
            '!=='?: undefined;
        };
    };
    ignore?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    placeholder?: undefined;
    inputType?: undefined;
    rows?: undefined;
    editor?: undefined;
    valueProperty?: undefined;
    template?: undefined;
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
            '!=='?: undefined;
        };
    };
    ignore?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    inputType?: undefined;
    addAnother?: undefined;
    components?: undefined;
    valueProperty?: undefined;
    template?: undefined;
} | {
    type: string;
    key: string;
    label: string;
    input: boolean;
    placeholder: string;
    tooltip: string;
    weight: number;
    ignore?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    conditional?: undefined;
    inputType?: undefined;
    addAnother?: undefined;
    components?: undefined;
    rows?: undefined;
    editor?: undefined;
    valueProperty?: undefined;
    template?: undefined;
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
    placeholder?: undefined;
    conditional?: undefined;
    inputType?: undefined;
    addAnother?: undefined;
    components?: undefined;
    rows?: undefined;
    editor?: undefined;
} | {
    type: string;
    key: string;
    label: string;
    input: boolean;
    weight: number;
    tooltip: string;
    ignore?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    placeholder?: undefined;
    conditional?: undefined;
    inputType?: undefined;
    addAnother?: undefined;
    components?: undefined;
    rows?: undefined;
    editor?: undefined;
    valueProperty?: undefined;
    template?: undefined;
})[];
export default _default;
