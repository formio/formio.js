declare var _default: ({
    key: string;
    ignore: boolean;
    type?: undefined;
    label?: undefined;
    tooltip?: undefined;
    weight?: undefined;
    input?: undefined;
    conditional?: undefined;
    clearOnHide?: undefined;
    calculateValue?: undefined;
    placeholder?: undefined;
    editor?: undefined;
    as?: undefined;
    wysiwyg?: undefined;
} | {
    type: string;
    label: string;
    key: string;
    tooltip: string;
    weight: number;
    input: boolean;
    conditional: {
        json: {
            '!==': (boolean | {
                var: string;
            })[];
        };
    };
    ignore?: undefined;
    clearOnHide?: undefined;
    calculateValue?: undefined;
    placeholder?: undefined;
    editor?: undefined;
    as?: undefined;
    wysiwyg?: undefined;
} | {
    type: string;
    label: string;
    key: string;
    tooltip: string;
    weight: number;
    input: boolean;
    clearOnHide: boolean;
    calculateValue: string;
    ignore?: undefined;
    conditional?: undefined;
    placeholder?: undefined;
    editor?: undefined;
    as?: undefined;
    wysiwyg?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    tooltip: string;
    editor: string;
    as: string;
    wysiwyg: {
        minLines: number;
    };
    ignore?: undefined;
    conditional?: undefined;
    clearOnHide?: undefined;
    calculateValue?: undefined;
})[];
export default _default;
