export class RangeValueSource extends ValueSource {
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
        type: string;
        input: boolean;
        hideLabel: boolean;
        components: {
            label: any;
            key: any;
            type: string;
            input: boolean;
            hideLabel: boolean;
            components: any;
        }[];
    };
    constructor(context?: {});
}
import { ValueSource } from "./ValueSource";
