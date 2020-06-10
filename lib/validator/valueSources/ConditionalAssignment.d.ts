export class ConditionalAssignmentValueSource extends ValueSource {
    static get name(): string;
    static get title(): string;
    static getInputEditForm({ customConditions, customVariables, editFormUtils, excludeConditions, excludeValueSources, excludeVariables, }: {
        customConditions: any;
        customVariables: any;
        editFormUtils: any;
        excludeConditions: any;
        excludeValueSources: any;
        excludeVariables: any;
    }): {
        label: string;
        input: boolean;
        type: string;
        templates: {
            header: string;
            row({ flattenedComponents, row }: {
                flattenedComponents: any;
                row: any;
            }): string;
        };
        addAnother: string;
        saveRow: string;
        components: any[];
    };
    constructor(context?: {});
}
import { ValueSource } from "./ValueSource";
