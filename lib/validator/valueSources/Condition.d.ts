export class ConditionValueSource extends ValueSource {
    static get name(): string;
    static get title(): string;
    static getInputEditForm({ customConditions, editFormUtils, excludeConditions, }: {
        customConditions: any;
        editFormUtils: any;
        excludeConditions: any;
    }): any;
    constructor(context?: {});
}
import { ValueSource } from "./ValueSource";
