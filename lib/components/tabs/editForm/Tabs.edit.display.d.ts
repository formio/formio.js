declare var _default: ({
    key: string;
    ignore: boolean;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    weight?: undefined;
    reorder?: undefined;
    components?: undefined;
} | {
    key: string;
    type: string;
    input: boolean;
    label: string;
    weight: number;
    reorder: boolean;
    components: ({
        type: string;
        input: boolean;
        key: string;
        label: string;
        allowCalculateOverride?: undefined;
        calculateValue?: undefined;
    } | {
        type: string;
        input: boolean;
        key: string;
        label: string;
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
