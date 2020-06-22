declare var _default: ({
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip: string;
    customConditional(context: any): boolean;
    defaultValue?: undefined;
    reorder?: undefined;
    components?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip?: undefined;
    defaultValue?: undefined;
    reorder?: undefined;
    components?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    defaultValue: boolean;
    label: string;
    tooltip?: undefined;
    reorder?: undefined;
    components?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    customConditional(context: any): boolean;
    reorder: boolean;
    components: {
        type: string;
        key: string;
        label: string;
        input: boolean;
    }[];
    tooltip?: undefined;
    defaultValue?: undefined;
} | {
    weight: number;
    type: string;
    label: string;
    tooltip: string;
    key: string;
    input: boolean;
    defaultValue?: undefined;
    reorder?: undefined;
    components?: undefined;
})[];
export default _default;
