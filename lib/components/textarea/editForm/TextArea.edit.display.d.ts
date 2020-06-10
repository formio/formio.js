declare var _default: ({
    key: string;
    ignore: boolean;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    weight?: undefined;
    tooltip?: undefined;
    placeholder?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    conditional?: undefined;
    valueProperty?: undefined;
    rows?: undefined;
    editor?: undefined;
    clearOnHide?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    weight: number;
    tooltip: string;
    placeholder: string;
    ignore?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    conditional?: undefined;
    valueProperty?: undefined;
    rows?: undefined;
    editor?: undefined;
    clearOnHide?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
    components?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    defaultValue: boolean;
    label: string;
    ignore?: undefined;
    tooltip?: undefined;
    placeholder?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    conditional?: undefined;
    valueProperty?: undefined;
    rows?: undefined;
    editor?: undefined;
    clearOnHide?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip: string;
    dataSrc: string;
    data: {
        values: {
            label: string;
            value: string;
        }[];
    };
    weight: number;
    ignore?: undefined;
    placeholder?: undefined;
    defaultValue?: undefined;
    conditional?: undefined;
    valueProperty?: undefined;
    rows?: undefined;
    editor?: undefined;
    clearOnHide?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
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
            '===': (string | {
                var: string;
            })[];
            '=='?: undefined;
            or?: undefined;
            and?: undefined;
        };
    };
    ignore?: undefined;
    tooltip?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    valueProperty?: undefined;
    rows?: undefined;
    editor?: undefined;
    clearOnHide?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
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
            '==': (string | {
                var: string;
            })[];
            '==='?: undefined;
            or?: undefined;
            and?: undefined;
        };
    };
    ignore?: undefined;
    placeholder?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    valueProperty?: undefined;
    rows?: undefined;
    editor?: undefined;
    clearOnHide?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    weight: number;
    conditional: {
        json: {
            or: {
                '===': (string | {
                    var: string;
                })[];
            }[];
            '==='?: undefined;
            '=='?: undefined;
            and?: undefined;
        };
    };
    ignore?: undefined;
    tooltip?: undefined;
    placeholder?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    valueProperty?: undefined;
    rows?: undefined;
    editor?: undefined;
    clearOnHide?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
    components?: undefined;
} | {
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
        values?: undefined;
    };
    conditional: {
        json: {
            '===': (boolean | {
                var: string;
            })[];
            '=='?: undefined;
            or?: undefined;
            and?: undefined;
        };
    };
    ignore?: undefined;
    defaultValue?: undefined;
    rows?: undefined;
    editor?: undefined;
    clearOnHide?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
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
            '=='?: undefined;
            or?: undefined;
            and?: undefined;
        };
    };
    ignore?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    valueProperty?: undefined;
    rows?: undefined;
    editor?: undefined;
    clearOnHide?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
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
            '=='?: undefined;
            or?: undefined;
            and?: undefined;
        };
    };
    ignore?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    valueProperty?: undefined;
    clearOnHide?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
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
            '===': (boolean | {
                var: string;
            })[];
            '=='?: undefined;
            or?: undefined;
            and?: undefined;
        };
    };
    ignore?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    valueProperty?: undefined;
    rows?: undefined;
    editor?: undefined;
    clearOnHide?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
    components?: undefined;
} | {
    type: string;
    key: string;
    input: boolean;
    label: string;
    tooltip: string;
    rows: number;
    weight: number;
    placeholder: string;
    conditional: {
        json: {
            and: ({
                '===': (string | {
                    var: string;
                })[];
            } | {
                '===': (boolean | {
                    var: string;
                })[];
            })[];
            '==='?: undefined;
            '=='?: undefined;
            or?: undefined;
        };
    };
    ignore?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    valueProperty?: undefined;
    editor?: undefined;
    clearOnHide?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    dataSrc: string;
    tooltip: string;
    clearOnHide: boolean;
    data: {
        values: {
            label: string;
            value: string;
        }[];
    };
    conditional: {
        json: {
            or: {
                '===': (string | {
                    var: string;
                })[];
            }[];
            '==='?: undefined;
            '=='?: undefined;
            and?: undefined;
        };
    };
    weight: number;
    ignore?: undefined;
    placeholder?: undefined;
    defaultValue?: undefined;
    valueProperty?: undefined;
    rows?: undefined;
    editor?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    editor: string;
    rows: number;
    as: string;
    label: string;
    tooltip: string;
    key: string;
    customDefaultValue(value: any, component: any, row: any, data: any, instance: any): any;
    conditional: {
        json: {
            or: {
                '===': (string | {
                    var: string;
                })[];
            }[];
            '==='?: undefined;
            '=='?: undefined;
            and?: undefined;
        };
    };
    weight: number;
    ignore?: undefined;
    placeholder?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    valueProperty?: undefined;
    clearOnHide?: undefined;
    components?: undefined;
} | {
    key: string;
    components: {
        type: string;
        input: boolean;
        key: string;
        label: string;
        defaultValue: boolean;
        tooltip: string;
        weight: number;
        conditional: {
            json: {
                '==': (string | {
                    var: string;
                })[];
            };
        };
    }[];
    ignore?: undefined;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    weight?: undefined;
    tooltip?: undefined;
    placeholder?: undefined;
    defaultValue?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    conditional?: undefined;
    valueProperty?: undefined;
    rows?: undefined;
    editor?: undefined;
    clearOnHide?: undefined;
    as?: undefined;
    customDefaultValue?: undefined;
})[];
export default _default;
