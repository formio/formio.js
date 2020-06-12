export class QuickRulesHelper {
    constructor(editForm: any, options: any);
    editForm: any;
    options: any;
    variables: any;
    conditions: any;
    validations: any;
    queue: any[];
    addVariable(variable: any): void;
    addCondition(condition: any): void;
    addValidation(validation: any): void;
    addEditGridValue(editGrid: any, value: any, editRowState?: string): {
        components: any;
        data: any;
        state: string;
        backup: any;
        error: any;
    };
    execute(): void;
}
