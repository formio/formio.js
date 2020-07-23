declare var _default: {
    label: string;
    key: string;
    input: boolean;
    type: string;
    inlineEdit: boolean;
    templates: {
        header: string;
        row: string;
    };
    addAnother: string;
    saveRow: string;
    components: ({
        type: string;
        label: string;
        key: string;
        input: boolean;
        defaultValue: boolean;
        inline?: undefined;
        values?: undefined;
        validate?: undefined;
    } | {
        validate: {
            required: boolean;
        };
        type: string;
        input: boolean;
        key: string;
        label: string;
        dataSrc: string;
        groupProperty: string;
        dataType: string;
        data: {
            custom(args: any): any;
        };
        valueProperty: string;
        template: string;
        defaultValue?: undefined;
        inline?: undefined;
        values?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        input: boolean;
        defaultValue?: undefined;
        inline?: undefined;
        values?: undefined;
        validate?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        inline: boolean;
        input: boolean;
        values: {
            label: string;
            value: string;
        }[];
        validate: {
            required: boolean;
        };
        defaultValue?: undefined;
    })[];
}[];
export default _default;
