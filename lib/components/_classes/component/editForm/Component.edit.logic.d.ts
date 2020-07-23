declare var _default: {
    weight: number;
    input: boolean;
    label: string;
    key: string;
    templates: {
        header: string;
        row: string;
        footer: string;
    };
    type: string;
    addAnother: string;
    saveRow: string;
    components: ({
        weight: number;
        input: boolean;
        inputType: string;
        label: string;
        key: string;
        validate: {
            required: boolean;
        };
        type: string;
        title?: undefined;
        tableView?: undefined;
        components?: undefined;
        templates?: undefined;
        addAnother?: undefined;
        saveRow?: undefined;
    } | {
        weight: number;
        key: string;
        input: boolean;
        title: string;
        tableView: boolean;
        components: {
            weight: number;
            input: boolean;
            tableView: boolean;
            components: ({
                weight: number;
                input: boolean;
                label: string;
                key: string;
                tableView: boolean;
                data: {
                    values: {
                        value: string;
                        label: string;
                    }[];
                };
                dataSrc: string;
                template: string;
                type: string;
                components?: undefined;
                rows?: undefined;
                editor?: undefined;
                placeholder?: undefined;
                description?: undefined;
                as?: undefined;
            } | {
                weight: number;
                label: string;
                key: string;
                type: string;
                tableView: boolean;
                customConditional({ row }: {
                    row: any;
                }): boolean;
                components: ({
                    input: boolean;
                    key: string;
                    label: string;
                    type: string;
                    tableView: boolean;
                    calculateValue(): boolean;
                    dataSrc?: undefined;
                    valueProperty?: undefined;
                    data?: undefined;
                } | {
                    type: string;
                    input: boolean;
                    label: string;
                    key: string;
                    dataSrc: string;
                    valueProperty: string;
                    tableView: boolean;
                    data: {
                        custom(context: any): any[];
                    };
                    calculateValue?: undefined;
                } | {
                    type: string;
                    input: boolean;
                    label: string;
                    key: string;
                    tableView: boolean;
                    calculateValue?: undefined;
                    dataSrc?: undefined;
                    valueProperty?: undefined;
                    data?: undefined;
                })[];
                input?: undefined;
                data?: undefined;
                dataSrc?: undefined;
                template?: undefined;
                rows?: undefined;
                editor?: undefined;
                placeholder?: undefined;
                description?: undefined;
                as?: undefined;
            } | {
                weight: number;
                type: string;
                key: string;
                rows: number;
                editor: string;
                input: boolean;
                tableView: boolean;
                placeholder: string;
                description: string;
                customConditional({ row }: {
                    row: any;
                }): boolean;
                label?: undefined;
                data?: undefined;
                dataSrc?: undefined;
                template?: undefined;
                components?: undefined;
                as?: undefined;
            } | {
                weight: number;
                type: string;
                key: string;
                rows: number;
                editor: string;
                label: string;
                as: string;
                input: boolean;
                tableView: boolean;
                placeholder: string;
                description: string;
                customConditional({ row }: {
                    row: any;
                }): boolean;
                data?: undefined;
                dataSrc?: undefined;
                template?: undefined;
                components?: undefined;
            } | {
                weight: number;
                type: string;
                key: string;
                label: string;
                placeholder: string;
                description: string;
                tableView: boolean;
                customConditional({ row }: {
                    row: any;
                }): boolean;
                input?: undefined;
                data?: undefined;
                dataSrc?: undefined;
                template?: undefined;
                components?: undefined;
                rows?: undefined;
                editor?: undefined;
                as?: undefined;
            } | {
                customConditional({ row }: {
                    row: any;
                }): boolean;
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
                weight?: undefined;
                tableView?: undefined;
                components?: undefined;
                rows?: undefined;
                editor?: undefined;
                placeholder?: undefined;
                description?: undefined;
                as?: undefined;
            })[];
            key: string;
            type: string;
        }[];
        type: string;
        inputType?: undefined;
        label?: undefined;
        validate?: undefined;
        templates?: undefined;
        addAnother?: undefined;
        saveRow?: undefined;
    } | {
        weight: number;
        input: boolean;
        label: string;
        key: string;
        tableView: boolean;
        templates: {
            header: string;
            row: string;
            footer: string;
        };
        type: string;
        addAnother: string;
        saveRow: string;
        components: {
            weight: number;
            title: string;
            input: boolean;
            key: string;
            type: string;
            components: ({
                weight: number;
                input: boolean;
                inputType: string;
                label: string;
                key: string;
                validate: {
                    required: boolean;
                };
                type: string;
                data?: undefined;
                dataSrc?: undefined;
                template?: undefined;
                tableView?: undefined;
                description?: undefined;
                editor?: undefined;
                rows?: undefined;
                placeholder?: undefined;
            } | {
                weight: number;
                input: boolean;
                label: string;
                key: string;
                data: {
                    values: {
                        value: string;
                        label: string;
                    }[];
                    json?: undefined;
                };
                dataSrc: string;
                template: string;
                type: string;
                inputType?: undefined;
                validate?: undefined;
                tableView?: undefined;
                description?: undefined;
                editor?: undefined;
                rows?: undefined;
                placeholder?: undefined;
            } | {
                weight: number;
                type: string;
                template: string;
                dataSrc: string;
                tableView: boolean;
                data: {
                    json: {
                        label: string;
                        value: string;
                        type: string;
                    }[];
                    values?: undefined;
                };
                key: string;
                label: string;
                input: boolean;
                customConditional({ row }: {
                    row: any;
                }): boolean;
                inputType?: undefined;
                validate?: undefined;
                description?: undefined;
                editor?: undefined;
                rows?: undefined;
                placeholder?: undefined;
            } | {
                weight: number;
                input: boolean;
                label: string;
                key: string;
                tableView: boolean;
                data: {
                    values: {
                        label: string;
                        value: string;
                    }[];
                    json?: undefined;
                };
                dataSrc: string;
                template: string;
                type: string;
                customConditional({ row }: {
                    row: any;
                }): boolean;
                inputType?: undefined;
                validate?: undefined;
                description?: undefined;
                editor?: undefined;
                rows?: undefined;
                placeholder?: undefined;
            } | {
                weight: number;
                type: string;
                key: string;
                label: string;
                inputType: string;
                input: boolean;
                tableView: boolean;
                description: string;
                customConditional({ row }: {
                    row: any;
                }): boolean;
                validate?: undefined;
                data?: undefined;
                dataSrc?: undefined;
                template?: undefined;
                editor?: undefined;
                rows?: undefined;
                placeholder?: undefined;
            } | {
                weight: number;
                input: boolean;
                label: string;
                key: string;
                editor: string;
                rows: number;
                placeholder: string;
                type: string;
                tableView: boolean;
                description: string;
                customConditional({ row }: {
                    row: any;
                }): boolean;
                inputType?: undefined;
                validate?: undefined;
                data?: undefined;
                dataSrc?: undefined;
                template?: undefined;
            } | {
                customConditional({ row }: {
                    row: any;
                }): boolean;
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
                weight?: undefined;
                inputType?: undefined;
                validate?: undefined;
                tableView?: undefined;
                description?: undefined;
                editor?: undefined;
                rows?: undefined;
                placeholder?: undefined;
            })[];
        }[];
        inputType?: undefined;
        validate?: undefined;
        title?: undefined;
    })[];
}[];
export default _default;
