export class BooleanValueSource extends ValueSource {
    static get name(): string;
    static get title(): string;
    static getInputEditForm(): {
        label: string;
        type: string;
        input: boolean;
        data: {
            values: {
                label: string;
                value: boolean;
            }[];
        };
        dataType: string;
        validate: {
            required: boolean;
        };
    };
    constructor(context?: {});
}
import { ValueSource } from "./ValueSource";
