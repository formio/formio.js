export class VariableValueSource extends ValueSource {
    static get name(): string;
    static get title(): string;
    static getInputEditForm({ customVariables, editFormUtils, excludeVariables, }: {
        customVariables: any;
        editFormUtils: any;
        excludeVariables: any;
    }): any;
    constructor(context?: {});
}
import { ValueSource } from "./ValueSource";
