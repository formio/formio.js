export class ComponentByPathValueSource extends ValueSource {
    static get name(): string;
    static get title(): string;
    static getInputEditForm(options: any): {
        label: string;
        inlineEdit: boolean;
        type: string;
        input: boolean;
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
        conditionalAddButton({ value, instance }: {
            value: any;
            instance: any;
        }): boolean;
    };
    constructor(context?: {});
}
import { ValueSource } from "./ValueSource";
