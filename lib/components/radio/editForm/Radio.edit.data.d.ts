declare var _default: ({
    key: string;
    ignore: boolean;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    tooltip?: undefined;
    weight?: undefined;
    reorder?: undefined;
    defaultValue?: undefined;
    components?: undefined;
    clearOnHide?: undefined;
    template?: undefined;
    dataSrc?: undefined;
    data?: undefined;
} | {
    type: string;
    input: boolean;
    label: string;
    key: string;
    tooltip: string;
    weight: number;
    reorder: boolean;
    defaultValue: {
        label: string;
        value: string;
    }[];
    components: ({
        label: string;
        key: string;
        input: boolean;
        type: string;
        allowCalculateOverride?: undefined;
        calculateValue?: undefined;
        validate?: undefined;
        weight?: undefined;
        tooltip?: undefined;
        dataSrc?: undefined;
        valueProperty?: undefined;
        customDefaultValue?: undefined;
        template?: undefined;
        data?: undefined;
    } | {
        label: string;
        key: string;
        input: boolean;
        type: string;
        allowCalculateOverride: boolean;
        calculateValue: {
            _camelCase: {
                var: string;
            }[];
        };
        validate: {
            required: boolean;
        };
        weight?: undefined;
        tooltip?: undefined;
        dataSrc?: undefined;
        valueProperty?: undefined;
        customDefaultValue?: undefined;
        template?: undefined;
        data?: undefined;
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
        };
        allowCalculateOverride?: undefined;
        calculateValue?: undefined;
        validate?: undefined;
    })[];
    ignore?: undefined;
    clearOnHide?: undefined;
    template?: undefined;
    dataSrc?: undefined;
    data?: undefined;
} | {
    type: string;
    input: boolean;
    label: string;
    key: string;
    clearOnHide: boolean;
    tooltip: string;
    weight: number;
    template: string;
    dataSrc: string;
    data: {
        values: {
            label: string;
            value: string;
        }[];
    };
    ignore?: undefined;
    reorder?: undefined;
    defaultValue?: undefined;
    components?: undefined;
})[];
export default _default;
