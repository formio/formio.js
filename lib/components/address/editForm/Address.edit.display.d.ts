declare var _default: ({
    key: string;
    ignore: boolean;
    weight?: undefined;
    type?: undefined;
    input?: undefined;
    label?: undefined;
    tooltip?: undefined;
    placeholder?: undefined;
    validate?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip: string;
    customConditional: ({ data }: {
        data: any;
    }) => boolean;
    ignore?: undefined;
    placeholder?: undefined;
    validate?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    tooltip: string;
    validate: {
        required: boolean;
    };
    customConditional: ({ data }: {
        data: any;
    }) => boolean;
    ignore?: undefined;
} | {
    weight: number;
    type: string;
    input: boolean;
    key: string;
    label: string;
    tooltip: string;
    ignore?: undefined;
    placeholder?: undefined;
    validate?: undefined;
} | {
    type: string;
    label: string;
    key: string;
    tooltip: string;
    placeholder: string;
    weight: number;
    input: boolean;
    customConditional: ({ data }: {
        data: any;
    }) => any;
    ignore?: undefined;
    validate?: undefined;
})[];
export default _default;
