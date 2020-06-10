declare var _default: ({
    type: string;
    input: boolean;
    key: string;
    label: string;
    weight: number;
    tooltip: string;
    persistent?: undefined;
    enableTime?: undefined;
    placeholder?: undefined;
    title?: undefined;
    collapsible?: undefined;
    collapsed?: undefined;
    style?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    persistent: boolean;
    weight: number;
    tooltip: string;
    enableTime?: undefined;
    placeholder?: undefined;
    title?: undefined;
    collapsible?: undefined;
    collapsed?: undefined;
    style?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    weight: number;
    tooltip: string;
    customConditional({ data, component }: {
        data: any;
        component: any;
    }): boolean;
    persistent?: undefined;
    enableTime?: undefined;
    placeholder?: undefined;
    title?: undefined;
    collapsible?: undefined;
    collapsed?: undefined;
    style?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    enableTime: boolean;
    key: string;
    label: string;
    tooltip: string;
    customConditional({ data, component }: {
        data: any;
        component: any;
    }): any;
    weight: number;
    persistent?: undefined;
    placeholder?: undefined;
    title?: undefined;
    collapsible?: undefined;
    collapsed?: undefined;
    style?: undefined;
    components?: undefined;
} | {
    type: string;
    input: boolean;
    key: string;
    label: string;
    placeholder: string;
    tooltip: string;
    weight: number;
    persistent?: undefined;
    enableTime?: undefined;
    title?: undefined;
    collapsible?: undefined;
    collapsed?: undefined;
    style?: undefined;
    components?: undefined;
} | {
    type: string;
    title: string;
    collapsible: boolean;
    collapsed: boolean;
    style: {
        'margin-bottom': string;
    };
    key: string;
    customConditional(): boolean;
    components: ({
        type: string;
        tag: string;
        content: string;
    } | {
        type: string;
        input: boolean;
        editor: string;
        key: string;
        label: string;
        description: string;
        weight: number;
    })[];
    input?: undefined;
    label?: undefined;
    weight?: undefined;
    tooltip?: undefined;
    persistent?: undefined;
    enableTime?: undefined;
    placeholder?: undefined;
})[];
export default _default;
