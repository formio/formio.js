export class DateValueSource extends ValueSource {
    static get name(): string;
    static get title(): string;
    static getInputEditForm(): {
        label: string;
        type: string;
        input: boolean;
        validate: {
            required: boolean;
        };
        format: string;
        enableTime: boolean;
    };
    constructor(context?: {});
}
import { ValueSource } from "./ValueSource";
