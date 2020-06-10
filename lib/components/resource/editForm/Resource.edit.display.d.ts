declare var _default: ({
    key: string;
    weight: number;
    type: string;
    tag: string;
    className: string;
    content: string;
    input?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    template?: undefined;
    valueProperty?: undefined;
    label?: undefined;
    tooltip?: undefined;
    placeholder?: undefined;
    description?: undefined;
    editor?: undefined;
    as?: undefined;
    rows?: undefined;
    conditional?: undefined;
} | {
    type: string;
    input: boolean;
    dataSrc: string;
    data: {
        url: string;
    };
    template: string;
    valueProperty: string;
    label: string;
    key: string;
    weight: number;
    tooltip: string;
    tag?: undefined;
    className?: undefined;
    content?: undefined;
    placeholder?: undefined;
    description?: undefined;
    editor?: undefined;
    as?: undefined;
    rows?: undefined;
    conditional?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip: string;
    placeholder: string;
    weight: number;
    tag?: undefined;
    className?: undefined;
    content?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    template?: undefined;
    valueProperty?: undefined;
    description?: undefined;
    editor?: undefined;
    as?: undefined;
    rows?: undefined;
    conditional?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    weight: number;
    description: string;
    tooltip: string;
    tag?: undefined;
    className?: undefined;
    content?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    template?: undefined;
    valueProperty?: undefined;
    placeholder?: undefined;
    editor?: undefined;
    as?: undefined;
    rows?: undefined;
    conditional?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    editor: string;
    as: string;
    rows: number;
    weight: number;
    tooltip: string;
    tag?: undefined;
    className?: undefined;
    content?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    template?: undefined;
    valueProperty?: undefined;
    placeholder?: undefined;
    description?: undefined;
    conditional?: undefined;
} | {
    type: string;
    input: boolean;
    weight: number;
    key: string;
    label: string;
    tooltip: string;
    conditional: {
        json: {
            '===': (string | {
                var: string;
            })[];
            and?: undefined;
        };
    };
    tag?: undefined;
    className?: undefined;
    content?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    template?: undefined;
    valueProperty?: undefined;
    placeholder?: undefined;
    description?: undefined;
    editor?: undefined;
    as?: undefined;
    rows?: undefined;
} | {
    type: string;
    label: string;
    key: string;
    tooltip: string;
    placeholder: string;
    weight: number;
    input: boolean;
    conditional: {
        json: {
            and: ({
                '===': (string | {
                    var: string;
                })[];
                '!!'?: undefined;
            } | {
                '!!': {
                    var: string;
                };
                '==='?: undefined;
            })[];
            '==='?: undefined;
        };
    };
    tag?: undefined;
    className?: undefined;
    content?: undefined;
    dataSrc?: undefined;
    data?: undefined;
    template?: undefined;
    valueProperty?: undefined;
    description?: undefined;
    editor?: undefined;
    as?: undefined;
    rows?: undefined;
})[];
export default _default;
