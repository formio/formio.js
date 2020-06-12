import { AddDateComponentTransformer } from './AddDateComponent';
export class AddYearsTransformer extends AddDateComponentTransformer {
    static get title() {
        return 'Add Years';
    }
    static get name() {
        return 'addYears';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'years',
            },
        };
    }
}
