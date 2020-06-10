export class TimeValueSource extends ValueSource {
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
        enableDate: boolean;
        timePicker: {
            showMeridian: boolean;
        };
    };
    constructor(context?: {});
}
import { ValueSource } from "./ValueSource";
