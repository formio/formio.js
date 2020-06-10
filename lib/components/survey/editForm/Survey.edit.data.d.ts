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
    })[];
    ignore?: undefined;
})[];
export default _default;
