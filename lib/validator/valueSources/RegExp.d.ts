export class RegExpValueSource extends ValueSource {
    static get name(): string;
    static get title(): string;
    static getInputEditForm(): {
        type: string;
        input: boolean;
        components: ({
            label: string;
            key: string;
            type: string;
            input: boolean;
            validate: {
                required: boolean;
            };
        } | {
            label: string;
            key: string;
            type: string;
            input: boolean;
            validate?: undefined;
        })[];
    };
    constructor(context?: {});
}
import { ValueSource } from "./ValueSource";
