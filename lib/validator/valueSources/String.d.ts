export class StringValueSource extends ValueSource {
    static get name(): string;
    static get title(): string;
    static getInputEditForm(): {
        label: string;
        type: string;
        input: boolean;
    };
    constructor(context?: {});
}
import { ValueSource } from "./ValueSource";
