export class QuickRulesHelper {
    constructor(editForm: any, options: any);
    editForm: any;
    options: any;
    variables: any;
    conditions: any;
    validations: any;
    queue: any[];
    addVariable(variable: any): QuickRulesHelper;
    addCondition(condition: any): QuickRulesHelper;
    addValidation(validation: any): QuickRulesHelper;
    addEditGridValue(editGrid: any, value: any, editRowState?: string): {
        components: any;
        data: any;
        state: string;
        backup: any;
        error: any;
    };
    execute(): any[];
}
