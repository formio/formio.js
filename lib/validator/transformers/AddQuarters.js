import { AddDateComponentTransformer } from './AddDateComponent';
export class AddQuartersTransformer extends AddDateComponentTransformer {
    static get title() {
        return 'Add Quarters';
    }
    static get name() {
        return 'addQuarters';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'quarters',
            },
        };
    }
}
