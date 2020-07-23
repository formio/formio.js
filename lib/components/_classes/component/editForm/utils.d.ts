export default EditFormUtils;
declare namespace EditFormUtils {
    export function sortAndFilterComponents(components: any): any;
    export function sortAndFilterComponents(components: any): any;
    export function unifyComponents(objValue: any, srcValue: any): any;
    export function unifyComponents(objValue: any, srcValue: any): any;
    export function logicVariablesTable(additional: any): {
        type: string;
        tag: string;
        content: string;
    };
    export function logicVariablesTable(additional: any): {
        type: string;
        tag: string;
        content: string;
    };
    export namespace logicSectionHandler {
        export function js({ commonName, property, example, }: {
            commonName: any;
            property: any;
            example: any;
        }): {
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
                key: any;
                rows: number;
                editor: string;
                hideLabel: boolean;
                input: boolean;
                tag?: undefined;
                content?: undefined;
            } | {
                type: string;
                tag: string;
                content: string;
                key?: undefined;
                rows?: undefined;
                editor?: undefined;
                hideLabel?: undefined;
                input?: undefined;
            })[];
        };
        export function js({ commonName, property, example, }: {
            commonName: any;
            property: any;
            example: any;
        }): {
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
                key: any;
                rows: number;
                editor: string;
                hideLabel: boolean;
                input: boolean;
                tag?: undefined;
                content?: undefined;
            } | {
                type: string;
                tag: string;
                content: string;
                key?: undefined;
                rows?: undefined;
                editor?: undefined;
                hideLabel?: undefined;
                input?: undefined;
            })[];
        };
        export function json({ commonName, property, example, }: {
            commonName: any;
            property: any;
            example: any;
        }): {
            type: string;
            title: string;
            collapsible: boolean;
            collapsed: boolean;
            key: string;
            components: ({
                type: string;
                tag: string;
                content: string;
                key?: undefined;
                rows?: undefined;
                editor?: undefined;
                hideLabel?: undefined;
                as?: undefined;
                input?: undefined;
            } | {
                type: string;
                key: any;
                rows: number;
                editor: string;
                hideLabel: boolean;
                as: string;
                input: boolean;
                tag?: undefined;
                content?: undefined;
            })[];
        };
        export function json({ commonName, property, example, }: {
            commonName: any;
            property: any;
            example: any;
        }): {
            type: string;
            title: string;
            collapsible: boolean;
            collapsed: boolean;
            key: string;
            components: ({
                type: string;
                tag: string;
                content: string;
                key?: undefined;
                rows?: undefined;
                editor?: undefined;
                hideLabel?: undefined;
                as?: undefined;
                input?: undefined;
            } | {
                type: string;
                key: any;
                rows: number;
                editor: string;
                hideLabel: boolean;
                as: string;
                input: boolean;
                tag?: undefined;
                content?: undefined;
            })[];
        };
        export function variable({ commonName, property, }: {
            commonName: any;
            property: any;
        }): {
            type: string;
            title: string;
            collapsible: boolean;
            collapsed: boolean;
            key: string;
            components: {
                key: any;
                type: string;
                input: boolean;
                label: string;
                dataSrc: string;
                groupProperty: string;
                dataType: string;
                data: {
                    custom(args: any): any;
                };
                valueProperty: string;
                template: string;
            }[];
        };
        export function variable({ commonName, property, }: {
            commonName: any;
            property: any;
        }): {
            type: string;
            title: string;
            collapsible: boolean;
            collapsed: boolean;
            key: string;
            components: {
                key: any;
                type: string;
                input: boolean;
                label: string;
                dataSrc: string;
                groupProperty: string;
                dataType: string;
                data: {
                    custom(args: any): any;
                };
                valueProperty: string;
                template: string;
            }[];
        };
        export function condition({ commonName, property, }: {
            commonName: any;
            property: any;
        }): {
            type: string;
            title: string;
            collapsible: boolean;
            collapsed: boolean;
            key: string;
            components: {
                key: any;
                type: string;
                input: boolean;
                label: string;
                dataSrc: string;
                groupProperty: string;
                dataType: string;
                data: {
                    custom(args: any): any;
                };
                valueProperty: string;
                template: string;
            }[];
        };
        export function condition({ commonName, property, }: {
            commonName: any;
            property: any;
        }): {
            type: string;
            title: string;
            collapsible: boolean;
            collapsed: boolean;
            key: string;
            components: {
                key: any;
                type: string;
                input: boolean;
                label: string;
                dataSrc: string;
                groupProperty: string;
                dataType: string;
                data: {
                    custom(args: any): any;
                };
                valueProperty: string;
                template: string;
            }[];
        };
    }
    export function javaScriptValue(title: any, property: any, weight: any, logicSections: any, additionalParams: any): {
        type: string;
        title: any;
        theme: string;
        collapsible: boolean;
        collapsed: boolean;
        key: string;
        weight: any;
        components: any[];
    };
    export function javaScriptValue(title: any, property: any, weight: any, logicSections: any, additionalParams: any): {
        type: string;
        title: any;
        theme: string;
        collapsible: boolean;
        collapsed: boolean;
        key: string;
        weight: any;
        components: any[];
    };
    export function valueDeclaration({ customConditions, customVariables, excludeConditions, excludeValueSources, excludeVariables, required, }?: {
        customConditions?: any;
        customVariables?: any;
        excludeConditions?: any[];
        excludeValueSources?: any[];
        excludeVariables?: any[];
        required?: boolean;
    }): any[];
    export function valueDeclaration({ customConditions, customVariables, excludeConditions, excludeValueSources, excludeVariables, required, }?: {
        customConditions?: any;
        customVariables?: any;
        excludeConditions?: any[];
        excludeValueSources?: any[];
        excludeVariables?: any[];
        required?: boolean;
    }): any[];
    export function variableSelector({ customValues, exclude, }?: {
        customValues?: any;
        exclude?: any[];
    }): {
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
    };
    export function variableSelector({ customValues, exclude, }?: {
        customValues?: any;
        exclude?: any[];
    }): {
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
    };
    export function conditionSelector({ customValues, exclude, }?: {
        customValues?: any;
        exclude?: any[];
    }): {
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
    };
    export function conditionSelector({ customValues, exclude, }?: {
        customValues?: any;
        exclude?: any[];
    }): {
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
    };
    export function getTransformer({ title, name, arguments: transformerArguments, presetArguments, optionsEditForm, }: {
        title: any;
        name: any;
        arguments: any;
        presetArguments?: {};
        optionsEditForm: any;
    }, { customConditions, customVariables, excludeValueSources, excludeVariables, }?: {
        customConditions?: any;
        customVariables?: any;
        excludeValueSources?: any[];
        excludeVariables?: any[];
    }): {
        label: string;
        key: string;
        type: string;
        input: boolean;
        components: any;
        conditional: {
            json: {
                '===': any[];
            };
        };
    }[];
    export function getTransformer({ title, name, arguments: transformerArguments, presetArguments, optionsEditForm, }: {
        title: any;
        name: any;
        arguments: any;
        presetArguments?: {};
        optionsEditForm: any;
    }, { customConditions, customVariables, excludeValueSources, excludeVariables, }?: {
        customConditions?: any;
        customVariables?: any;
        excludeValueSources?: any[];
        excludeVariables?: any[];
    }): {
        label: string;
        key: string;
        type: string;
        input: boolean;
        components: any;
        conditional: {
            json: {
                '===': any[];
            };
        };
    }[];
    export function getOperator({ title, name, arguments: operatorArguments, presetArguments, optionsEditForm, }: {
        title: any;
        name: any;
        arguments: any;
        presetArguments?: {};
        optionsEditForm: any;
    }, { customConditions, customVariables, excludeConditions, excludeValueSources, }?: {
        customConditions?: any;
        customVariables?: any;
        excludeConditions?: any[];
        excludeValueSources?: any[];
    }): {
        label: any;
        key: string;
        type: string;
        input: boolean;
        components: {
            key: string;
            type: string;
            title: string;
            input: boolean;
            collapsible: boolean;
            collapsed: boolean;
            components: any;
        }[];
        conditional: {
            json: {
                '===': any[];
            };
        };
    }[];
    export function getOperator({ title, name, arguments: operatorArguments, presetArguments, optionsEditForm, }: {
        title: any;
        name: any;
        arguments: any;
        presetArguments?: {};
        optionsEditForm: any;
    }, { customConditions, customVariables, excludeConditions, excludeValueSources, }?: {
        customConditions?: any;
        customVariables?: any;
        excludeConditions?: any[];
        excludeValueSources?: any[];
    }): {
        label: any;
        key: string;
        type: string;
        input: boolean;
        components: {
            key: string;
            type: string;
            title: string;
            input: boolean;
            collapsible: boolean;
            collapsed: boolean;
            components: any;
        }[];
        conditional: {
            json: {
                '===': any[];
            };
        };
    }[];
    export function getArgument({ name, key, required, }: {
        name: any;
        key: any;
        required?: boolean;
    }, { customConditions, customVariables, excludeConditions, excludeValueSources, excludeVariables, }?: {
        customConditions?: any;
        customVariables?: any;
        excludeConditions?: any[];
        excludeValueSources?: any[];
        excludeVariables?: any[];
    }): {
        label: any;
        hideLabel: boolean;
        key: any;
        type: string;
        input: boolean;
        components: any[];
    };
    export function getArgument({ name, key, required, }: {
        name: any;
        key: any;
        required?: boolean;
    }, { customConditions, customVariables, excludeConditions, excludeValueSources, excludeVariables, }?: {
        customConditions?: any;
        customVariables?: any;
        excludeConditions?: any[];
        excludeValueSources?: any[];
        excludeVariables?: any[];
    }): {
        label: any;
        hideLabel: boolean;
        key: any;
        type: string;
        input: boolean;
        components: any[];
    };
    export function addQuickRule(QuickRule: any): {
        type: string;
        title: any;
        key: string;
        input: boolean;
        collapsible: boolean;
        collapsed: boolean;
        components: {
            type: string;
            key: any;
            label: any;
            input: boolean;
            weight: any;
            components: any;
        }[];
    };
    export function addQuickRule(QuickRule: any): {
        type: string;
        title: any;
        key: string;
        input: boolean;
        collapsible: boolean;
        collapsed: boolean;
        components: {
            type: string;
            key: any;
            label: any;
            input: boolean;
            weight: any;
            components: any;
        }[];
    };
    export function getVariablesEditForm({ customConditions, customVariables, excludeValueSources, }?: {
        customConditions?: any;
        customVariables?: any;
        excludeValueSources?: any[];
    }): {
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
        lazyComponentsInstantiation: boolean;
        components: any[];
    };
    export function getVariablesEditForm({ customConditions, customVariables, excludeValueSources, }?: {
        customConditions?: any;
        customVariables?: any;
        excludeValueSources?: any[];
    }): {
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
        lazyComponentsInstantiation: boolean;
        components: any[];
    };
    export function getConditionsEditForm({ customConditions, customVariables, excludeValueSources, }?: {
        customConditions?: any;
        customVariables?: any;
        excludeValueSources?: any[];
    }): {
        type: string;
        input: boolean;
        label: string;
        key: string;
        inlineEdit: boolean;
        templates: {
            header: string;
            row: string;
        };
        addAnother: string;
        saveRow: string;
        lazyComponentsInstantiation: boolean;
        components: ({
            type: string;
            input: boolean;
            key: string;
            label: string;
            validate: {
                required: boolean;
            };
            allowCalculateOverride?: undefined;
            calculateValue?: undefined;
            hideLabel?: undefined;
            defaultValue?: undefined;
            inline?: undefined;
            values?: undefined;
            inlineEdit?: undefined;
            templates?: undefined;
            addAnother?: undefined;
            saveRow?: undefined;
            components?: undefined;
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
            validate: {
                required: boolean;
            };
            hideLabel?: undefined;
            defaultValue?: undefined;
            inline?: undefined;
            values?: undefined;
            inlineEdit?: undefined;
            templates?: undefined;
            addAnother?: undefined;
            saveRow?: undefined;
            components?: undefined;
        } | {
            type: string;
            input: boolean;
            key: string;
            label: string;
            hideLabel: boolean;
            defaultValue: string;
            inline: boolean;
            values: any;
            validate: {
                required: boolean;
            };
            allowCalculateOverride?: undefined;
            calculateValue?: undefined;
            inlineEdit?: undefined;
            templates?: undefined;
            addAnother?: undefined;
            saveRow?: undefined;
            components?: undefined;
        } | {
            type: string;
            input: boolean;
            key: string;
            label: string;
            hideLabel: boolean;
            inlineEdit: boolean;
            templates: {
                header: string;
                row: string;
            };
            addAnother: string;
            saveRow: string;
            components: ({
                type: string;
                input: boolean;
                key: string;
                label: string;
                dataSrc: string;
                data: {
                    values: {
                        label: string;
                        value: string;
                    }[];
                };
                validate: {
                    required: boolean;
                };
                conditional?: undefined;
                components?: undefined;
            } | {
                validate: {
                    required: boolean;
                };
                conditional: {
                    json: {
                        '===': (string | {
                            var: string;
                        })[];
                    };
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
                components?: undefined;
            } | {
                type: string;
                input: boolean;
                key: string;
                label: string;
                conditional: {
                    json: {
                        '===': (string | {
                            var: string;
                        })[];
                    };
                };
                dataSrc?: undefined;
                data?: undefined;
                validate?: undefined;
                components?: undefined;
            } | {
                type: string;
                input: boolean;
                label: string;
                key: string;
                components: any[];
                conditional: {
                    json: {
                        '===': (string | {
                            var: string;
                        })[];
                    };
                };
                dataSrc?: undefined;
                data?: undefined;
                validate?: undefined;
            })[];
            validate?: undefined;
            allowCalculateOverride?: undefined;
            calculateValue?: undefined;
            defaultValue?: undefined;
            inline?: undefined;
            values?: undefined;
        })[];
    };
    export function getConditionsEditForm({ customConditions, customVariables, excludeValueSources, }?: {
        customConditions?: any;
        customVariables?: any;
        excludeValueSources?: any[];
    }): {
        type: string;
        input: boolean;
        label: string;
        key: string;
        inlineEdit: boolean;
        templates: {
            header: string;
            row: string;
        };
        addAnother: string;
        saveRow: string;
        lazyComponentsInstantiation: boolean;
        components: ({
            type: string;
            input: boolean;
            key: string;
            label: string;
            validate: {
                required: boolean;
            };
            allowCalculateOverride?: undefined;
            calculateValue?: undefined;
            hideLabel?: undefined;
            defaultValue?: undefined;
            inline?: undefined;
            values?: undefined;
            inlineEdit?: undefined;
            templates?: undefined;
            addAnother?: undefined;
            saveRow?: undefined;
            components?: undefined;
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
            validate: {
                required: boolean;
            };
            hideLabel?: undefined;
            defaultValue?: undefined;
            inline?: undefined;
            values?: undefined;
            inlineEdit?: undefined;
            templates?: undefined;
            addAnother?: undefined;
            saveRow?: undefined;
            components?: undefined;
        } | {
            type: string;
            input: boolean;
            key: string;
            label: string;
            hideLabel: boolean;
            defaultValue: string;
            inline: boolean;
            values: any;
            validate: {
                required: boolean;
            };
            allowCalculateOverride?: undefined;
            calculateValue?: undefined;
            inlineEdit?: undefined;
            templates?: undefined;
            addAnother?: undefined;
            saveRow?: undefined;
            components?: undefined;
        } | {
            type: string;
            input: boolean;
            key: string;
            label: string;
            hideLabel: boolean;
            inlineEdit: boolean;
            templates: {
                header: string;
                row: string;
            };
            addAnother: string;
            saveRow: string;
            components: ({
                type: string;
                input: boolean;
                key: string;
                label: string;
                dataSrc: string;
                data: {
                    values: {
                        label: string;
                        value: string;
                    }[];
                };
                validate: {
                    required: boolean;
                };
                conditional?: undefined;
                components?: undefined;
            } | {
                validate: {
                    required: boolean;
                };
                conditional: {
                    json: {
                        '===': (string | {
                            var: string;
                        })[];
                    };
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
                components?: undefined;
            } | {
                type: string;
                input: boolean;
                key: string;
                label: string;
                conditional: {
                    json: {
                        '===': (string | {
                            var: string;
                        })[];
                    };
                };
                dataSrc?: undefined;
                data?: undefined;
                validate?: undefined;
                components?: undefined;
            } | {
                type: string;
                input: boolean;
                label: string;
                key: string;
                components: any[];
                conditional: {
                    json: {
                        '===': (string | {
                            var: string;
                        })[];
                    };
                };
                dataSrc?: undefined;
                data?: undefined;
                validate?: undefined;
            })[];
            validate?: undefined;
            allowCalculateOverride?: undefined;
            calculateValue?: undefined;
            defaultValue?: undefined;
            inline?: undefined;
            values?: undefined;
        })[];
    };
    export function getWebformLogicEditFormSettings(): {
        customConditions({ data }: {
            data: any;
        }): any;
        customVariables({ data }: {
            data: any;
        }): any;
        excludeValueSources: string[];
    };
    export function getWebformLogicEditFormSettings(): {
        customConditions({ data }: {
            data: any;
        }): any;
        customVariables({ data }: {
            data: any;
        }): any;
        excludeValueSources: string[];
    };
}
