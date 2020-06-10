declare var _default: ({
    key: string;
    ignore: boolean;
    weight?: undefined;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    addAnother?: undefined;
    tooltip?: undefined;
    reorder?: undefined;
    components?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    addAnother: string;
    tooltip: string;
    reorder: boolean;
    components: ({
        type: string;
        key: string;
        defaultValue: any[];
        label?: undefined;
        data?: undefined;
    } | {
        type: string;
        key: string;
        defaultValue: string;
        label: string;
        data: {
            values: {
                label: string;
                value: string;
            }[];
        };
    } | {
        type: string;
        key: string;
        defaultValue: number;
        label: string;
        data?: undefined;
    })[];
    ignore?: undefined;
} | {
    weight: number;
    type: string;
    label: string;
    tooltip: string;
    key: string;
    input: boolean;
    ignore?: undefined;
    addAnother?: undefined;
    reorder?: undefined;
    components?: undefined;
})[];
export default _default;
